import { User } from "../mongoDB/index.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import {
  DuplicateEmailError,
  DuplicateNickError,
  UserNotFoundError,
  Unauthorized,
} from "../utils/CustomError.js";
import { throwErrorIfDataExists } from "../utils/throwErrorIfDataExists.js";

class UserService {
  // 유저 추가
  static async addUser({ email, nickname, password }) {
    // 유저 조회 by email
    const user = await User.checkByEmail(email);

    // 이미 존재하는 유저라면 throw 에러
    throwErrorIfDataExists(user, DuplicateEmailError);

    const nickExist = await User.checkByNick(nickname);

    // 이미 존재하는 닉네임이라면 throw 에러
    throwErrorIfDataExists(nickExist, DuplicateNickError);

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 생성
    const id = v4();

    const newUser = { id, email, nickname, password: hashedPassword };

    // 유저 생성
    const createdNewUser = await User.create({ newUser });
    return createdNewUser;
  }

  // 로그인
  static async login({ email, password }) {
    // 유저 조회 by email
    const userEmail = await User.findByEmail(email);

    // 조회된 유저가 없다면 UserNotFoundError 에러
    throwErrorIfDataExists(!userEmail, UserNotFoundError);

    // DB에 저장되어있는 비밀번호
    const correctPassword = userEmail.password;
    // 입력 받은 비밀번호와 DB에 있는 비밀번호와 비교
    const isPasswordRight = await bcrypt.compare(password, correctPassword);

    // 비밀번호가 틀리다면 Unauthorized 에러
    throwErrorIfDataExists(!isPasswordRight, Unauthorized);

    // test용 admin계정용
    if (userEmail.email == process.env.AdminEmail) {
      return process.env.AdminAuthorization;
    }

    // 탈퇴한 유저라면 로그인 불가
    throwErrorIfDataExists(userEmail.deleted == true, UserNotFoundError);

    const secretKey = process.env.JWT_SECRET_KEY;

    // 토큰발행
    const token = jwt.sign(
      {
        id: userEmail.id,
      },
      secretKey,
      {
        expiresIn: "30m",
      }
    );

    return token;
  }

  // 유저 조회 by id
  static async findUserById(userID) {
    // 유저 조회 by id
    const user = await User.findByID(userID);

    // 조회된 유저가 없다면 UserNotFoundError 에러
    throwErrorIfDataExists(!user, UserNotFoundError);

    // 조회된 유저가 탈퇴한 상태라면 UserNotFoundError 에러
    throwErrorIfDataExists(user.deleted == true, UserNotFoundError);

    return user;
  }

  // 이메일 중복확인
  static async findUserByEmail(userMail) {
    // 이메일 중복확인
    const user = await User.checkByEmail(userMail);
    return user;
  }

  // 닉네임 중복확인
  static async findUserByNick(nick) {
    // 닉네임 중복확인
    const user = await User.checkByNick(nick);
    return user;
  }

  // 유저 닉네임 변경
  static async changeUserNickname(userID, newNickname) {
    const nickExist = await User.checkByNick(newNickname);

    // 닉네임이 중복됐다면 DuplicateNickError 에러
    throwErrorIfDataExists(nickExist, DuplicateNickError);

    // 유저 닉네임 변경
    const currentUser = await User.findByIDandChangeNickname(
      userID,
      newNickname
    );
    return currentUser;
  }

  // 유저 비밀번호 변경
  static async changeUserPassword(userID, newPassword) {
    // 입력받은 비밀번호 해쉬화
    const encryptPassword = await bcrypt.hash(newPassword, 10);
    const currentUser = await User.findByIDandChangePassword(
      userID,
      encryptPassword
    );
    return currentUser;
  }

  // 유저 사진 변경
  static async changeUserImage(userID, imageString) {
    const createImage = await User.findByIDandChangePhoto(userID, imageString);

    return createImage;
  }

  // 유저 삭제
  static async deleteUser(id) {
    // 유저 삭제
    const deleteUser = await User.findByIDandDeleteUser(id);

    const result = {
      data: deleteUser,
      message: "해당 유저의 삭제가 완료되었습니다.",
    };
    return result;
  }
}

export { UserService };
