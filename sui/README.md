# Polymedia Circles

## Publish the package
```
sui client publish --gas-budget 100000000
```

## Command line usage

### mint::create_and_transfer()
```
PACKAGE=
COLLECTION=
RECIPIENT=
PAY_COIN=
sui client call --gas-budget 1000000000 --package $PACKAGE --module mint --function mint_and_transfer --args $COLLECTION $RECIPIENT $PAY_COIN
```

### mint::burn()
```
ARTWORK=
sui client call --gas-budget 1000000000 --package $PACKAGE --module mint --function burn --args $COLLECTION $ARTWORK
```
