import { Table } from "../../_dependencies/source/0x2/table/structs";
import { bcsSource as bcs } from "../../_framework/bcs";
import { FieldsWithTypes, Type } from "../../_framework/util";
import { Encoding } from "@mysten/bcs";

/* ============================== Whitelist =============================== */

bcs.registerStructType("0x0::whitelist::Whitelist", {
  claims: `0x2::table::Table<address, 0x1::string::String>`,
});

export function isWhitelist(type: Type): boolean {
  return type === "0x0::whitelist::Whitelist";
}

export interface WhitelistFields {
  claims: Table;
}

export class Whitelist {
  static readonly $typeName = "0x0::whitelist::Whitelist";
  static readonly $numTypeParams = 0;

  readonly claims: Table;

  constructor(claims: Table) {
    this.claims = claims;
  }

  static fromFields(fields: Record<string, any>): Whitelist {
    return new Whitelist(
      Table.fromFields([`address`, `0x1::string::String`], fields.claims),
    );
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Whitelist {
    if (!isWhitelist(item.type)) {
      throw new Error("not a Whitelist type");
    }
    return new Whitelist(Table.fromFieldsWithTypes(item.fields.claims));
  }

  static fromBcs(data: Uint8Array | string, encoding?: Encoding): Whitelist {
    return Whitelist.fromFields(bcs.de([Whitelist.$typeName], data, encoding));
  }
}
