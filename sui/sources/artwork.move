/// <svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
///     <rect width="100%" height="100%" fill="rgb(205,152,229)"></rect>
///     <circle r="248" cx="450" cy="397" fill="rgb(55,193,100)"></circle>
///     <circle r="197" cx="244" cy="284" fill="rgb(12,210,161)"></circle>
///     <circle r="195" cx="393" cy="282" fill="rgb(116,240,81)"></circle>
/// </svg>
module polymedia_circles::artwork
{
    use std::string::{String, utf8};
    use std::vector;
    use sui::display;
    use sui::object::{Self, UID};
    use sui::package;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use capsules::rand;
    use polymedia_circles::circle::{Self, Circle};
    use polymedia_circles::color;

    friend polymedia_circles::controller;

    /* Artwork settings */
    const CANVAS_SIZE: u64 = 1000;
    const CIRCLE_MIN_RADIUS: u64 = 42;
    const CIRCLE_MAX_RADIUS: u64 = 420;
    const MIN_CIRCLES: u64 = 2;
    const MAX_CIRCLES: u64 = 5;

    /* Errors */
    const E_WRONG_AMOUNT: u64 = 1000;

    /* Structs */

    struct Artwork has key, store {
        id: UID,
        number: u64,
        background_color: String,
        circles: vector<Circle>,
        svg: String,
    }

    public(friend) fun create(
        number: u64,
        ctx: &mut TxContext,
    ): Artwork {
        // Create `num_circles` `Circle` objects with random values
        let circles = vector::empty<Circle>();
        let num_circles = rand::rng(MIN_CIRCLES, MAX_CIRCLES+1, ctx);
        let i = 0;
        while (i < num_circles) {
            let rgb_color = color::random_rgb(ctx);
            let radius = rand::rng(CIRCLE_MIN_RADIUS, CIRCLE_MAX_RADIUS+1, ctx);
            let x_axis = rand::rng(radius/2, CANVAS_SIZE - radius/2, ctx);
            let y_axis = rand::rng(radius/2, CANVAS_SIZE - radius/2, ctx);
            let circle = circle::new(&rgb_color, radius, x_axis, y_axis);
            vector::push_back(&mut circles, circle);
            i = i + 1;
        };

        // Sort `circles` from biggest to smallest
        circle::sort_by_radius_desc(&mut circles);

        return Artwork {
            id: object::new(ctx),
            number,
            background_color: utf8(color::rgb_to_svg(&color::random_rgb(ctx))),
            circles,
            svg: utf8(circle::vector_to_svg(&circles)),
        }
    }

    public(friend) fun destroy(
        self: Artwork,
    ) {
        let Artwork {id, number: _, background_color: _, circles: _, svg: _} = self;
        object::delete(id);
    }

    public(friend) fun set_circles(
        self: &mut Artwork,
        circles: vector<Circle>,
    ) {
        // Sort `circles` from biggest to smallest
        circle::sort_by_radius_desc(&mut circles);
        // Replace Artwork.circles
        self.circles = circles;
        // Update SVG representation
        self.svg = utf8(circle::vector_to_svg(&circles));
    }

    /* Accessors */
    public fun number(self: &Artwork): u64 {
        self.number
    }
    public fun background_color(self: &Artwork): &String {
        &self.background_color
    }
    public fun circles(self: &Artwork): &vector<Circle> {
        &self.circles
    }
    public fun svg(self: &Artwork): &String {
        &self.svg
    }

    // One-Time-Witness
    struct ARTWORK has drop {}

    fun init(otw: ARTWORK, ctx: &mut TxContext)
    {
        let publisher = package::claim(otw, ctx);
        let profile_display = display::new_with_fields<Artwork>(
            &publisher,
            vector[
                utf8(b"name"),
                utf8(b"image_url"),
                utf8(b"description"),
                utf8(b"link"),
                utf8(b"creator"),
                utf8(b"project_name"),
            ], vector[
                utf8(b"Polymedia Circles #{number}"), // name
                // Note that CANVAS_SIZE is hardcoded here.
                // data:image/svg+xml,<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="{background_color}"></rect>{svg}<text x="989" y="987" font-family="monospace" font-size="20" fill="white" text-anchor="end">Polymedia Circles #{number}</text><rect width="100%" height="100%" fill="none" stroke="black" stroke-width="12" /></svg>
                utf8(b"data:image/svg+xml,%3Csvg%20width%3D%221000%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22{background_color}%22%3E%3C%2Frect%3E{svg}%3Ctext%20x%3D%22989%22%20y%3D%22987%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20fill%3D%22white%22%20text-anchor%3D%22end%22%3EPolymedia%20Circles%20%23{number}%3C%2Ftext%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22none%22%20stroke%3D%22black%22%20stroke-width%3D%2212%22%20%2F%3E%3C%2Fsvg%3E"), // image_url
                utf8(b"Generative art by Polymedia"), // description
                utf8(b"https://circles.polymedia.app/view/{id}"), // link
                utf8(b"https://polymedia.app"), // creator
                utf8(b"Polymedia Circles"), // project_name
            ], ctx
        );
        display::update_version(&mut profile_display);
        transfer::public_transfer(profile_display, tx_context::sender(ctx));
        transfer::public_transfer(publisher, tx_context::sender(ctx));
    }

    /* Testing */

    #[test_only]
    use sui::test_scenario::{Self as ts};
    #[test_only]
    use std::string;

    #[test_only]
    fun assert_starts_with(search: vector<u8>, str: &String)
    {
        let len = vector::length(&search);
        assert!( utf8(search) == string::sub_string(str, 0, len) , 0 );
    }

    #[test]
    fun test_end_to_end()
    {
        let sender: address = @0x777;
        let scen = ts::begin(sender);
        let ctx = ts::ctx(&mut scen);

        let artw = create(55, ctx);

        assert!( 55 == number(&artw), 0 );

        assert_starts_with( b"rgb%28", background_color(&artw) );

        let circles_len = vector::length( circles(&artw) );
        assert!( circles_len >= MIN_CIRCLES && circles_len <= MAX_CIRCLES , 0 );

        assert_starts_with( b"%3Ccircle%20", svg(&artw) );

        destroy(artw);

        ts::end(scen);
    }
}


/*
#[test_only]
module polymedia_circles::circles_art_tests
{
    use std::debug;
    use sui::test_scenario;
    use capsules::rand;

    #[test]
    fun test_foo()
    {
        let sender: address = @0x777;
        let scenario = test_scenario::begin(sender);
        let ctx = test_scenario::ctx(&mut scenario);
        let nums = 100;
        let i = 0;
        while (i < nums) {
            i = i + 1;
            let r = rand::rng(1, 8, ctx);
            debug::print(&r);
        };
        test_scenario::end(scenario);
    }
}
*/