import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PriceTable from "./components/priceTable"
import SourceSelector from "./components/sourceSelector"
import TickerSelector from "./components/tickerSelector"
import _ from "lodash"

function retrieveSource(){
  return fetch('http://localhost:3001/source')
  .then((response) => response.json())
  .then((data) => data);
}

function retrievePriceList(selectedSource,selectedTicker){
  return fetch(`http://localhost:3001/price?ticker=${selectedTicker}&source=${selectedSource}`)
  .then((response) => response.json())
  .then((data) => data);
}

// connect to the backend
const socket = io("localhost:3001");

function App() {
  const [selectedSource,setSelectedSource] = useState("")
  const [selectedTicker,setSelectedTicker] = useState("")
  const [sourceList,setSourceList] = useState([])
  const [tickerList,setTickerList] = useState([])
  const [priceHistory, setPriceHistory] = useState([])

  useEffect(()=>{
    retrieveSource().then(data=>{
      setSourceList(data)
    })
  },[])

  useEffect(()=>{
    // when connection to server is established
    socket.on('connect', () => {
      console.log('socket io connected')
    });
    // in event of server disconnects
    socket.on('disconnect', () => {
      console.log('socket io disconnected')
    });
    // when receiving data from server to update table
    socket.on('pipingdata', (data) => {
      let priceData = _.get(data,[selectedSource,"supportedTickers",selectedTicker,"priceHistory"],null)
      if (priceData){
        setPriceHistory(priceData)
      }
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pipingdata');
    };
  })

  useEffect(()=>{
    setSelectedTicker("")
    let source = sourceList.find(src=>src.value === selectedSource)
    if (source){
      let tickerArray = []
      for (const key of Object.keys(source.supportedTickers)){
        tickerArray.push({name:key})
      }
      setTickerList(tickerArray)
    }
  },[selectedSource,sourceList])

  useEffect(()=>{
    if (selectedSource && selectedTicker){
      retrievePriceList(selectedSource,selectedTicker).then(data=>{
        setPriceHistory(data.priceHistory)
      })
    }
  },[selectedSource,selectedTicker])

  return (
    <div className="App">
      <table className="TableDisplay">
        <tbody>
          <tr>
            <td><SourceSelector setSelectedSource={setSelectedSource} selectedSource={selectedSource} sourceList={sourceList}/></td>
          </tr>
          <tr>
            <td><TickerSelector setSelectedTicker={setSelectedTicker} selectedTicker={selectedTicker} tickerList={tickerList}/></td>
          </tr>
          <tr>
            <td><PriceTable priceHistory={priceHistory}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
