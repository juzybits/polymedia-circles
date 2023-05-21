module polymedia_circles::circles_painting
{
    use std::string::{String, utf8};
    use std::vector;
    use sui::display::{Self};
    use sui::object::{Self, UID};
    use sui::package::{Self};
    use sui::transfer::{Self};
    use sui::tx_context::{Self, TxContext};
    use capsules::rand;
    use polymedia_svg::circle::{Self, Circle};

    const CANVAS_SIZE: u64 = 800;
    const CIRCLE_MIN_RADIUS: u64 = 25;
    const CIRCLE_MAX_RADIUS: u64 = 251;
    const MIN_CIRCLES: u64 = 1;
    const MAX_CIRCLES: u64 = 7;

    struct CirclesPainting has key {
        id: UID,
        circles: vector<Circle>,
        image_url: String,
    }

    fun u64_to_str(num: u64): vector<u8>
    {
        let bytes = vector::empty<u8>();
        while (num > 0) {
            let remainder = num % 10; // get the last digit
            num = num / 10; // remove the last digit
            vector::push_back(&mut bytes, (remainder as u8) + 48); // ASCII value of 0 is 48
        };
        vector::reverse(&mut bytes);
        return bytes
    }

    fun random_color(ctx: &mut TxContext): vector<u8>
    {
        let red_u64 = rand::rng(0, 256, ctx);
        let green_u64 = rand::rng(0, 256, ctx);
        let blue_u64 = rand::rng(0, 256, ctx);
        let red_bytes = u64_to_str(red_u64);
        let green_bytes = u64_to_str(green_u64);
        let blue_bytes = u64_to_str(blue_u64);

        let color = b"rgb%28"; // "rgb("
        vector::append(&mut color, red_bytes);
        vector::append(&mut color, b"%2C"); // ","
        vector::append(&mut color, green_bytes);
        vector::append(&mut color, b"%2C"); // ","
        vector::append(&mut color, blue_bytes);
        vector::append(&mut color, b"%29"); // ")"

        return color
    }

    /// <svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
    ///     <rect width="100%" height="100%" fill="rgb(205,152,229)"></rect>
    ///     <circle cx="450" cy="397" r="248" fill="rgb(55,193,100)"></circle>
    ///     <circle cx="244" cy="284" r="197" fill="rgb(12,210,161)"></circle>
    ///     <circle cx="393" cy="282" r="195" fill="rgb(116,240,81)"></circle>
    /// </svg>
    public fun mint(ctx: &mut TxContext): CirclesPainting
    {
        // Note how CANVAS_SIZE is hardcoded here to save computation
        // data:image/svg+xml,<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="
        let svg = b"data:image/svg+xml,%3Csvg%20width%3D%22800%22%20height%3D%22800%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22";
        // background color
        vector::append(&mut svg, random_color(ctx));
        // "></rect>
        vector::append(&mut svg, b"%22%3E%3C%2Frect%3E");

        let circles = vector::empty<Circle>();
        let num_circles = rand::rng(MIN_CIRCLES, MAX_CIRCLES+1, ctx);
        let i = 0;
        while (i < num_circles) {
            i = i + 1;
            let color = random_color(ctx);
            let radius = rand::rng(CIRCLE_MIN_RADIUS, CIRCLE_MAX_RADIUS, ctx);
            let x_axis = rand::rng(radius, CANVAS_SIZE - radius, ctx);
            let y_axis = rand::rng(radius, CANVAS_SIZE - radius, ctx);
            let circle = circle::new(color, radius, x_axis, y_axis);
            vector::push_back(&mut circles, circle);

            let radius_bytes = u64_to_str(radius);
            let x_axis_bytes = u64_to_str(x_axis);
            let y_axis_bytes = u64_to_str(y_axis);
            vector::append(&mut svg, b"%3Ccircle%20r%3D%22"); // <circle r="
            vector::append(&mut svg, radius_bytes);
            vector::append(&mut svg, b"%22%20cx%3D%22"); // " cx="
            vector::append(&mut svg, x_axis_bytes);
            vector::append(&mut svg, b"%22%20cy%3D%22"); // " cy="
            vector::append(&mut svg, y_axis_bytes);
            vector::append(&mut svg, b"%22%20fill%3D%22"); // " fill="
            vector::append(&mut svg, color);
            vector::append(&mut svg, b"%22%3E%3C%2Fcircle%3E"); // "></circle>
        };
        vector::append(&mut svg, b"%3C%2Fsvg%3E"); // </svg>
        return CirclesPainting {
            id: object::new(ctx),
            circles,
            image_url: utf8(svg),
        }
    }

    public entry fun mint_and_transfer(recipient: address, ctx: &mut TxContext) {
        let painting = mint(ctx);
        transfer::transfer(painting, recipient);
    }

    public fun destroy(painting: CirclesPainting) {
        let CirclesPainting {id, circles: _, image_url: _} = painting;
        object::delete(id);
    }

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
                utf8(b"Polymedia Circles - {id}"), // name
                utf8(b"{image_url}"), // image_url
                utf8(b"Generative art by Polymedia"), // description
                utf8(b"https://circles.polymedia.app/view/{id}"), // link
                utf8(b"https://polymedia.app"), // creator
                utf8(b"Polymedia Circles"), // project_name
                utf8(b"https://circles.polymedia.app"), // project_url
                utf8(b"https://circles.polymedia.app/img/project_image.png"), // project_image_url
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