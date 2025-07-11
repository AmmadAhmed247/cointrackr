import express from "express"
import { GlobalData,getFearGreed ,getTrendingCoins,getDefiCoins,getAiCoins} from "../controllers/coin.controller.js"
const router=express.Router()


router.get("/global",GlobalData)
router.get("/feargreed",getFearGreed)
router.get("/trendingcoins",getTrendingCoins)
router.get("/Defitrendingcoins",getDefiCoins)
router.get("/Aitrendingcoins",getAiCoins)

export default router