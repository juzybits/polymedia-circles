module polymedia_circles::circles_painting
{
    use std::string::{String, utf8};
    use std::vector;
    use sui::object::{Self, UID};
    use sui::transfer::{Self};
    use sui::tx_context::{Self, TxContext};
    use polymedia_svg::circle::{Self, Circle};

    struct CirclesPainting has key {
        id: UID,
        circles: vector<Circle>,
        svg: String,
    }

    public entry fun mint(ctx: &mut TxContext) {
        let circles = vector::empty<Circle>();
        vector::push_back(&mut circles, circle::new(50, 100, 200));
        vector::push_back(&mut circles, circle::new(33, 66, 111));
        let painting = CirclesPainting {
            id: object::new(ctx),
            circles,
            svg: utf8(b"<svg width=\"800px\" height=\"800px\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100%\" height=\"100%\" fill=\"#AE4086\"></rect><circle cx=\"274.0659006915705\" cy=\"346.34374782054635\" r=\"215.80375293019267\" fill=\"#63F1CA\"></circle><circle cx=\"516.3730953055008\" cy=\"431.5630701424055\" r=\"140.32620545996048\" fill=\"#415641\"></circle><circle cx=\"671.9474343839868\" cy=\"503.00045256340206\" r=\"96.64133320419624\" fill=\"#4B0BF5\"></circle><circle cx=\"108.78901908947333\" cy=\"191.91661954997716\" r=\"92.54417804027517\" fill=\"#6A42A0\"></circle></svg>"),
        };
        transfer::transfer(painting, tx_context::sender(ctx));
    }
}