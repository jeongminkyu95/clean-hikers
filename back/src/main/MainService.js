import { Mountain } from "../mongoDB/index.js";

class MainService {
  static async getData() {
    const data = await Mountain.findData();

    return data;
  }
}

export { MainService };
