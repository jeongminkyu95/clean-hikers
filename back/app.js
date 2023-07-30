import cors from "cors";
import express from "express";

import { userRouter } from "./src/user/userRouter.js";
import { commentRouter } from "./src/community_comment/commentRouter.js";
import { postRouter } from "./src/community/postRouter.js";
import { personRouter } from "./src/community_person/personRouter.js";
import { mainRouter } from "./src/main/mainRouter.js";
import { mountainRouter } from "./src/mountain/mountainRouter.js";
import { locationRouter } from "./src/community_location/locationRouter.js";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";

const app = express();

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

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`${port}에 연결되었습니다`);
});
