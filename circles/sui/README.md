# Polymedia Circles

## Publish the package
```
sui client publish --gas-budget 100000000 | grep packageId
```

## Command line usage

### mint_and_transfer()
```
sui client call --gas-budget 10000000 --package $PACKAGE_ID --module circles_painting --function mint_and_transfer --args $RECIPIENT_ID
```