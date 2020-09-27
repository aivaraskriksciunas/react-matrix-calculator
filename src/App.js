import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom' 
import Router from './ApplicationRouter'
import Navbar from './components/Navbar/Navbar';

function App() {

    return (
        <BrowserRouter>
            <Navbar/>

            <div className='content' style={{paddingTop: '30px'}}>
                <Router/>
            </div>
            
            <div className='footer'>
                <div className='container'>
                    Aivaras Kriksciunas, 2020
                </div>
            </div>
        </BrowserRouter>
    )

}

export default App;
