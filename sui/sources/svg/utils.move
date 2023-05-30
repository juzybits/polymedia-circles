module polymedia_svg::utils
{
    use std::vector::{Self};
    use sui::tx_context::{TxContext};
    use capsules::rand;

    /// Represent a number as a string (vector of u8 characters)
    public fun u64_to_bytes(num: u64): vector<u8>
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

    /// Return a random CSS color like "rgb(0,100,250)", URL-encoded
    public fun random_color(ctx: &mut TxContext): vector<u64>
    {
        let red_u64 = rand::rng(0, 6, ctx) * 50;
        let green_u64 = rand::rng(0, 6, ctx) * 50;
        let blue_u64 = rand::rng(0, 6, ctx) * 50;
        return vector[red_u64, green_u64, blue_u64]
    }

    public fun rgb_to_svg(rgb_color: &vector<u64>): vector<u8>
    {
        let red_bytes = u64_to_bytes(*vector::borrow(rgb_color, 0));
        let green_bytes = u64_to_bytes(*vector::borrow(rgb_color, 1));
        let blue_bytes = u64_to_bytes(*vector::borrow(rgb_color, 2));

        let color = b"rgb%28"; // "rgb("
        vector::append(&mut color, red_bytes);
        vector::append(&mut color, b"%2C"); // ","
        vector::append(&mut color, green_bytes);
        vector::append(&mut color, b"%2C"); // ","
        vector::append(&mut color, blue_bytes);
        vector::append(&mut color, b"%29"); // ")"

        return color
    }
}