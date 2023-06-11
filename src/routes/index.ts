import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { accountVerify } from "../middleware";
import { ListUserController } from "../controllers/ListUserController";

const routes = Router();

const createUsersController = new CreateUserController();
const listUser = new ListUserController();

routes.get("/healthcheck", (_request, response) =>
  response.json({ message: "ok" })
);

routes.post("/users", createUsersController.createtUser);
routes.get("/users/:id", listUser.listUserById);

export default routes;
