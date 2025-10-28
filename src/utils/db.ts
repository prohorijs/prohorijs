import { writeFile } from "fs/promises";
import { field, Schema } from "../schemas/types";

export async function generatePrismaSchema(schemas: Schema) {
  let schemaText = `datasource db {\n  provider = "postgresql"\n  url = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\n`;

  for (const [schemaName, schemaObj] of Object.entries(schemas)) {
    schemaText += `model ${schemaName} {\n`;

    const fields: Record<string, field> = {
      ...schemaObj.defaultFields,
      ...schemaObj.additionalFields,
    };

    for (const [fieldName, def] of Object.entries(fields)) {
      let prismaType = "String"; // default

      if (def.type === "number") prismaType = "Int";
      if (def.type === "boolean") prismaType = "Boolean";
      if (def.type === "datetime") prismaType = "DateTime";

      schemaText += `  ${fieldName} ${prismaType}`;

      if (def.required) schemaText += " @required";
      if (def.unique) schemaText += " @unique";

      schemaText += "\n";
    }

    schemaText += "}\n\n";
  }
  await writeFile("prisma/schema.prisma", schemaText);
}
