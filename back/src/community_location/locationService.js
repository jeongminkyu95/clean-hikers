import { Mountain } from "../mongoDB/index.js";

class locationService {
  static async getData() {
    return await Mountain.findData();
  }

  static async detailLocation() {
    const data = await Mountain.findData();
  }
}

export { locationService };
