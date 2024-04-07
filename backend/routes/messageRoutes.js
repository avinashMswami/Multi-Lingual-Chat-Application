import express from "express";
import { sendMessage,getMessage} from "../controllers/messages.controller.js";
import protectRoute from "../Middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id/:language",protectRoute,sendMessage);

router.get("/:id",protectRoute,getMessage);

export default router;