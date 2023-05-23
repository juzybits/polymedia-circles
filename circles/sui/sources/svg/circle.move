module polymedia_svg::circle
{
    use std::string::{Self, String, utf8};
    use std::vector::{Self};
    use polymedia_svg::utils;

    struct Circle has store, copy, drop {
        color: String,
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
}