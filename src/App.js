import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Header from './Components/Header/Header'
import Coin from './Pages/Coin';
import { useState } from 'react';
import { coinsCtx } from './Utils/Context';

function App() {
  const [coinsData, setCoinsData] = useState([]);
  return (
    <BrowserRouter>
      <coinsCtx.Provider value={{coinsData, setCoinsData}}>
        <div className="App">
            <Header/>
            <Routes>
              <Route path="/" exact element={<Homepage/>}/>
              <Route path="/coin/:uuid" element={<Coin/>}/>
            </Routes>
          </div>
      </coinsCtx.Provider>
    </BrowserRouter>
  );
}

export default App;
