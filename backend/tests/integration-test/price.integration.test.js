import * as tickerPriceSetup from "../../common/tickerPrice.js"
import * as priceController from "../../controllers/priceController.js"
import chai,{expect} from "chai"
import _ from "lodash"
import request from "supertest"
import assert from "assert";
import express from "express";
import {app} from "../../app.js"

describe("Price integration testing", function() {
  before(()=>{
    tickerPriceSetup.generateInitialTickerPrice()
  })

  after(()=>{
    for (const key of Object.keys(tickerPriceSetup.sourceTicker)){
      delete tickerPriceSetup.sourceTicker[key]
    }
  })

  it("should return a price history based on source and ticker", async()=>{
    let url = "/price?ticker=TICK1&source=SRC1"
    let response = await request(app).get(url)
    expect(response.statusCode).to.equal(200);
    expect(response.body.priceHistory.length).to.equal(5)
  })

  it("should return 400 due to incorrect source", async()=>{
    let url = "/price?ticker=TICK1&source=SRC1asd"
    let response = await request(app).get(url)
    expect(response.statusCode).to.equal(400);
  })

  it("should return 400 due to incorrect ticker", async()=>{
    let url = "/price?ticker=TICK1asd&source=SRC1"
    let response = await request(app).get(url)
    expect(response.statusCode).to.equal(400);
  })

  it("should return a 400 due to missing query", async()=>{
    let url = "/price?ticker=TICK1"
    let response = await request(app).get(url)
    expect(response.statusCode).to.equal(400);
  })
});
