# Polymedia Circles: web app

This is the code for https://circles.polymedia.app

## Local development

```
pnpm install
pnpm serve
```

## Structure

/
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
/faq
/art
    view (default)
    freeze (button)
    burn (button)
    recycle (button)
    autograph claim if available (button)
    blend (page)
/admin
    create autographs
    delete autographs
    add to whitelist
    delete from whitelist
