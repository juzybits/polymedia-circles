/// Utility functions
module polymedia_circles::utils
{
    use std::vector::{Self};
    use sui::tx_context::{TxContext};
    use polymedia_circles::rand;

    friend polymedia_circles::artwork;
    friend polymedia_circles::circle;

    /// Return a random RGB color like `vector[100, 193, 255]`
    public(friend) fun random_rgb(ctx: &mut TxContext): vector<u8>
    {
        let red = 7 + (rand::rng(5, 9, ctx) * 31 as u8);
        let green = 7 + (rand::rng(5, 9, ctx) * 31 as u8);
        let blue = 7 + (rand::rng(5, 9, ctx) * 31 as u8);
        return vector[red, green, blue]
    }

    /// Convert `vector[100, 193, 255]` to "rgb(100,193,255)", URL-encoded
    public(friend) fun rgb_to_svg(rgb_color: &vector<u8>): vector<u8>
    {
        let red_bytes = u8_to_ascii(*vector::borrow(rgb_color, 0));
        let green_bytes = u8_to_ascii(*vector::borrow(rgb_color, 1));
        let blue_bytes = u8_to_ascii(*vector::borrow(rgb_color, 2));

        let color = b"rgb%28"; // "rgb("
        vector::append(&mut color, red_bytes);
        vector::append(&mut color, b"%2C"); // ","
        vector::append(&mut color, green_bytes);
        vector::append(&mut color, b"%2C"); // ","
        vector::append(&mut color, blue_bytes);
        vector::append(&mut color, b"%29"); // ")"

        return color
    }

    /// Convert a u64 number to its ASCII representation (vector of u8 characters)
    public(friend) fun u64_to_ascii(num: u64): vector<u8>
    {
        if (num == 0) {
            return b"0"
        };
        let bytes = vector::empty<u8>();
        while (num > 0) {
            let remainder = num % 10; // get the last digit
            num = num / 10; // remove the last digit
            vector::push_back(&mut bytes, (remainder as u8) + 48); // ASCII value of 0 is 48
        };
        vector::reverse(&mut bytes);
        return bytes
    }

    /// Convert a u8 number to its ASCII representation (vector of u8 characters)
    public(friend) fun u8_to_ascii(num: u8): vector<u8> {
        return u64_to_ascii((num as u64))
    }
}
