import React from 'react';

function TickerSelector(props) {
  return (
    <div className="Modifiers">
      <span>Ticker:</span>
      <select value={props.selectedTicker} onChange={e=>props.setSelectedTicker(e.target.value)}>
      <option value={""}>{""}</option>
        {props.tickerList.map((src,index)=>{
          return (
            <option key={index} value={src.name}>{src.name}</option>
          )
        })}
      </select>
    </div>
  );
}

export default TickerSelector;
