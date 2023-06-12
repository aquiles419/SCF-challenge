import { Request, Response } from "express";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { fakeData } from "../database";

describe("DeleteUserController", () => {
  let controller: DeleteUserController;
  let request: Request;
  let response: Response;

  beforeEach(() => {
    controller = new DeleteUserController();
    request = {} as Request;
    response = {} as Response;
    response.status = jest.fn().mockReturnThis();
    response.json = jest.fn().mockReturnThis();
    console.error = jest.fn();
  });

  it("should delete a user successfully", async () => {
    const userId = "user123";
    request.params = { id: userId };

    const fakeDataLengthBefore = fakeData.length;

    fakeData.push({
      id: userId,
      name: "John Doe",
      job: "dev",
    });

    await controller.deleteUserById(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: "User deleted successfully",
    });
    expect(fakeData.length).toBe(fakeDataLengthBefore);

    const deletedUser = fakeData.find((data) => data.id === userId);
    expect(deletedUser).toBeUndefined();
  });

  it("should return 404 if user is not found", async () => {
    const userId = "user123";
    request.params = { id: userId };

    await controller.deleteUserById(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should return 500 if an error occurs", async () => {
    const userId = "user123";
    request.params = { id: userId };

    const error = new Error("Test error");
    fakeData.findIndex = jest.fn(() => {
      throw error;
    });

    await controller.deleteUserById(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: "ErrorDeletingUser",
    });
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
