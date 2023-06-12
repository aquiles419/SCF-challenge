import { Request, Response } from "express";
import { ListUserByIdController } from "../controllers/ListUserByIdController";
import { fakeData } from "../database";

describe("ListUserByIdController", () => {
  let controller: ListUserByIdController;
  let request: Request;
  let response: Response;

  beforeEach(() => {
    controller = new ListUserByIdController();
    request = {} as Request;
    response = {} as Response;
    response.status = jest.fn().mockReturnThis();
    response.json = jest.fn().mockReturnThis();
    console.error = jest.fn();
    controller["userSearchCount"] = {};
  });

  describe("listUserById", () => {
    it("should return the user if found", async () => {
      const userId = "user123";
      request.params = { id: userId };

      const user = { id: userId, name: "John Doe", job: "dev" };
      fakeData.push(user);

      await controller.listUserById(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(user);
    });

    it("should return 404 if user is not found", async () => {
      const userId = "user1234";
      request.params = { id: userId };

      await controller.listUserById(request, response);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    it("should return 500 if an error occurs", async () => {
      const userId = "user123";
      request.params = { id: userId };

      const error = new Error("Test error");
      fakeData.find = jest.fn(() => {
        throw error;
      });

      await controller.listUserById(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: "ErrorListUser" });
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe("getUserSearchCount", () => {
    it("should return the search count for a user", () => {
      const userId = "user123";
      request.params = { id: userId };

      controller.getUserSearchCount(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should return 0 if search count is not available", () => {
      const userId = "user1234";
      request.params = { id: userId };

      controller.getUserSearchCount(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ count: 0 });
    });
  });
});
