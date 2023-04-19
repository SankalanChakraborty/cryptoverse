import React, {useContext, useEffect, useState} from 'react';
import { coinsCtx } from '../../Utils/Context';
import {Link} from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import './Cryptolist.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Cryptolist = () => {
    const [inputValue, setInputValue] = useState("");
    const {coinsData} = useContext(coinsCtx);
    const [filteredList, setFilteredList] = useState([]);
    console.log(coinsData);
    console.log("This is the initial filtered data", filteredList);
    
    useEffect(()=>{
        setFilteredList(coinsData);
    },[coinsData])

    const searchHandler = (e)=>{
        setInputValue(e.target.value);
        if(!e.target.value){
            setFilteredList([...coinsData]);
        }
        setFilteredList(coinsData.filter(coin => coin.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

  return (
    <div className="cryptocurrency-list__container">
        <Typography variant={"h4"}>Cryptocurrency Prices by Market Cap</Typography>
        <input className="search-coins" type="text" value={inputValue} onChange={searchHandler} placeholder="Search for a Cryptocurrency..." />
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="list-head">
            <TableRow>
              <TableCell >Coin Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24H Change</TableCell>
              <TableCell align="right">Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="list-body">
            {filteredList.map((coin) => (
                <TableRow
                key={coin.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                <Link to={`/coin/${coin.uuid}`}>
                    <Stack direction={"row"}>
                        <img src={coin.iconUrl} alt={coin.symbol} />
                        <Stack className="coin-name__wrapper" direction={"column"}>
                                <span>{coin.symbol}</span>
                                <span>{coin.name}</span>
                        </Stack>
                    </Stack>
                </Link>
                </TableCell>
                <TableCell align="right">$&nbsp;{(Number(coin.price)).toLocaleString("en-US", {maximumFractionDigits: 2})}</TableCell>
                <TableCell className={`percent-change ${coin.change > 0 ? "profit" : "loss"}`} align="right">{coin.change > 0 ? "+":""}{coin.change}%</TableCell>
                <TableCell align="right">$&nbsp;{(Number(coin.marketCap)/10000000).toLocaleString("en-US", {maximumFractionDigits: 2})}M</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Cryptolist;
