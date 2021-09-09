import express from "express";
import { getUserById, getUsers, addUser } from "../services/userService";

const router = express.Router();

router.get("/", async (_req: express.Request, res: express.Response) => {
  res.json(await getUsers());
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const idNum = parseInt(id, 10);
    const u = await getUserById(idNum);
    res.json(u);
  } catch (error) {
    res
      .status(400)
      .send({ error: `${id} is an invalid id. Expected a number` });
  }
});

router.post("/", async (req, res: express.Response) => {
  if (req.body) {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: "name and email required" });
    } else {
      const u = await addUser({ name, email });
      res.json(u);
    }
  } else {
    res.status(400).json({ error: "empty body" });
  }
});

export default router;
