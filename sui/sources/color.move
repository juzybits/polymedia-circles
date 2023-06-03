module polymedia_circles::color
{
    use std::vector::{Self};
    use sui::tx_context::{TxContext};
    use capsules::rand;
    use polymedia_circles::utils::{u8_to_bytes};

    friend polymedia_circles::artwork;
    friend polymedia_circles::circle;

    /// Return a random RGB color like `vector[100, 193, 255]`
    public(friend) fun random_rgb(ctx: &mut TxContext): vector<u8>
    {
        let red = 7 + (rand::rng(3, 9, ctx) * 31 as u8);
        let green = 7 + (rand::rng(3, 9, ctx) * 31 as u8);
        let blue = 7 + (rand::rng(3, 9, ctx) * 31 as u8);
        return vector[red, green, blue]
    }

    /// Convert `vector[100, 193, 255]` to "rgb(100,193,255)", URL-encoded
    public(friend) fun rgb_to_svg(rgb_color: &vector<u8>): vector<u8>
    {
        let red_bytes = u8_to_bytes(*vector::borrow(rgb_color, 0));
        let green_bytes = u8_to_bytes(*vector::borrow(rgb_color, 1));
        let blue_bytes = u8_to_bytes(*vector::borrow(rgb_color, 2));

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