import { NextFunction, Request, Response } from "express";
import User from "../database/models/User";
import { UserRegister } from "../interfaces/UserInterfaces";
import hashCreator from "../utils/auth";
import CustomError from "../utils/CustomError";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserRegister = req.body;
  user.password = await hashCreator(user.password);

  try {
    const newUser = await User.create(user);
    res.status(200).json({ user: newUser });
  } catch (error) {
    const customError = new CustomError(
      400,
      error.message,
      "Error creating new user"
    );
    next(customError);
  }
};

export default registerUser;