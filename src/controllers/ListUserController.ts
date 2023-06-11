import { Request, Response } from "express";
import { fakeData } from "../database";

export class ListUserController {
  async listUserById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const user = fakeData.find((data) => data.id === id);

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.status(200).json(user);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "ErrorListUser" });
    }
  }
}
