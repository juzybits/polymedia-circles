import { UID } from "../../_dependencies/source/0x2/object/structs";
import { Table } from "../../_dependencies/source/0x2/table/structs";
import { Encoding, bcsSource as bcs } from "../../_framework/bcs";
import { FieldsWithTypes, Type, compressSuiType } from "../../_framework/util";
import { SuiClient, SuiParsedData } from "@mysten/sui.js/client";

/* ============================== ArtistCap =============================== */

bcs.registerStructType(
  "0x19de22f2de622b99b8266d23a40dbc69244683c5e48b7bfa3d014c1b1ae157f8::collection::ArtistCap",
  {
    id: `0x2::object::UID`,
  },
);

export function isArtistCap(type: Type): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x19de22f2de622b99b8266d23a40dbc69244683c5e48b7bfa3d014c1b1ae157f8::collection::ArtistCap"
  );
}

export interface ArtistCapFields {
  id: string;
}

export class ArtistCap {
  static readonly $typeName =
    "0x19de22f2de622b99b8266d23a40dbc69244683c5e48b7bfa3d014c1b1ae157f8::collection::ArtistCap";
  static readonly $numTypeParams = 0;

  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  static fromFields(fields: Record<string, any>): ArtistCap {
    return new ArtistCap(UID.fromFields(fields.id).id);
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtistCap {
    if (!isArtistCap(item.type)) {
      throw new Error("not a ArtistCap type");
    }
    return new ArtistCap(item.fields.id.id);
  }

  static fromBcs(data: Uint8Array | string, encoding?: Encoding): ArtistCap {
    return ArtistCap.fromFields(bcs.de([ArtistCap.$typeName], data, encoding));
  }

  static fromSuiParsedData(content: SuiParsedData) {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isArtistCap(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ArtistCap object`,
      );
    }
    return ArtistCap.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<ArtistCap> {
    const res = await client.getObject({ id, options: { showContent: true } });
    if (res.error) {
      throw new Error(
        `error fetching ArtistCap object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.content?.dataType !== "moveObject" ||
      !isArtistCap(res.data.content.type)
    ) {
      throw new Error(`object at id ${id} is not a ArtistCap object`);
    }
    return ArtistCap.fromFieldsWithTypes(res.data.content);
  }
}

/* ============================== Collection =============================== */

bcs.registerStructType(
  "0x19de22f2de622b99b8266d23a40dbc69244683c5e48b7bfa3d014c1b1ae157f8::collection::Collection",
  {
    id: `0x2::object::UID`,
    supply: `u64`,
    next_number: `u64`,
    next_price: `u64`,
    pay_address: `address`,
    whitelist: `vector<address>`,
    autographs: `0x2::table::Table<address, 0x1::string::String>`,
  },
);

export function isCollection(type: Type): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x19de22f2de622b99b8266d23a40dbc69244683c5e48b7bfa3d014c1b1ae157f8::collection::Collection"
  );
}

export interface CollectionFields {
  id: string;
  supply: bigint;
  nextNumber: bigint;
  nextPrice: bigint;
  payAddress: string;
  whitelist: Array<string>;
  autographs: Table;
}

export class Collection {
  static readonly $typeName =
    "0x19de22f2de622b99b8266d23a40dbc69244683c5e48b7bfa3d014c1b1ae157f8::collection::Collection";
  static readonly $numTypeParams = 0;

  readonly id: string;
  readonly supply: bigint;
  readonly nextNumber: bigint;
  readonly nextPrice: bigint;
  readonly payAddress: string;
  readonly whitelist: Array<string>;
  readonly autographs: Table;

  constructor(fields: CollectionFields) {
    this.id = fields.id;
    this.supply = fields.supply;
    this.nextNumber = fields.nextNumber;
    this.nextPrice = fields.nextPrice;
    this.payAddress = fields.payAddress;
    this.whitelist = fields.whitelist;
    this.autographs = fields.autographs;
  }

  static fromFields(fields: Record<string, any>): Collection {
    return new Collection({
      id: UID.fromFields(fields.id).id,
      supply: BigInt(fields.supply),
      nextNumber: BigInt(fields.next_number),
      nextPrice: BigInt(fields.next_price),
      payAddress: `0x${fields.pay_address}`,
      whitelist: fields.whitelist.map((item: any) => `0x${item}`),
      autographs: Table.fromFields(
        [`address`, `0x1::string::String`],
        fields.autographs,
      ),
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
      autographs: Table.fromFieldsWithTypes(item.fields.autographs),
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
