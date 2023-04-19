import React from 'react';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css';

const Carousel = ({coinsData}) => {
    const items = coinsData.slice(0,15).map((coin)=>{
        return (
            <Link to={`/coin/${coin.uuid}`}>
                <img src={coin?.iconUrl} alt={coin.name} width={"100px"} height={"80"} margin={"10px"}/>
                <div className="coin-info">
                    <span>{coin.symbol}</span>
                    <span className={`percent-change ${coin.change > 0 ? "profit" : "loss"}`}>{coin.change > 0 ? "+":""}{coin.change}%</span>
                </div>
                <div className="coin-price">
                    <span>$&nbsp;{Number(coin.price).toLocaleString("en-US", {maximumFractionDigits: 2})}</span>
                </div>
            </Link>
        )
    });
    const responsive = {
        0: {
            items: 2,
        },
        512:{
            items: 4,
        },
    };

  return (
        <AliceCarousel 
        mouseTracking 
        infinite 
        autoPlay 
        autoPlayInterval={1000}
        animationDuration={1500} 
        disableDotsControls
        disableButtonsControls 
        responsive={responsive} 
        items={items} />
  )
}

export default Carousel;
