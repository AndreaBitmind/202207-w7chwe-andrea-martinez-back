import "../loadEnvironment";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CustomJwTPayload } from "../interfaces/UserInterfaces";

export const tokenCreator = (payload: CustomJwTPayload) =>
  jwt.sign(payload, process.env.SECRET);

export const hashCreator = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};

export const hashCompare = (text: string, hash: string) =>
  bcrypt.compare(text, hash);
