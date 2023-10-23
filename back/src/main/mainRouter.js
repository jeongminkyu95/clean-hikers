import { Router } from "express";
import { mainService } from "./mainService.js";

const mainRouter = Router();

//데이터 조회
mainRouter.get("/data", async function (req, res, next) {
  try {
    const data = await mainService.getData();

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export { mainRouter };
