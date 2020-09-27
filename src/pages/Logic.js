import React, { useState } from 'react'
import { interpretExpression } from '../lib/ExpressionInterpreter'

export default function LogicPage() {

    const [ rawExpression, setRawExpression ] = useState( '' )
    const [ showInstruction, setShowInstruction ] = useState( true )
    const [ postfixExpression, setPostfixExpression ] = useState( '' )

    const calculate = () => {
        let expr = interpretExpression( rawExpression )
        setPostfixExpression( expr.join( ' ' ) )
        setShowInstruction( false ) 
    }

    const showResults = () => {
        if ( showInstruction ) {
            return <Instruction></Instruction>
        }

        return (
            <div>
                <div className='text-lg my-3'>
                    Expression in postfix: {postfixExpression}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='container boxContainer'>
                <div className='flex'>
                    <input type='text' className='textInput w-full' 
                        onChange={(ev) => setRawExpression( ev.target.value )}>
                    </input>
                    <div className='button ml-3' onClick={calculate}>Calculate</div>
                </div>

                {showResults()}
            </div>
        </div>
    )

}

function Instruction() {
    return (
        <div>
            Instructions: 
        </div>
    )
}