import { PUBLISHED_AT } from "..";
import { ObjectArg, obj, pure, vector } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export function create(
  txb: TransactionBlock,
  number: bigint | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::create`,
    arguments: [pure(txb, number, `u64`)],
  });
}

export function destroy(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::destroy`,
    arguments: [obj(txb, self)],
  });
}

export function circles(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::circles`,
    arguments: [obj(txb, self)],
  });
}

export function svg(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::svg`,
    arguments: [obj(txb, self)],
  });
}

export function backgroundColor(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::background_color`,
    arguments: [obj(txb, self)],
  });
}

export function number(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::number`,
    arguments: [obj(txb, self)],
  });
}

export function freezee(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::freezee`,
    arguments: [obj(txb, self)],
  });
}

export function frozen(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::frozen`,
    arguments: [obj(txb, self)],
  });
}

export function init(txb: TransactionBlock, otw: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::init`,
    arguments: [obj(txb, otw)],
  });
}

export interface SetCirclesArgs {
  self: ObjectArg;
  circles: Array<ObjectArg> | TransactionArgument;
}

export function setCircles(txb: TransactionBlock, args: SetCirclesArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::set_circles`,
    arguments: [
      obj(txb, args.self),
      vector(
        txb,
        `0x72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83::circle::Circle`,
        args.circles,
      ),
    ],
  });
}
