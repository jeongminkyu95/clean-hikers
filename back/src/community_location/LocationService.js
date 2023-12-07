import { Mountain } from "../mongoDB/index.js";

class LocationService {
  static async getData() {
    return await Mountain.findData();
  }

  static async detailLocation() {
    const data = await Mountain.findData();
  }
}

export { LocationService };
