module polymedia_circles::utils
{
    use std::vector::{Self};

    friend polymedia_circles::circle;
    friend polymedia_circles::color;

    /// Represent a number as a string (vector of u8 characters)
    public(friend) fun u64_to_bytes(num: u64): vector<u8>
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
    public(friend) fun u8_to_bytes(num: u8): vector<u8> {
        return u64_to_bytes((num as u64))
    }
}