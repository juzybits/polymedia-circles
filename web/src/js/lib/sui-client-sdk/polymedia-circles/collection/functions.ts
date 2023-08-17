import { PUBLISHED_AT } from "..";
import { ObjectArg, obj } from "../../_framework/util";
import { TransactionBlock } from "@mysten/sui.js/transactions";

export function init(txb: TransactionBlock) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::init`,
    arguments: [],
  });
}

export function decreaseSupply(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::decrease_supply`,
    arguments: [obj(txb, self)],
  });
}

export function increaseNumber(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::increase_number`,
    arguments: [obj(txb, self)],
  });
}

export function increasePrice(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::increase_price`,
    arguments: [obj(txb, self)],
  });
}

export function increaseSupply(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::increase_supply`,
    arguments: [obj(txb, self)],
  });
}

export function nextNumber(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::next_number`,
    arguments: [obj(txb, self)],
  });
}

export function nextPrice(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::next_price`,
    arguments: [obj(txb, self)],
  });
}

export function nextPriceDiscounted(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::next_price_discounted`,
    arguments: [obj(txb, self)],
  });
}

export function payAddress(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::pay_address`,
    arguments: [obj(txb, self)],
  });
}

export function priceIncreaseBps(txb: TransactionBlock) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::price_increase_bps`,
    arguments: [],
  });
}

export function recycledDivisor(txb: TransactionBlock) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::recycled_divisor`,
    arguments: [],
  });
}

export function supply(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::supply`,
    arguments: [obj(txb, self)],
  });
}
