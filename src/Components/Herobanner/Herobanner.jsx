import React, { useEffect, useContext } from 'react';
import './Herobanner.css';
import { fetchData, coinOptions } from '../Utils/fetchData';
import Carousel from '../Carousel/Carousel';
import { coinsCtx } from '../../Utils/Context';


const Herobanner = () => {
  const {coinsData, setCoinsData} = useContext(coinsCtx);

    useEffect(()=>{
        const getCoinsData = async()=>{
            const fetchedCoinsData = await fetchData('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', coinOptions);
            console.log(fetchedCoinsData.data.coins);
            setCoinsData(fetchedCoinsData.data.coins);
          }
          getCoinsData();
          // eslint-disable-next-line
    }, [])

  return (
    <div className="herobanner__container">
        <h1 className="logo">Cryptoverse</h1>
        <span>Get all the info regarding your favourite cryptocurrency</span>
        <Carousel coinsData={coinsData}/>
    </div>
  )
}

export default Herobanner;
