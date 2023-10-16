import cors from "cors";
import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { userRouter } from "./user/userRouter.js";
import { commentRouter } from "./community_comment/commentRouter.js";
import { postRouter } from "./community/postRouter.js";
import { personRouter } from "./community_person/personRouter.js";
import { mainRouter } from "./main/mainRouter.js";
import { mountainRouter } from "./mountain/mountainRouter.js";
import { locationRouter } from "./community_location/locationRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// log 파일 경로와 write stream 생성
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
// CORS 에러 방지
app.use(cors());

app.use(
  express.json({
    limit: "1mb",
  })
);
app.use(
  express.urlencoded({
    limit: "1mb",
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

//라우터 추가
app.use("/user", userRouter);
app.use("/community", postRouter);
app.use("/community", commentRouter);
app.use("/community", personRouter);
app.use("/community", locationRouter);
app.use("/main", mainRouter);
app.use("/mountain", mountainRouter);

app.use(errorMiddleware);

export { app };
