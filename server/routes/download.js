import express from "express";
import {
  handledownload,
  getalldownloads,
  getdownloadstatus,
} from "../controllers/download.js";
import { requireAuth } from "../middleware/auth.js";

const routes = express.Router();

routes.get("/", requireAuth, getalldownloads);
routes.get("/status", requireAuth, getdownloadstatus);
routes.post("/:videoId", requireAuth, handledownload);

export default routes;