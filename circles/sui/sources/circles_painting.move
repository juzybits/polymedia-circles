/// <svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
///     <rect width="100%" height="100%" fill="rgb(205,152,229)"></rect>
///     <circle r="248" cx="450" cy="397" fill="rgb(55,193,100)"></circle>
///     <circle r="197" cx="244" cy="284" fill="rgb(12,210,161)"></circle>
///     <circle r="195" cx="393" cy="282" fill="rgb(116,240,81)"></circle>
/// </svg>
module polymedia_circles::circles_painting
{
    use std::string::{String, utf8};
    use std::vector;
    use sui::display;
    use sui::object::{Self, UID};
    use sui::package;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use capsules::rand;
    use polymedia_svg::circle::{Self, Circle};
    use polymedia_svg::utils;

    const CANVAS_SIZE: u64 = 1000;
    const CIRCLE_MIN_RADIUS: u64 = 25;
    const CIRCLE_MAX_RADIUS: u64 = 450;
    const MIN_CIRCLES: u64 = 2;
    const MAX_CIRCLES: u64 = 7;

    struct CirclesPainting has key {
        id: UID,
        background_color: String,
        circles: vector<Circle>,
        image_url: String,
    }

    public fun mint(ctx: &mut TxContext): CirclesPainting
    {
        // Create `num_circles` `Circle` objects with random values
        let circles = vector::empty<Circle>();
        let num_circles = rand::rng(MIN_CIRCLES, MAX_CIRCLES+1, ctx);
        let i = 0;
        while (i < num_circles) {
            let color = utils::random_color(ctx);
            let radius = rand::rng(CIRCLE_MIN_RADIUS, CIRCLE_MAX_RADIUS+1, ctx);
            let x_axis = rand::rng(radius, CANVAS_SIZE - radius, ctx);
            let y_axis = rand::rng(radius, CANVAS_SIZE - radius, ctx);
            let circle = circle::new(color, radius, x_axis, y_axis);
            vector::push_back(&mut circles, circle);
            i = i + 1;
        };

        // Sort `circles` from biggest to smallest
        circle::sort_by_radius_desc(&mut circles);

        // Build the SVG representation of `circles` (URL-encoded)
        let svg = b"";
        let i = 0;
        while (i < num_circles) {
            vector::append(&mut svg, circle::to_svg(vector::borrow(&circles, i)));
            i = i + 1;
        };

        return CirclesPainting {
            id: object::new(ctx),
            background_color: utf8(utils::random_color(ctx)),
            circles,
            image_url: utf8(svg),
        }
    }

    public entry fun mint_and_transfer(recipient: address, ctx: &mut TxContext) {
        let painting = mint(ctx);
        transfer::transfer(painting, recipient);
    }

    public fun destroy(painting: CirclesPainting) {
        let CirclesPainting {id, background_color: _, circles: _, image_url: _} = painting;
        object::delete(id);
    }

    // public fun recycle(old: CirclesPainting): CirclesPainting { ... } // TODO
    // public fun merge(a: CirclesPainting, b: CirclesPainting, a_keep: vector<u64>, b_keep: vector<u64>): CirclesPainting { ... } // TODO

    // One-Time-Witness
    struct CIRCLES_PAINTING has drop {}

    fun init(otw: CIRCLES_PAINTING, ctx: &mut TxContext)
    {
        let publisher = package::claim(otw, ctx);
        let profile_display = display::new_with_fields<CirclesPainting>(
            &publisher,
            vector[
                utf8(b"name"),
                utf8(b"image_url"),
                utf8(b"description"),
                utf8(b"link"),
                utf8(b"creator"),
                utf8(b"project_name"),
                utf8(b"project_url"),
                utf8(b"project_image_url"),
            ], vector[
                utf8(b"Polymedia Circles v1 - {id}"), // name
                // Note that CANVAS_SIZE is hardcoded here.
                // data:image/svg+xml,<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="{background_color}"></rect>{image_url}</svg>
                utf8(b"data:image/svg+xml,%3Csvg%20width%3D%221000%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22{background_color}%22%3E%3C%2Frect%3E{image_url}%3C%2Fsvg%3E"), // image_url
                utf8(b"Generative art by Polymedia"), // description
                utf8(b"https://circles.polymedia.app/view/{id}"), // link // TODO
                utf8(b"https://polymedia.app"), // creator
                utf8(b"Polymedia Circles v1"), // project_name
                utf8(b"https://circles.polymedia.app"), // project_url
                utf8(b"https://circles.polymedia.app/img/project_image.png"), // project_image_url // TODO
            ], ctx
        );
        display::update_version(&mut profile_display);
        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(profile_display, tx_context::sender(ctx));
    }
}

/*
#[test_only]
module polymedia_circles::circles_painting_tests
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