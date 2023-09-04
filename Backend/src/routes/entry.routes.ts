import { Request, Response, Router } from "express";
import { getEntry, postEntry } from "../controllers/entryController";


const router = Router();

router.get("/", getEntry);
router.post("/", postEntry);

export {router}