module polymedia_circles::mint
{
    use sui::coin::{Self, Coin};
    use sui::sui::{SUI};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use polymedia_circles::collection::{Self, Collection};
    use polymedia_circles::artwork::{Self, Artwork};

    fun take_payment(
        pay_coin: Coin<SUI>,
        price: u64,
        pay_address: address,
        ctx: &mut TxContext,
    ) {
        let exact_coin = coin::split(&mut pay_coin, price, ctx);
        if (coin::value(&pay_coin) > 0) { // return change to sender
            transfer::public_transfer(pay_coin, tx_context::sender(ctx));
        } else { // destroy empty coin
            coin::destroy_zero(pay_coin);
        };
        transfer::public_transfer(
            exact_coin,
            pay_address,
        );
    }

    public fun mint(
        collection: &mut Collection,
        pay_coin: Coin<SUI>,
        ctx: &mut TxContext
    ): Artwork
    {
        take_payment(
            pay_coin,
            collection::next_price(collection), // full price
            collection::pay_address(collection),
            ctx
        );
        let artwork = artwork::create(collection::next_number(collection), ctx);
        collection::increase_supply(collection);
        collection::increase_number(collection);
        collection::increase_price(collection);
        return artwork
    }

    /// Burn an existing `Artwork` and mint a new one at a discounted price (10%)
    public fun recycle(
        collection: &mut Collection,
        pay_coin: Coin<SUI>,
        artwork: Artwork,
        ctx: &mut TxContext,
    ): Artwork {
        take_payment(
            pay_coin,
            collection::next_price(collection) / 10, // discounted price
            collection::pay_address(collection),
            ctx
        );
        burn(collection, artwork);
        let artwork = artwork::create(collection::next_number(collection), ctx);
        collection::increase_number(collection);
        collection::increase_price(collection);
        return artwork
    }

    public fun burn(
        collection: &mut Collection,
        artwork: Artwork
    ) {
        artwork::destroy(artwork);
        collection::decrease_supply(collection);
    }

    public entry fun mint_and_transfer(
        collection: &mut Collection,
        recipient: address,
        pay_coin: Coin<SUI>,
        ctx: &mut TxContext,
        )
    {
        let artwork = mint(collection, pay_coin, ctx);
        transfer::public_transfer(artwork, recipient);
    }

    public entry fun recycle_and_transfer(
        collection: &mut Collection,
        recipient: address,
        pay_coin: Coin<SUI>,
        recycle: Artwork,
        ctx: &mut TxContext,
    ) {
        let artwork = recycle(collection, pay_coin, recycle, ctx);
        transfer::public_transfer(artwork, recipient);
    }

    // public fun swap(a: Artwork, b: Artwork, a_swap: vector<u64>, b_swap: vector<u64>): Artwork { ... } // MAYBE
}
