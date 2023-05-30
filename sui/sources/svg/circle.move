module polymedia_svg::circle
{
    use std::string::{Self, String, utf8};
    use std::vector::{Self};
    use polymedia_svg::utils;

    struct Circle has store, copy, drop {
        color: String, // MAYBE store red/green/blue as u64s, to support dynamic features
        radius: u64,
        x_axis: u64,
        y_axis: u64,
    }

    public fun new(color: vector<u8>, radius: u64, x_axis: u64, y_axis: u64): Circle {
        Circle { color:utf8(color), radius, x_axis, y_axis }
    }

    /// Represent a Circle as an SVG <circle> (URL-encoded).
    /// <circle r="200" cx="50" cy="100" />
    public fun to_svg(circle: &Circle): vector<u8> {
        let svg = b"%3Ccircle%20r%3D%22"; // <circle r="
        vector::append(&mut svg, utils::u64_to_vector(circle.radius));
        vector::append(&mut svg, b"%22%20cx%3D%22"); // " cx="
        vector::append(&mut svg, utils::u64_to_vector(circle.x_axis));
        vector::append(&mut svg, b"%22%20cy%3D%22"); // " cy="
        vector::append(&mut svg, utils::u64_to_vector(circle.y_axis));
        vector::append(&mut svg, b"%22%20fill%3D%22"); // " fill="
        vector::append(&mut svg, *string::bytes(&circle.color));
        vector::append(&mut svg, b"%22%3E%3C%2Fcircle%3E"); // "></circle>
        return svg
    }

    /// Sort a vector<Circle> from biggest to smallest using selection sort
    public fun sort_by_radius_desc(v: &mut vector<Circle>) {
        let n = vector::length(v);
        let i = 0;
        while (i < n) {
            let biggest = i;
            let j = i + 1;
            while (j < n) {
                if ((*vector::borrow(v, j)).radius > (*vector::borrow(v, biggest)).radius) {
                    biggest = j;
                };
                j = j + 1;
            };
            if (biggest != i) {
                vector::swap(v, i, biggest);
            };
            i = i + 1;
        }
    }

    /* Accessors */
    public fun color(circle: &Circle): String {
        circle.color
    }
    public fun radius(circle: &Circle): u64 {
        circle.radius
    }
    public fun x_axis(circle: &Circle): u64 {
        circle.x_axis
    }
    public fun y_axis(circle: &Circle): u64 {
        circle.y_axis
    }
}

#[test_only]
module polymedia_svg::circle_tests {
    use std::vector;
    use sui::test_scenario;
    use polymedia_svg::circle::{Self, Circle};

    fun make_circles(radii: &vector<u64>): vector<Circle>
    {
        let circles = vector::empty<Circle>();
        let i = 0;
        let len = vector::length(radii);
        while (i < len) {
            let radius = *vector::borrow(radii, i);
            let circle = circle::new(b"rgb(50,100,200)", radius, 150, 150);
            vector::push_back(&mut circles, circle);
            i = i + 1
        };
        return circles
    }

    #[test]
    fun test_sort_by_radius_desc()
    {
        let sender: address = @0x777;
        let scenario = test_scenario::begin(sender);

        let circles = make_circles(&vector[30,50,40,60,30,70,10]);
        circle::sort_by_radius_desc(&mut circles);
        assert!( circle::radius(vector::borrow(&circles, 0)) == 70, 0 );
        assert!( circle::radius(vector::borrow(&circles, 1)) == 60, 0 );
        assert!( circle::radius(vector::borrow(&circles, 2)) == 50, 0 );
        assert!( circle::radius(vector::borrow(&circles, 3)) == 40, 0 );
        assert!( circle::radius(vector::borrow(&circles, 4)) == 30, 0 );
        assert!( circle::radius(vector::borrow(&circles, 5)) == 30, 0 );
        assert!( circle::radius(vector::borrow(&circles, 6)) == 10, 0 );

        test_scenario::end(scenario);
    }
}