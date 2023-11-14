# Polymedia Circles: web app

This is the code for https://circles.polymedia.app

## Local development

```
pnpm install
pnpm serve
```

## Structure

```
/
    collection stats
        link to explorer
    recent events
        link to /art
    list all artworks (paginated) // TODO
        link to /art
/mint
    next price
    mint button
/owner
    list owner's artworks
        link to /art
    /:ownerId to see someone else's artworks // TODO
/faq
/art
    view (default)
    freeze (button)
    burn (button)
    recycle (button)
    blend (page)
/admin
    add to whitelist
    delete from whitelist
```
