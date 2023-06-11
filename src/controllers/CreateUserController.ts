import { Request, Response } from "express";
import { fakeData } from "../database";
import { v4 as uuidV4 } from "uuid";

export class CreateUserController {
  async createtUser(request: Request, response: Response): Promise<Response> {
    try {
      const { id, name, job } = request.body;

      const userAlreadyExists = fakeData.some((data) => data.id === id);

      const userAlreadyExistsByName = fakeData.some(
        (data) => data.name === name
      );

      if (userAlreadyExists) {
        return response.status(400).json({ error: "User already exists" });
      }

      if (userAlreadyExistsByName) {
        return response
          .status(400)
          .json({ error: "User already exists with the provided name" });
      }

      fakeData.push({
        id: uuidV4(),
        name,
        job,
      });

      return response.status(201).json({ message: "Account created" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Account not created" });
    }
  }
}
