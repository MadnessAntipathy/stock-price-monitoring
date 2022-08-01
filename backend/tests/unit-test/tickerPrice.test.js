import * as tickerPriceSetup from "../../common/tickerPrice.js"
import chai,{expect} from "chai"
import chaiExclude from "chai-exclude";
import _ from "lodash"

chai.use(chaiExclude)

describe("Handles initial setup of source and ticker", function() {

  afterEach(()=>{
    for (const key of Object.keys(tickerPriceSetup.sourceTicker)){
      delete tickerPriceSetup.sourceTicker[key]
    }
  })

  it("should be able to generate an initial price array with differing timings",()=>{
    let result = tickerPriceSetup.generateInitialPrice()
    expect(result.priceHistory.length).to.equal(5)
    expect(result.priceHistory[0].date !== result.priceHistory[1].date).to.equal(true)
  })

  it("should setup the source ticker object",()=>{
    expect(_.isEmpty(tickerPriceSetup.sourceTicker)).to.equal(_.isEmpty({}))
    tickerPriceSetup.generateInitialTickerPrice()
    expect(_.get(tickerPriceSetup.sourceTicker,["SRC1","name"],null)).to.equal("Source1")
    expect(_.get(tickerPriceSetup.sourceTicker,["SRC2","name"],null)).to.equal("Source2")
  })

  it("should update source ticker with a new ticker price",()=>{
    tickerPriceSetup.generateInitialTickerPrice()
    let priceHistoryTicker1 = _.assign([],_.get(tickerPriceSetup.sourceTicker,["SRC1","supportedTickers","TICK1","priceHistory"],null))
    tickerPriceSetup.updateNewTickerPrice()
    let newPriceHistoryTicker1 = _.get(tickerPriceSetup.sourceTicker,["SRC1","supportedTickers","TICK1","priceHistory"],null)
    expect(priceHistoryTicker1[0].value !== newPriceHistoryTicker1[0].value).to.equal(true)
  })
});
