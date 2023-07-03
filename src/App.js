import React from 'react';
import MarketData from './MarketData';

const data = [
  {
  packetLength: 124,
  tradingSymbol: 'MAINIDX28DEC2319000PE',
  sequenceNumber: 2838n,
  timestamp: 1688403837130n,
  lastTradedPrice: 58085n,
  lastTradedQuantity: 50n,
  volume: 50n,
  bidPrice: 57115n,
  bidQuantity: 100n,
  askPrice: 58060n,
  askQuantity: 50n,
  openInterest: 669300n,
  previousClosePrice: 7300n,
  previousOpenInterest: 1550n
},
{
  packetLength: 124,
  tradingSymbol: 'ALLBANKS27JUL2337000PE',
  sequenceNumber: 2840n,
  timestamp: 1688403837133n,
  lastTradedPrice: 1095n,
  lastTradedQuantity: 0n,
  volume: 0n,
  bidPrice: 855n,
  bidQuantity: 800n,
  askPrice: 1200n,
  askQuantity: 900n,
  openInterest: 0n,
  previousClosePrice: 7375n,
  previousOpenInterest: 1375n
}
  
];

function App() {
  return (
    <div className="App">
      <MarketData values={data} />
    </div>
  );
}

export default App;