import {sourceTicker} from "../common/tickerPrice.js"
import _ from "lodash"

export const getPriceController = async(data)=>{
  let {ticker,source} = data
  return _.get(sourceTicker,[source,"supportedTickers",ticker],null)
}
