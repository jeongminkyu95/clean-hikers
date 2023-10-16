import jwt from "jsonwebtoken";

const loginRequired = (req, res, next) => {
  try {
    // test용 admin계정.
    if (req.headers.authorization === process.env.AdminAuthorization) {
      req.loginedUser = { id: process.env.Admin };
      return next();
    }
    req.loginedUser = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    return next();
  } catch (error) {
    next(error);
  }
};

export { loginRequired };
