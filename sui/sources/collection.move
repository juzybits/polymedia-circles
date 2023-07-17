/// A `Collection` shared object is the configuration for a collection of `Artwork` objects
module polymedia_circles::collection
{
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use polymedia_circles::whitelist::{Self, Whitelist};

    friend polymedia_circles::controller;

    /* Settings */
    const INITIAL_NUMBER: u64 = 1; // number of the first artwork
    const INITIAL_PRICE: u64 = 1_000_000_000; // price of the first artwork (1 SUI)
    const PRICE_INCREASE_BPS: u64 = 100; // basis points (1%)
    const DISCOUNT_DIVISOR: u64 = 10; // recycled Artwork costs 10% of Collection.next_price

    struct Collection has key, store {
        id: UID,
        supply: u64,
        next_number: u64,
        next_price: u64,
        pay_address: address, // TODO: multisig vault
        whitelist: Whitelist,
    }

    public(friend) fun increase_number(self: &mut Collection) {
        self.next_number = self.next_number + 1;
    }

    public(friend) fun increase_price(self: &mut Collection) {
        self.next_price = self.next_price + ((self.next_price * PRICE_INCREASE_BPS) / 10000);
    }

    public(friend) fun increase_supply(self: &mut Collection) {
        self.supply = self.supply + 1;
    }

    public(friend) fun decrease_supply(self: &mut Collection) {
        self.supply = self.supply - 1;
    }

    /* Accessors */
    public fun supply(self: &Collection): u64 {
        self.supply
    }
    public fun next_number(self: &Collection): u64 {
        self.next_number
    }
    public fun next_price(self: &Collection): u64 {
        self.next_price
    }
    public fun pay_address(self: &Collection): address {
        self.pay_address
    }
    public fun next_price_discounted(self: &Collection): u64 {
        self.next_price / DISCOUNT_DIVISOR
    }
    public fun price_increase_bps(): u64 {
        PRICE_INCREASE_BPS
    }
    public fun discount_divisor(): u64 {
        DISCOUNT_DIVISOR
    }

    fun init(ctx: &mut TxContext) // TODO: Publisher + Display
    {
        let whitelist = whitelist::create
        (
            vector[ // addresses that can mint
                @0xAAA,
                @0xBBB,
            ],
            vector[ // autographs for each address
                b"To my friend AAA",
                b"Hope you like it BBB",
            ],
            ctx,
        );
        transfer::public_share_object(Collection {
            id: object::new(ctx),
            supply: 0,
            next_number: INITIAL_NUMBER,
            next_price: INITIAL_PRICE,
            pay_address: tx_context::sender(ctx),
            whitelist,
        });
    }

    /* Testing */

    #[test_only]
    use sui::test_scenario::{Self as ts};

    #[test_only]
    friend polymedia_circles::controller_tests;

    #[test_only]
    public(friend) fun simulate_init(ctx: &mut TxContext) {
        init(ctx);
    }

    #[test]
    fun test_end_to_end()
    {
        let sender: address = @0x777;
        let scen = ts::begin(sender);
        let coll: Collection;

        // init()
        ts::next_tx(&mut scen, sender);
        {
            let ctx = ts::ctx(&mut scen);
            init(ctx);
        };
        // grab the newly created Collection
        ts::next_tx(&mut scen, sender);
        {
            coll = ts::take_shared<Collection>(&scen);
        };
        // verify initial Collection values
        ts::next_tx(&mut scen, sender);
        {
            assert!( 0 == supply(&mut coll), 0 );
            assert!( INITIAL_PRICE == next_price(&mut coll), 0 );
            assert!( INITIAL_NUMBER == next_number(&mut coll), 0 );
            assert!( sender == pay_address(&mut coll), 0 );
        };

        // increase supply+number+price
        ts::next_tx(&mut scen, sender);
        {
            increase_supply(&mut coll);
            increase_number(&mut coll);
            increase_price(&mut coll);
        };
        // verify increased supply+number+price
        ts::next_tx(&mut scen, sender);
        {
            let expected_supply = 1;
            let expected_number = INITIAL_NUMBER + 1;
            let expected_price = INITIAL_PRICE + ((INITIAL_PRICE * PRICE_INCREASE_BPS) / 10000);
            assert!( expected_supply == supply(&mut coll), 0 );
            assert!( expected_number == next_number(&mut coll), 0 );
            assert!( expected_price == next_price(&mut coll), 0 );
        };

        // decrease supply
        ts::next_tx(&mut scen, sender);
        {
            decrease_supply(&mut coll);
        };
        // verify decreased supply
        ts::next_tx(&mut scen, sender);
        {
            assert!( 0 == supply(&mut coll), 0 );
        };

        ts::return_shared(coll);
        ts::end(scen);
    }
}
