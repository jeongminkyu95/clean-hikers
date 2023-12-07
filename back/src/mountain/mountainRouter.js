import { Router } from "express";
import { MountainService } from "./MountainService.js";

const mountainRouter = Router();

mountainRouter.get("/", function (req, res, next) {
  // console.log(req.query);
  // console.log(req.params);
  res.send("this is mountainRouter");
});

mountainRouter.get("/detail", async function (req, res, next) {
  try {
    const queryData = req.query;
    const result = await MountainService.readData(queryData);

    res.status(200).json(result);
    // const readData = await
  } catch (error) {
    next(error);
  }
});

mountainRouter.get("/most-garbage", async function (req, res, next) {
  try {
    const result = await MountainService.readDataBasedGarbage();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
export { mountainRouter };
