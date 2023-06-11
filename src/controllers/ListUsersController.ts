import { Request, Response } from "express";
import { fakeData } from "../database";

export class ListUsersController {
  async listUsers(_request: Request, response: Response): Promise<Response> {
    try {
      return response.status(200).json(fakeData);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "ErrorListingUsers" });
    }
  }
}
