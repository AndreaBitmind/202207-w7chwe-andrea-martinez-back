import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "../routers/usersRouter";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

export default app;
