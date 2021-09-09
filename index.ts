import express from "express";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.listen(5001, (): void => {
  console.log("listening on port 5001...");
});
