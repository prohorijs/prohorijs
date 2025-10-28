interface reference {
  name?: string;
  reference: string;
  field: string;
  many?: boolean;
}

export interface field {
  type: "string" | "number" | "boolean" | "datetime" | "object";
  required?: boolean;
  unique?: boolean;
  description?: string;
  reference?: reference;
}

export interface Schema {
  name: string;
  defaultFields: Record<string, field>;
  additionalFields: Record<string, field>;
}
