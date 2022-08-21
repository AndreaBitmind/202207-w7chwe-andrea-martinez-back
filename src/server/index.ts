import cors from "cors";
import express from "express";
import morgan from "morgan";
import usersRouter from "../routers/usersRouter";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

export default app;
