import express from "express";
import cors from "cors";
import routes from "./routes";
import "dotenv/config";
import swaggerConfig from "../swagger";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
swaggerConfig(app);

app.listen(port, () => {
  console.info(`🚀 Server is running on port ${port}`);
});

export default app;
