import { Router } from "express";

const routes = Router();

routes.get("/healthcheck", (_request, response) =>
  response.json({ message: "ok" })
);
export default routes;
