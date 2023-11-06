# Polymedia Circles: web app

This is the code for https://circles.polymedia.app

## Local development

```
pnpm install
pnpm serve
```

## Structure

/
    info, images, calls to action
/explore
    collection stats
        link to explorer
    list all artworks (paginated)
        link to /art
    recent events
        link to /art
/mint
    next price
    mint button
/owner
    list owner's artworks
        link to /art
    list available autographs
    /:ownerId to see someone else's artworks
/art
    view (default)
    freeze (button)
    burn (button)
    recycle (button)
    autograph claim if available (button)
    blend (page)
/faq
/admin
    create autographs
    delete autographs
    add to whitelist
    delete from whitelist
