import { UID } from "../../_dependencies/source/0x2/object/structs";
import { Encoding, bcsSource as bcs } from "../../_framework/bcs";
import { FieldsWithTypes, Type, compressSuiType } from "../../_framework/util";
import { SuiClient, SuiParsedData } from "@mysten/sui.js/client";

/* ============================== COLLECTION =============================== */

bcs.registerStructType(
  "0xacbe5ab5d70076f911d539a10b371406f001c2ea1ceac1ee3ddfcad1e38c39b4::collection::COLLECTION",
  {
    dummy_field: `bool`,
  },
);

export function isCOLLECTION(type: Type): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0xacbe5ab5d70076f911d539a10b371406f001c2ea1ceac1ee3ddfcad1e38c39b4::collection::COLLECTION"
  );
}

export interface COLLECTIONFields {
  dummyField: boolean;
}

export class COLLECTION {
  static readonly $typeName =
    "0xacbe5ab5d70076f911d539a10b371406f001c2ea1ceac1ee3ddfcad1e38c39b4::collection::COLLECTION";
  static readonly $numTypeParams = 0;

  readonly dummyField: boolean;

  constructor(dummyField: boolean) {
    this.dummyField = dummyField;
  }

  static fromFields(fields: Record<string, any>): COLLECTION {
    return new COLLECTION(fields.dummy_field);
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): COLLECTION {
    if (!isCOLLECTION(item.type)) {
      throw new Error("not a COLLECTION type");
    }
    return new COLLECTION(item.fields.dummy_field);
  }

  static fromBcs(data: Uint8Array | string, encoding?: Encoding): COLLECTION {
    return COLLECTION.fromFields(
      bcs.de([COLLECTION.$typeName], data, encoding),
    );
  }
}

/* ============================== Collection =============================== */

bcs.registerStructType(
  "0xacbe5ab5d70076f911d539a10b371406f001c2ea1ceac1ee3ddfcad1e38c39b4::collection::Collection",
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
    "0xacbe5ab5d70076f911d539a10b371406f001c2ea1ceac1ee3ddfcad1e38c39b4::collection::Collection"
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
    "0xacbe5ab5d70076f911d539a10b371406f001c2ea1ceac1ee3ddfcad1e38c39b4::collection::Collection";
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
