import { Router } from "express";
import { MainService } from "./MainService.js";

const mainRouter = Router();

//데이터 조회
mainRouter.get("/data", async function (req, res, next) {
  try {
    const data = await MainService.getData();

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export { mainRouter };
