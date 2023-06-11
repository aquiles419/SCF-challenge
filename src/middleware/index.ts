import { fakeData } from "../database";

export function accountVerify(request, response, next) {
  const { id } = request.headers;

  const user = fakeData.find((data) => data.id === id);

  if (!user) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  request.user = user;

  return next();
}
