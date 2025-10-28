import { BaseAdapter } from "./base";

export class PrismaAdapter extends BaseAdapter {
  name: string = "prisma";
  client: any;

  constructor(client: any) {
    super(client);
  }

  async createSchemas() {}
}
