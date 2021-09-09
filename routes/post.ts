import express from "express";
import { getPosts, getPostById, addPost } from "../services/postService";

const router = express.Router();

router.get("/", async (_req: express.Request, res: express.Response) => {
  res.json(await getPosts());
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const idNum = parseInt(id, 10);
    const p = await getPostById(idNum);
    res.json(p);
  } catch (error) {
    res
      .status(400)
      .send({ error: `${id} is an invalid id. Expected a number` });
  }
});

router.post("/", async (req, res: express.Response) => {
  if (req.body) {
    const { title, content, authorId } = req.body;
    if (!title || !content || !authorId) {
      res
        .status(400)
        .json({ error: "title,content and author id are required" });
    } else {
      const p = await addPost({ title, content, authorId });
      res.json(p);
    }
  } else {
    res.status(400).json({ error: "empty body" });
  }
});

export default router;
