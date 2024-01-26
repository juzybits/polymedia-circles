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

export interface RandomStepArgs {
  minVal: bigint | TransactionArgument;
  maxVal: bigint | TransactionArgument;
  steps: bigint | TransactionArgument;
}

export function randomStep(txb: TransactionBlock, args: RandomStepArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::random_step`,
    arguments: [
      pure(txb, args.minVal, `u64`),
      pure(txb, args.maxVal, `u64`),
      pure(txb, args.steps, `u64`),
    ],
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
        `0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::circle::Circle`,
        args.circles,
      ),
    ],
  });
}

export function svg(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::svg`,
    arguments: [obj(txb, self)],
  });
}
