
export function generateTruthTable( tree, operands ) {
    // Limit the number of operands for obvious performance reasons
    if ( operands.length > 6 ) {
        throw new Error( "Too many operands: the number of operands for truth tables is limited to 6 for performance reasons. You specified " + operands.length + "." )
    }

    // Create empty arrays for each of the operand
    // Their sizes are determined by the possible combination count, i.e. 2 ^ operand_count
    // let variableValues = operands.map( () => Array( Math.pow( 2, operands.length ) ) )
    let headers = operands
    let rows = Array( Math.pow( 2, operands.length ) )

    let parameterList = []

    for ( let row = 0; row < rows.length; row++ ) {
        rows[row] = Array( operands.length )
        let rowAsParams = {}
        for ( let col = 0; col < operands.length; col++ ) {
            let bit = row & ( 1 << col ) ? 1 : 0
            rows[row][operands.length - col - 1] = bit
            rowAsParams[operands[operands.length - col - 1]] = bit
        }

        parameterList.push( rowAsParams )
    }

    headers.push( 'result' )

    for ( let row = 0; row < parameterList.length; row++ ) {
        rows[row].push( tree.calculate( parameterList[row] ) )
    }

    return { 
        headers,
        table: rows
    }
}