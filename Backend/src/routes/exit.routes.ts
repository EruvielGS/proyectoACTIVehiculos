import { Router } from "express";
import { getExit, postExit } from "../controllers/exitController";

const router = Router();

router.get("/", getExit);
router.post("/", postExit);

export {router};