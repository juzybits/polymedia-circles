import { UID } from "../../_dependencies/source/0x2/object/structs";
import { Encoding, bcsSource as bcs } from "../../_framework/bcs";
import { FieldsWithTypes, Type, compressSuiType } from "../../_framework/util";
import { SuiClient, SuiParsedData } from "@mysten/sui.js/client";

/* ============================== Collection =============================== */

bcs.registerStructType(
  "0x80e2692471f5d79cd5f2dd9e8fa9ee1166de688fecd9abf65494d5d633bdf71b::collection::Collection",
  {
    id: `0x2::object::UID`,
    supply: `u64`,
    next_number: `u64`,
    next_price: `u64`,
    pay_address: `address`,
    whitelist: `vector<address>`,
  },
);

export function isCollection(type: Type): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x80e2692471f5d79cd5f2dd9e8fa9ee1166de688fecd9abf65494d5d633bdf71b::collection::Collection"
  );
}

export interface CollectionFields {
  id: string;
  supply: bigint;
  nextNumber: bigint;
  nextPrice: bigint;
  payAddress: string;
  whitelist: Array<string>;
}

export class Collection {
  static readonly $typeName =
    "0x80e2692471f5d79cd5f2dd9e8fa9ee1166de688fecd9abf65494d5d633bdf71b::collection::Collection";
  static readonly $numTypeParams = 0;

  readonly id: string;
  readonly supply: bigint;
  readonly nextNumber: bigint;
  readonly nextPrice: bigint;
  readonly payAddress: string;
  readonly whitelist: Array<string>;

  constructor(fields: CollectionFields) {
    this.id = fields.id;
    this.supply = fields.supply;
    this.nextNumber = fields.nextNumber;
    this.nextPrice = fields.nextPrice;
    this.payAddress = fields.payAddress;
    this.whitelist = fields.whitelist;
  }

  static fromFields(fields: Record<string, any>): Collection {
    return new Collection({
      id: UID.fromFields(fields.id).id,
      supply: BigInt(fields.supply),
      nextNumber: BigInt(fields.next_number),
      nextPrice: BigInt(fields.next_price),
      payAddress: `0x${fields.pay_address}`,
      whitelist: fields.whitelist.map((item: any) => `0x${item}`),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Collection {
    if (!isCollection(item.type)) {
      throw new Error("not a Collection type");
    }
    return new Collection({
      id: item.fields.id.id,
      supply: BigInt(item.fields.supply),
      nextNumber: BigInt(item.fields.next_number),
      nextPrice: BigInt(item.fields.next_price),
      payAddress: `0x${item.fields.pay_address}`,
      whitelist: item.fields.whitelist.map((item: any) => `0x${item}`),
    });
  }

  static fromBcs(data: Uint8Array | string, encoding?: Encoding): Collection {
    return Collection.fromFields(
      bcs.de([Collection.$typeName], data, encoding),
    );
  }

  static fromSuiParsedData(content: SuiParsedData) {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isCollection(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a Collection object`,
      );
    }
    return Collection.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<Collection> {
    const res = await client.getObject({ id, options: { showContent: true } });
    if (res.error) {
      throw new Error(
        `error fetching Collection object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.content?.dataType !== "moveObject" ||
      !isCollection(res.data.content.type)
    ) {
      throw new Error(`object at id ${id} is not a Collection object`);
    }
    return Collection.fromFieldsWithTypes(res.data.content);
  }
}
