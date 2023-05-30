module polymedia_circles::circles_conf
{
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    friend polymedia_circles::circles_art;

    /* Mint settings */
    const INITIAL_NUMBER: u64 = 1; // number of the first painting
    const INITIAL_PRICE: u64 = 1_000_000_000; // price of the first painting (1 SUI)
    const PRICE_INCREASE_BPS: u64 = 50; // basis points (0.5%)

    struct CirclesConf has key, store {
        id: UID,
        next_number: u64,
        next_price: u64,
        price_increase_bps: u64,
        pay_address: address, // TODO: multisig vault
    }

    fun new(
        initial_number: u64,
        initial_price: u64,
        price_increase_bps: u64,
        pay_address: address,
        ctx: &mut TxContext,
    ): CirclesConf
    {
        return CirclesConf {
            id: object::new(ctx),
            next_number: initial_number,
            next_price: initial_price,
            price_increase_bps,
            pay_address,
        }
    }

    // public entry fun mess_up(new_price: u64, ctx: &mut TxContext) {} // TODO test upgrade

    public(friend) fun increase(conf: &mut CirclesConf) {
        conf.next_number = conf.next_number + 1;
        conf.next_price = conf.next_price + ((conf.next_price * conf.price_increase_bps) / 10000);
    }

    /* Accessors */
    public(friend) fun next_number(conf: &CirclesConf): u64 {
        conf.next_number
    }
    public(friend) fun next_price(conf: &CirclesConf): u64 {
        conf.next_price
    }
    public(friend) fun price_increase_bps(conf: &CirclesConf): u64 {
        conf.price_increase_bps
    }
    public(friend) fun pay_address(conf: &CirclesConf): address {
        conf.pay_address
    }

    fun init(ctx: &mut TxContext)
    {
        transfer::public_share_object(new(
            INITIAL_NUMBER,
            INITIAL_PRICE,
            PRICE_INCREASE_BPS,
            tx_context::sender(ctx), // pay_address
            ctx
        ));
    }
}