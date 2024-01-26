import * as reified from "../../_framework/reified";
import { UID } from "../../_dependencies/source/0x2/object/structs";
import {
  PhantomReified,
  Reified,
  ToField,
  ToTypeStr,
  Vector,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
} from "../../_framework/reified";
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
} from "../../_framework/util";
import { bcs, fromB64, fromHEX, toHEX } from "@mysten/bcs";
import { SuiClient, SuiParsedData } from "@mysten/sui.js/client";

/* ============================== COLLECTION =============================== */

export function isCOLLECTION(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::collection::COLLECTION"
  );
}

export interface COLLECTIONFields {
  dummyField: ToField<"bool">;
}

export type COLLECTIONReified = Reified<COLLECTION, COLLECTIONFields>;

export class COLLECTION {
  static readonly $typeName =
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::collection::COLLECTION";
  static readonly $numTypeParams = 0;

  readonly $typeName = COLLECTION.$typeName;

  readonly $fullTypeName: "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::collection::COLLECTION";

  readonly dummyField: ToField<"bool">;

  private constructor(fields: COLLECTIONFields) {
    this.$fullTypeName = COLLECTION.$typeName;

    this.dummyField = fields.dummyField;
  }

  static reified(): COLLECTIONReified {
    return {
      typeName: COLLECTION.$typeName,
      fullTypeName: composeSuiType(
        COLLECTION.$typeName,
        ...[],
      ) as "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::collection::COLLECTION",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        COLLECTION.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        COLLECTION.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => COLLECTION.fromBcs(data),
      bcs: COLLECTION.bcs,
      fromJSONField: (field: any) => COLLECTION.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => COLLECTION.fromJSON(json),
      fetch: async (client: SuiClient, id: string) =>
        COLLECTION.fetch(client, id),
      new: (fields: COLLECTIONFields) => {
        return new COLLECTION(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return COLLECTION.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<COLLECTION>> {
    return phantom(COLLECTION.reified());
  }
  static get p() {
    return COLLECTION.phantom();
  }

  static get bcs() {
    return bcs.struct("COLLECTION", {
      dummy_field: bcs.bool(),
    });
  }

  static fromFields(fields: Record<string, any>): COLLECTION {
    return COLLECTION.reified().new({
      dummyField: decodeFromFields("bool", fields.dummy_field),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): COLLECTION {
    if (!isCOLLECTION(item.type)) {
      throw new Error("not a COLLECTION type");
    }

    return COLLECTION.reified().new({
      dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field),
    });
  }

  static fromBcs(data: Uint8Array): COLLECTION {
    return COLLECTION.fromFields(COLLECTION.bcs.parse(data));
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): COLLECTION {
    return COLLECTION.reified().new({
      dummyField: decodeFromJSONField("bool", field.dummyField),
    });
  }

  static fromJSON(json: Record<string, any>): COLLECTION {
    if (json.$typeName !== COLLECTION.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return COLLECTION.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): COLLECTION {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isCOLLECTION(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a COLLECTION object`,
      );
    }
    return COLLECTION.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<COLLECTION> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching COLLECTION object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isCOLLECTION(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a COLLECTION object`);
    }
    return COLLECTION.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}

/* ============================== Collection =============================== */

export function isCollection(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::collection::Collection"
  );
}

export interface CollectionFields {
  id: ToField<UID>;
  supply: ToField<"u64">;
  nextNumber: ToField<"u64">;
  nextPrice: ToField<"u64">;
  payAddress: ToField<"address">;
  whitelist: ToField<Vector<"address">>;
}

export type CollectionReified = Reified<Collection, CollectionFields>;

export class Collection {
  static readonly $typeName =
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::collection::Collection";
  static readonly $numTypeParams = 0;

  readonly $typeName = Collection.$typeName;

  readonly $fullTypeName: "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::collection::Collection";

  readonly id: ToField<UID>;
  readonly supply: ToField<"u64">;
  readonly nextNumber: ToField<"u64">;
  readonly nextPrice: ToField<"u64">;
  readonly payAddress: ToField<"address">;
  readonly whitelist: ToField<Vector<"address">>;

  private constructor(fields: CollectionFields) {
    this.$fullTypeName = Collection.$typeName;

    this.id = fields.id;
    this.supply = fields.supply;
    this.nextNumber = fields.nextNumber;
    this.nextPrice = fields.nextPrice;
    this.payAddress = fields.payAddress;
    this.whitelist = fields.whitelist;
  }

  static reified(): CollectionReified {
    return {
      typeName: Collection.$typeName,
      fullTypeName: composeSuiType(
        Collection.$typeName,
        ...[],
      ) as "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::collection::Collection",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        Collection.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        Collection.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Collection.fromBcs(data),
      bcs: Collection.bcs,
      fromJSONField: (field: any) => Collection.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Collection.fromJSON(json),
      fetch: async (client: SuiClient, id: string) =>
        Collection.fetch(client, id),
      new: (fields: CollectionFields) => {
        return new Collection(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return Collection.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Collection>> {
    return phantom(Collection.reified());
  }
  static get p() {
    return Collection.phantom();
  }

  static get bcs() {
    return bcs.struct("Collection", {
      id: UID.bcs,
      supply: bcs.u64(),
      next_number: bcs.u64(),
      next_price: bcs.u64(),
      pay_address: bcs
        .bytes(32)
        .transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        }),
      whitelist: bcs.vector(
        bcs
          .bytes(32)
          .transform({
            input: (val: string) => fromHEX(val),
            output: (val: Uint8Array) => toHEX(val),
          }),
      ),
    });
  }

  static fromFields(fields: Record<string, any>): Collection {
    return Collection.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      supply: decodeFromFields("u64", fields.supply),
      nextNumber: decodeFromFields("u64", fields.next_number),
      nextPrice: decodeFromFields("u64", fields.next_price),
      payAddress: decodeFromFields("address", fields.pay_address),
      whitelist: decodeFromFields(reified.vector("address"), fields.whitelist),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Collection {
    if (!isCollection(item.type)) {
      throw new Error("not a Collection type");
    }

    return Collection.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      supply: decodeFromFieldsWithTypes("u64", item.fields.supply),
      nextNumber: decodeFromFieldsWithTypes("u64", item.fields.next_number),
      nextPrice: decodeFromFieldsWithTypes("u64", item.fields.next_price),
      payAddress: decodeFromFieldsWithTypes("address", item.fields.pay_address),
      whitelist: decodeFromFieldsWithTypes(
        reified.vector("address"),
        item.fields.whitelist,
      ),
    });
  }

  static fromBcs(data: Uint8Array): Collection {
    return Collection.fromFields(Collection.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      supply: this.supply.toString(),
      nextNumber: this.nextNumber.toString(),
      nextPrice: this.nextPrice.toString(),
      payAddress: this.payAddress,
      whitelist: fieldToJSON<Vector<"address">>(
        `vector<address>`,
        this.whitelist,
      ),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Collection {
    return Collection.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      supply: decodeFromJSONField("u64", field.supply),
      nextNumber: decodeFromJSONField("u64", field.nextNumber),
      nextPrice: decodeFromJSONField("u64", field.nextPrice),
      payAddress: decodeFromJSONField("address", field.payAddress),
      whitelist: decodeFromJSONField(
        reified.vector("address"),
        field.whitelist,
      ),
    });
  }

  static fromJSON(json: Record<string, any>): Collection {
    if (json.$typeName !== Collection.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return Collection.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): Collection {
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
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching Collection object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isCollection(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a Collection object`);
    }
    return Collection.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}
