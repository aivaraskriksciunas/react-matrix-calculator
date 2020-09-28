import { uniq, sortBy } from 'lodash'
import { getPrecedence, createNode, insertNode } from './ExpressionTree'


export function createExpressionTree( expression ) {
    let stack = []
    let output = []
    let operands = []

    if ( expression.trim() === '' ) 
        throw new Error( 'Cannot interpret an empty expression.' )

    // Split the expression into operands, operators and parentheses
    let operations = expression.match( /([a-z]+[0-9]*|[A-Z]+|[!]{1}|[&|<=>^]+|[()])/g )
    if ( operations === null ) {
        throw new Error( 'Invalid expression.' )
    }

    for ( let i = 0; i < operations.length; i++ ) {
        // Skip any spaces
        if ( operations[i].trim() === ' ' ) continue;

        // Check if this is an alphanumeric operand
        if ( /[a-z]+[0-9]*/.test( operations[i] ) ) {
            output.push( operations[i] )
            operands.push( operations[i] )
        }
        else if ( operations[i] === '(' ) {
            stack.push( '(' )
        }
        else if ( operations[i] === ')' ) {
            while( stack.length > 0 && top( stack ) !== '(' ) {
                output = insertNode( stack.pop(), output )
            }

            // Pop the '(' from the stack
            stack.pop()
        }
        else {
            let node = createNode( operations[i] )
            while( stack.length > 0 && node.precedence <= getPrecedence( top( stack ) ) ) {
                output = insertNode( stack.pop(), output )
            }

            stack.push( node )
        }
    }

    while( stack.length > 0 ) {
        let top = stack.pop()

        if ( top === '(' || top === ')' ) continue;

        output = insertNode( top, output )
    }

    if ( output.length > 1 ) 
        throw new Error( 'Interpretation error: could not interpret expression. Make sure you are not missing any operations.' )

    return {
        tree: output[0],
        operands: sortBy( uniq( operands ) )
    } 
}

function top( stack ) {
    return stack[stack.length - 1]
}