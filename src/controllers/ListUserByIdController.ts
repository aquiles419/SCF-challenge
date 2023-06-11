import { Request, Response } from "express";
import { fakeData } from "../database";

let userSearchCount: { [key: string]: number } = {};

export class ListUserByIdController {
  async listUserById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const user = fakeData.find((data) => data.id === id);

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      // Increments the counter for the specific ID
      userSearchCount[id] = (userSearchCount[id] || 0) + 1;

      return response.status(200).json(user);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "ErrorListUser" });
    }
  }

  getUserSearchCount(request: Request, response: Response): Response {
    try {
      const { id } = request.params;
      const searchCount = userSearchCount[id] || 0;

      return response.status(200).json({ count: searchCount });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ message: "Error retrieving user search count" });
    }
  }
}
