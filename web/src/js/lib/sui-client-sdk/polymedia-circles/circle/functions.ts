import { PUBLISHED_AT } from "..";
import { ObjectArg, obj, pure, vector } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export interface NewArgs {
  rgbColor: Array<number | TransactionArgument> | TransactionArgument;
  radius: bigint | TransactionArgument;
  xAxis: bigint | TransactionArgument;
  yAxis: bigint | TransactionArgument;
}

export function new_(txb: TransactionBlock, args: NewArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::new`,
    arguments: [
      pure(txb, args.rgbColor, `vector<u8>`),
      pure(txb, args.radius, `u64`),
      pure(txb, args.xAxis, `u64`),
      pure(txb, args.yAxis, `u64`),
    ],
  });
}

export function red(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::red`,
    arguments: [obj(txb, self)],
  });
}

export function green(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::green`,
    arguments: [obj(txb, self)],
  });
}

export function blue(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::blue`,
    arguments: [obj(txb, self)],
  });
}

export function radius(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::radius`,
    arguments: [obj(txb, self)],
  });
}

export function xAxis(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::x_axis`,
    arguments: [obj(txb, self)],
  });
}

export function yAxis(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::y_axis`,
    arguments: [obj(txb, self)],
  });
}

export function sortByRadiusDesc(
  txb: TransactionBlock,
  v: Array<ObjectArg> | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::sort_by_radius_desc`,
    arguments: [
      vector(
        txb,
        `0x293794c66bd50bd7e2bdef561367419c1298b315775e31dfab38a2eb6b08ece1::circle::Circle`,
        v,
      ),
    ],
  });
}

export function toSvg(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::to_svg`,
    arguments: [obj(txb, self)],
  });
}

export function vectorToSvg(
  txb: TransactionBlock,
  circles: Array<ObjectArg> | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::vector_to_svg`,
    arguments: [
      vector(
        txb,
        `0x293794c66bd50bd7e2bdef561367419c1298b315775e31dfab38a2eb6b08ece1::circle::Circle`,
        circles,
      ),
    ],
  });
}
