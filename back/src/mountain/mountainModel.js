import { MountainModel } from "./mountainSchema.js";

class Mountain {
  static async totalMountainData() {
    return await MountainModel.countDocuments({});
  }

  static async findData(mountain, location, level) {
    const regex = (pattern) => new RegExp(`.*${pattern}.*`);
    // console.log(mountain, location, level);
    const mountainRegex = regex(mountain);
    const locationRegex = regex(location);
    const difficultyRegex = regex(level);
    var searchJson = {};

    if (mountain) {
      searchJson.name = { $regex: mountainRegex };
    }
    if (location) {
      searchJson.address = { $regex: locationRegex };
    }
    if (level) {
      searchJson.difficulty = { $regex: difficultyRegex };
    }
    // console.log(searchJson);

    return await MountainModel.find(searchJson);
  }
}

export { Mountain };
