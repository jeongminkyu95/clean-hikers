import { connect } from "mongoose";
import { User } from "../user/userModel.js";
import { Post, Comment } from "../community/communtiyModel.js";
import { Mountain } from "../mountain/mountainModel.js";

// import { Mountain } from "../mountain/mountainModel.js";
//ejs 모듈에서도 _dirname 사용하기 위한 코드
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

console.log(__dirname);
const MONGODB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

connect(MONGODB_URL)
  .then(() => console.log("MongoDB와 연결에 성공했습니다"))
  .catch((error) => console.error(error));

export { User, Post, Comment, Mountain };
