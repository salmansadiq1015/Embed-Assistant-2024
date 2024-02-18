import express from "express";
import { scrapData, scrapDataCheerio } from "../controllers/scrapController.js";

const router = express.Router();

router.post("/scrap-data-puppeter", scrapData);
router.post("/scrap-data-cheerio", scrapDataCheerio);

export default router;
