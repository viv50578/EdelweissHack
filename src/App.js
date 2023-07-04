import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MarketData from "./MarketData";
 import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
 function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
   useEffect(() => {
    const socket = io('http://localhost:5000');
     socket.on('data', (receivedData) => {
      try {
        console.log(receivedData);
        // Stringify the received data
        const stringifiedData = JSON.stringify(receivedData);
        setData(stringifiedData);
        console.log('datasend',setData)
        console.log('stringifiedData',stringifiedData)
        setError(false);
      } catch (error) {
        console.log('Error parsing packet:', error);
        setError(true);
      }
    });
     socket.on('disconnect', () => {
      console.log('Connection closed');
      setError(true);
    });
     socket.on('error', (error) => {
      console.log('Error:', error);
      setError(true);
    });
     return () => {
      socket.disconnect();
    };
  }, []);
   const columns = React.useMemo(
    () => [
      {
        Header: 'Packet Info',
        columns: [
          { 
            Header: 'Packet Length', 
            accessor: 'packetLength', 
          }, 
          { 
            Header: 'Trading Symbol', 
            accessor: 'tradingSymbol', 
          }, 
          { 
            Header: 'Sequence Number', 
            accessor: 'sequenceNumber', 
          }, 
          { 
            Header: 'Timestamp', 
            accessor: 'timestamp', 
          }, 
          { 
            Header: 'Last Traded Price', 
            accessor: 'lastTradedPrice', 
          }, 
          { 
            Header: 'Last Traded Quantity', 
            accessor: 'lastTradedQuantity', 
          }, 
          { 
            Header: 'Volume', 
            accessor: 'volume', 
          }, 
          { 
            Header: 'Bid Price', 
            accessor: 'bidPrice', 
          }, 
          { 
            Header: 'Bid Quantity', 
            accessor: 'bidQuantity', 
          }, 
          { 
            Header: 'Ask Price', 
            accessor: 'askPrice', 
          }, 
          { 
            Header: 'Ask Quantity', 
            accessor: 'askQuantity', 
          }, 
          { 
            Header: 'Open Interest', 
            accessor: 'openInterest', 
          }, 
          { 
            Header: 'Previous Close Price', 
            accessor: 'previousClosePrice', 
          }, 
          { 
            Header: 'Previous Open Interest', 
            accessor: 'previousOpenInterest', 
          }, 
        ],
      },
    ],
    []
  )
   return (
    <>
      <MarketData values={data} />
    </>
  );
}
 export default App;