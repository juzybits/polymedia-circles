import * as reified from "../../_framework/reified";
import { String } from "../../_dependencies/source/0x1/string/structs";
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
import { Circle } from "../circle/structs";
import { bcs, fromB64 } from "@mysten/bcs";
import { SuiClient, SuiParsedData } from "@mysten/sui.js/client";

/* ============================== ARTWORK =============================== */

export function isARTWORK(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::artwork::ARTWORK"
  );
}

export interface ARTWORKFields {
  dummyField: ToField<"bool">;
}

export type ARTWORKReified = Reified<ARTWORK, ARTWORKFields>;

export class ARTWORK {
  static readonly $typeName =
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::artwork::ARTWORK";
  static readonly $numTypeParams = 0;

  readonly $typeName = ARTWORK.$typeName;

  readonly $fullTypeName: "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::artwork::ARTWORK";

  readonly dummyField: ToField<"bool">;

  private constructor(fields: ARTWORKFields) {
    this.$fullTypeName = ARTWORK.$typeName;

    this.dummyField = fields.dummyField;
  }

  static reified(): ARTWORKReified {
    return {
      typeName: ARTWORK.$typeName,
      fullTypeName: composeSuiType(
        ARTWORK.$typeName,
        ...[],
      ) as "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::artwork::ARTWORK",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => ARTWORK.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ARTWORK.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ARTWORK.fromBcs(data),
      bcs: ARTWORK.bcs,
      fromJSONField: (field: any) => ARTWORK.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ARTWORK.fromJSON(json),
      fetch: async (client: SuiClient, id: string) => ARTWORK.fetch(client, id),
      new: (fields: ARTWORKFields) => {
        return new ARTWORK(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return ARTWORK.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ARTWORK>> {
    return phantom(ARTWORK.reified());
  }
  static get p() {
    return ARTWORK.phantom();
  }

  static get bcs() {
    return bcs.struct("ARTWORK", {
      dummy_field: bcs.bool(),
    });
  }

  static fromFields(fields: Record<string, any>): ARTWORK {
    return ARTWORK.reified().new({
      dummyField: decodeFromFields("bool", fields.dummy_field),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ARTWORK {
    if (!isARTWORK(item.type)) {
      throw new Error("not a ARTWORK type");
    }

    return ARTWORK.reified().new({
      dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field),
    });
  }

  static fromBcs(data: Uint8Array): ARTWORK {
    return ARTWORK.fromFields(ARTWORK.bcs.parse(data));
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ARTWORK {
    return ARTWORK.reified().new({
      dummyField: decodeFromJSONField("bool", field.dummyField),
    });
  }

  static fromJSON(json: Record<string, any>): ARTWORK {
    if (json.$typeName !== ARTWORK.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return ARTWORK.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): ARTWORK {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isARTWORK(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ARTWORK object`,
      );
    }
    return ARTWORK.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<ARTWORK> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching ARTWORK object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isARTWORK(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ARTWORK object`);
    }
    return ARTWORK.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}

/* ============================== Artwork =============================== */

export function isArtwork(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::artwork::Artwork"
  );
}

export interface ArtworkFields {
  id: ToField<UID>;
  number: ToField<"u64">;
  backgroundColor: ToField<String>;
  circles: ToField<Vector<Circle>>;
  svg: ToField<String>;
  frozen: ToField<"bool">;
}

export type ArtworkReified = Reified<Artwork, ArtworkFields>;

export class Artwork {
  static readonly $typeName =
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::artwork::Artwork";
  static readonly $numTypeParams = 0;

  readonly $typeName = Artwork.$typeName;

  readonly $fullTypeName: "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::artwork::Artwork";

  readonly id: ToField<UID>;
  readonly number: ToField<"u64">;
  readonly backgroundColor: ToField<String>;
  readonly circles: ToField<Vector<Circle>>;
  readonly svg: ToField<String>;
  readonly frozen: ToField<"bool">;

  private constructor(fields: ArtworkFields) {
    this.$fullTypeName = Artwork.$typeName;

    this.id = fields.id;
    this.number = fields.number;
    this.backgroundColor = fields.backgroundColor;
    this.circles = fields.circles;
    this.svg = fields.svg;
    this.frozen = fields.frozen;
  }

  static reified(): ArtworkReified {
    return {
      typeName: Artwork.$typeName,
      fullTypeName: composeSuiType(
        Artwork.$typeName,
        ...[],
      ) as "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::artwork::Artwork",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => Artwork.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        Artwork.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Artwork.fromBcs(data),
      bcs: Artwork.bcs,
      fromJSONField: (field: any) => Artwork.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Artwork.fromJSON(json),
      fetch: async (client: SuiClient, id: string) => Artwork.fetch(client, id),
      new: (fields: ArtworkFields) => {
        return new Artwork(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return Artwork.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Artwork>> {
    return phantom(Artwork.reified());
  }
  static get p() {
    return Artwork.phantom();
  }

  static get bcs() {
    return bcs.struct("Artwork", {
      id: UID.bcs,
      number: bcs.u64(),
      background_color: String.bcs,
      circles: bcs.vector(Circle.bcs),
      svg: String.bcs,
      frozen: bcs.bool(),
    });
  }

  static fromFields(fields: Record<string, any>): Artwork {
    return Artwork.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      number: decodeFromFields("u64", fields.number),
      backgroundColor: decodeFromFields(
        String.reified(),
        fields.background_color,
      ),
      circles: decodeFromFields(
        reified.vector(Circle.reified()),
        fields.circles,
      ),
      svg: decodeFromFields(String.reified(), fields.svg),
      frozen: decodeFromFields("bool", fields.frozen),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Artwork {
    if (!isArtwork(item.type)) {
      throw new Error("not a Artwork type");
    }

    return Artwork.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      number: decodeFromFieldsWithTypes("u64", item.fields.number),
      backgroundColor: decodeFromFieldsWithTypes(
        String.reified(),
        item.fields.background_color,
      ),
      circles: decodeFromFieldsWithTypes(
        reified.vector(Circle.reified()),
        item.fields.circles,
      ),
      svg: decodeFromFieldsWithTypes(String.reified(), item.fields.svg),
      frozen: decodeFromFieldsWithTypes("bool", item.fields.frozen),
    });
  }

  static fromBcs(data: Uint8Array): Artwork {
    return Artwork.fromFields(Artwork.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      number: this.number.toString(),
      backgroundColor: this.backgroundColor,
      circles: fieldToJSON<Vector<Circle>>(
        `vector<0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::circle::Circle>`,
        this.circles,
      ),
      svg: this.svg,
      frozen: this.frozen,
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Artwork {
    return Artwork.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      number: decodeFromJSONField("u64", field.number),
      backgroundColor: decodeFromJSONField(
        String.reified(),
        field.backgroundColor,
      ),
      circles: decodeFromJSONField(
        reified.vector(Circle.reified()),
        field.circles,
      ),
      svg: decodeFromJSONField(String.reified(), field.svg),
      frozen: decodeFromJSONField("bool", field.frozen),
    });
  }

  static fromJSON(json: Record<string, any>): Artwork {
    if (json.$typeName !== Artwork.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return Artwork.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): Artwork {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isArtwork(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a Artwork object`,
      );
    }
    return Artwork.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<Artwork> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching Artwork object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isArtwork(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a Artwork object`);
    }
    return Artwork.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}
