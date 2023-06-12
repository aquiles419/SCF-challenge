import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";

const swaggerFilePath = path.resolve(__dirname, "swagger.yaml");
const swaggerFile = fs.readFileSync(swaggerFilePath, "utf8");
const swaggerDocument = JSON.parse(
  JSON.stringify(require("js-yaml").load(swaggerFile))
);

export default (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
