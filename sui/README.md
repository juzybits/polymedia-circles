# Polymedia Circles

## Publish the package
```
sui client publish --gas-budget 100000000
```

## Command line usage

### create_and_transfer()
```
PACKAGE=
COLLECTION=
RECIPIENT=
PAY_COIN=
sui client call --gas-budget 1000000000 --package $PACKAGE --module art --function create_and_transfer --args $COLLECTION $RECIPIENT $PAY_COIN
```

### destroy()
```
ART_ID=
sui client call --gas-budget 1000000000 --package $PACKAGE --module art --function destroy --args $COLLECTION $ART_ID
```
