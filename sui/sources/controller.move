module polymedia_circles::controller // TODO: emit events. TODO: write tests.
{
    use std::vector;
    use sui::coin::{Self, Coin};
    use sui::sui::{SUI};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use polymedia_circles::artwork::{Self, Artwork};
    use polymedia_circles::collection::{Self, Collection};

    fun take_payment(
        pay_coin: Coin<SUI>,
        price: u64,
        pay_address: address,
        ctx: &mut TxContext,
    ) {
        let exact_coin = coin::split(&mut pay_coin, price, ctx);
        if (coin::value(&pay_coin) > 0) { // return change to sender
            transfer::public_transfer(pay_coin, tx_context::sender(ctx));
        } else { // destroy empty coin
            coin::destroy_zero(pay_coin);
        };
        transfer::public_transfer(
            exact_coin,
            pay_address,
        );
    }

    public fun mint(
        collection: &mut Collection,
        pay_coin: Coin<SUI>,
        ctx: &mut TxContext
    ): Artwork
    {
        take_payment(
            pay_coin,
            collection::next_price(collection), // full price
            collection::pay_address(collection),
            ctx
        );
        let artwork = artwork::create(collection::next_number(collection), ctx);
        collection::increase_supply(collection);
        collection::increase_number(collection);
        collection::increase_price(collection);
        return artwork
    }

    /// Burn an existing `Artwork` and mint a new one at a discounted price (10%)
    public fun recycle(
        collection: &mut Collection,
        pay_coin: Coin<SUI>,
        artwork: Artwork,
        ctx: &mut TxContext,
    ): Artwork {
        take_payment(
            pay_coin,
            collection::next_price(collection) / 10, // discounted price
            collection::pay_address(collection),
            ctx
        );
        burn(collection, artwork);
        let artwork = artwork::create(collection::next_number(collection), ctx);
        collection::increase_number(collection);
        collection::increase_price(collection);
        return artwork
    }

    const E_WRONG_SWAP_LENGTH: u64 = 1000;
    const E_WRONG_SWAP_INDEX: u64 = 1001;
    public fun swap(
        a: &mut Artwork,
        b: &mut Artwork,
        swaps: vector<vector<u64>>,
    ) {
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
    }

    public fun burn(
        collection: &mut Collection,
        artwork: Artwork
    ) {
        artwork::destroy(artwork);
        collection::decrease_supply(collection);
    }

    public entry fun mint_and_transfer(
        collection: &mut Collection,
        recipient: address,
        pay_coin: Coin<SUI>,
        ctx: &mut TxContext,
        )
    {
        let artwork = mint(collection, pay_coin, ctx);
        transfer::public_transfer(artwork, recipient);
    }

    public entry fun recycle_and_transfer(
        collection: &mut Collection,
        recipient: address,
        pay_coin: Coin<SUI>,
        recycle: Artwork,
        ctx: &mut TxContext,
    ) {
        let artwork = recycle(collection, pay_coin, recycle, ctx);
        transfer::public_transfer(artwork, recipient);
    }
}
