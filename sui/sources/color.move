module polymedia_svg::color
{
    use std::vector::{Self};
    use sui::tx_context::{TxContext};
    use capsules::rand;
    use polymedia_svg::utils::{u8_to_bytes};

    /// Return a random RGB color like `vector[0, 100, 250]`
    public fun random_rgb(ctx: &mut TxContext): vector<u8>
    {
        let red = (rand::rng(0, 6, ctx) * 50 as u8);
        let green = (rand::rng(0, 6, ctx) * 50 as u8);
        let blue = (rand::rng(0, 6, ctx) * 50 as u8);
        return vector[red, green, blue]
    }

    /// Convert `vector[0, 100, 250]` to "rgb(0,100,250)", URL-encoded
    public fun rgb_to_svg(rgb_color: &vector<u8>): vector<u8>
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