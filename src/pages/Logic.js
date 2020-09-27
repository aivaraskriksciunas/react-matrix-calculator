import React, { useState } from 'react'
// import { getOperands, interpretExpression } from '../lib/ExpressionInterpreter'
import { createExpressionTree } from '../lib/ExpressionInterpreter'
import { treeToPrefix, treeToPostfix } from '../lib/ExpressionTreeConverters'

export default function LogicPage() {

    const [ rawExpression, setRawExpression ] = useState( '' )
    const [ showInstruction, setShowInstruction ] = useState( true )
    const [ expressionTranslations, setExpressionTranslations ] = useState({ postfix: '', prefix: '' })

    const calculate = () => {
        let expr = createExpressionTree( rawExpression )
        console.log( expr.tree )
        console.log( expr.operands )

        setExpressionTranslations({
            prefix: treeToPrefix( expr.tree ),
            postfix: treeToPostfix( expr.tree )
        })
        setShowInstruction( false ) 

        // let operands = getOperands( expr )
        // console.log( operands )
    }

    const showResults = () => {
        if ( showInstruction ) {
            return <Instruction></Instruction>
        }

        return (
            <div>
                <div className='text-lg mt-3'>
                    Expression in prefix: {expressionTranslations.prefix}
                </div>
                <div className='text-lg mb-3'>
                    Expression in postfix: {expressionTranslations.postfix}
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