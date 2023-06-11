import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { accountVerify } from "../middleware";
import { ListUserByIdController } from "../controllers/ListUserByIdController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { DeleteUserController } from "../controllers/DeleteUserController";

const routes = Router();

const createUsersController = new CreateUserController();
const listUser = new ListUserByIdController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();

routes.get("/healthcheck", (_request, response) =>
  response.json({ message: "ok" })
);

routes.post("/users", createUsersController.createtUser);
routes.get("/users/:id", listUser.listUserById);
routes.put("/users/:id", accountVerify, updateUser.updateUserById);
routes.delete("/users/:id", accountVerify, deleteUser.deleteUserById);

export default routes;
