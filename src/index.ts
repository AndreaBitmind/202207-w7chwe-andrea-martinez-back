import connectDB from "./database";
import "./loadEnvironment";
import startServer from "./server/server";

let port = +process.env.PORT || 4000;
let mongoURL = process.env.MONGODB_URL;
if (process.env.NODE_ENV === "test") {
  mongoURL = process.env.MONGODB_URL_TEST;
  port = +process.env.PORT_TEST || 4000;
}

(async () => {
  try {
    await connectDB(mongoURL);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
