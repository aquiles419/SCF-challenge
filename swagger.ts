import fs from "fs";
import swaggerUi from "swagger-ui-express";

const swaggerFile = fs.readFileSync("swagger.yaml", "utf8");
const swaggerDocument = JSON.parse(
  JSON.stringify(require("js-yaml").load(swaggerFile))
);

export default (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
