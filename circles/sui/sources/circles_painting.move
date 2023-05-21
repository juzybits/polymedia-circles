module polymedia_circles::circles_painting
{
    use std::string::{String, utf8};
    use std::vector;
    use sui::display::{Self};
    use sui::object::{Self, UID};
    use sui::package::{Self};
    use sui::transfer::{Self};
    use sui::tx_context::{Self, TxContext};
    use polymedia_svg::circle::{Self, Circle};

    struct CirclesPainting has key {
        id: UID,
        circles: vector<Circle>,
        image_url: String,
    }

    public fun mint(ctx: &mut TxContext): CirclesPainting {
        let circles = vector::empty<Circle>();
        vector::push_back(&mut circles, circle::new(50, 100, 200));
        vector::push_back(&mut circles, circle::new(33, 66, 111));
        return CirclesPainting {
            id: object::new(ctx),
            circles,
            // <svg width="800" height="800" xmlns='http://www.w3.org/2000/svg'><rect width="100%" height="100%" fill="#305BED"></rect><circle cx="450" cy="397" r="248" fill="#56C839"></circle><circle cx="244" cy="284" r="197" fill="#0E5181"></circle><circle cx="393" cy="282" r="195" fill="#297D57"></circle></svg>
            image_url: utf8(b"data:image/svg+xml,%3Csvg%20width%3D%22800%22%20height%3D%22800%22%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23305BED%22%3E%3C%2Frect%3E%3Ccircle%20cx%3D%22450%22%20cy%3D%22397%22%20r%3D%22248%22%20fill%3D%22%2356C839%22%3E%3C%2Fcircle%3E%3Ccircle%20cx%3D%22244%22%20cy%3D%22284%22%20r%3D%22197%22%20fill%3D%22%230E5181%22%3E%3C%2Fcircle%3E%3Ccircle%20cx%3D%22393%22%20cy%3D%22282%22%20r%3D%22195%22%20fill%3D%22%23297D57%22%3E%3C%2Fcircle%3E%3C%2Fsvg%3E"),
        }
    }

    public entry fun mint_and_transfer(recipient: address, ctx: &mut TxContext) {
        let painting = mint(ctx);
        transfer::transfer(painting, recipient);
    }

    public fun destroy(painting: CirclesPainting) {
        let CirclesPainting {id, circles: _, image_url: _} = painting;
        object::delete(id);
    }

    // One-Time-Witness
    struct CIRCLES_PAINTING has drop {}

    fun init(otw: CIRCLES_PAINTING, ctx: &mut TxContext)
    {
        let publisher = package::claim(otw, ctx);
        let profile_display = display::new_with_fields<CirclesPainting>(
            &publisher,
            vector[
                utf8(b"name"),
                utf8(b"image_url"),
                utf8(b"description"),
                utf8(b"link"),
                utf8(b"creator"),
                utf8(b"project_name"),
                utf8(b"project_url"),
                utf8(b"project_image_url"),
            ], vector[
                utf8(b"Polymedia Circles - {id}"), // name
                utf8(b"{image_url}"), // image_url
                utf8(b"Generative art by Polymedia"), // description
                utf8(b"https://circles.polymedia.app/view/{id}"), // link
                utf8(b"https://polymedia.app"), // creator
                utf8(b"Polymedia Circles"), // project_name
                utf8(b"https://circles.polymedia.app"), // project_url
                utf8(b"https://circles.polymedia.app/img/project_image.png"), // project_image_url
            ], ctx
        );
        display::update_version(&mut profile_display);
        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(profile_display, tx_context::sender(ctx));
    }
}