import { Request, Response } from "express";
import { fakeData } from "../database";

export class DeleteUserController {
  async deleteUserById(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;

      const userIndex = fakeData.findIndex((data) => data.id === id);

      if (userIndex === -1) {
        return response.status(404).json({ error: "User not found" });
      }

      fakeData.splice(userIndex, 1);

      return response
        .status(200)
        .json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "ErrorDeletingUser" });
    }
  }
}
