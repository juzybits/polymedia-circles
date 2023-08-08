/// The entry point for the package
module polymedia_circles::controller
{
    use std::string::{String, utf8};
    use std::vector::{Self};
    use sui::coin::{Self, Coin};
    use sui::event::{Self};
    use sui::object::{Self, ID};
    use sui::sui::{SUI};
    use sui::transfer::{Self};
    use sui::tx_context::{Self, TxContext};
    use polymedia_circles::artwork::{Self, Artwork};
    use polymedia_circles::collection::{Self, Collection};
    use polymedia_circles::whitelist::{Self, Whitelist};

    /* Errors */
    const E_CANT_MODIFY_FROZEN_ARTWORK: u64 = 1000;
    const E_ARTWORK_ALREADY_FROZEN: u64 = 1001;
    const E_WRONG_SWAP_LENGTH: u64 = 1002;
    const E_WRONG_SWAP_INDEX: u64 = 1003;

    /* Events */
    struct ArtworkMinted has copy, drop {
        artwork_id: ID,
        artwork_number: u64,
        from_whitelist: bool,
    }
    struct ArtworkFrozen has copy, drop {
        artwork_id: ID,
        artwork_number: u64,
    }
    struct ArtworkBurned has copy, drop {
        artwork_id: ID,
        artwork_number: u64,
    }
    struct ArtworkRecycled has copy, drop {
        old_artwork_id: ID,
        old_artwork_number: u64,
        new_artwork_id: ID,
        new_artwork_number: u64,
    }
    struct ArtworkBlended has copy, drop {
        artwork_a_id: ID,
        artwork_a_number: u64,
        artwork_b_id: ID,
        artwork_b_number: u64,
    }

    // public fun autograph() // MAYBE

    /* base helpers */

    #[lint_allow(self_transfer)]
    fun create_artwork(
        collection: &mut Collection,
        pay_coin: Coin<SUI>,
        price: u64,
        autograph: String,
        ctx: &mut TxContext
    ) : Artwork
    {
        // Take payment
        let exact_coin = coin::split(&mut pay_coin, price, ctx);
        if (coin::value(&pay_coin) > 0) {
            // return change to sender
            transfer::public_transfer(pay_coin, tx_context::sender(ctx));
        } else {
            // destroy empty coin
            coin::destroy_zero(pay_coin);
        };
        transfer::public_transfer( exact_coin, collection::pay_address(collection) );

        let artwork = artwork::create(
            collection::next_number(collection),
            autograph,
            ctx,
        );
        collection::increase_supply(collection);
        collection::increase_number(collection);
        collection::increase_price(collection);
        return artwork
    }

    /* public functions */

    /// Mint a new Artwork
    public fun mint_artwork(
        collection: &mut Collection,
        pay_coin: Coin<SUI>,
        ctx: &mut TxContext
    ): Artwork
    {
        let full_price = collection::next_price(collection);
        let autograph = utf8(b"");
        let artwork = create_artwork(
            collection,
            pay_coin,
            full_price,
            autograph,
            ctx,
        );
        event::emit(ArtworkMinted {
            artwork_id: object::id(&artwork),
            artwork_number: artwork::number(&artwork),
            from_whitelist: false,
        });
        return artwork
    }

    /// Mint a new Artwork for free, for whitelisted addresses
    public fun mint_artwork_via_whitelist(
        collection: &mut Collection,
        whitelist: &mut Whitelist,
        ctx: &mut TxContext,
    ): Artwork
    {
        // Will fail if not whitelisted
        let autograph = whitelist::pop_autograph(whitelist, tx_context::sender(ctx));
        let price = 0;
        let pay_coin = coin::zero(ctx);
        let artwork = create_artwork(
            collection,
            pay_coin,
            price,
            autograph,
            ctx,
        );
        event::emit(ArtworkMinted {
            artwork_id: object::id(&artwork),
            artwork_number: artwork::number(&artwork),
            from_whitelist: true,
        });
        return artwork
    }

    /// Prevent further changes to an `Artwork`
    public fun freeze_artwork(
        artwork: &mut Artwork,
    ) {
        assert!( !artwork::frozen(artwork), E_ARTWORK_ALREADY_FROZEN );
        event::emit(ArtworkFrozen {
            artwork_id: object::id(artwork),
            artwork_number: artwork::number(artwork),
        });
        artwork::freezee(artwork);
    }

    /// Burn an existing `Artwork`
    public fun burn_artwork(
        collection: &mut Collection,
        artwork: Artwork,
    ) {
        assert!( !artwork::frozen(&artwork), E_CANT_MODIFY_FROZEN_ARTWORK );
        event::emit(ArtworkBurned {
            artwork_id: object::id(&artwork),
            artwork_number: artwork::number(&artwork),
        });
        artwork::destroy(artwork);
        collection::decrease_supply(collection);
    }

    /// Burn an existing `Artwork` and mint a new one at a discounted price (10%)
    public fun recycle_artwork(
        collection: &mut Collection,
        pay_coin: Coin<SUI>,
        old_artwork: Artwork,
        ctx: &mut TxContext,
    ): Artwork {
        assert!( !artwork::frozen(&old_artwork), E_CANT_MODIFY_FROZEN_ARTWORK );
        let discounted_price = collection::next_price_discounted(collection);
        let autograph = utf8(b"");
        let new_artwork = create_artwork(
            collection,
            pay_coin,
            discounted_price,
            autograph,
            ctx,
        );
        event::emit(ArtworkRecycled {
            old_artwork_id: object::id(&old_artwork),
            old_artwork_number: artwork::number(&old_artwork),
            new_artwork_id: object::id(&new_artwork),
            new_artwork_number: artwork::number(&new_artwork),
        });
        burn_artwork(collection, old_artwork);
        return new_artwork
    }

    /// Swap circles between two artworks
    public fun blend_artwork(
        a: &mut Artwork,
        b: &mut Artwork,
        swaps: vector<vector<u64>>,
    ) {
        assert!( !artwork::frozen(a), E_CANT_MODIFY_FROZEN_ARTWORK );
        assert!( !artwork::frozen(b), E_CANT_MODIFY_FROZEN_ARTWORK );
        let swaps_len = vector::length(&swaps);
        let a_circles = artwork::circles(a);
        let b_circles = artwork::circles(b);
        let a_circles_len = vector::length(a_circles);
        let b_circles_len = vector::length(b_circles);
        assert!( swaps_len <= a_circles_len && swaps_len <= b_circles_len, E_WRONG_SWAP_LENGTH );

        // Copy a_circles and b_circles into new vectors for manipulation
        let a_new_circles = *a_circles;
        let b_new_circles = *b_circles;

        // Iterate over swap pairs
        let swap_idx = 0;
        while (swap_idx < swaps_len) {
            let swap = vector::borrow(&swaps, swap_idx);

            // Indices to swap in a and b
            let a_swap = *vector::borrow(swap, 0);
            let b_swap = *vector::borrow(swap, 1);

            // Assert indices are in bound
            assert!(a_swap < a_circles_len && b_swap < b_circles_len, E_WRONG_SWAP_INDEX);

            // Perform the swap by borrowing references to the respective circles
            let a_circle = vector::borrow_mut(&mut a_new_circles, a_swap);
            let b_circle = vector::borrow_mut(&mut b_new_circles, b_swap);

            // Swap the circle elements
            let tmp_circle = *a_circle;
            *a_circle = *b_circle;
            *b_circle = tmp_circle;

            swap_idx = swap_idx + 1;
        };

        // Update artworks with the new circles vectors
        artwork::set_circles(a, a_new_circles);
        artwork::set_circles(b, b_new_circles);

        event::emit(ArtworkBlended {
            artwork_a_id: object::id(a),
            artwork_a_number: artwork::number(a),
            artwork_b_id: object::id(b),
            artwork_b_number: artwork::number(b),
        });
    }

    /* entry wrappers around public functions */

    public entry fun mint_artwork_entry(
        collection: &mut Collection,
        recipient: address,
        pay_coin: Coin<SUI>,
        ctx: &mut TxContext,
    ) {
        let artwork = mint_artwork(collection, pay_coin, ctx);
        transfer::public_transfer(artwork, recipient);
    }

    public entry fun freeze_artwork_entry(
        artwork: &mut Artwork,
    ) {
        freeze_artwork(artwork);
    }

    public entry fun burn_artwork_entry(
        collection: &mut Collection,
        artwork: Artwork,
    ) {
        burn_artwork(collection, artwork);
    }

    public entry fun recycle_artwork_entry(
        collection: &mut Collection,
        recipient: address,
        pay_coin: Coin<SUI>,
        recycle: Artwork,
        ctx: &mut TxContext,
    ) {
        let artwork = recycle_artwork(collection, pay_coin, recycle, ctx);
        transfer::public_transfer(artwork, recipient);
    }

    public entry fun blend_artwork_entry(
        a: &mut Artwork,
        b: &mut Artwork,
        swaps: vector<vector<u64>>,
    ) {
        blend_artwork(a, b, swaps);
    }
}

#[test_only]
module polymedia_circles::controller_tests
{
    // use std::debug;
    use std::vector;
    use sui::coin::{Self, Coin};
    use sui::object::{Self, ID};
    use sui::sui::{SUI};
    use sui::test_scenario::{Self as ts};
    use polymedia_circles::artwork::{Self, Artwork};
    use polymedia_circles::circle::{Circle};
    use polymedia_circles::collection::{Self, Collection};
    use polymedia_circles::controller;

    #[test]
    fun test_end_to_end()
    {
        // call collection::init()
        let addr_publisher: address = @0x777;
        let scen = ts::begin(addr_publisher);
        collection::simulate_init(ts::ctx(&mut scen));

        // grab the new Collection
        ts::next_tx(&mut scen, addr_publisher);
        let coll = ts::take_shared<Collection>(&scen);

        // calculate price expectations (price_n = price for the nth Artwork)
        let price_increase_bps = collection::price_increase_bps(); // 100 bps (1%)
        let price_1 = collection::next_price(&coll); // price of the 1st Artwork (1 SUI)
        let price_2 = price_1 + ((price_1 * price_increase_bps) / 10000); // 1.01 SUI
        let price_3 = price_2 + ((price_2 * price_increase_bps) / 10000); // 1.0201 SUI
        let price_4 = price_3 + ((price_3 * price_increase_bps) / 10000); // 1.0201 SUI
        let price_2_discounted = price_2 / collection::recycled_divisor();
        let price_3_discounted = price_3 / collection::recycled_divisor();

        /* mint Artwork #1 and #2 */

        let addr_minter: address = @0x888;
        let minter_balance_0 = 10_000_000_000; // 10 SUI

        // Artwork #1

        // mint Artwork #1
        ts::next_tx(&mut scen, addr_minter);
        {
            let ctx = ts::ctx(&mut scen);
            let pay_coin = coin::mint_for_testing<SUI>(minter_balance_0, ctx);
            controller::mint_artwork_entry(
                &mut coll,
                addr_minter,
                pay_coin,
                ctx,
            );
        };

        let artw_id_1: ID;
        let minter_balance_1 = minter_balance_0 - price_1; // 9 SUI (no network fees)

        ts::next_tx(&mut scen, addr_minter);
        {
            // verify that minter received Artwork #1
            let artwork = ts::take_from_sender<Artwork>(&scen);
            artw_id_1 = object::id(&artwork);
            ts::return_to_sender(&scen, artwork);

            // verify that the minter got charged
            let change_coin = ts::take_from_sender<Coin<SUI>>(&scen);
            assert!( minter_balance_1 == coin::value(&change_coin), 0 );
            ts::return_to_sender(&scen, change_coin);

            // verify that Collection got updated
            let expected_supply = 1; // increased
            let expected_number = 2; // increased
            let expected_price = price_2; // increased
            assert!( expected_supply == collection::supply(&mut coll), 0 );
            assert!( expected_number == collection::next_number(&mut coll), 0 );
            assert!( expected_price == collection::next_price(&mut coll), 0 );
        };

        // verify that pay_address got payed
        ts::next_tx(&mut scen, addr_publisher);
        {
            let change_coin = ts::take_from_sender<Coin<SUI>>(&scen);
            assert!( price_1 == coin::value(&change_coin), 0 );
            ts::return_to_sender(&scen, change_coin);
        };

        // Artwork #2

        // verify price increases
        assert!( price_2 == collection::next_price(&coll), 0 );
        assert!( price_2_discounted == collection::next_price_discounted(&coll), 0 );

        // mint Artwork #2
        ts::next_tx(&mut scen, addr_minter);
        {
            controller::mint_artwork_entry(
                &mut coll,
                addr_minter,
                ts::take_from_sender<Coin<SUI>>(&scen),
                ts::ctx(&mut scen),
            );
        };

        let artw_id_2: ID;
        let minter_balance_2 = minter_balance_1 - price_2; // 7.99 SUI (no network fees)

        ts::next_tx(&mut scen, addr_minter);
        {
            // verify that minter received Artwork #2
            let artwork = ts::take_from_sender<Artwork>(&scen);
            artw_id_2 = object::id(&artwork);
            assert!( artw_id_2 != artw_id_1, 0 );
            ts::return_to_sender(&scen, artwork);

            // verify that the minter got charged
            let change_coin = ts::take_from_sender<Coin<SUI>>(&scen);
            assert!( minter_balance_2 == coin::value(&change_coin), 0 );
            ts::return_to_sender(&scen, change_coin);

            // verify that Collection got updated
            let expected_supply = 2; // increased
            let expected_number = 3; // increased
            let expected_price = price_3; // increased
            assert!( expected_supply == collection::supply(&mut coll), 0 );
            assert!( expected_number == collection::next_number(&mut coll), 0 );
            assert!( expected_price == collection::next_price(&mut coll), 0 );
        };

        ts::next_tx(&mut scen, addr_publisher);
        {
            // verify that pay_address got payed
            let change_coin = ts::take_from_sender<Coin<SUI>>(&scen);
            assert!( price_2 == coin::value(&change_coin), 0 );
            ts::return_to_sender(&scen, change_coin);
        };

        // verify price increases
        assert!( price_3 == collection::next_price(&coll), 0 );
        assert!( price_3_discounted == collection::next_price_discounted(&coll), 0 );

        /* recycle Artwork #2 into #3 */

        ts::next_tx(&mut scen, addr_minter);
        {
            controller::recycle_artwork_entry(
                &mut coll,
                addr_minter,
                ts::take_from_sender<Coin<SUI>>(&scen),
                ts::take_from_sender<Artwork>(&scen),
                ts::ctx(&mut scen),
            );
        };

        let artw_id_3: ID;
        let minter_balance_3 = minter_balance_2 - price_3_discounted; // 8.899 SUI

        let tx_effects = ts::next_tx(&mut scen, addr_minter);
        {
            // verify that Artwork #2 was deleted
            let deleted_ids = ts::deleted(&tx_effects);
            assert!( vector::contains(&deleted_ids, &artw_id_2), 0);

            // verify that minter received a new Artwork
            let artwork = ts::take_from_sender<Artwork>(&scen);
            artw_id_3 = object::id(&artwork);
            assert!( artw_id_3 != artw_id_2 && artw_id_3 != artw_id_1, 0 );
            ts::return_to_sender(&scen, artwork);

            // verify that the minter got charged
            let change_coin = ts::take_from_sender<Coin<SUI>>(&scen);
            assert!( minter_balance_3 == coin::value(&change_coin), 0 );
            ts::return_to_sender(&scen, change_coin);

            // verify that Collection got updated
            let expected_supply = 2; // no change
            let expected_number = 4; // increased
            let expected_price = price_4; // increased
            assert!( expected_supply == collection::supply(&mut coll), 0 );
            assert!( expected_number == collection::next_number(&mut coll), 0 );
            assert!( expected_price == collection::next_price(&mut coll), 0 );
        };

        /* blend Artwork #1 with #3 */

        ts::next_tx(&mut scen, addr_minter);

        // grab the original first two Circles from each Artwork
        let artw_1_circ_0_old: Circle;
        let artw_1_circ_1_old: Circle;
        let artw_3_circ_0_old: Circle;
        let artw_3_circ_1_old: Circle;
        {
            let artw_1 = ts::take_from_sender_by_id<Artwork>(&scen, artw_id_1);
            let artw_3 = ts::take_from_sender_by_id<Artwork>(&scen, artw_id_3);
            let circles_1 = artwork::circles(&artw_1);
            let circles_3 = artwork::circles(&artw_3);

            artw_1_circ_0_old = *vector::borrow(circles_1, 0);
            artw_3_circ_0_old = *vector::borrow(circles_3, 0);
            artw_1_circ_1_old = *vector::borrow(circles_1, 1);
            artw_3_circ_1_old = *vector::borrow(circles_3, 1);

            ts::return_to_sender(&scen, artw_1);
            ts::return_to_sender(&scen, artw_3);
        };
        // swap the first two Circles
        ts::next_tx(&mut scen, addr_minter);
        {
            let artw_1 = ts::take_from_sender_by_id<Artwork>(&scen, artw_id_1);
            let artw_3 = ts::take_from_sender_by_id<Artwork>(&scen, artw_id_3);

            let swaps = vector[
                vector[0, 0], // 1st Circle of each Artwork
                vector[1, 1] //  2nd Circle of each Artwork
            ];
            controller::blend_artwork_entry(&mut artw_1, &mut artw_3, swaps);

            ts::return_to_sender(&scen, artw_1);
            ts::return_to_sender(&scen, artw_3);
        };
        // verify that the first two Circles have been swapped
        ts::next_tx(&mut scen, addr_minter);
        {
            let artw_1 = ts::take_from_sender_by_id<Artwork>(&scen, artw_id_1);
            let artw_3 = ts::take_from_sender_by_id<Artwork>(&scen, artw_id_3);
            let circles_1 = artwork::circles(&artw_1);
            let circles_3 = artwork::circles(&artw_3);

            let artw_1_circ_0_new = *vector::borrow(circles_1, 0);
            let artw_3_circ_0_new = *vector::borrow(circles_3, 0);
            let artw_1_circ_1_new = *vector::borrow(circles_1, 1);
            let artw_3_circ_1_new = *vector::borrow(circles_3, 1);
            assert!( artw_1_circ_0_new == artw_3_circ_0_old, 0 );
            assert!( artw_3_circ_0_new == artw_1_circ_0_old, 0 );
            assert!( artw_1_circ_1_new == artw_3_circ_1_old, 0 );
            assert!( artw_3_circ_1_new == artw_1_circ_1_old, 0 );

            ts::return_to_sender(&scen, artw_1);
            ts::return_to_sender(&scen, artw_3);
        };

        /* freeze Artwork #1 */
        ts::next_tx(&mut scen, addr_minter);
        {
            let artwork = ts::take_from_sender_by_id<Artwork>(&scen, artw_id_1);
            controller::freeze_artwork_entry(
                &mut artwork,
            );
            ts::return_to_sender(&scen, artwork);
        };
        ts::next_tx(&mut scen, addr_minter);
        {
            // verify that Artwork #2 was deleted
            let artwork = ts::take_from_sender_by_id<Artwork>(&scen, artw_id_1);
            assert!( artwork::frozen(&artwork) == true, 0 );
            ts::return_to_sender(&scen, artwork);
        };

        /* burn Artwork #3 */
        ts::next_tx(&mut scen, addr_minter);
        {
            let artwork = ts::take_from_sender_by_id<Artwork>(&scen, artw_id_3);
            controller::burn_artwork_entry(
                &mut coll,
                artwork,
            );
        };
        let tx_effects = ts::next_tx(&mut scen, addr_minter);
        {
            // verify that Artwork #3 was deleted
            let deleted_ids = ts::deleted(&tx_effects);
            assert!( vector::contains(&deleted_ids, &artw_id_3), 0);

            // verify that Collection got updated
            let expected_supply = 1; // decreased
            let expected_number = 4; // no change
            let expected_price = price_4; // no change
            assert!( expected_supply == collection::supply(&mut coll), 0 );
            assert!( expected_number == collection::next_number(&mut coll), 0 );
            assert!( expected_price == collection::next_price(&mut coll), 0 );
        };

        ts::return_shared(coll);
        ts::end(scen);
    }

}