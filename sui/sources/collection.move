/// A `Collection` is shared object that stores the configuration and shared state
/// of a series of `Artwork` owned objects.
module polymedia_circles::collection
{
    use std::string::{utf8};
    use std::vector::{Self};
    use sui::display;
    use sui::object::{Self, UID};
    use sui::package;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    friend polymedia_circles::controller;

    /* Settings */

    const INITIAL_NUMBER: u64 = 1; // number of the first artwork
    const INITIAL_PRICE: u64 = 1_000_000_000; // price of the first artwork (1 SUI)
    const PRICE_INCREASE_BPS: u64 = 100; // basis points (1%)
    const RECYCLED_DIVISOR: u64 = 10; // recycled Artwork costs 10% of Collection.next_price

    /* Structs */

    struct Collection has key, store {
        id: UID,
        supply: u64,
        next_number: u64,
        next_price: u64,
        pay_address: address, // TODO: multisig vault. AdminCap to change it.
        // addresses that can mint for free
        whitelist: vector<address>,
    }

    /* Functionality */

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

    /// Remove an address from the whitelist and return true, or return false if not whitelisted.
    public(friend) fun remove_from_whitelist(
        self: &mut Collection,
        lookup_addr: address
    ): bool {
        let len = vector::length(&self.whitelist);
        let i = 0;
        while (i < len) {
            let addr = *vector::borrow(&self.whitelist, i);
            if (addr == lookup_addr) {
                vector::remove(&mut self.whitelist, i);
                return true
            };
            i = i + 1;
        };
        return false
    }

    /* Collection accessors */

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
        self.next_price / RECYCLED_DIVISOR
    }
    public fun whitelist(self: &Collection): &vector<address> {
        &self.whitelist
    }

    /* Constant accessors (for controller_tests) */

    public(friend) fun price_increase_bps(): u64 {
        PRICE_INCREASE_BPS
    }
    public(friend) fun recycled_divisor(): u64 {
        RECYCLED_DIVISOR
    }

    /* Initialization */

    struct COLLECTION has drop {}

    fun init(otw: COLLECTION, ctx: &mut TxContext)
    {
        let sender = tx_context::sender(ctx);

        // Create and share the collection object
        let collection = Collection {
            id: object::new(ctx),
            supply: 0,
            next_number: INITIAL_NUMBER,
            next_price: INITIAL_PRICE,
            pay_address: sender,
            whitelist: vector[
                @0xAAA,
                @0xBBB,
            ],
        };
        transfer::public_share_object(collection);

        // Publisher and Display
        let publisher = package::claim(otw, ctx);
        let collection_display = display::new_with_fields<Collection>(
            &publisher,
            vector[
                utf8(b"name"),
                utf8(b"description"),
                utf8(b"link"),
                utf8(b"project_name"),
                utf8(b"project_url"),
                utf8(b"creator"),
                utf8(b"image_url"),
            ], vector[
                utf8(b"Polymedia Circles"), // name
                utf8(b"A generative art collection by Polymedia"), // description
                utf8(b"https://circles.polymedia.app"), // link
                utf8(b"Polymedia Circles"), // project_name
                utf8(b"https://circles.polymedia.app"), // project_url
                utf8(b"https://polymedia.app"), // creator
                /*
                <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="rgb(255 191 255)" />
                    <!-- cyan --> <circle cx="60" cy="540" r="180" fill="rgb(100,224,255)" stroke="black" stroke-width="5" />
                    <!-- yellow --> <circle cx="150" cy="110" r="100" fill="rgb(255,255,100)" stroke="black" stroke-width="5" />
                    <!-- green --> <circle cx="590" cy="440" r="115" fill="rgb(100,255,100)" stroke="black" stroke-width="5" />
                    <!-- red --> <circle  cx="510" cy="555" r="75" fill="rgb(255,100,100)" stroke="black" stroke-width="5" />
                    <!-- darkblue --> <circle cx="480" cy="120" r="52" fill="rgb(100,100,255)" stroke="black" stroke-width="5" />
                    <text x="51.5%" y="300" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="120" font-weight="bold">Circles.</text>
                    <text x="50%" y="350" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="30" font-weight="bold">by Polymedia</text>
                </svg>
                */
                utf8(b"data:image/svg+xml,%3Csvg%20width%3D%22600%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22rgb%28255%2C191%2C255%29%22%20%2F%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%22540%22%20r%3D%22180%22%20fill%3D%22rgb%28100%2C224%2C255%29%22%20stroke%3D%22black%22%20stroke-width%3D%225%22%20%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22110%22%20r%3D%22100%22%20fill%3D%22rgb%28255%2C255%2C100%29%22%20stroke%3D%22black%22%20stroke-width%3D%225%22%20%2F%3E%3Ccircle%20cx%3D%22590%22%20cy%3D%22440%22%20r%3D%22115%22%20fill%3D%22rgb%28100%2C255%2C100%29%22%20stroke%3D%22black%22%20stroke-width%3D%225%22%20%2F%3E%3Ccircle%20%20cx%3D%22510%22%20cy%3D%22555%22%20r%3D%2275%22%20fill%3D%22rgb%28255%2C100%2C100%29%22%20stroke%3D%22black%22%20stroke-width%3D%225%22%20%2F%3E%3Ccircle%20cx%3D%22480%22%20cy%3D%22120%22%20r%3D%2252%22%20fill%3D%22rgb%28100%2C100%2C255%29%22%20stroke%3D%22black%22%20stroke-width%3D%225%22%20%2F%3E%3Ctext%20x%3D%2251.5%25%22%20y%3D%22300%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22serif%22%20font-size%3D%22120%22%20font-weight%3D%22bold%22%3ECircles.%3C%2Ftext%3E%3Ctext%20x%3D%2250%25%22%20y%3D%22350%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22serif%22%20font-size%3D%2230%22%20font-weight%3D%22bold%22%3Eby%20Polymedia%3C%2Ftext%3E%3C%2Fsvg%3E"), // image_url
            ], ctx
        );
        display::update_version(&mut collection_display);
        transfer::public_transfer(collection_display, sender);
        transfer::public_transfer(publisher, sender);
    }

    /* Tests */

    #[test_only]
    use sui::test_scenario::{Self as ts};

    #[test_only]
    friend polymedia_circles::controller_tests;

    #[test_only]
    public(friend) fun simulate_init(ctx: &mut TxContext) {
        init(COLLECTION {}, ctx)
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
            init(COLLECTION {}, ctx);
        };
        // grab the newly created Collection
        ts::next_tx(&mut scen, sender);
        {
            coll = ts::take_shared<Collection>(&scen);
        };
        // verify initial Collection values
        ts::next_tx(&mut scen, sender);
        {
            assert!( 0 == supply(&coll), 0 );
            assert!( INITIAL_PRICE == next_price(&coll), 0 );
            assert!( INITIAL_NUMBER == next_number(&coll), 0 );
            assert!( sender == pay_address(&coll), 0 );
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
            assert!( expected_supply == supply(&coll), 0 );
            assert!( expected_number == next_number(&coll), 0 );
            assert!( expected_price == next_price(&coll), 0 );
        };

        // decrease supply
        ts::next_tx(&mut scen, sender);
        {
            decrease_supply(&mut coll);
        };
        // verify decreased supply
        ts::next_tx(&mut scen, sender);
        {
            assert!( 0 == supply(&coll), 0 );
        };

        ts::return_shared(coll);
        ts::end(scen);
    }
}
