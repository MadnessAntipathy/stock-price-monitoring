import express from "express"
import {check,query,validationResult} from "express-validator"
import {getPriceController} from "../controllers/priceController.js"
import {source} from "../common/source.js"

const router = express.Router()

const validation = [
  query("source").exists().custom((value) => source.find(src=>src.value === value)).withMessage("Unsupported source!"),
  query("ticker").exists().custom((value,{req}) => source.find(src=>src.value === req.query.source && src.supportedTickers[value] !== undefined)).withMessage("Unsupported ticker from source!"),
]

router.use(validation)

router.get('/',async(req,res,next)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {ticker,source} = req.query
  let response = await getPriceController({ticker,source})

  return res.status(200).json(response)
})

export default router
