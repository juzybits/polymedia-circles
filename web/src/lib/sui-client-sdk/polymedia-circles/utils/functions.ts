import { PUBLISHED_AT } from "..";
import { pure } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export function randomRgb(txb: TransactionBlock) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::utils::random_rgb`,
    arguments: [],
  });
}

export function rgbToSvg(
  txb: TransactionBlock,
  rgbColor: Array<number | TransactionArgument> | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::utils::rgb_to_svg`,
    arguments: [pure(txb, rgbColor, `vector<u8>`)],
  });
}

export function u64ToAscii(
  txb: TransactionBlock,
  num: bigint | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::utils::u64_to_ascii`,
    arguments: [pure(txb, num, `u64`)],
  });
}

export function u8ToAscii(
  txb: TransactionBlock,
  num: number | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::utils::u8_to_ascii`,
    arguments: [pure(txb, num, `u8`)],
  });
}
