class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotLoginUser extends Error {
  constructor(message) {
    super(message);
    this.name = "NotLoginUser";
    this.message = "로그인한 유저만 사용할 수 있는 서비스입니다.";
  }
}
class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidTokenError";
    this.message = "토큰이 유효하지 않습니다.";
  }
}
class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError";
    this.message = "존재하지 않는 유저입니다. 다시 한 번 확인해 주세요.";
  }
}
class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.message = "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
  }
}
class DuplicateEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateEmailError";
    this.message =
      "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
  }
}
class DuplicateNickError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateNickError";
    this.message =
      "이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요.";
  }
}
class PostNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "PostNotFoundError";
    this.message = "게시글이 존재하지 않습니다.";
  }
}
export {
  ValidationError,
  NotLoginUser,
  InvalidTokenError,
  Unauthorized,
  UserNotFoundError,
  DuplicateEmailError,
  DuplicateNickError,
  PostNotFoundError,
};
