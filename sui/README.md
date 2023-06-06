# Polymedia Circles

## Publish the package
```
sui client publish --gas-budget 100000000
```

## Run unit tests
```
clear && sui move test --coverage && sui move coverage summary
sui move coverage source --module circle
sui move coverage bytecode --module circle
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
