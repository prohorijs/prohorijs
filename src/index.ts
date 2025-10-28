import { BaseAdapter } from "./adapters/base";
import { BaseSchema } from "./schemas/base";
import { field } from "./schemas/types";
import { UserSchema } from "./schemas/user";
import { ProhoriConfig } from "./types";

export default class Prohori {
  appName: string;
  dbAdapter: BaseAdapter;
  config: ProhoriConfig;
  schemas: Record<string, BaseSchema> = {};
  constructor(
    appName: string,
    dbAdapter: BaseAdapter,
    config: ProhoriConfig,
    schemas?: {
      user?: { additionalFields: Record<string, field> };
      others?: Record<string, BaseSchema>;
    }
  ) {
    this.appName = appName;
    this.dbAdapter = dbAdapter;
    this.config = config;
    this.schemas = {
      user: new UserSchema({
        additionalFields: schemas?.user?.additionalFields || {},
      }),
      ...(schemas?.others || {}),
    };
  }

  get details() {
    return {
      appName: this.appName,
      dbAdapter: this.dbAdapter.name,
      schemas: this.schemas,
      config: this.config,
    };
  }
}
