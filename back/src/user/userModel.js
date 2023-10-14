import { UserModel } from "./userSchema.js";

class User {
  // 유저 생성
  static async create({ newUser }) {
    return await UserModel.create(newUser);
  }

  // 유저 조회 by email
  static async findByEmail({ email }) {
    const findUser = await UserModel.findOne({ email: email });
    return findUser;
  }

  // 유저 조회 by id
  static async findByID(id) {
    const findUser = await UserModel.findOne({ id: id });
    if (!findUser) {
      throw new Error("유저가 존재하지 않습니다.");
    }
    return findUser;
  }

  // 유저 조회 후 닉네임 변경
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

  // 유저 조회 후 비밀번호 변경
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

  // 유저 조회 후 사진 변경
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

  // 유저 조회 후 삭제
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
