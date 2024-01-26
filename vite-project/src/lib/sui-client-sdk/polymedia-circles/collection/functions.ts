import { PUBLISHED_AT } from "..";
import { ObjectArg, obj, pure } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export function decreaseSupply(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::decrease_supply`,
    arguments: [obj(txb, self)],
  });
}

export function increaseSupply(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::increase_supply`,
    arguments: [obj(txb, self)],
  });
}

export function supply(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::supply`,
    arguments: [obj(txb, self)],
  });
}

export function init(txb: TransactionBlock, otw: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::init`,
    arguments: [obj(txb, otw)],
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

export interface RemoveFromWhitelistArgs {
  self: ObjectArg;
  lookupAddr: string | TransactionArgument;
}

export function removeFromWhitelist(
  txb: TransactionBlock,
  args: RemoveFromWhitelistArgs,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::remove_from_whitelist`,
    arguments: [obj(txb, args.self), pure(txb, args.lookupAddr, `address`)],
  });
}

export function whitelist(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::collection::whitelist`,
    arguments: [obj(txb, self)],
  });
}
