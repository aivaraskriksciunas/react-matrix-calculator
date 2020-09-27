import React from 'react'
import styles from './Matrix.module.css'
import ContentEditable from 'react-contenteditable'
import MatrixModifiers, { createInitialMatrix, matrixCanExpandCols, matrixCanExpandRows } from '../../lib/MatrixModifers'
import isEqual from 'lodash/isEqual'

export default class MatrixGridController extends React.Component {

    constructor( props ) {
        super( props )

        let matrix = []
        // Check if a matrix was passed as a parameter
        if ( props.matrix ) matrix = props.matrix 
        // Otherwise create a matrix manually
        else matrix = createInitialMatrix( props.rows || 3, props.cols || 3 )

        this.onChange = props.onChange
        this.readonly = !!props.readonly

        this.state = {
            matrix: matrix
        }
    }

    componentDidUpdate( prevProps ) {
        if ( !isEqual( prevProps.matrix, this.props.matrix )) {
            this.setState({
                matrix: this.props.matrix
            })
        }
    }

    setMatrixValue( ev, row, col ) {
        if ( this.readonly ) {
            return;
        }

        // Strip html tags from the returned string
        let element = document.createElement( "div" )
        element.innerHTML = ev.target.value 

        let value = element.textContent || element.innerText || ""

        this.setMatrixState( MatrixModifiers.setElementValue( this.state.matrix, row, col, value ) )
    }

    // Converts a given matrix value into a Number
    parseMatrixValue = ( row, col ) => this.setMatrixState(
        MatrixModifiers.setElementValue( this.state.matrix, row, col, Number( this.state.matrix[row][col] ) || 0 )
    )

    expandMatrixCols = () => this.setMatrixState( MatrixModifiers.addColumn( this.state.matrix ) )

    expandMatrixRows = () => this.setMatrixState( MatrixModifiers.addRow( this.state.matrix ) )

    expandMatrixRowsAndCols = () => this.setMatrixState( MatrixModifiers.addRowAndColumn( this.state.matrix ) ) 

    removeRow = index => this.setMatrixState( MatrixModifiers.removeRow( this.state.matrix, index ) )

    removeColumn = index => this.setMatrixState( MatrixModifiers.removeColumn( this.state.matrix, index ) )

    setMatrixState( matrix ) {
        this.setState({
            matrix: matrix 
        })

        if ( this.onChange ) {
            this.onChange( matrix )
        }
    }

    selectCellText( htmlElement ) {
        let range = document.createRange()
        range.selectNodeContents( htmlElement )
        let selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange( range )
    }

    createMatrixRow( row, rowIndex ) {
        if ( !this.readonly ) {
            return row.map(
                ( col, colIndex ) => (
                    <td key={rowIndex + '.' + colIndex}>
                        <ContentEditable
                            html={col.toString()}
                            onChange={( ev ) => this.setMatrixValue( ev, rowIndex, colIndex )}
                            onFocus={( ev ) => this.selectCellText( ev.target )}
                            onBlur={() => this.parseMatrixValue( rowIndex, colIndex )}
                            className={styles.matrixInput}
                            ></ContentEditable>
                    </td>
                ) 
            )
        }
        else {
            return row.map(
                ( col, colIndex ) => (
                    <td key={rowIndex + '.' + colIndex}>
                        <div className={styles.matrixInput}>{col.toString()}</div>
                    </td>
                ) 
            )
        }
    }

    render() {
        return (
            <>
            <table style={{ height: '100%' }}>
                <tbody>
                    <tr>
                        <td>{/* Empty cell */}</td>
                        {!this.readonly && this.state.matrix[0].map( ( c, index ) => 
                            <RemoveButton key={index} onClick={() => this.removeColumn( index )}/>
                        )}
                    </tr>

                    {this.state.matrix.map(
                        ( row, rowIndex ) => (
                            <tr key={rowIndex} style={{height: '100%'}}>
                                {/* Create a remove button */}
                                {!this.readonly && <RemoveButton onClick={() => this.removeRow( rowIndex )}/>}

                                {this.createMatrixRow( row, rowIndex )}

                                {/* If this is the first row, show, the add column button */}
                                {!this.readonly && (rowIndex === 0) && ( matrixCanExpandCols( this.state.matrix ) ) ? (
                                    <td rowSpan={this.state.matrix.length} style={{ paddingBottom: '8px'}}>
                                        <button className='button light w-full' 
                                            style={{ height: '100%' }} 
                                            onClick={this.expandMatrixCols.bind( this )}>+
                                        </button>
                                    </td>
                                ) : null }
                            </tr>
                        )
                    )}

                    <tr>
                        <td>{/* Empty cell */}</td>

                        {!this.readonly && matrixCanExpandRows( this.state.matrix ) ? 
                        <td colSpan={this.state.matrix[0].length}  style={{ paddingRight: '8px' }}>
                            <button className='button light w-full' onClick={this.expandMatrixRows.bind( this )}>+</button>
                        </td> : null}

                        {!this.readonly && matrixCanExpandRows( this.state.matrix ) && matrixCanExpandCols( this.state.matrix ) ?
                        <td>
                            <button className='button light w-full' 
                                onClick={ this.expandMatrixRowsAndCols.bind( this ) }>+
                            </button>
                        </td> : null }
                    </tr>
                </tbody>
            </table>

            </>
        )
    }

}

function RemoveButton({ onClick }) {
    return (
        <td style={{ paddingRight: 8 }}>
            <div className={styles.removeButtonCell}>
                <span onClick={onClick} className={styles.removeButton}>-</span>
            </div>
        </td>
    )
}