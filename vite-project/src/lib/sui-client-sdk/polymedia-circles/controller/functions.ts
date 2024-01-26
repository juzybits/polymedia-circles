import { PUBLISHED_AT } from "..";
import { ObjectArg, obj, pure } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export interface BlendArtworkArgs {
  a: ObjectArg;
  b: ObjectArg;
  swaps:
    | Array<Array<bigint | TransactionArgument> | TransactionArgument>
    | TransactionArgument;
}

export function blendArtwork(txb: TransactionBlock, args: BlendArtworkArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::blend_artwork`,
    arguments: [
      obj(txb, args.a),
      obj(txb, args.b),
      pure(txb, args.swaps, `vector<vector<u64>>`),
    ],
  });
}

export interface BlendArtworkEntryArgs {
  a: ObjectArg;
  b: ObjectArg;
  swaps:
    | Array<Array<bigint | TransactionArgument> | TransactionArgument>
    | TransactionArgument;
}

export function blendArtworkEntry(
  txb: TransactionBlock,
  args: BlendArtworkEntryArgs,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::blend_artwork_entry`,
    arguments: [
      obj(txb, args.a),
      obj(txb, args.b),
      pure(txb, args.swaps, `vector<vector<u64>>`),
    ],
  });
}

export interface BurnArtworkArgs {
  collection: ObjectArg;
  artwork: ObjectArg;
}

export function burnArtwork(txb: TransactionBlock, args: BurnArtworkArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::burn_artwork`,
    arguments: [obj(txb, args.collection), obj(txb, args.artwork)],
  });
}

export interface BurnArtworkEntryArgs {
  collection: ObjectArg;
  artwork: ObjectArg;
}

export function burnArtworkEntry(
  txb: TransactionBlock,
  args: BurnArtworkEntryArgs,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::burn_artwork_entry`,
    arguments: [obj(txb, args.collection), obj(txb, args.artwork)],
  });
}

export interface CreateArtworkArgs {
  collection: ObjectArg;
  payCoin: ObjectArg;
  price: bigint | TransactionArgument;
}

export function createArtwork(txb: TransactionBlock, args: CreateArtworkArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::create_artwork`,
    arguments: [
      obj(txb, args.collection),
      obj(txb, args.payCoin),
      pure(txb, args.price, `u64`),
    ],
  });
}

export function freezeArtwork(txb: TransactionBlock, artwork: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::freeze_artwork`,
    arguments: [obj(txb, artwork)],
  });
}

export function freezeArtworkEntry(txb: TransactionBlock, artwork: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::freeze_artwork_entry`,
    arguments: [obj(txb, artwork)],
  });
}

export interface MintArtworkArgs {
  collection: ObjectArg;
  payCoin: ObjectArg;
}

export function mintArtwork(txb: TransactionBlock, args: MintArtworkArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::mint_artwork`,
    arguments: [obj(txb, args.collection), obj(txb, args.payCoin)],
  });
}

export interface MintArtworkEntryArgs {
  collection: ObjectArg;
  recipient: string | TransactionArgument;
  payCoin: ObjectArg;
}

export function mintArtworkEntry(
  txb: TransactionBlock,
  args: MintArtworkEntryArgs,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::mint_artwork_entry`,
    arguments: [
      obj(txb, args.collection),
      pure(txb, args.recipient, `address`),
      obj(txb, args.payCoin),
    ],
  });
}

export interface RecycleArtworkArgs {
  collection: ObjectArg;
  payCoin: ObjectArg;
  oldArtwork: ObjectArg;
}

export function recycleArtwork(
  txb: TransactionBlock,
  args: RecycleArtworkArgs,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::recycle_artwork`,
    arguments: [
      obj(txb, args.collection),
      obj(txb, args.payCoin),
      obj(txb, args.oldArtwork),
    ],
  });
}

export interface RecycleArtworkEntryArgs {
  collection: ObjectArg;
  recipient: string | TransactionArgument;
  payCoin: ObjectArg;
  recycle: ObjectArg;
}

export function recycleArtworkEntry(
  txb: TransactionBlock,
  args: RecycleArtworkEntryArgs,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::recycle_artwork_entry`,
    arguments: [
      obj(txb, args.collection),
      pure(txb, args.recipient, `address`),
      obj(txb, args.payCoin),
      obj(txb, args.recycle),
    ],
  });
}
