import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import Calculator from './pages/Calculator'
import LogicPage from './pages/Logic'

export default function ApplicationRouter() {

    return (
        <Switch >
            
            <Route path='/logic'>
                <LogicPage/>
            </Route>

            <Route path={[ '/matrix', '/' ]}>
                <Calculator/>
            </Route>

        </Switch>
    )

}