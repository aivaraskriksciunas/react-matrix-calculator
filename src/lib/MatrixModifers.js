
export default class MatrixModifiers {

    static addColumn( matrix ) {
        if ( !matrixCanExpandCols( matrix ) ) return;

        return matrix.map( row => [ ...row, 0 ])
    }

    static addRow( matrix ) {
        if ( !matrixCanExpandRows( matrix ) ) return;

        matrix.push( new Array( matrix[0].length ).fill( 0 ) )

        return matrix
    }

    static addRowAndColumn( matrix ) {
        if ( !matrixCanExpandCols( matrix ) || 
            !matrixCanExpandRows( matrix ) ) 
            return;

        let newMatrix = matrix.map( row => [ ...row, 0 ])
        newMatrix.push( new Array( newMatrix[0].length ).fill( 0 ) )

        return newMatrix
    }

    static setElementValue( matrix, row, col, val ) {
        matrix[row][col] = val
        return matrix
    }

    static removeRow( matrix, rowIndex ) {
        if ( matrix.length <= 1 ) return matrix;
        return matrix.filter( ( r, i ) => i !== rowIndex )
    }

    static removeColumn( matrix, colIndex ) {
        if ( matrix[0].length <= 1 ) return matrix;
        return matrix.map( row => row.filter( ( c, i ) => i !== colIndex ))
    }
}

export const matrixCanExpandRows = ( matrix ) => matrix.length < 10
export const matrixCanExpandCols = ( matrix ) => matrix[0].length < 10

export function createInitialMatrix( rows, cols ) {
    // Create an initial matrix
    let matrix = new Array( rows )
    matrix.fill( ( new Array( cols ) ).fill( '' ) )
    
    // Temporary
    matrix = matrix.map( r => r.map( () => Math.floor( Math.random() * 10 ) ) )
    return matrix
}
