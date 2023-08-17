import { PUBLISHED_AT } from "..";
import { pure } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export function randomRgb(txb: TransactionBlock) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::color::random_rgb`,
    arguments: [],
  });
}

export function rgbToSvg(
  txb: TransactionBlock,
  rgbColor: Array<number | TransactionArgument> | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::color::rgb_to_svg`,
    arguments: [pure(txb, rgbColor, `vector<u8>`)],
  });
}
