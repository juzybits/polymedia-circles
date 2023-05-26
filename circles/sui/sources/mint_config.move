module polymedia_circles::mint_config
{
    use sui::object::{Self, UID};
    use sui::tx_context::{TxContext};

    friend polymedia_circles::circles_painting;

    struct MintConfig has key, store {
        id: UID,
        next_number: u64,
        next_price: u64,
        price_increase_bps: u64,
        pay_address: address, // MAYBE: use vector<address>
    }

    public fun new(
        initial_number: u64,
        initial_price: u64,
        price_increase_bps: u64,
        pay_address: address,
        ctx: &mut TxContext,
    ): MintConfig
    {
        return MintConfig {
            id: object::new(ctx),
            next_number: initial_number,
            next_price: initial_price,
            price_increase_bps,
            pay_address,
        }
    }

    public(friend) fun increase(conf: &mut MintConfig) {
        conf.next_number = conf.next_number + 1;
        conf.next_price = conf.next_price + ((conf.next_price * conf.price_increase_bps) / 10000);
    }

    /* Accessors */
    public fun next_number(conf: &MintConfig): u64 {
        conf.next_number
    }
    public fun next_price(conf: &MintConfig): u64 {
        conf.next_price
    }
    public fun price_increase_bps(conf: &MintConfig): u64 {
        conf.price_increase_bps
    }
    public fun pay_address(conf: &MintConfig): address {
        conf.pay_address
    }
}