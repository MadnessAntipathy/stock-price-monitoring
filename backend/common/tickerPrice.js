import {source} from "./source.js"

export const sourceTicker = {}

// generates 5 prices per ticker
export const generateInitialPrice = ()=>{
  let priceArray = []
  for (let i = 0; i < 5; i++){
    let date = new Date()
    date.setMinutes(date.getMinutes() - i);
    priceArray.push({date:date,value:Math.random()*1 > 0.5 ? 100+i : 100-i})
  }
  return {
    priceHistory:priceArray
  }
}

export const generateInitialTickerPrice = ()=>{
  source.forEach(src=>{
    sourceTicker[src.value] = {
      name:src.name,
      value:src.value,
      supportedTickers: src.supportedTickers
    }
    for (const key of Object.keys(sourceTicker[src.value].supportedTickers)){
      sourceTicker[src.value].supportedTickers[sourceTicker[src.value].supportedTickers[key].value] = generateInitialPrice(key)
    }
  })

}

export const updateNewTickerPrice = ()=>{
  for (const key of Object.keys(sourceTicker)){
    for (const secKey of Object.keys(sourceTicker[key].supportedTickers)){
      let latestPriceSet = sourceTicker[key].supportedTickers[secKey].priceHistory[0]
      let newPrice = Math.random()*1 > 0.5 ? latestPriceSet.value+Math.random()*1 : latestPriceSet.value-Math.random()*1
      let date = new Date()
      sourceTicker[key].supportedTickers[secKey].priceHistory.pop()
      sourceTicker[key].supportedTickers[secKey].priceHistory.unshift({date:date,value:newPrice <= 0 ? 0 : newPrice})
    }
  }
}
