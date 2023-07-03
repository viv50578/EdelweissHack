import React, { useState } from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";

const options = [
  { label: "MAINIDX", value: "MAINIDX" },
  { label: "FINANCIALS", value: "FINANCIALS" },
  { label: "ALLBANKS", value: "ALLBANKS" },
  { label: "MIDCAPS", value: "MIDCAPS" }
];

const MarketData = (props) => {
  const { values } = props;
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [filteredData, setFilteredData] = useState([]);

  const handleOptionSelect = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    if (option.value === "MAINIDX") {
      const filtered = values.filter((row) => row.tradingSymbol.includes("MAINIDX"));
      setFilteredData(filtered);
    }
    else if (option.value === "ALLBANKS") {
      const filtered = values.filter((row) => row.tradingSymbol.includes("ALLBANKS"));
      setFilteredData(filtered);
    }
    else if (option.value === "MIDCAPS") {
      const filtered = values.filter((row) => row.tradingSymbol.includes("MIDCAPS"));
      setFilteredData(filtered);
    }
    else {
      const filtered = values.filter((row) => row.tradingSymbol.includes("FINANCIALs"));
      setFilteredData(filtered);
    }
  };

  const formatData = (data) => {
    const {
      openInterest,
      previousOpenInterest,
      volume,
      lastTradedPrice,
      lastTradedQuantity,
      bidPrice,
      bidQuantity,
      askPrice,
      askQuantity,
      tradingSymbol,
      strikePriceRegex,
      strikePriceMatch,
      strikePrice

    } = data;
  


    return {
      oi: openInterest || "-",
      chngInOI: previousOpenInterest || "-",
      ttv: volume || "-",
      iv: "-",
      ltp: lastTradedPrice || "-",
      chng: "-",
      pChng: "-",
      bidQty: bidQuantity || "-",
      bid: bidPrice || "-",
      ask: askPrice || "-",
      askQty: askQuantity || "-",
      strikePriceRegex : /(\d{6})(\w{3})(\d{2})/g,
      strikePriceMatch : tradingSymbol.match(strikePriceRegex),
      strikePrice : strikePriceMatch? strikePriceMatch[0] : "-",
      
    };
  };

  const tableData = filteredData.length > 0? filteredData.map((row) => {
    const { tradingSymbol } = row;
    return {
  ...formatData(row),
      strikePrice: row.strikePrice,
      chng: "-",
      pChng: "-",
      ltp: row.lastTradedPrice || "-",
      iv: "-",
      ttv: row.volume || "-",
      chngInOI: row.previousOpenInterest || "-",
      oi: row.openInterest || "-"
    };
  }) : values.map((row) => {
    const { tradingSymbol } = row;
    return {
  ...formatData(row),
      strikePrice: row.strikePrice,
      chng: "-",
      pChng: "-",
      ltp: row.lastTradedPrice || "-",
      iv: "-",
      ttv: row.volume || "-",
      chngInOI: row.previousOpenInterest || "-",
      oi: row.openInterest || "-"
    };
  });

  return (
    <div>
      <Select value={selectedOption} onChange={handleOptionSelect}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <TableContainer style={{}} component={Paper}>
        <Table aria-label="market data table" size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{backgroundColor: "Aqua"}} align="center" colSpan={10}>
                Calls
              </TableCell>
              <TableCell style={{backgroundColor: "greenyellow"}} align="center" colSpan={10}>
                Puts
              </TableCell>
            </TableRow>
            <TableRow style={{backgroundColor: "lemonchiffon"}}>
              <TableCell align="center">OI</TableCell>
              <TableCell align="center">CHNG IN OI</TableCell>
              <TableCell align="center">VOLUME</TableCell>
              <TableCell align="center">IV</TableCell>
              <TableCell align="center">LTP</TableCell>
              <TableCell align="center">CHNG</TableCell>
              <TableCell align="center">BID QTY</TableCell>
              <TableCell align="center">BID</TableCell>
              <TableCell align="center">ASK</TableCell>
              <TableCell align="center">ASK QTY</TableCell>
              <TableCell align="center">STRIKE</TableCell>
              <TableCell align="center">BID QTY</TableCell>
              <TableCell align="center">BID</TableCell>
              <TableCell align="center">ASK</TableCell>
              <TableCell align="center">ASK QTY</TableCell>
              <TableCell align="center">CHNG</TableCell>
              <TableCell align="center">LTP</TableCell>
              <TableCell align="center">IV</TableCell>
              <TableCell align="center">VOLUME</TableCell>
              <TableCell align="center">CHNG IN OI</TableCell>
              <TableCell align="center">OI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{backgroundColor: "ivory"}}>
            {tableData.map((row, index) => (
              <TableRow key={index}>
              <TableCell align="center">{row.oi ? row.oi.toString() : "-"}</TableCell>
              <TableCell align="center">{row.chngInOI ? row.chngInOI.toString() : "-"}</TableCell>
              <TableCell align="center">{row.ttv ? row.ttv.toString() : "-"}</TableCell>
              <TableCell align="center">{row.iv ? row.iv.toString() : "-"}</TableCell>
              <TableCell align="center">{row.ltp ? row.ltp.toString() : "-"}</TableCell>
              <TableCell align="center">{row.chng ? row.chng.toString() : "-"}</TableCell>
              <TableCell align="center">{row.pChng ? row.pChng.toString() : "-"}</TableCell>
              <TableCell align="center">{row.strikePrice ? row.strikePrice.toString() : "-"}</TableCell>
              <TableCell align="center">{row.chng ? row.chng.toString() : "-"}</TableCell>
              <TableCell align="center">{row.pChng ? row.pChng.toString() : "-"}</TableCell>
              <TableCell align="center">{row.ltp ? row.ltp.toString() : "-"}</TableCell>
              <TableCell align="center">{row.iv ? row.iv.toString() : "-"}</TableCell>
              <TableCell align="center">{row.ttv ? row.ttv.toString() : "-"}</TableCell>
              <TableCell align="center">{row.chngInOI ? row.chngInOI.toString() : "-"}</TableCell>
              <TableCell align="center">{row.oi ? row.oi.toString() : "-"}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MarketData;