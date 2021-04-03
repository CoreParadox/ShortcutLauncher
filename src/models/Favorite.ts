import { NativeImage } from "electron";

export default class Favorite {
    public defaultName!: string;
    public path!: string;
    public nickname?: string;
    public icon?: string;
    public added!: any;

    constructor(file:File) {
      this.defaultName = file.name;
      this.path = file.path;
      this.added = new Date();
  }
  
    public get name() {
      return this.nickname || this.defaultName;
    }
}