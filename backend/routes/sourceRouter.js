import express from "express"
import {source} from "../common/source.js"
const router = express.Router()

router.get('/',async(req,res)=>{
  res.status(200).json(source)
})

export default router
