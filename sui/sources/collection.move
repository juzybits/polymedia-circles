module polymedia_circles::collection
{
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    friend polymedia_circles::art;

    /* Mint settings */
    const INITIAL_NUMBER: u64 = 1; // number of the first painting
    const INITIAL_PRICE: u64 = 1_000_000_000; // price of the first painting (1 SUI)
    const PRICE_INCREASE_BPS: u64 = 50; // basis points (0.5%)

    struct Collection has key, store {
        id: UID,
        next_number: u64,
        next_price: u64,
        price_increase_bps: u64,
        pay_address: address, // TODO: multisig vault
    }

    public(friend) fun increase(conf: &mut Collection) {
        conf.next_number = conf.next_number + 1;
        conf.next_price = conf.next_price + ((conf.next_price * conf.price_increase_bps) / 10000);
    }

    /* Accessors */
    public fun next_number(conf: &Collection): u64 {
        conf.next_number
    }
    public fun next_price(conf: &Collection): u64 {
        conf.next_price
    }
    public fun price_increase_bps(conf: &Collection): u64 {
        conf.price_increase_bps
    }
    public fun pay_address(conf: &Collection): address {
        conf.pay_address
    }

    fun init(ctx: &mut TxContext)
    {
        transfer::public_share_object(Collection {
            id: object::new(ctx),
            next_number: INITIAL_NUMBER,
            next_price: INITIAL_PRICE,
            price_increase_bps: PRICE_INCREASE_BPS,
            pay_address: tx_context::sender(ctx),
        });
    }
}