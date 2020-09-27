import { uniq, sortBy } from 'lodash'
import { getPrecedence, createNode, insertNode } from './ExpressionTree'

// export function interpretExpression( expression ) {
    
//     let stack = []
//     let output = []

//     // Split the expression into operands, operators and parentheses
//     let operations = expression.match( /([a-z]+[0-9]*|[A-Z]+|[&!|<=>]+|[()])/g )

//     for ( let i = 0; i < operations.length; i++ ) {
//         // Skip any spaces
//         if ( operations[i].trim() === ' ' ) continue;

//         // Check if this is an alphanumeric operand
//         if ( /[a-z]+[0-9]*/.test( operations[i] ) ) {
//             output.push( operations[i] )
//         }
//         else if ( operations[i] === '(' ) {
//             stack.push( '(' )
//         }
//         else if ( operations[i] === ')' ) {
//             while( stack.length > 0 && top( stack ) !== '(' ) {
//                 output.push( stack.pop() )
//             }

//             // Pop the '(' from the expression
//             stack.pop()
//         }
//         else {
//             let parsed = parseOperator( operations[i] )
//             while( stack.length > 0 && parsed.precedence <= getPrecedence( top( stack ) ) ) {
//                 output.push( stack.pop() )
//             }

//             stack.push( parsed )
//         }
//     }

//     while( stack.length > 0 ) {
//         let top = stack.pop()

//         if ( top === '(' || top === ')' ) continue;

//         output.push( top )
//     }

//     return output 
// }

export function createExpressionTree( expression ) {
    let stack = []
    let output = []
    let operands = []

    // Split the expression into operands, operators and parentheses
    let operations = expression.match( /([a-z]+[0-9]*|[A-Z]+|[&!|<=>]+|[()])/g )

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

    return {
        tree: output,
        operands: sortBy( uniq( operands ) )
    } 
}

function top( stack ) {
    return stack[stack.length - 1]
}