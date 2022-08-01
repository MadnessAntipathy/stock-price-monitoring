import * as tickerPriceSetup from "../../common/tickerPrice.js"
import * as priceController from "../../controllers/priceController.js"
import chai,{expect} from "chai"
import _ from "lodash"
import request from "supertest"
import assert from "assert";
import express from "express";
import {app} from "../../app.js"

describe("Source integration testing", function() {
  before(()=>{
    tickerPriceSetup.generateInitialTickerPrice()
  })

  after(()=>{
    for (const key of Object.keys(tickerPriceSetup.sourceTicker)){
      delete tickerPriceSetup.sourceTicker[key]
    }
  })

  it("should be able to return a source object", async()=>{
    let url = "/source"
    let response = await request(app).get(url)
    expect(response.statusCode).to.equal(200);
  })

});
