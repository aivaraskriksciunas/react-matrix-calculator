import React from 'react';

import MatrixGridController from '../components/Matrix/MatrixGridController'
import SelectButton from '../components/SelectButton'
import { createInitialMatrix } from '../lib/MatrixModifers'
import MatrixOperations, {
    OP_TRANSPOSE,
    OP_DETERMINANT,
    OP_SQUARE,
    OP_CUBE,
    OP_ADD,
    OP_SUBTRACT,
    OP_MULTIPLY,
    OP_INVERSE
} from '../lib/MatrixOperations'

class Calculator extends React.Component {

    constructor( props ) {
        super( props )

        this.state = {
            matrixA: createInitialMatrix( 3, 3 ),
            matrixB: createInitialMatrix( 3, 3 ),
            resultMatrix: null,
            calculationError: null,
        }

        this.createOpSelectHandler = this.createOpSelectHandler.bind( this )
    }

    swapMatrices() {
        let matrixA = this.state.matrixA
        this.setState({
            matrixA: this.state.matrixB,
            matrixB: matrixA
        })
    }

    selectOperation( operation ) {
        const [ result, error ] = MatrixOperations.doOperation( operation, this.state.matrixA, this.state.matrixB )

        this.setState({
            resultMatrix: result,
            calculationError: error
        })
    }

    createOpSelectHandler = ( operation ) => {
        return () => this.selectOperation( operation )
    }

    render() {
        return (
            <div>
                <div className='container boxContainer'>
                    <div className='sm:justify-center items-start  flex flex-wrap'>
                        <div className='pr-8 mb-8' style={{ flex: 1 }}>
                            <MatrixGridController 
                                onChange={(mat) => this.setState({ matrixA: mat })} 
                                matrix={this.state.matrixA}>
                            </MatrixGridController>
                        </div>
                        <div className='mb-8' style={{ flex: 1 }}>
                            <MatrixGridController 
                                onChange={(mat) => this.setState({ matrixB: mat })} 
                                matrix={this.state.matrixB}>
                            </MatrixGridController>
                        </div>
                    </div>

                    <ButtonRow>
                        <SelectButton onSelect={this.swapMatrices.bind( this )}>Swap matrices</SelectButton>
                    </ButtonRow>

                    <ButtonRow title="Single matrix operations (using first matrix)">
                        <SelectButton onSelect={this.createOpSelectHandler( OP_TRANSPOSE )}>Transpose</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OP_SQUARE )}>^ 2</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OP_CUBE )}>^ 3</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OP_DETERMINANT )}>Find determinant</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OP_INVERSE )}>Find inverse matrix</SelectButton>
                    </ButtonRow>

                    <ButtonRow title="Arithmetic operations">
                        <SelectButton onSelect={this.createOpSelectHandler( OP_ADD )}>Add</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OP_SUBTRACT )}>Subtract</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OP_MULTIPLY )}>Multiply</SelectButton>
                    </ButtonRow>

                </div>


                {/* <ResultContainer matrix={this.state.resultMatrix} error={this.state.calculationError}></ResultContainer> */}
                {this.createResultContainer()}
            </div>
        )
    }


    createResultContainer() {
        const matrix = typeof( this.state.resultMatrix ) == "number" ? 
            [[ this.state.resultMatrix ]] : this.state.resultMatrix
        const error = this.state.calculationError

        if ( error ) {
            return (
                <div className='container boxContainer' style={{ borderTop: '5px solid #b71c1c'}}>
                    <div className='font-2xl mb-4'>Result</div>
                    {error.toString()}
                </div>
            )
        }
        else if ( matrix ) {
            return (
                <div className='container boxContainer' style={{ borderTop: '5px solid #009688'}}>
                    <div className='font-2xl mb-4'>Result</div>
                    <MatrixGridController 
                        matrix={matrix} 
                        readonly>
                    </MatrixGridController>

                    <ButtonRow>
                        {/* When setting matrix, we need to copy it first */}
                        <SelectButton onSelect={() => this.setState({ matrixA: [...matrix] })}>Set as Matrix A</SelectButton>
                        <SelectButton onSelect={() => this.setState({ matrixB: [...matrix] })}>Set as Matrix B</SelectButton>
                    </ButtonRow>
                </div>
            )
        }
    
        return null;
    }

}

function ButtonRow({ title, children }) {

    return (
        <>
            {!!title ? <div className='font-lg mb-3'>{title}</div> : null}

            <div className='flex flew-wrap mb-5'>
                {children}
            </div>
        </>
    )
}

export default Calculator;
