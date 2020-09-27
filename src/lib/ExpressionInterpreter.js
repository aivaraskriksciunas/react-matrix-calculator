import { parseOperator, getPrecedence } from './BooleanOperators'


export function interpretExpression( expression ) {
    
    let stack = []
    let output = []

    // Split the expression into operands, operators and parentheses
    let operations = expression.match( /([a-z]+[0-9]*|[A-Z]+|[&!|<=>]+|[()])/g )

    for ( let i = 0; i < operations.length; i++ ) {
        // Skip any spaces
        if ( operations[i].trim() === ' ' ) continue;

        // Check if this is an alphanumeric operand
        if ( /[a-z]+[0-9]*/.test( operations[i] ) ) {
            output.push( operations[i] )
        }
        else if ( operations[i] === '(' ) {
            stack.push( '(' )
        }
        else if ( operations[i] === ')' ) {
            while( stack.length > 0 && top( stack ) !== '(' ) {
                output.push( stack.pop() )
            }

            // Pop the '(' from the expression
            stack.pop()
        }
        else {
            let parsed = parseOperator( operations[i] )
            while( stack.length > 0 && parsed.precedence <= getPrecedence( top( stack ) ) ) {
                output.push( stack.pop() )
            }

            stack.push( parsed )
        }
    }

    while( stack.length > 0 ) {
        let top = stack.pop()

        if ( top === '(' || top === ')' ) continue;

        output.push( top )
    }

    console.log( output )

    return output 
}

function top( stack ) {
    return stack[stack.length - 1]
}

// function getPrecedence( operator ) {
//     switch ( operator ) {
//         case '<=>':
//             return 1;
//         case '=>':
//         case 'IF':
//             return 2;
//         case '||':
//         case 'OR':
//             return 3;
//         case '&':
//         case 'AND':
//             return 4;
//         case '!':
//         case 'NOT':
//             return 5;
//         default:
//             return 0;
//     }
// }