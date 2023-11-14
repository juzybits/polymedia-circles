# Polymedia Circles

## Publish the package
```
sui client publish --gas-budget 700700700
```

## Run unit tests
```
sui move test --coverage && sui move coverage summary
sui move coverage source --module controller
sui move coverage bytecode --module controller
```

<!--
## Command line usage

### controller::mint_and_transfer()
```
PACKAGE=
COLLECTION=
RECIPIENT=
PAY_COIN=
sui client call --gas-budget 1000000000 --package $PACKAGE --module controller --function mint_and_transfer --args $COLLECTION $RECIPIENT $PAY_COIN
```

### controller::burn()
```
ARTWORK=
sui client call --gas-budget 1000000000 --package $PACKAGE --module mint --function burn --args $COLLECTION $ARTWORK
```
-->
