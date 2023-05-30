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
        supply: u64,
        next_number: u64,
        next_price: u64,
        price_increase_bps: u64,
        pay_address: address, // TODO: multisig vault
    }

    public(friend) fun add_one(self: &mut Collection) {
        self.supply = self.supply + 1;
        self.next_number = self.next_number + 1;
        self.next_price = self.next_price + ((self.next_price * self.price_increase_bps) / 10000);
    }

    public(friend) fun delete_one(self: &mut Collection) {
        self.supply = self.supply - 1;
    }

    /* Accessors */
    public fun next_number(self: &Collection): u64 {
        self.next_number
    }
    public fun next_price(self: &Collection): u64 {
        self.next_price
    }
    public fun price_increase_bps(self: &Collection): u64 {
        self.price_increase_bps
    }
    public fun pay_address(self: &Collection): address {
        self.pay_address
    }

    fun init(ctx: &mut TxContext)
    {
        transfer::public_share_object(Collection {
            id: object::new(ctx),
            supply: 0,
            next_number: INITIAL_NUMBER,
            next_price: INITIAL_PRICE,
            price_increase_bps: PRICE_INCREASE_BPS,
            pay_address: tx_context::sender(ctx),
        });
    }
}