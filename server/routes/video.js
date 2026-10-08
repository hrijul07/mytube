import express from "express";
import {
  getallvideo,
  uploadvideo,
  getVideoById,
} from "../controllers/video.js";
import upload from "../filehelper/filehelper.js";

const routes = express.Router();

routes.post(
  "/upload",
  (req, res, next) => {
    console.log("Route hit");
    next();
  },
  upload.single("file"),
  uploadvideo
);

routes.get("/getall", getallvideo);

// NEW ROUTE
routes.get("/:id", getVideoById);

export default routes;