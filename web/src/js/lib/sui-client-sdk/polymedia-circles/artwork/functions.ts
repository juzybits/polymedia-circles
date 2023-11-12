import { PUBLISHED_AT } from "..";
import { ObjectArg, obj, pure, vector } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export interface CreateArgs {
  number: bigint | TransactionArgument;
  autograph: string | TransactionArgument;
}

export function create(txb: TransactionBlock, args: CreateArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::create`,
    arguments: [
      pure(txb, args.number, `u64`),
      pure(txb, args.autograph, `0x1::string::String`),
    ],
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

export interface SetAutographArgs {
  self: ObjectArg;
  autographText: string | TransactionArgument;
}

export function setAutograph(txb: TransactionBlock, args: SetAutographArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::artwork::set_autograph`,
    arguments: [
      obj(txb, args.self),
      pure(txb, args.autographText, `0x1::string::String`),
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
        `0x293794c66bd50bd7e2bdef561367419c1298b315775e31dfab38a2eb6b08ece1::circle::Circle`,
        args.circles,
      ),
    ],
  });
}
