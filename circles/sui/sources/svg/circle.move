module polymedia_svg::circle
{
    use std::vector::{Self};

    struct Circle has store, copy, drop {
        cx: u16,
        cy: u16,
        r: u16,
    }

    public fun new(cx: u16, cy: u16, r: u16): Circle {
        Circle { cx, cy, r }
    }

    /// <circle cx="50" cy="100" r="200" />
    public fun print(_circle: &Circle): vector<u8> {
        let text = b"<circle cx=\"";
        vector::append(&mut text, b"50"); // TODO cast 50 to b"50"
        vector::append(&mut text, b"\" cy=\"100\" r=\"200\" />");
        text
    }
}