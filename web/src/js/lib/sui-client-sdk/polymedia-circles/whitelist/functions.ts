import { PUBLISHED_AT } from "..";
import { ObjectArg, obj, pure } from "../../_framework/util";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

export interface CreateArgs {
  addresses: Array<string | TransactionArgument> | TransactionArgument;
  autographs:
    | Array<Array<number | TransactionArgument> | TransactionArgument>
    | TransactionArgument;
}

export function create(txb: TransactionBlock, args: CreateArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::whitelist::create`,
    arguments: [
      pure(txb, args.addresses, `vector<address>`),
      pure(txb, args.autographs, `vector<vector<u8>>`),
    ],
  });
}

export interface PopAutographArgs {
  self: ObjectArg;
  addr: string | TransactionArgument;
}

export function popAutograph(txb: TransactionBlock, args: PopAutographArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::whitelist::pop_autograph`,
    arguments: [obj(txb, args.self), pure(txb, args.addr, `address`)],
  });
}
