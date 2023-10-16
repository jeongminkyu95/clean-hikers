import { User } from "../mongoDB/index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userService {
  // 유저 추가
  static async addUser({ email, nickname, password }) {
    // 유저 조회 by email
    const user = await User.findByEmail(email);
    // 이미 존재하는 유저라면 throw 에러
    if (user) {
      throw new Error("이미 존재하는 이메일 입니다");
    }

    // 이미 존재하는 닉네임이라면 throw 에러
    const nickExist = await User.findBynick(nickname);
    if (nickExist) {
      throw new Error("이미 존재하는 닉네임 입니다.");
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 생성
    const id = uuidv4();

    const newUser = { id, email, nickname, password: hashedPassword };

    // 유저 생성
    const createdNewUser = await User.create({ newUser });
    return createdNewUser;
  }

  // 로그인
  static async login({ email, password }) {
    try {
      // 유저 조회 by email
      const userEmail = await User.findByEmail(email);

      if (!userEmail) {
        throw new Error("해당 유저는 존재하지 않습니다");
      }

      // DB에 저장되어있는 비밀번호
      const correctPassword = userEmail.password;
      // 입력 받은 비밀번호와 DB에 있는 비밀번호와 비교
      const isPasswordRight = await bcrypt.compare(password, correctPassword);

      if (!isPasswordRight) {
        throw new Error("비밀번호가 틀렸습니다");
      }

      // test용 admin계정용
      if (userEmail.email == "admin@admin.com") {
        return "admin";
      }

      // 탈퇴한 유저라면 로그인 불가
      if (userEmail.deleted == true) {
        throw new Error("탈퇴한 유저입니다");
      }

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
    } catch (error) {
      throw error;
    }
  }

  // 유저 조회 by id
  static async findUserById(userID) {
    try {
      // 유저 조회 by id
      const user = await User.findByID(userID);
      if (!user) {
        throw new Error("해당 유저는 존재하지 않습니다.");
      }
      if (user.deleted == true) {
        throw new Error("해당 유저는 탈퇴한 유저입니다.");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  // 유저 조회 by email
  static async findUserByEmail(userMail) {
    try {
      // 유저 조회 by email
      const user = await User.findByEmail(userMail);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // 유저 조회 by nick
  static async findUserBynick(nick) {
    try {
      // 유저 조회 by nick
      const user = await User.findBynick(nick);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // 유저 닉네임 변경
  static async changeUserNickname(userID, newNickname) {
    try {
      const nickExist = await User.findBynick(newNickname);
      if (nickExist) {
        throw new Error("이미 존재하는 닉네임입니다.");
      }

      // 유저 닉네임 변경
      const currentUser = await User.findByIDandChangeNickname(
        userID,
        newNickname
      );
      if (!currentUser) {
        throw new Error("해당 유저는 존재하지 않습니다-nickname");
      }
      return currentUser;
    } catch (error) {
      throw error;
    }
  }

  // 유저 비밀번호 변경
  static async changeUserPassword(userID, newPassword) {
    try {
      // 입력받은 비밀번호 해쉬화
      const encryptPassword = await bcrypt.hash(newPassword, 10);
      const currentUser = await User.findByIDandChangePassword(
        userID,
        encryptPassword
      );
      if (!currentUser) {
        throw new Error("해당 유저는 존재하지 않습니다-password");
      }
      return currentUser;
    } catch (error) {
      throw error;
    }
  }

  // 유저 사진 변경
  static async changeUserImage(userID, imageString) {
    try {
      const createImage = await User.findByIDandChangePhoto(
        userID,
        imageString
      );
      if (!createImage) {
        throw new Error("해당 유저는 존재하지 않습니다");
      }
      return createImage;
    } catch (error) {
      throw error;
    }
  }

  // 유저 삭제
  static async deleteUser(id) {
    try {
      // 유저 삭제
      const deleteUser = await User.findByIDandDeleteUser(id);
      if (!deleteUser) {
        throw new Error("해당 유저는 존재하지 않습니다");
      }

      const result = {
        data: deleteUser,
        message: "해당 유저의 삭제가 완료되었습니다.",
      };
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export { userService };
