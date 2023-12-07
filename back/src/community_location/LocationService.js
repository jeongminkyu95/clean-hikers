import { Mountain } from "../mongoDB/index.js";

class LocationService {
  static async getData() {
    return await Mountain.findData();
  }
}

export { LocationService };
