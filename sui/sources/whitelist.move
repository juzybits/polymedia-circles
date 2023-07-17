/// Determines who can mint for free
module polymedia_circles::whitelist
{
    use std::string::{String, utf8};
    use std::vector::{Self};
    use sui::table::{Self, Table};
    use sui::tx_context::{TxContext};

    friend polymedia_circles::collection;
    friend polymedia_circles::controller;

    const E_LENGTH_MISMATCH: u64 = 2000;
    const E_NOT_WHITELISTED: u64 = 2001;

    struct Whitelist has store {
        // `address` is the person who can mint
        // `String` is an autograph by the artist
        claims: Table<address, String>,
    }

    public(friend) fun create(
        addresses: vector<address>,
        autographs: vector<vector<u8>>,
        ctx: &mut TxContext,
    ) : Whitelist {
        let length = vector::length(&addresses);
        assert!( length == vector::length(&autographs), E_LENGTH_MISMATCH );
        let claims = table::new(ctx);
        let index = 0;
        while ( index < length ) {
            let minter_address = vector::borrow(&addresses, index);
            let autograph = vector::borrow(&autographs, index);
            table::add(&mut claims, *minter_address, utf8(*autograph));
            index = index + 1;
        };
        return Whitelist {
            claims,
        }
    }

    public(friend) fun pop_autograph(
        self: &mut Whitelist,
        addr: address,
    ): String {
        assert!( table::contains(&self.claims, addr), E_NOT_WHITELISTED );
        let autograph = table::remove(&mut self.claims, addr);
        return autograph
    }
}
