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

export interface ClaimAutographArgs {
  collection: ObjectArg;
  artwork: ObjectArg;
}

export function claimAutograph(
  txb: TransactionBlock,
  args: ClaimAutographArgs,
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::claim_autograph`,
    arguments: [obj(txb, args.collection), obj(txb, args.artwork)],
  });
}

export interface CreateArtworkArgs {
  collection: ObjectArg;
  payCoin: ObjectArg;
  price: bigint | TransactionArgument;
  autograph: string | TransactionArgument;
}

export function createArtwork(txb: TransactionBlock, args: CreateArtworkArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::create_artwork`,
    arguments: [
      obj(txb, args.collection),
      obj(txb, args.payCoin),
      pure(txb, args.price, `u64`),
      pure(txb, args.autograph, `0x1::string::String`),
    ],
  });
}

export function freezeArtwork(txb: TransactionBlock, artwork: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::freeze_artwork`,
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

export interface SaveAutographArgs {
  artistCap: ObjectArg;
  collection: ObjectArg;
  artworkAddr: string | TransactionArgument;
  autographText: Array<number | TransactionArgument> | TransactionArgument;
}

export function saveAutograph(txb: TransactionBlock, args: SaveAutographArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::controller::save_autograph`,
    arguments: [
      obj(txb, args.artistCap),
      obj(txb, args.collection),
      pure(txb, args.artworkAddr, `address`),
      pure(txb, args.autographText, `vector<u8>`),
    ],
  });
}
