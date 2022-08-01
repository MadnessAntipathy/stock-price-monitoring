import React from 'react';

function PriceTable(props) {

  return (
    <table className="PriceDisplay" border="1">
      <thead>
        <tr>
          <th className="TimeDisplay">Time</th><th className="ValueDisplay">Price</th>
        </tr>
      </thead>
      <tbody>
        {props.priceHistory.map((price,index)=>{
          return (
            <tr key={index}>
              <td>{price.date}</td>
              <td>{price.value.toFixed(2)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default PriceTable;
