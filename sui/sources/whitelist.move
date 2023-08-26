/// Determines who can mint for free
module polymedia_circles::whitelist
{
    use std::vector::{Self};

    friend polymedia_circles::collection;
    friend polymedia_circles::controller;

    const E_LENGTH_MISMATCH: u64 = 2000;
    const E_NOT_WHITELISTED: u64 = 2001;

    struct Whitelist has store {
        addresses: vector<address>,
    }

    public(friend) fun create(
        whitelisted_addresses: vector<address>,
    ) : Whitelist {
        return Whitelist {
            addresses: whitelisted_addresses,
        }
    }

    public(friend) fun remove(
        self: &mut Whitelist,
        lookup_addr: address,
    ): bool {
        let len = vector::length(&self.addresses);
        let i = 0;
        while (i < len) {
            let addr = *vector::borrow(&self.addresses, i);
            if (addr == lookup_addr) {
                vector::remove(&mut self.addresses, i);
                return true
            };
            i = i + 1;
        };
        assert!(false, E_NOT_WHITELISTED);
        return false
    }
}
