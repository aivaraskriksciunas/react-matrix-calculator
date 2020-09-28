import React, { useState } from 'react'
import { createExpressionTree } from '../lib/ExpressionInterpreter'
import { treeToPrefix, treeToPostfix } from '../lib/ExpressionTreeConverters'
import BooleanResult from '../components/BooleanCalculation/Result'
import { generateTruthTable } from '../lib/TruthTableGenerator'
import styles from './Logic.module.css'

const CALC_TRANSLATIONS = 0
const CALC_TRUTH_TABLE = 1

export default function LogicPage() {

    const [ rawExpression, setRawExpression ] = useState( '' )
    const [ showInstruction, setShowInstruction ] = useState( true )
    const [ error, setError ] = useState( '' )
    const [ expressionTranslations, setExpressionTranslations ] = useState({ postfix: '', prefix: '' })
    const [ truthTable, setTruthTable ] = useState([])

    const calculate = ( action ) => {
        let expr = null
        setTruthTable([])
        setShowInstruction( false ) 
        setError( '' )

        // First, interpret the expression string
        try {
            expr = createExpressionTree( rawExpression )
        }
        catch ( err ) {
            setError( err.message )
            return;
        }

        // Translate the given expression into postfix and prefix
        setExpressionTranslations({
            prefix: treeToPrefix( expr.tree ),
            postfix: treeToPostfix( expr.tree )
        })

        
        // Optionally, if the user wants a truth table, generate it as well
        if ( action === CALC_TRUTH_TABLE ) {
            try {
                setTruthTable( generateTruthTable( expr.tree, expr.operands ) )
            } catch ( err ) {
                setError( err.message )
                return;
            }
        }
    }

    const showResults = () => {
        if ( error !== '' ) {
            return (
                <>
                    <Error error={error}></Error>
                    <Instruction></Instruction>
                </>
            )
        }
        else if ( showInstruction ) {
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

                {truthTable.length === 0 ? null :
                    <BooleanResult truthTable={truthTable}></BooleanResult>
                }
            </div>
        )
    }

    return (
        <div>
            <div className='container boxContainer'>
                <input type='text' className='textInput w-full' 
                    onChange={(ev) => setRawExpression( ev.target.value )}>
                </input>
                <div className='flex flex-wrap mt-3'>
                    <div className='button' onClick={() => calculate( CALC_TRANSLATIONS )}>To postfix/prefix</div>
                    <div className='button ml-3' onClick={() => calculate( CALC_TRUTH_TABLE )}>Create truth table</div>
                </div>

                {showResults()}
            </div>
        </div>
    )

}

function Instruction() {
    return (
        <div className='mt-6'>
            <div className='font-lg'>Instructions:</div>

            <p className='mt-4'>
                Write an expression using the available operators. Some operators can be written in two ways 
                (for example, logical and can be written as <span className='highlight'>AND</span> or <span className='highlight'>&</span>). 
                Note that when writting operators in word format, you must use the capital letters. 
                Operator and written as <span className='highlight'>and</span> would be considered as an operand instead.
            </p>

            <p className='mt-4'>
                Operands are denoted only in lowercase letters: <span className='highlight'>a</span> or <span className='highlight'>e</span>.
                Using uppercase letters in operands will result in a syntax error, as uppercase is reserved for operators. Operands may be made up of multiple letters, for example <span className='highlight'>house</span>.
                You may also use numbers in operand names, as long as number is not the first character. 
                For example, the name <span className='highlight'>a2</span> would be valid, while <span className='highlight'>2a</span> would result in an error.
            </p>

            <p className='mt-4'>
                Operands and operators do not have to be separated by spaces. Expressions <span className='highlight'>aANDb</span>, <span className='highlight'>a&b</span> or <span className='highlight'>a AND b</span> mean the same thing.
            </p>

            <table className={`${styles.table} mt-4`}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.headerCell}>Operator</th>
                        <th className={styles.headerCell}>Description and remarks</th>
                        <th className={styles.headerCell}>Operation precedence</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className={styles.dataRow}>
                        <td className={styles.dataCell}>
                            <span className='highlight mx-1'>!</span>
                        </td>
                        <td className={styles.dataCell}>Operator not. Write in front of an operand, for example: !a.</td>
                        <td className={styles.dataCell}>5</td>
                    </tr>
                    <tr className={styles.dataRow}>
                        <td className={styles.dataCell}>
                            <span className='highlight mx-1'>AND</span>
                            <span className='highlight mx-1'>&</span>
                        </td>
                        <td className={styles.dataCell}>Operator and.</td>
                        <td className={styles.dataCell}>4</td>
                    </tr>
                    <tr className={styles.dataRow}>
                        <td className={styles.dataCell}>
                            <span className='highlight mx-1'>OR</span>
                            <span className='highlight mx-1'>||</span>
                        </td>
                        <td className={styles.dataCell}>Operator or.</td>
                        <td className={styles.dataCell}>3</td>
                    </tr>
                    <tr className={styles.dataRow}>
                        <td className={styles.dataCell}>
                            <span className='highlight mx-1'>XOR</span>
                            <span className='highlight mx-1'>^</span>
                        </td>
                        <td className={styles.dataCell}>Operator xor / exclusive or.</td>
                        <td className={styles.dataCell}>3</td>
                    </tr>
                    <tr className={styles.dataRow}>
                        <td className={styles.dataCell}>
                            <span className='highlight mx-1'>=&gt;</span>
                            <span className='highlight mx-1'>IF</span>
                        </td>
                        <td className={styles.dataCell}>Operator if.</td>
                        <td className={styles.dataCell}>2</td>
                    </tr>
                    <tr className={styles.dataRow}>
                        <td className={styles.dataCell}>
                            <span className='highlight mx-1'>&lt;=&gt;</span>
                        </td>
                        <td className={styles.dataCell}>Operator of equivalence.</td>
                        <td className={styles.dataCell}>1</td>
                    </tr>
                    <tr className={styles.dataRow}>
                        <td className={styles.dataCell}>
                            <span className='highlight mx-1'>(</span>
                            <span className='highlight mx-1'>)</span>
                        </td>
                        <td className={styles.dataCell}>Parentheses to change the order of operations.</td>
                        <td className={styles.dataCell}>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

function Error({ error }) {
    return <div className={`${styles.errorMessage} my-4 font-lg`}>{error}</div>
}