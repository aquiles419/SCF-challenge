import { Request, Response } from "express";
import { CreateUserController } from "../controllers/CreateUserController";

describe("CreateUserController", () => {
  let createUserController: CreateUserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    createUserController = new CreateUserController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user and return success message", async () => {
    const mockBody = {
      id: "123",
      name: "John Doe",
      job: "Developer",
    };
    mockRequest.body = mockBody;

    const mockFakeData = [];
    const mockFakeDataSome = jest.spyOn(mockFakeData, "some");
    mockFakeDataSome.mockReturnValueOnce(false);

    jest.mock("../database", () => ({
      fakeData: mockFakeData,
    }));

    await createUserController.createtUser(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Account created",
    });
  });

  it("should return error if user already exists with the provided name", async () => {
    const mockBody = {
      id: "123",
      name: "John Doe",
      job: "Developer",
    };
    mockRequest.body = mockBody;

    const mockFakeData = [
      {
        id: "456",
        name: "John Doe",
        job: "Designer",
      },
    ];
    const mockFakeDataSome = jest.spyOn(mockFakeData, "some");
    mockFakeDataSome.mockReturnValueOnce(true);

    jest.mock("../database", () => ({
      fakeData: mockFakeData,
    }));

    await createUserController.createtUser(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "User already exists with the provided name",
    });
  });
});
