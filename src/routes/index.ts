import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { accountVerify } from "../middleware";
import { ListUserController } from "../controllers/ListUserController";
import { UpdateUserController } from "../controllers/UpdateUserController";

const routes = Router();

const createUsersController = new CreateUserController();
const listUser = new ListUserController();
const updateUser = new UpdateUserController();

routes.get("/healthcheck", (_request, response) =>
  response.json({ message: "ok" })
);

routes.post("/users", createUsersController.createtUser);
routes.get("/users/:id", listUser.listUserById);
routes.put("/users/:id", accountVerify, updateUser.updateUserById);

export default routes;
