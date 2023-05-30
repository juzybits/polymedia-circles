# Polymedia Circles

## Publish the package
```
sui client publish --gas-budget 100000000 | grep packageId
```

## Command line usage

### mint_and_transfer()
```
PACKAGE=
CONFIG=
RECIPIENT=
PAY_COIN=
sui client call --gas-budget 1000000000 --package $PACKAGE --module circles_painting --function mint_and_transfer --args $CONFIG $RECIPIENT $PAY_COIN
```