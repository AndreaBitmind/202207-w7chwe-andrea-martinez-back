import { NextFunction, Request, Response } from "express";
import User from "../database/models/User";
import {
  CustomJwTPayload,
  UserLogin,
  UserRegister,
} from "../interfaces/UserInterfaces";
import { hashCompare, hashCreator, tokenCreator } from "../utils/auth";
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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body as UserLogin;

  const userError = new CustomError(
    403,
    "User not found",
    "User or password not valid"
  );

  let findUsers: Array<UserLogin>;
  try {
    findUsers = await User.find({ userName: user.userName });
    if (findUsers.length === 0) {
      next(userError);
      return;
    }
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}; message:  ${(error as Error).message}`,
      "User or password not valid "
    );
    next(finalError);
    return;
  }

  try {
    const isPasswordValid = await hashCompare(
      user.password,
      findUsers[0].password
    );
    if (!isPasswordValid) {
      userError.message = "Password invalid";
      next(userError);
      return;
    }
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}; message:  ${(error as Error).message}`,
      "User or password not valid "
    );
    next(finalError);
    return;
  }

  const payLoad: CustomJwTPayload = {
    id: findUsers[0].id,
    userName: findUsers[0].userName,
  };

  const responseData = {
    user: {
      token: tokenCreator(payLoad),
    },
  };

  res.status(200).json(responseData);
};
