/// `Circle` objects are always nested inside of an `Artwork` object
module polymedia_circles::circle
{
    use std::vector::{Self};
    use polymedia_circles::utils;

    friend polymedia_circles::artwork;
    #[test_only]
    friend polymedia_circles::circle_tests;

    struct Circle has store, copy, drop {
        red: u8,
        green: u8,
        blue: u8,
        radius: u64,
        x_axis: u64,
        y_axis: u64,
    }

    public(friend) fun new(rgb_color: &vector<u8>, radius: u64, x_axis: u64, y_axis: u64): Circle {
        let red = *vector::borrow(rgb_color, 0);
        let green = *vector::borrow(rgb_color, 1);
        let blue = *vector::borrow(rgb_color, 2);
        return Circle { red, green, blue, radius, x_axis, y_axis }
    }

    /// Represent a Circle as an SVG <circle> (URL-encoded).
    /// <circle cx="139" cy="402" r="204" fill="rgb(131,162,224)" stroke="black" stroke-width="6" />
    public(friend) fun to_svg(self: &Circle): vector<u8> {
        let svg = b"%3Ccircle%20r%3D%22"; // <circle r="
        vector::append(&mut svg, utils::u64_to_ascii(self.radius));
        vector::append(&mut svg, b"%22%20cx%3D%22"); // " cx="
        vector::append(&mut svg, utils::u64_to_ascii(self.x_axis));
        vector::append(&mut svg, b"%22%20cy%3D%22"); // " cy="
        vector::append(&mut svg, utils::u64_to_ascii(self.y_axis));
        vector::append(&mut svg, b"%22%20fill%3D%22"); // " fill="
        vector::append(&mut svg, utils::rgb_to_svg(&vector[self.red, self.green, self.blue]));
        vector::append(&mut svg, b"%22%20stroke%3D%22black%22%20stroke-width%3D%228%22%20%2F%3E"); // " stroke="black" stroke-width="6" />
        return svg
    }

    // Build the SVG representation of `circles` (URL-encoded)
    public(friend) fun vector_to_svg(circles: &vector<Circle>): vector<u8> {
        let svg = b"";
        let num_circles = vector::length(circles);
        let i = 0;
        while (i < num_circles) {
            vector::append(&mut svg, to_svg(vector::borrow(circles, i)));
            i = i + 1;
        };
        return svg
    }

    /// Sort a vector<Circle> from biggest to smallest using selection sort
    public(friend) fun sort_by_radius_desc(v: &mut vector<Circle>) {
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
    public fun red(self: &Circle): u8 {
        self.red
    }
    public fun green(self: &Circle): u8 {
        self.green
    }
    public fun blue(self: &Circle): u8 {
        self.blue
    }
    public fun radius(self: &Circle): u64 {
        self.radius
    }
    public fun x_axis(self: &Circle): u64 {
        self.x_axis
    }
    public fun y_axis(self: &Circle): u64 {
        self.y_axis
    }
}

#[test_only]
module polymedia_circles::circle_tests {
    use std::vector;
    use sui::test_scenario;
    use polymedia_circles::circle::{Self, Circle};

    fun make_circles(radii: &vector<u64>): vector<Circle>
    {
        let circles = vector::empty<Circle>();
        let i = 0;
        let len = vector::length(radii);
        while (i < len) {
            let radius = *vector::borrow(radii, i);
            let circle = circle::new(&vector[50,100,200], radius, 150, 150);
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
