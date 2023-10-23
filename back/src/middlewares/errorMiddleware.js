function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log(
    "\x1b[31m%s\x1b[37m%s\x1b[33m%s\x1b[31m%s\x1b[0m",
    `${"-".repeat(33)}\n`,
    `${new Date().toLocaleString("ko-KR")}\n`,
    `${error.stack}\n`,
    `${"-".repeat(33)}\n`
  );

  switch (error.name) {
    case "ValidationError":
      return res.status(400).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "NotLoginUser":
      return res.status(401).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "JsonWebTokenError":
      return res.status(401).json({
        error: {
          name: error.name,
          message: "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.",
        },
      });
    case "InvalidTokenError":
      return res.status(401).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "UserNotFoundError":
      return res.status(404).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "DuplicateEmailError":
      return res.status(409).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "DuplicateNickError":
      return res.status(409).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "PostNotFoundError":
      return res.status(404).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    default:
      return res.status(400).send(error.message);
  }
}

export { errorMiddleware };
