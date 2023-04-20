import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Typography} from '@mui/material';
import './Coin.css';
import { fetchHistData, coinHistoptions, fetchData, coinOptions } from '../Components/Utils/fetchData';
import Loader from '../Components/Loader/Loader';
import {Line} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

const Coins = () => {
  const [clickedCoin, setClickedCoin] = useState([]);
  const [timeFrame, setTimeFrame] = useState('24h');
  const [historicData, setHistoricData] = useState([]);
  const {uuid} = useParams();
  
  useEffect(()=>{
    const getCoin = async()=>{
      const fetchedCoin = await fetchData(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, coinOptions);
      console.log(fetchedCoin)
      setClickedCoin(fetchedCoin);
    }

    const getCoinHist = async()=>{
      const fetchedCoinHist = await fetchHistData(`https://coinranking1.p.rapidapi.com/coin/${uuid}/history?timePeriod=${timeFrame}`, coinHistoptions);
      console.log(fetchedCoinHist.data.history);
      setHistoricData(fetchedCoinHist.data.history);
    }
    getCoin();
    getCoinHist();
  },[uuid, timeFrame])

  const setTimeframe = (e)=>{
    setTimeFrame((prevValue)=> prevValue = e.target.value);
  }

  console.log("Clicked coin data",clickedCoin);
  return (
    (clickedCoin.status==='success' ? 
    <div className="crypto-coin__detail-container">
      <div className="crypto-coin__sidebar">
      <div className="crypto-coin__info">
        <img className="crypto-coin__icon" src={clickedCoin.data.coin.iconUrl} alt={clickedCoin.data.coin.name} />
        <Typography variant="h4">{clickedCoin.data.coin.name}</Typography>
        <p>{clickedCoin.data.coin.description}</p>
        <div className="flex-direction-row">
          <label htmlFor="crypto-coin__rank">Rank:</label>
          <Typography id="crypto-coin__rank" variant="h6">{clickedCoin.data.coin.rank}</Typography>
        </div>
        <div className="flex-direction-row">
          <label htmlFor="crypto-price">Current Price:</label>
          <Typography id="crypto-price" variant="h6">$&nbsp;{Number(clickedCoin.data.coin.price).toLocaleString("en-US", {maximumFractionDigits: 2})}</Typography>
        </div>
        <div className="flex-direction-row">
          <label htmlFor="crypto-market-cap">Market Cap:</label>
          <Typography id="crypto-market-cap" variant="h6">$&nbsp;{(Number(clickedCoin.data.coin.marketCap)/10000000).toLocaleString("en-US", {maximumFractionDigits: 2})}M</Typography>
        </div>
      </div>
    </div>
    <div className="crypto-coin__analysis">
      <Line
      data={{
        labels: historicData.map((coin)=>{
          let date = new Date(coin.timestamp);
          let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM`:
          `${date.getHours()}:${date.getMinutes()} AM`;

          return timeFrame === '24h' ? time: date.toLocaleDateString();
        }),
        datasets: [
          {
            data: historicData.map(coin=>coin.price),
            label: `Price (Past ${timeFrame}) in USD`,
            borderColor: "#FFD700",
            borderWidth: 2,
            pointRadius: 0
          }
        ]
      }}
      />
      <div className="timeframes">
        <button className="btn-timeframe" value="24h" onClick={setTimeframe}>24 Hours</button>
        <button className="btn-timeframe" value="7d" onClick={setTimeframe}>7 days</button>
        <button className="btn-timeframe" value="3m" onClick={setTimeframe}>3 months</button>
        <button className="btn-timeframe" value="1y" onClick={setTimeframe}>1 year</button>
        <button className="btn-timeframe" value="5y" onClick={setTimeframe}>5 years</button>
      </div>
    </div>
  </div>
  : <Loader/>)
  )
}

export default Coins;
