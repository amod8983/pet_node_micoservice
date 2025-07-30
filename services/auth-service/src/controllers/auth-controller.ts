import { Request, Response } from "express";
import { publishUserCreated } from "../utils/rabbitmq";

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export const signupUser = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response
) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
        data: null,
      });
    }

    // TODO: Add your user creation logic here
    await publishUserCreated(JSON.stringify({ username, email }));

    res.status(201).json({
      message: "Signup successful",
      data: { username, email },
    });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", data: e });
  }
};

export const loginUser = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Login successful",
  });
};

export const getCurrentUser = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Current user fetch successful",
    data: {
      username: "test",
      userId: "1",
    },
  });
};
