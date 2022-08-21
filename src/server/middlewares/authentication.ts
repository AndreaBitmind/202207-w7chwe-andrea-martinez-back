import "../../loadEnvironment";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import CustomError from "../../utils/CustomError";
import { verifyToken } from "../../utils/auth";

export interface CustomRequest extends Request {
  payload: JwtPayload;
}
const customError = new CustomError(
  400,
  "Bad request",
  "Error de autenticación"
);

export const authentication = (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  const dataAuthentication = req.get("Authorization");

  if (!dataAuthentication || !dataAuthentication.startsWith("Bearer ")) {
    next(customError);
    return;
  }
  const token = dataAuthentication.slice(7);
  let tokenData: string | JwtPayload;

  try {
    tokenData = verifyToken(token);
  } catch (error) {
    next(customError);
    return;
  }

  if (typeof tokenData === "string") {
    next(customError);
    return;
  }
  req.payload = tokenData as JwtPayload;
  next();
};

export default authentication;
