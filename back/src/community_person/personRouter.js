import { Router } from "express";
import { PersonService } from "./PersonService.js";
import { loginRequired } from "../middlewares/loginRequired.js";

const personRouter = Router();

// 모집인원 추가
personRouter.post(
  "/posts/:post_id/participants",
  loginRequired,
  async function (req, res, next) {
    try {
      const newPerson = await PersonService.addPerson(req.body);

      res.status(201).json(newPerson);
    } catch (error) {
      next(error);
    }
  }
);

export { personRouter };
