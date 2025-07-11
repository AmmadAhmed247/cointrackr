import express from "express"
import { getSinglePageData , getChartData} from "../controllers/coin.controller.js"

const router=express.Router();

router.get("/:slug",getSinglePageData);
router.get("/:slug/market_chart",getChartData)
export default router;