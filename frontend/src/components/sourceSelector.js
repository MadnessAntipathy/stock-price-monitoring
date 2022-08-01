import React from 'react';

function SourceSelector(props) {
  return (
    <div className="Modifiers">
      <span>Price source:</span>
      <select value={props.selectedSource} onChange={e=>props.setSelectedSource(e.target.value)}>
        <option value={""}>{""}</option>
        {props.sourceList.map((src,index)=>{
          return (
            <option key={index} value={src.value}>{src.name}</option>
          )
        })}
      </select>
    </div>

  );
}

export default SourceSelector;
