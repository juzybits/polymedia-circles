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

export function blue(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::blue`,
    arguments: [obj(txb, self)],
  });
}

export function green(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::green`,
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

export function red(txb: TransactionBlock, self: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::circle::red`,
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
        `0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::circle::Circle`,
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
        `0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::circle::Circle`,
        circles,
      ),
    ],
  });
}
