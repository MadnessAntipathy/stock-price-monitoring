import * as tickerPriceSetup from "../../common/tickerPrice.js"
import * as priceController from "../../controllers/priceController.js"
import chai,{expect} from "chai"
import _ from "lodash"

describe("Price controller testing", function() {
  beforeEach(()=>{
    tickerPriceSetup.generateInitialTickerPrice()
  })

  afterEach(()=>{
    for (const key of Object.keys(tickerPriceSetup.sourceTicker)){
      delete tickerPriceSetup.sourceTicker[key]
    }
  })

  it("should be able to return a price history based on source and ticker", async()=>{
    let ticker = "TICK1"
    let source = "SRC1"
    let result = await priceController.getPriceController({ticker,source})
    expect(result).to.not.equal(null)
  })

  it("should not return a price history based on incorrect source or ticker", async()=>{
    let ticker = "TICK1asd"
    let source = "SRC1"
    let result = await priceController.getPriceController({ticker,source})
    expect(result).to.equal(null)

    ticker = "TICK1"
    source = "SRC1asd"
    result = await priceController.getPriceController({ticker,source})
    expect(result).to.equal(null)
  })
});
