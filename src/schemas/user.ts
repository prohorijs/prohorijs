import { hashPassword, verifyPassword } from "../utils/hash";
import { BaseSchema } from "./base";
import { field } from "./types";

export class UserSchema extends BaseSchema {
  name: string = "user";
  constructor({
    additionalFields,
  }: {
    additionalFields: Record<string, field>;
  }) {
    const defaultFields: Record<string, field> = {
      email: {
        type: "string",
        required: true,
        unique: true,
      },
      password: {
        type: "string",
        required: true,
      },
    };
    super({
      defaultFields,
      additionalFields,
    });
    this.additionalFields = additionalFields;
  }

  hashPassword(password: string) {
    return hashPassword(password);
  }

  verifyPassword(password: string, hashed: string) {
    return verifyPassword(password, hashed);
  }
}
