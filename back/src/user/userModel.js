import { UserModel } from "./userSchema.js";

class User {
  // 유저 생성
  static async create({ newUser }) {
    return await UserModel.create(newUser);
  }

  // 유저 조회 by email
  static async findByEmail(userMail) {
    const findUser = await UserModel.findOne({ email: userMail }).select(
      "id email password deleted"
    );
    return findUser;
  }

  // 유저 조회 by id
  static async findByID(id) {
    const findUser = await UserModel.findOne({ id: id });
    return findUser;
  }

  // email check
  static async checkByEmail(email) {
    return await UserModel.findOne({ email: email }).select("email");
  }

  // nick check
  static async checkByNick(nick) {
    return await UserModel.findOne({ nickname: nick }).select("nick");
  }

  // posts participants 필드에 넣기위한 user_id
  static async findByIdToParticipate(id) {
    return await UserModel.findOne({ id: id }).select("-_id id nickname");
  }

  // 유저 조회 후 닉네임 변경
  static async findByIDandChangeNickname(userID, changingData) {
    const changedUser = await UserModel.findOneAndUpdate(
      { id: userID },
      { nickname: changingData },
      { returnOriginal: false }
    );
    return changedUser;
  }

  // 유저 조회 후 비밀번호 변경
  static async findByIDandChangePassword(userID, changingData) {
    const changedUser = await UserModel.findOneAndUpdate(
      { id: userID },
      { password: changingData }
    );
    return changedUser;
  }

  // 유저 조회 후 사진 변경
  static async findByIDandChangePhoto(userID, image) {
    const changedImage = await UserModel.findOneAndUpdate(
      { id: userID },
      { defaultImage: image }
    );
    return changedImage;
  }

  // 유저 조회 후 삭제
  static async findByIDandDeleteUser(id) {
    const deletedUser = await UserModel.findOneAndUpdate(
      { id: id },
      { deleted: true }
    );
    return deletedUser;
  }
}

export { User };
