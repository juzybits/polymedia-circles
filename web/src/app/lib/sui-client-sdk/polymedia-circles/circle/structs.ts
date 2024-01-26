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

/* ============================== Circle =============================== */

export function isCircle(type: string): boolean {
  type = compressSuiType(type);
  return (
    type ===
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::circle::Circle"
  );
}

export interface CircleFields {
  red: ToField<"u8">;
  green: ToField<"u8">;
  blue: ToField<"u8">;
  radius: ToField<"u64">;
  xAxis: ToField<"u64">;
  yAxis: ToField<"u64">;
}

export type CircleReified = Reified<Circle, CircleFields>;

export class Circle {
  static readonly $typeName =
    "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::circle::Circle";
  static readonly $numTypeParams = 0;

  readonly $typeName = Circle.$typeName;

  readonly $fullTypeName: "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::circle::Circle";

  readonly red: ToField<"u8">;
  readonly green: ToField<"u8">;
  readonly blue: ToField<"u8">;
  readonly radius: ToField<"u64">;
  readonly xAxis: ToField<"u64">;
  readonly yAxis: ToField<"u64">;

  private constructor(fields: CircleFields) {
    this.$fullTypeName = Circle.$typeName;

    this.red = fields.red;
    this.green = fields.green;
    this.blue = fields.blue;
    this.radius = fields.radius;
    this.xAxis = fields.xAxis;
    this.yAxis = fields.yAxis;
  }

  static reified(): CircleReified {
    return {
      typeName: Circle.$typeName,
      fullTypeName: composeSuiType(
        Circle.$typeName,
        ...[],
      ) as "0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092::circle::Circle",
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => Circle.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        Circle.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Circle.fromBcs(data),
      bcs: Circle.bcs,
      fromJSONField: (field: any) => Circle.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Circle.fromJSON(json),
      fetch: async (client: SuiClient, id: string) => Circle.fetch(client, id),
      new: (fields: CircleFields) => {
        return new Circle(fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return Circle.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Circle>> {
    return phantom(Circle.reified());
  }
  static get p() {
    return Circle.phantom();
  }

  static get bcs() {
    return bcs.struct("Circle", {
      red: bcs.u8(),
      green: bcs.u8(),
      blue: bcs.u8(),
      radius: bcs.u64(),
      x_axis: bcs.u64(),
      y_axis: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): Circle {
    return Circle.reified().new({
      red: decodeFromFields("u8", fields.red),
      green: decodeFromFields("u8", fields.green),
      blue: decodeFromFields("u8", fields.blue),
      radius: decodeFromFields("u64", fields.radius),
      xAxis: decodeFromFields("u64", fields.x_axis),
      yAxis: decodeFromFields("u64", fields.y_axis),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Circle {
    if (!isCircle(item.type)) {
      throw new Error("not a Circle type");
    }

    return Circle.reified().new({
      red: decodeFromFieldsWithTypes("u8", item.fields.red),
      green: decodeFromFieldsWithTypes("u8", item.fields.green),
      blue: decodeFromFieldsWithTypes("u8", item.fields.blue),
      radius: decodeFromFieldsWithTypes("u64", item.fields.radius),
      xAxis: decodeFromFieldsWithTypes("u64", item.fields.x_axis),
      yAxis: decodeFromFieldsWithTypes("u64", item.fields.y_axis),
    });
  }

  static fromBcs(data: Uint8Array): Circle {
    return Circle.fromFields(Circle.bcs.parse(data));
  }

  toJSONField() {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue,
      radius: this.radius.toString(),
      xAxis: this.xAxis.toString(),
      yAxis: this.yAxis.toString(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Circle {
    return Circle.reified().new({
      red: decodeFromJSONField("u8", field.red),
      green: decodeFromJSONField("u8", field.green),
      blue: decodeFromJSONField("u8", field.blue),
      radius: decodeFromJSONField("u64", field.radius),
      xAxis: decodeFromJSONField("u64", field.xAxis),
      yAxis: decodeFromJSONField("u64", field.yAxis),
    });
  }

  static fromJSON(json: Record<string, any>): Circle {
    if (json.$typeName !== Circle.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return Circle.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): Circle {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isCircle(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a Circle object`,
      );
    }
    return Circle.fromFieldsWithTypes(content);
  }

  static async fetch(client: SuiClient, id: string): Promise<Circle> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching Circle object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isCircle(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a Circle object`);
    }
    return Circle.fromBcs(fromB64(res.data.bcs.bcsBytes));
  }
}
