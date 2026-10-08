import express from "express";
import {
  deletecomment,
  getallcomment,
  postcomment,
  editcomment,
  translatecomment,
  likecomment,
  dislikecomment,
  reportcomment,
  getflaggedcomments,
  updatecommentstatus,
} from "../controllers/comment.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const routes = express.Router();

routes.get("/:videoid", getallcomment);
routes.get("/translatecomment/:id", translatecomment);

routes.post("/postcomment", requireAuth, postcomment);
routes.delete("/deletecomment/:id", requireAuth, deletecomment);
routes.post("/editcomment/:id", requireAuth, editcomment);
routes.post("/likecomment/:id", requireAuth, likecomment);
routes.post("/dislikecomment/:id", requireAuth, dislikecomment);
routes.post("/reportcomment/:id", requireAuth, reportcomment);

routes.get("/admin/flagged", requireAuth, requireAdmin, getflaggedcomments);
routes.post("/admin/status/:id", requireAuth, requireAdmin, updatecommentstatus);

export default routes;