module polymedia_svg::circle
{
    use std::string::{String, utf8};
    use std::vector::{Self};

    struct Circle has store, copy, drop {
        color: String,
        radius: u64,
        x_axis: u64,
        y_axis: u64,
    }

    public fun new(color: vector<u8>, radius: u64, x_axis: u64, y_axis: u64): Circle {
        Circle { color:utf8(color), radius, x_axis, y_axis }
    }

    /// <circle cx="50" cy="100" r="200" />
    public fun print(_circle: &Circle): vector<u8> {
        let text = b"<circle cx=\"";
        vector::append(&mut text, b"50"); // TODO cast 50 to b"50"
        vector::append(&mut text, b"\" cy=\"100\" r=\"200\" />");
        text
    }
}