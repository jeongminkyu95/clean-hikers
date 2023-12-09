import { Mountain } from "../mongoDB/index.js";

class MountainService {
  static async readData(query) {
    const mountainName = query.mountain || null;
    const mountainLocation = query.location || null;
    const mountainDifficulty = query.level || null;
    const totalData = await Mountain.findData(
      mountainName,
      mountainLocation,
      mountainDifficulty
    );

    let page = Number(query.currentPage || 1);
    const perPage = 5;

    const total = totalData.length;

    const totalPage = Math.ceil(total / perPage);
    if (page > totalPage) {
      page = totalPage;
    }
    const currentPageList = totalData.slice(
      perPage * (page - 1),
      perPage * page
    );
    const result = {};

    for (let i = 0; i < currentPageList.length; i++) {
      if (currentPageList[i] == undefined) {
        result.mountain = currentPageList.slice(0, i);
        break;
      }
      if (i == currentPageList.length - 1) {
        result.mountain = currentPageList;
      }
    }
    result["maxPage"] = totalPage;
    return result;
  }

  static async readDataBasedGarbage() {
    const totalData = await Mountain.findData();

    const result = totalData
      .sort(function (a, b) {
        return -(a.trash - b.trash);
      })
      .slice(0, 4);

    return result;
  }
}

export { MountainService };
