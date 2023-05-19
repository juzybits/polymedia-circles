module polymedia_circles::circles_painting
{
    use std::string::{String};
    use sui::object::{UID};
    use polymedia_svg::circle::{Circle};

    struct CirclesPainting has key {
        id: UID,
        circles: vector<Circle>,
        svg: String,
    }
}