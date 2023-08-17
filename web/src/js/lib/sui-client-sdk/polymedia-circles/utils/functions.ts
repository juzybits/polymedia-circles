import { PUBLISHED_AT } from "..";
import { pure } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export function u64ToBytes(
  txb: TransactionBlock,
  num: bigint | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::utils::u64_to_bytes`,
    arguments: [pure(txb, num, `u64`)],
  });
}

export function u8ToBytes(
  txb: TransactionBlock,
  num: number | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::utils::u8_to_bytes`,
    arguments: [pure(txb, num, `u8`)],
  });
}
