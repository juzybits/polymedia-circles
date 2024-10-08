/// `Artwork` owned objects are the collectible items that users can mint.
module polymedia_circles::artwork
{
    use std::string::{String, utf8};
    use std::vector;
    use sui::display;
    use sui::object::{Self, UID};
    use sui::package;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use polymedia_circles::circle::{Self, Circle};
    use polymedia_circles::rand;
    use polymedia_circles::utils;

    friend polymedia_circles::controller;

    /* Settings */

    const CANVAS_SIZE: u64 = 1000;
    const MIN_CIRCLES: u64 = 3;
    const MAX_CIRCLES: u64 = 7;
    const CIRCLE_MIN_RADIUS: u64 = 50;
    const CIRCLE_MAX_RADIUS: u64 = 450;
    const STEPS: u64 = 8;

    /* Structs */

    struct Artwork has key, store {
        id: UID,
        number: u64,
        background_color: String,
        circles: vector<Circle>,
        svg: String,
        frozen: bool,
        // time_created: u64, // MAYBE
    }

    /* Core functionality */

    public(friend) fun create(
        number: u64,
        ctx: &mut TxContext,
    ): Artwork {
        // Create `num_circles` `Circle` objects with random values
        let circles = vector::empty<Circle>();
        let num_circles = rand::rng(MIN_CIRCLES, MAX_CIRCLES+1, ctx);
        let i = 0;
        while (i < num_circles) {
            let rgb_color = utils::random_rgb(ctx);
            let radius = random_step(CIRCLE_MIN_RADIUS, CIRCLE_MAX_RADIUS, STEPS, ctx);
            let x_axis = random_step(0, CANVAS_SIZE, STEPS, ctx);
            let y_axis = random_step(0, CANVAS_SIZE, STEPS, ctx);
            let circle = circle::new(&rgb_color, radius, x_axis, y_axis);
            vector::push_back(&mut circles, circle);
            i = i + 1;
        };

        // Sort `circles` from biggest to smallest
        circle::sort_by_radius_desc(&mut circles);

        return Artwork {
            id: object::new(ctx),
            number,
            background_color: utf8(utils::rgb_to_svg(&utils::random_rgb(ctx))),
            circles,
            svg: utf8(circle::vector_to_svg(&circles)),
            frozen: false,
        }
    }

    public(friend) fun freezee( // ("freeze" is a reserved word)
        self: &mut Artwork,
    ) {
        self.frozen = true;
    }

    public(friend) fun destroy(
        self: Artwork,
    ) {
        let Artwork {
            id,
            number: _,
            background_color: _,
            circles: _,
            svg: _,
            frozen: _,
        } = self;
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

    /* Helpers */

    fun random_step(min_val: u64, max_val: u64, steps: u64, ctx: &mut TxContext): u64 {
        let step_position = rand::rng(0, steps+1, ctx);
        let step_size = (max_val - min_val) / steps;
        let value = min_val + step_position * step_size;
        return value
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
    public fun frozen(self: &Artwork): bool {
        self.frozen
    }

    /* Initialization */

    struct ARTWORK has drop {}

    #[allow(unused_function)]
    fun init(otw: ARTWORK, ctx: &mut TxContext)
    {
        let sender = tx_context::sender(ctx);
        let publisher = package::claim(otw, ctx);
        let profile_display = display::new_with_fields<Artwork>(
            &publisher,
            vector[
                utf8(b"image_url"),
                utf8(b"name"),
                utf8(b"description"),
                utf8(b"link"),
                utf8(b"project_name"),
                utf8(b"project_url"),
                utf8(b"creator"),
            ], vector[
                // Note that CANVAS_SIZE is hardcoded here.
                // data:image/svg+xml,<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="{background_color}"></rect>{svg}<text x="984" y="984" font-family="monospace" font-size="22" fill="white" text-anchor="end">Polymedia Circles #{number}</text></svg>
                utf8(b"data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201000%201000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22{background_color}%22%3E%3C%2Frect%3E{svg}%3Ctext%20x%3D%22984%22%20y%3D%22984%22%20font-family%3D%22monospace%22%20font-size%3D%2222%22%20fill%3D%22white%22%20text-anchor%3D%22end%22%3EPolymedia%20Circles%20%23{number}%3C%2Ftext%3E%3C%2Fsvg%3E"), // image_url
                utf8(b"Polymedia Circles #{number}"), // name
                utf8(b"Generative art by Polymedia"), // description
                utf8(b"https://circles.polymedia.app/art/{id}"), // link
                utf8(b"Polymedia Circles"), // project_name
                utf8(b"https://circles.polymedia.app"), // project_url
                utf8(b"https://polymedia.app"), // creator
            ], ctx
        );
        display::update_version(&mut profile_display);
        transfer::public_transfer(profile_display, sender);
        transfer::public_transfer(publisher, sender);
    }

    /* Tests */

    #[test_only]
    use sui::test_scenario::{Self as ts};
    #[test_only]
    use std::string;

    #[test_only]
    fun assert_starts_with(search: vector<u8>, str: &String)
    {
        let len = vector::length(&search);
        assert!( utf8(search) == string::substring(str, 0, len) , 0 );
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
    use polymedia_circles::rand;

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
