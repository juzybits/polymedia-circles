import { ID } from "../../_dependencies/source/0x2/object/structs";
import {
  PhantomReified,
  Reified,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from "../../_framework/reified";
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
} from "../../_framework/util";
import { bcs, fromB64 } from "@mysten/bcs";
import { SuiClient, SuiParsedData } from "@mysten/sui.js/client";

/* ============================== ArtworkBlended =============================== */

export function isArtworkBlended(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkBlended"
  );
}

export interface ArtworkBlendedFields {
  artworkAId: ToField<ID>;
  artworkANumber: ToField<"u64">;
  artworkBId: ToField<ID>;
  artworkBNumber: ToField<"u64">;
}

export type ArtworkBlendedReified = Reified<
  ArtworkBlended,
  ArtworkBlendedFields
>;

export class ArtworkBlended {
  static readonly $typeName =
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkBlended";
  static readonly $numTypeParams = 0;

  readonly $typeName = ArtworkBlended.$typeName;

  readonly $fullTypeName: "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkBlended";

  readonly artworkAId: ToField<ID>;
  readonly artworkANumber: ToField<"u64">;
  readonly artworkBId: ToField<ID>;
  readonly artworkBNumber: ToField<"u64">;

  private constructor(fields: ArtworkBlendedFields) {
    this.$fullTypeName = ArtworkBlended.$typeName;

    this.artworkAId = fields.artworkAId;
    this.artworkANumber = fields.artworkANumber;
    this.artworkBId = fields.artworkBId;
    this.artworkBNumber = fields.artworkBNumber;
  }

  static reified(): ArtworkBlendedReified {
    return {
      typeName: ArtworkBlended.$typeName,
      fullTypeName: composeSuiType(
        ArtworkBlended.$typeName,
        ...[],
      ) as "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkBlended",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        ArtworkBlended.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ArtworkBlended.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ArtworkBlended.fromBcs(data),
      bcs: ArtworkBlended.bcs,
      fromJSONField: (field: any) => ArtworkBlended.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ArtworkBlended.fromJSON(json),
      fetch: async (client: SuiClient, id: string) =>
        ArtworkBlended.fetch(client, id),
      new: (fields: ArtworkBlendedFields) => {
        return new ArtworkBlended(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return ArtworkBlended.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ArtworkBlended>> {
    return phantom(ArtworkBlended.reified());
  }
  static get p() {
    return ArtworkBlended.phantom();
  }

  static get bcs() {
    return bcs.struct("ArtworkBlended", {
      artwork_a_id: ID.bcs,
      artwork_a_number: bcs.u64(),
      artwork_b_id: ID.bcs,
      artwork_b_number: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): ArtworkBlended {
    return ArtworkBlended.reified().new({
      artworkAId: decodeFromFields(ID.reified(), fields.artwork_a_id),
      artworkANumber: decodeFromFields("u64", fields.artwork_a_number),
      artworkBId: decodeFromFields(ID.reified(), fields.artwork_b_id),
      artworkBNumber: decodeFromFields("u64", fields.artwork_b_number),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkBlended {
    if (!isArtworkBlended(item.type)) {
      throw new Error("not a ArtworkBlended type");
    }

    return ArtworkBlended.reified().new({
      artworkAId: decodeFromFieldsWithTypes(
        ID.reified(),
        item.fields.artwork_a_id,
      ),
      artworkANumber: decodeFromFieldsWithTypes(
        "u64",
        item.fields.artwork_a_number,
      ),
      artworkBId: decodeFromFieldsWithTypes(
        ID.reified(),
        item.fields.artwork_b_id,
      ),
      artworkBNumber: decodeFromFieldsWithTypes(
        "u64",
        item.fields.artwork_b_number,
      ),
    });
  }

  static fromBcs(data: Uint8Array): ArtworkBlended {
    return ArtworkBlended.fromFields(ArtworkBlended.bcs.parse(data));
  }

  toJSONField() {
    return {
      artworkAId: this.artworkAId,
      artworkANumber: this.artworkANumber.toString(),
      artworkBId: this.artworkBId,
      artworkBNumber: this.artworkBNumber.toString(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ArtworkBlended {
    return ArtworkBlended.reified().new({
      artworkAId: decodeFromJSONField(ID.reified(), field.artworkAId),
      artworkANumber: decodeFromJSONField("u64", field.artworkANumber),
      artworkBId: decodeFromJSONField(ID.reified(), field.artworkBId),
      artworkBNumber: decodeFromJSONField("u64", field.artworkBNumber),
    });
  }

  static fromJSON(json: Record<string, any>): ArtworkBlended {
    if (json.$typeName !== ArtworkBlended.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return ArtworkBlended.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): ArtworkBlended {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isArtworkBlended(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ArtworkBlended object`,
      );
    }
    return ArtworkBlended.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<ArtworkBlended> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching ArtworkBlended object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isArtworkBlended(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ArtworkBlended object`);
    }
    return ArtworkBlended.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}

/* ============================== ArtworkBurned =============================== */

export function isArtworkBurned(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkBurned"
  );
}

export interface ArtworkBurnedFields {
  artworkId: ToField<ID>;
  artworkNumber: ToField<"u64">;
}

export type ArtworkBurnedReified = Reified<ArtworkBurned, ArtworkBurnedFields>;

export class ArtworkBurned {
  static readonly $typeName =
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkBurned";
  static readonly $numTypeParams = 0;

  readonly $typeName = ArtworkBurned.$typeName;

  readonly $fullTypeName: "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkBurned";

  readonly artworkId: ToField<ID>;
  readonly artworkNumber: ToField<"u64">;

  private constructor(fields: ArtworkBurnedFields) {
    this.$fullTypeName = ArtworkBurned.$typeName;

    this.artworkId = fields.artworkId;
    this.artworkNumber = fields.artworkNumber;
  }

  static reified(): ArtworkBurnedReified {
    return {
      typeName: ArtworkBurned.$typeName,
      fullTypeName: composeSuiType(
        ArtworkBurned.$typeName,
        ...[],
      ) as "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkBurned",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        ArtworkBurned.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ArtworkBurned.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ArtworkBurned.fromBcs(data),
      bcs: ArtworkBurned.bcs,
      fromJSONField: (field: any) => ArtworkBurned.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ArtworkBurned.fromJSON(json),
      fetch: async (client: SuiClient, id: string) =>
        ArtworkBurned.fetch(client, id),
      new: (fields: ArtworkBurnedFields) => {
        return new ArtworkBurned(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return ArtworkBurned.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ArtworkBurned>> {
    return phantom(ArtworkBurned.reified());
  }
  static get p() {
    return ArtworkBurned.phantom();
  }

  static get bcs() {
    return bcs.struct("ArtworkBurned", {
      artwork_id: ID.bcs,
      artwork_number: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): ArtworkBurned {
    return ArtworkBurned.reified().new({
      artworkId: decodeFromFields(ID.reified(), fields.artwork_id),
      artworkNumber: decodeFromFields("u64", fields.artwork_number),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkBurned {
    if (!isArtworkBurned(item.type)) {
      throw new Error("not a ArtworkBurned type");
    }

    return ArtworkBurned.reified().new({
      artworkId: decodeFromFieldsWithTypes(
        ID.reified(),
        item.fields.artwork_id,
      ),
      artworkNumber: decodeFromFieldsWithTypes(
        "u64",
        item.fields.artwork_number,
      ),
    });
  }

  static fromBcs(data: Uint8Array): ArtworkBurned {
    return ArtworkBurned.fromFields(ArtworkBurned.bcs.parse(data));
  }

  toJSONField() {
    return {
      artworkId: this.artworkId,
      artworkNumber: this.artworkNumber.toString(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ArtworkBurned {
    return ArtworkBurned.reified().new({
      artworkId: decodeFromJSONField(ID.reified(), field.artworkId),
      artworkNumber: decodeFromJSONField("u64", field.artworkNumber),
    });
  }

  static fromJSON(json: Record<string, any>): ArtworkBurned {
    if (json.$typeName !== ArtworkBurned.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return ArtworkBurned.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): ArtworkBurned {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isArtworkBurned(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ArtworkBurned object`,
      );
    }
    return ArtworkBurned.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<ArtworkBurned> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching ArtworkBurned object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isArtworkBurned(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ArtworkBurned object`);
    }
    return ArtworkBurned.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}

/* ============================== ArtworkFrozen =============================== */

export function isArtworkFrozen(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkFrozen"
  );
}

export interface ArtworkFrozenFields {
  artworkId: ToField<ID>;
  artworkNumber: ToField<"u64">;
}

export type ArtworkFrozenReified = Reified<ArtworkFrozen, ArtworkFrozenFields>;

export class ArtworkFrozen {
  static readonly $typeName =
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkFrozen";
  static readonly $numTypeParams = 0;

  readonly $typeName = ArtworkFrozen.$typeName;

  readonly $fullTypeName: "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkFrozen";

  readonly artworkId: ToField<ID>;
  readonly artworkNumber: ToField<"u64">;

  private constructor(fields: ArtworkFrozenFields) {
    this.$fullTypeName = ArtworkFrozen.$typeName;

    this.artworkId = fields.artworkId;
    this.artworkNumber = fields.artworkNumber;
  }

  static reified(): ArtworkFrozenReified {
    return {
      typeName: ArtworkFrozen.$typeName,
      fullTypeName: composeSuiType(
        ArtworkFrozen.$typeName,
        ...[],
      ) as "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkFrozen",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        ArtworkFrozen.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ArtworkFrozen.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ArtworkFrozen.fromBcs(data),
      bcs: ArtworkFrozen.bcs,
      fromJSONField: (field: any) => ArtworkFrozen.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ArtworkFrozen.fromJSON(json),
      fetch: async (client: SuiClient, id: string) =>
        ArtworkFrozen.fetch(client, id),
      new: (fields: ArtworkFrozenFields) => {
        return new ArtworkFrozen(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return ArtworkFrozen.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ArtworkFrozen>> {
    return phantom(ArtworkFrozen.reified());
  }
  static get p() {
    return ArtworkFrozen.phantom();
  }

  static get bcs() {
    return bcs.struct("ArtworkFrozen", {
      artwork_id: ID.bcs,
      artwork_number: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): ArtworkFrozen {
    return ArtworkFrozen.reified().new({
      artworkId: decodeFromFields(ID.reified(), fields.artwork_id),
      artworkNumber: decodeFromFields("u64", fields.artwork_number),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkFrozen {
    if (!isArtworkFrozen(item.type)) {
      throw new Error("not a ArtworkFrozen type");
    }

    return ArtworkFrozen.reified().new({
      artworkId: decodeFromFieldsWithTypes(
        ID.reified(),
        item.fields.artwork_id,
      ),
      artworkNumber: decodeFromFieldsWithTypes(
        "u64",
        item.fields.artwork_number,
      ),
    });
  }

  static fromBcs(data: Uint8Array): ArtworkFrozen {
    return ArtworkFrozen.fromFields(ArtworkFrozen.bcs.parse(data));
  }

  toJSONField() {
    return {
      artworkId: this.artworkId,
      artworkNumber: this.artworkNumber.toString(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ArtworkFrozen {
    return ArtworkFrozen.reified().new({
      artworkId: decodeFromJSONField(ID.reified(), field.artworkId),
      artworkNumber: decodeFromJSONField("u64", field.artworkNumber),
    });
  }

  static fromJSON(json: Record<string, any>): ArtworkFrozen {
    if (json.$typeName !== ArtworkFrozen.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return ArtworkFrozen.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): ArtworkFrozen {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isArtworkFrozen(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ArtworkFrozen object`,
      );
    }
    return ArtworkFrozen.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<ArtworkFrozen> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching ArtworkFrozen object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isArtworkFrozen(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ArtworkFrozen object`);
    }
    return ArtworkFrozen.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}

/* ============================== ArtworkMinted =============================== */

export function isArtworkMinted(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkMinted"
  );
}

export interface ArtworkMintedFields {
  artworkId: ToField<ID>;
  artworkNumber: ToField<"u64">;
}

export type ArtworkMintedReified = Reified<ArtworkMinted, ArtworkMintedFields>;

export class ArtworkMinted {
  static readonly $typeName =
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkMinted";
  static readonly $numTypeParams = 0;

  readonly $typeName = ArtworkMinted.$typeName;

  readonly $fullTypeName: "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkMinted";

  readonly artworkId: ToField<ID>;
  readonly artworkNumber: ToField<"u64">;

  private constructor(fields: ArtworkMintedFields) {
    this.$fullTypeName = ArtworkMinted.$typeName;

    this.artworkId = fields.artworkId;
    this.artworkNumber = fields.artworkNumber;
  }

  static reified(): ArtworkMintedReified {
    return {
      typeName: ArtworkMinted.$typeName,
      fullTypeName: composeSuiType(
        ArtworkMinted.$typeName,
        ...[],
      ) as "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkMinted",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        ArtworkMinted.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ArtworkMinted.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ArtworkMinted.fromBcs(data),
      bcs: ArtworkMinted.bcs,
      fromJSONField: (field: any) => ArtworkMinted.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ArtworkMinted.fromJSON(json),
      fetch: async (client: SuiClient, id: string) =>
        ArtworkMinted.fetch(client, id),
      new: (fields: ArtworkMintedFields) => {
        return new ArtworkMinted(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return ArtworkMinted.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ArtworkMinted>> {
    return phantom(ArtworkMinted.reified());
  }
  static get p() {
    return ArtworkMinted.phantom();
  }

  static get bcs() {
    return bcs.struct("ArtworkMinted", {
      artwork_id: ID.bcs,
      artwork_number: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): ArtworkMinted {
    return ArtworkMinted.reified().new({
      artworkId: decodeFromFields(ID.reified(), fields.artwork_id),
      artworkNumber: decodeFromFields("u64", fields.artwork_number),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkMinted {
    if (!isArtworkMinted(item.type)) {
      throw new Error("not a ArtworkMinted type");
    }

    return ArtworkMinted.reified().new({
      artworkId: decodeFromFieldsWithTypes(
        ID.reified(),
        item.fields.artwork_id,
      ),
      artworkNumber: decodeFromFieldsWithTypes(
        "u64",
        item.fields.artwork_number,
      ),
    });
  }

  static fromBcs(data: Uint8Array): ArtworkMinted {
    return ArtworkMinted.fromFields(ArtworkMinted.bcs.parse(data));
  }

  toJSONField() {
    return {
      artworkId: this.artworkId,
      artworkNumber: this.artworkNumber.toString(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ArtworkMinted {
    return ArtworkMinted.reified().new({
      artworkId: decodeFromJSONField(ID.reified(), field.artworkId),
      artworkNumber: decodeFromJSONField("u64", field.artworkNumber),
    });
  }

  static fromJSON(json: Record<string, any>): ArtworkMinted {
    if (json.$typeName !== ArtworkMinted.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return ArtworkMinted.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): ArtworkMinted {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isArtworkMinted(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ArtworkMinted object`,
      );
    }
    return ArtworkMinted.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<ArtworkMinted> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching ArtworkMinted object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isArtworkMinted(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ArtworkMinted object`);
    }
    return ArtworkMinted.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}

/* ============================== ArtworkRecycled =============================== */

export function isArtworkRecycled(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkRecycled"
  );
}

export interface ArtworkRecycledFields {
  oldArtworkId: ToField<ID>;
  oldArtworkNumber: ToField<"u64">;
  newArtworkId: ToField<ID>;
  newArtworkNumber: ToField<"u64">;
}

export type ArtworkRecycledReified = Reified<
  ArtworkRecycled,
  ArtworkRecycledFields
>;

export class ArtworkRecycled {
  static readonly $typeName =
    "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkRecycled";
  static readonly $numTypeParams = 0;

  readonly $typeName = ArtworkRecycled.$typeName;

  readonly $fullTypeName: "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkRecycled";

  readonly oldArtworkId: ToField<ID>;
  readonly oldArtworkNumber: ToField<"u64">;
  readonly newArtworkId: ToField<ID>;
  readonly newArtworkNumber: ToField<"u64">;

  private constructor(fields: ArtworkRecycledFields) {
    this.$fullTypeName = ArtworkRecycled.$typeName;

    this.oldArtworkId = fields.oldArtworkId;
    this.oldArtworkNumber = fields.oldArtworkNumber;
    this.newArtworkId = fields.newArtworkId;
    this.newArtworkNumber = fields.newArtworkNumber;
  }

  static reified(): ArtworkRecycledReified {
    return {
      typeName: ArtworkRecycled.$typeName,
      fullTypeName: composeSuiType(
        ArtworkRecycled.$typeName,
        ...[],
      ) as "0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed::controller::ArtworkRecycled",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        ArtworkRecycled.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ArtworkRecycled.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ArtworkRecycled.fromBcs(data),
      bcs: ArtworkRecycled.bcs,
      fromJSONField: (field: any) => ArtworkRecycled.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ArtworkRecycled.fromJSON(json),
      fetch: async (client: SuiClient, id: string) =>
        ArtworkRecycled.fetch(client, id),
      new: (fields: ArtworkRecycledFields) => {
        return new ArtworkRecycled(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return ArtworkRecycled.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ArtworkRecycled>> {
    return phantom(ArtworkRecycled.reified());
  }
  static get p() {
    return ArtworkRecycled.phantom();
  }

  static get bcs() {
    return bcs.struct("ArtworkRecycled", {
      old_artwork_id: ID.bcs,
      old_artwork_number: bcs.u64(),
      new_artwork_id: ID.bcs,
      new_artwork_number: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): ArtworkRecycled {
    return ArtworkRecycled.reified().new({
      oldArtworkId: decodeFromFields(ID.reified(), fields.old_artwork_id),
      oldArtworkNumber: decodeFromFields("u64", fields.old_artwork_number),
      newArtworkId: decodeFromFields(ID.reified(), fields.new_artwork_id),
      newArtworkNumber: decodeFromFields("u64", fields.new_artwork_number),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkRecycled {
    if (!isArtworkRecycled(item.type)) {
      throw new Error("not a ArtworkRecycled type");
    }

    return ArtworkRecycled.reified().new({
      oldArtworkId: decodeFromFieldsWithTypes(
        ID.reified(),
        item.fields.old_artwork_id,
      ),
      oldArtworkNumber: decodeFromFieldsWithTypes(
        "u64",
        item.fields.old_artwork_number,
      ),
      newArtworkId: decodeFromFieldsWithTypes(
        ID.reified(),
        item.fields.new_artwork_id,
      ),
      newArtworkNumber: decodeFromFieldsWithTypes(
        "u64",
        item.fields.new_artwork_number,
      ),
    });
  }

  static fromBcs(data: Uint8Array): ArtworkRecycled {
    return ArtworkRecycled.fromFields(ArtworkRecycled.bcs.parse(data));
  }

  toJSONField() {
    return {
      oldArtworkId: this.oldArtworkId,
      oldArtworkNumber: this.oldArtworkNumber.toString(),
      newArtworkId: this.newArtworkId,
      newArtworkNumber: this.newArtworkNumber.toString(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ArtworkRecycled {
    return ArtworkRecycled.reified().new({
      oldArtworkId: decodeFromJSONField(ID.reified(), field.oldArtworkId),
      oldArtworkNumber: decodeFromJSONField("u64", field.oldArtworkNumber),
      newArtworkId: decodeFromJSONField(ID.reified(), field.newArtworkId),
      newArtworkNumber: decodeFromJSONField("u64", field.newArtworkNumber),
    });
  }

  static fromJSON(json: Record<string, any>): ArtworkRecycled {
    if (json.$typeName !== ArtworkRecycled.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return ArtworkRecycled.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): ArtworkRecycled {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isArtworkRecycled(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ArtworkRecycled object`,
      );
    }
    return ArtworkRecycled.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<ArtworkRecycled> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching ArtworkRecycled object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isArtworkRecycled(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ArtworkRecycled object`);
    }
    return ArtworkRecycled.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}
