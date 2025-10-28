import * as yup from "yup";
import { field } from "./types";

export abstract class BaseSchema {
  name: string = "base";
  defaultFields: Record<string, field> = {};
  additionalFields?: Record<string, field> = {};

  constructor({
    defaultFields,
    additionalFields,
  }: {
    defaultFields: Record<string, field>;
    additionalFields?: Record<string, field>;
  }) {
    this.defaultFields = defaultFields;
    this.additionalFields = additionalFields;
  }

  get yupSchema() {
    const yupShape: Record<string, any> = {};

    const allFields = {
      ...this.defaultFields,
      ...this.additionalFields,
    };

    for (const [key, def] of Object.entries(allFields)) {
      let schema;

      switch (def.type) {
        case "string":
          schema = yup.string();
          break;
        case "number":
          schema = yup.number();
          break;
        case "boolean":
          schema = yup.boolean();
          break;
        case "datetime":
          schema = yup.date();
          break;
        case "object":
          schema = yup.object(); // can expand later
          break;
        default:
          throw new Error(`Unsupported field type: ${def.type}`);
      }

      if (def.required) schema = schema.required(`${key} is required`);
      yupShape[key] = schema;
    }

    return yup.object().shape(yupShape);
  }
}
