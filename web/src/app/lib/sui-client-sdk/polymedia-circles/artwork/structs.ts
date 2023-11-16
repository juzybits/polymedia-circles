import { String } from "../../_dependencies/source/0x1/string/structs";
import { UID } from "../../_dependencies/source/0x2/object/structs";
import { Encoding, bcsSource as bcs } from "../../_framework/bcs";
import { FieldsWithTypes, Type, compressSuiType } from "../../_framework/util";
import { Circle } from "../circle/structs";
import { SuiClient, SuiParsedData } from "@mysten/sui.js/client";

/* ============================== ARTWORK =============================== */

bcs.registerStructType(
  "0x72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83::artwork::ARTWORK",
  {
    dummy_field: `bool`,
  },
);

export function isARTWORK(type: Type): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83::artwork::ARTWORK"
  );
}

export interface ARTWORKFields {
  dummyField: boolean;
}

export class ARTWORK {
  static readonly $typeName =
    "0x72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83::artwork::ARTWORK";
  static readonly $numTypeParams = 0;

  readonly dummyField: boolean;

  constructor(dummyField: boolean) {
    this.dummyField = dummyField;
  }

  static fromFields(fields: Record<string, any>): ARTWORK {
    return new ARTWORK(fields.dummy_field);
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ARTWORK {
    if (!isARTWORK(item.type)) {
      throw new Error("not a ARTWORK type");
    }
    return new ARTWORK(item.fields.dummy_field);
  }

  static fromBcs(data: Uint8Array | string, encoding?: Encoding): ARTWORK {
    return ARTWORK.fromFields(bcs.de([ARTWORK.$typeName], data, encoding));
  }
}

/* ============================== Artwork =============================== */

bcs.registerStructType(
  "0x72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83::artwork::Artwork",
  {
    id: `0x2::object::UID`,
    number: `u64`,
    background_color: `0x1::string::String`,
    circles: `vector<0x72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83::circle::Circle>`,
    svg: `0x1::string::String`,
    frozen: `bool`,
  },
);

export function isArtwork(type: Type): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83::artwork::Artwork"
  );
}

export interface ArtworkFields {
  id: string;
  number: bigint;
  backgroundColor: string;
  circles: Array<Circle>;
  svg: string;
  frozen: boolean;
}

export class Artwork {
  static readonly $typeName =
    "0x72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83::artwork::Artwork";
  static readonly $numTypeParams = 0;

  readonly id: string;
  readonly number: bigint;
  readonly backgroundColor: string;
  readonly circles: Array<Circle>;
  readonly svg: string;
  readonly frozen: boolean;

  constructor(fields: ArtworkFields) {
    this.id = fields.id;
    this.number = fields.number;
    this.backgroundColor = fields.backgroundColor;
    this.circles = fields.circles;
    this.svg = fields.svg;
    this.frozen = fields.frozen;
  }

  static fromFields(fields: Record<string, any>): Artwork {
    return new Artwork({
      id: UID.fromFields(fields.id).id,
      number: BigInt(fields.number),
      backgroundColor: new TextDecoder()
        .decode(
          Uint8Array.from(String.fromFields(fields.background_color).bytes),
        )
        .toString(),
      circles: fields.circles.map((item: any) => Circle.fromFields(item)),
      svg: new TextDecoder()
        .decode(Uint8Array.from(String.fromFields(fields.svg).bytes))
        .toString(),
      frozen: fields.frozen,
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Artwork {
    if (!isArtwork(item.type)) {
      throw new Error("not a Artwork type");
    }
    return new Artwork({
      id: item.fields.id.id,
      number: BigInt(item.fields.number),
      backgroundColor: item.fields.background_color,
      circles: item.fields.circles.map((item: any) =>
        Circle.fromFieldsWithTypes(item),
      ),
      svg: item.fields.svg,
      frozen: item.fields.frozen,
    });
  }

  static fromBcs(data: Uint8Array | string, encoding?: Encoding): Artwork {
    return Artwork.fromFields(bcs.de([Artwork.$typeName], data, encoding));
  }

  static fromSuiParsedData(content: SuiParsedData) {
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
    const res = await client.getObject({ id, options: { showContent: true } });
    if (res.error) {
      throw new Error(
        `error fetching Artwork object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.content?.dataType !== "moveObject" ||
      !isArtwork(res.data.content.type)
    ) {
      throw new Error(`object at id ${id} is not a Artwork object`);
    }
    return Artwork.fromFieldsWithTypes(res.data.content);
  }
}
