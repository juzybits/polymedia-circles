import { bcsSource as bcs } from "../../_framework/bcs";
import { FieldsWithTypes, Type } from "../../_framework/util";
import { Encoding } from "@mysten/bcs";

/* ============================== Circle =============================== */

bcs.registerStructType("0x0::circle::Circle", {
  red: `u8`,
  green: `u8`,
  blue: `u8`,
  radius: `u64`,
  x_axis: `u64`,
  y_axis: `u64`,
});

export function isCircle(type: Type): boolean {
  return type === "0x0::circle::Circle";
}

export interface CircleFields {
  red: number;
  green: number;
  blue: number;
  radius: bigint;
  xAxis: bigint;
  yAxis: bigint;
}

export class Circle {
  static readonly $typeName = "0x0::circle::Circle";
  static readonly $numTypeParams = 0;

  readonly red: number;
  readonly green: number;
  readonly blue: number;
  readonly radius: bigint;
  readonly xAxis: bigint;
  readonly yAxis: bigint;

  constructor(fields: CircleFields) {
    this.red = fields.red;
    this.green = fields.green;
    this.blue = fields.blue;
    this.radius = fields.radius;
    this.xAxis = fields.xAxis;
    this.yAxis = fields.yAxis;
  }

  static fromFields(fields: Record<string, any>): Circle {
    return new Circle({
      red: fields.red,
      green: fields.green,
      blue: fields.blue,
      radius: BigInt(fields.radius),
      xAxis: BigInt(fields.x_axis),
      yAxis: BigInt(fields.y_axis),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Circle {
    if (!isCircle(item.type)) {
      throw new Error("not a Circle type");
    }
    return new Circle({
      red: item.fields.red,
      green: item.fields.green,
      blue: item.fields.blue,
      radius: BigInt(item.fields.radius),
      xAxis: BigInt(item.fields.x_axis),
      yAxis: BigInt(item.fields.y_axis),
    });
  }

  static fromBcs(data: Uint8Array | string, encoding?: Encoding): Circle {
    return Circle.fromFields(bcs.de([Circle.$typeName], data, encoding));
  }
}
