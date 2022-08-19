import "./loadEnvironment";

const port = +process.env.PORT || 4000;
const mongoURL = process.env.MONGO_URL;

(async () => {
  try {
    await connectDB(mongoURL);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
