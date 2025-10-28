export abstract class BaseAdapter {
  name: string = "base";
  client: any;
  constructor(client: any) {
    this.client = client;
  }

  abstract createSchemas(): Promise<void>;
}
