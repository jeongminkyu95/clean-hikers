import jwt from "jsonwebtoken";
import { NotLoginUser, TokenNotFoundError } from "../utils/CustomError.js";
import { throwIfNoData } from "../utils/throwIfNoData.js";

const loginRequired = (req, res, next) => {
  try {
    // 토큰이 없다면 로그인이 필요한 서비스라는 에러메시지 throw
    throwIfNoData(req.headers.authorization, NotLoginUser);

    const token = req.headers.authorization.split(" ")[1];

    if (token === process.env.AdminAuthorization) {
      // test용 admin계정.
      req.loginedUser = { id: process.env.Admin };
      return next();
    }

    req.loginedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 토큰과 user_id 일치 여부 체크
    if (req.params.userId) {
      if (req.params.userId !== req.loginedUser.id) {
        throw new NotLoginUser(); // 에러 내용 바꿀 예정
      }
    } else if (req.body.user_id) {
      if (req.body.user_id !== req.loginedUser.id) {
        throw new NotLoginUser();
      }
    }

    return next();
  } catch (error) {
    next(error);
  }
};

export { loginRequired };
