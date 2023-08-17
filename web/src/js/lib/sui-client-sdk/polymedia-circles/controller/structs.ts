import { ID } from "../../_dependencies/source/0x2/object/structs";
import { bcsSource as bcs } from "../../_framework/bcs";
import { FieldsWithTypes, Type } from "../../_framework/util";
import { Encoding } from "@mysten/bcs";

/* ============================== ArtworkBlended =============================== */

bcs.registerStructType("0x0::controller::ArtworkBlended", {
  artwork_a_id: `0x2::object::ID`,
  artwork_a_number: `u64`,
  artwork_b_id: `0x2::object::ID`,
  artwork_b_number: `u64`,
});

export function isArtworkBlended(type: Type): boolean {
  return type === "0x0::controller::ArtworkBlended";
}

export interface ArtworkBlendedFields {
  artworkAId: string;
  artworkANumber: bigint;
  artworkBId: string;
  artworkBNumber: bigint;
}

export class ArtworkBlended {
  static readonly $typeName = "0x0::controller::ArtworkBlended";
  static readonly $numTypeParams = 0;

  readonly artworkAId: string;
  readonly artworkANumber: bigint;
  readonly artworkBId: string;
  readonly artworkBNumber: bigint;

  constructor(fields: ArtworkBlendedFields) {
    this.artworkAId = fields.artworkAId;
    this.artworkANumber = fields.artworkANumber;
    this.artworkBId = fields.artworkBId;
    this.artworkBNumber = fields.artworkBNumber;
  }

  static fromFields(fields: Record<string, any>): ArtworkBlended {
    return new ArtworkBlended({
      artworkAId: ID.fromFields(fields.artwork_a_id).bytes,
      artworkANumber: BigInt(fields.artwork_a_number),
      artworkBId: ID.fromFields(fields.artwork_b_id).bytes,
      artworkBNumber: BigInt(fields.artwork_b_number),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkBlended {
    if (!isArtworkBlended(item.type)) {
      throw new Error("not a ArtworkBlended type");
    }
    return new ArtworkBlended({
      artworkAId: item.fields.artwork_a_id,
      artworkANumber: BigInt(item.fields.artwork_a_number),
      artworkBId: item.fields.artwork_b_id,
      artworkBNumber: BigInt(item.fields.artwork_b_number),
    });
  }

  static fromBcs(
    data: Uint8Array | string,
    encoding?: Encoding,
  ): ArtworkBlended {
    return ArtworkBlended.fromFields(
      bcs.de([ArtworkBlended.$typeName], data, encoding),
    );
  }
}

/* ============================== ArtworkBurned =============================== */

bcs.registerStructType("0x0::controller::ArtworkBurned", {
  artwork_id: `0x2::object::ID`,
  artwork_number: `u64`,
});

export function isArtworkBurned(type: Type): boolean {
  return type === "0x0::controller::ArtworkBurned";
}

export interface ArtworkBurnedFields {
  artworkId: string;
  artworkNumber: bigint;
}

export class ArtworkBurned {
  static readonly $typeName = "0x0::controller::ArtworkBurned";
  static readonly $numTypeParams = 0;

  readonly artworkId: string;
  readonly artworkNumber: bigint;

  constructor(fields: ArtworkBurnedFields) {
    this.artworkId = fields.artworkId;
    this.artworkNumber = fields.artworkNumber;
  }

  static fromFields(fields: Record<string, any>): ArtworkBurned {
    return new ArtworkBurned({
      artworkId: ID.fromFields(fields.artwork_id).bytes,
      artworkNumber: BigInt(fields.artwork_number),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkBurned {
    if (!isArtworkBurned(item.type)) {
      throw new Error("not a ArtworkBurned type");
    }
    return new ArtworkBurned({
      artworkId: item.fields.artwork_id,
      artworkNumber: BigInt(item.fields.artwork_number),
    });
  }

  static fromBcs(
    data: Uint8Array | string,
    encoding?: Encoding,
  ): ArtworkBurned {
    return ArtworkBurned.fromFields(
      bcs.de([ArtworkBurned.$typeName], data, encoding),
    );
  }
}

/* ============================== ArtworkFrozen =============================== */

bcs.registerStructType("0x0::controller::ArtworkFrozen", {
  artwork_id: `0x2::object::ID`,
  artwork_number: `u64`,
});

export function isArtworkFrozen(type: Type): boolean {
  return type === "0x0::controller::ArtworkFrozen";
}

export interface ArtworkFrozenFields {
  artworkId: string;
  artworkNumber: bigint;
}

export class ArtworkFrozen {
  static readonly $typeName = "0x0::controller::ArtworkFrozen";
  static readonly $numTypeParams = 0;

  readonly artworkId: string;
  readonly artworkNumber: bigint;

  constructor(fields: ArtworkFrozenFields) {
    this.artworkId = fields.artworkId;
    this.artworkNumber = fields.artworkNumber;
  }

  static fromFields(fields: Record<string, any>): ArtworkFrozen {
    return new ArtworkFrozen({
      artworkId: ID.fromFields(fields.artwork_id).bytes,
      artworkNumber: BigInt(fields.artwork_number),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkFrozen {
    if (!isArtworkFrozen(item.type)) {
      throw new Error("not a ArtworkFrozen type");
    }
    return new ArtworkFrozen({
      artworkId: item.fields.artwork_id,
      artworkNumber: BigInt(item.fields.artwork_number),
    });
  }

  static fromBcs(
    data: Uint8Array | string,
    encoding?: Encoding,
  ): ArtworkFrozen {
    return ArtworkFrozen.fromFields(
      bcs.de([ArtworkFrozen.$typeName], data, encoding),
    );
  }
}

/* ============================== ArtworkMinted =============================== */

bcs.registerStructType("0x0::controller::ArtworkMinted", {
  artwork_id: `0x2::object::ID`,
  artwork_number: `u64`,
  from_whitelist: `bool`,
});

export function isArtworkMinted(type: Type): boolean {
  return type === "0x0::controller::ArtworkMinted";
}

export interface ArtworkMintedFields {
  artworkId: string;
  artworkNumber: bigint;
  fromWhitelist: boolean;
}

export class ArtworkMinted {
  static readonly $typeName = "0x0::controller::ArtworkMinted";
  static readonly $numTypeParams = 0;

  readonly artworkId: string;
  readonly artworkNumber: bigint;
  readonly fromWhitelist: boolean;

  constructor(fields: ArtworkMintedFields) {
    this.artworkId = fields.artworkId;
    this.artworkNumber = fields.artworkNumber;
    this.fromWhitelist = fields.fromWhitelist;
  }

  static fromFields(fields: Record<string, any>): ArtworkMinted {
    return new ArtworkMinted({
      artworkId: ID.fromFields(fields.artwork_id).bytes,
      artworkNumber: BigInt(fields.artwork_number),
      fromWhitelist: fields.from_whitelist,
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkMinted {
    if (!isArtworkMinted(item.type)) {
      throw new Error("not a ArtworkMinted type");
    }
    return new ArtworkMinted({
      artworkId: item.fields.artwork_id,
      artworkNumber: BigInt(item.fields.artwork_number),
      fromWhitelist: item.fields.from_whitelist,
    });
  }

  static fromBcs(
    data: Uint8Array | string,
    encoding?: Encoding,
  ): ArtworkMinted {
    return ArtworkMinted.fromFields(
      bcs.de([ArtworkMinted.$typeName], data, encoding),
    );
  }
}

/* ============================== ArtworkRecycled =============================== */

bcs.registerStructType("0x0::controller::ArtworkRecycled", {
  old_artwork_id: `0x2::object::ID`,
  old_artwork_number: `u64`,
  new_artwork_id: `0x2::object::ID`,
  new_artwork_number: `u64`,
});

export function isArtworkRecycled(type: Type): boolean {
  return type === "0x0::controller::ArtworkRecycled";
}

export interface ArtworkRecycledFields {
  oldArtworkId: string;
  oldArtworkNumber: bigint;
  newArtworkId: string;
  newArtworkNumber: bigint;
}

export class ArtworkRecycled {
  static readonly $typeName = "0x0::controller::ArtworkRecycled";
  static readonly $numTypeParams = 0;

  readonly oldArtworkId: string;
  readonly oldArtworkNumber: bigint;
  readonly newArtworkId: string;
  readonly newArtworkNumber: bigint;

  constructor(fields: ArtworkRecycledFields) {
    this.oldArtworkId = fields.oldArtworkId;
    this.oldArtworkNumber = fields.oldArtworkNumber;
    this.newArtworkId = fields.newArtworkId;
    this.newArtworkNumber = fields.newArtworkNumber;
  }

  static fromFields(fields: Record<string, any>): ArtworkRecycled {
    return new ArtworkRecycled({
      oldArtworkId: ID.fromFields(fields.old_artwork_id).bytes,
      oldArtworkNumber: BigInt(fields.old_artwork_number),
      newArtworkId: ID.fromFields(fields.new_artwork_id).bytes,
      newArtworkNumber: BigInt(fields.new_artwork_number),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ArtworkRecycled {
    if (!isArtworkRecycled(item.type)) {
      throw new Error("not a ArtworkRecycled type");
    }
    return new ArtworkRecycled({
      oldArtworkId: item.fields.old_artwork_id,
      oldArtworkNumber: BigInt(item.fields.old_artwork_number),
      newArtworkId: item.fields.new_artwork_id,
      newArtworkNumber: BigInt(item.fields.new_artwork_number),
    });
  }

  static fromBcs(
    data: Uint8Array | string,
    encoding?: Encoding,
  ): ArtworkRecycled {
    return ArtworkRecycled.fromFields(
      bcs.de([ArtworkRecycled.$typeName], data, encoding),
    );
  }
}
