import React from 'react';
import './App.css';

import Calculator from './pages/Calculator';

function App() {

    return (
        <>
            <div className='content'>
                <Calculator></Calculator>
            </div>
            
            <div className='footer'>
                <div className='container'>
                    Aivaras Kriksciunas, 2020
                </div>
            </div>
        </>
    )

}

export default App;
