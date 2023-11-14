import { PUBLISHED_AT } from "..";
import { pure } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export function fromSeed(
  txb: TransactionBlock,
  seed: Array<number | TransactionArgument> | TransactionArgument,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::rand::from_seed`,
    arguments: [pure(txb, seed, `vector<u8>`)],
  });
}

export function seed(txb: TransactionBlock) {
  return txb.moveCall({ target: `${PUBLISHED_AT}::rand::seed`, arguments: [] });
}

export function rawSeed(txb: TransactionBlock) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::rand::raw_seed`,
    arguments: [],
  });
}

export interface RngArgs {
  min: bigint | TransactionArgument;
  max: bigint | TransactionArgument;
}

export function rng(txb: TransactionBlock, args: RngArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::rand::rng`,
    arguments: [pure(txb, args.min, `u64`), pure(txb, args.max, `u64`)],
  });
}
