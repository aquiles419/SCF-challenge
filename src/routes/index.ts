import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { accountVerify } from "../middleware";
import { ListUserByIdController } from "../controllers/ListUserByIdController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { ListUsersController } from "../controllers/ListUsersController";

const routes = Router();

const createUsersController = new CreateUserController();
const listUser = new ListUserByIdController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();
const listUsers = new ListUsersController();

routes.get("/healthcheck", (_request, response) =>
  response.json({ message: "ok" })
);

routes.post("/users", createUsersController.createtUser);
routes.get("/users/:id", accountVerify, listUser.listUserById);
routes.put("/users/:id", accountVerify, updateUser.updateUserById);
routes.delete("/users/:id", accountVerify, deleteUser.deleteUserById);
routes.get("/users", accountVerify, listUsers.listUsers);
routes.get("/users/count/:id", accountVerify, listUser.getUserSearchCount);

export default routes;
