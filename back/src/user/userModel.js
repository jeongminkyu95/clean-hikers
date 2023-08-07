import { UserModel } from "./userSchema.js";

class User {
  //추후 해당하는 기능 추가 예정

  //1.계정 생성
  static async create({ newUser }) {
    return await UserModel.create(newUser);
  }

  static async findByEmail({ email }) {
    const findUser = await UserModel.find({ email: email });
    for (var i = 0; i < findUser.length; i++) {
      if (findUser[i].deleted == false) {
        const result = findUser[i];
        return result;
      }
    }
    throw new Error("유저가 존재하지 않습니다.");
  }

  static async findByID(id) {
    const findUser = await UserModel.findOne({ id: id });
    if (!findUser) {
      throw new Error("유저가 존재하지 않습니다.");
    }
    return findUser;
  }

  static async findByIDandChangeNickname(userID, changingData) {
    const filter = {
      id: userID,
    };
    const update = {
      nickname: changingData,
    };
    const option = { returnOriginal: false };
    const changedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return changedUser;
  }

  static async findByIDandChangePassword(userID, changingData) {
    const filter = {
      id: userID,
    };
    const update = {
      password: changingData,
    };

    const changedUser = await UserModel.findOneAndUpdate(filter, update);
    console.log("password changed : ", changedUser.password);
    return changedUser;
  }

  static async findByIDandChangePhoto(userID, image) {
    const filter = {
      id: userID,
    };
    const update = {
      defaultImage: image,
    };

    const changedImage = await UserModel.findOneAndUpdate(filter, update);
    console.log("image changed", changedImage.defaultImage);
    return changedImage;
  }

  static async findByIDandDeleteUser(id) {
    const filter = {
      id: id,
    };
    const deleted = {
      deleted: true,
    };
    const deletedUser = await UserModel.findOneAndUpdate(filter, deleted);
    return deletedUser;
  }
}

export { User };
