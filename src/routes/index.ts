import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";

const routes = Router();

const createUsersController = new CreateUserController();

routes.get("/healthcheck", (_request, response) =>
  response.json({ message: "ok" })
);

routes.post("/users", createUsersController.createtUser);

export default routes;
