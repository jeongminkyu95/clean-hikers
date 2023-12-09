import { MountainModel } from "./mountainSchema.js";

class Mountain {
  static async totalMountainData() {
    return await MountainModel.countDocuments({});
  }

  static async findData(mountain, location, level) {
    const regex = (pattern) => new RegExp(`.*${pattern}.*`);
    const mountainRegex = regex(mountain);
    const locationRegex = regex(location);
    const difficultyRegex = regex(level);
    let searchJson = {};

    if (mountain) {
      searchJson.name = { $regex: mountainRegex };
    }
    if (location) {
      searchJson.address = { $regex: locationRegex };
    }
    if (level) {
      searchJson.difficulty = { $regex: difficultyRegex };
    }

    return await MountainModel.find(searchJson).sort({ name: 1 });
  }
}

export { Mountain };
