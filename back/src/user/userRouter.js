import { Router } from "express";
import { userService } from "./userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";

const userRouter = Router();

// 회원가입
userRouter.post("/register", async (req, res, next) => {
  try {
    // 유저생성
    const newUser = await userService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 이메일 중복 확인
userRouter.post("/email-check", async (req, res, next) => {
  try {
    // 이메일 조회
    const emailExist = await userService.findUserByEmail(req.body.email);
    if (!emailExist) {
      res.status(201).json({ message: "사용할 수 있는 이메일입니다" });
    } else {
      res.status(200).json({ message: "중복 된 이메일입니다" });
    }
  } catch (error) {
    next(error);
  }
});

// 닉네임 중복 확인
userRouter.post("/nick-check", async (req, res, next) => {
  try {
    // 닉네임 조회
    const nickExist = await userService.findUserBynick(req.body.nickname);
    if (!nickExist) {
      res.status(201).json({ message: "사용할 수 있는 닉네임입니다" });
    } else {
      res.status(200).json({ message: "사용할 수 없는 닉네임입니다" });
    }
  } catch (error) {
    next(error);
  }
});

// 로그인
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const login = await userService.login({ email, password });
    res.status(201).json({ jwt: login });
  } catch (error) {
    next(error);
  }
});

// 유저페이지
userRouter.get("/user-page", loginRequired, async (req, res, next) => {
  try {
    // 유저 조회 by id
    const user = await userService.findUserById(req.loginedUser.id);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// 닉네임 변경
userRouter.put("/nickname", loginRequired, async (req, res, next) => {
  try {
    // 유저 닉네임 변경
    const currentUser = await userService.changeUserNickname(
      req.loginedUser.id,
      req.body.nickname
    );
    res.status(201).json(currentUser);
  } catch (error) {
    next(error);
  }
});

// 비밀번호 변경
userRouter.put("/password", loginRequired, async (req, res, next) => {
  try {
    // 유저 비밀번호 변경
    const currentUser = await userService.changeUserPassword(
      req.loginedUser.id,
      req.body.password
    );
    res.status(201).json(currentUser);
  } catch (error) {
    next(error);
  }
});

// 사진 변경
userRouter.put("/picture", loginRequired, async (req, res, next) => {
  try {
    // 유저 사진 변경
    const currentUser = await userService.changeUserImage(
      req.loginedUser.id,
      req.body.image
    );
    res.status(201).json(currentUser);
  } catch (error) {
    next(error);
  }
});

// 회원 탈퇴
userRouter.delete("/", loginRequired, async (req, res, next) => {
  try {
    // 유저 삭제 by id
    const currentUser = await userService.deleteUser(req.loginedUser.id);

    res.status(201).json(currentUser);
  } catch (error) {
    next(error);
  }
});
export { userRouter };
