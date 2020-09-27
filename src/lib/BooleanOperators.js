
class SyntaxError extends Error {
    constructor( message ) {
        super( message )
        this.name = 'Syntax error'
    }
}

export class Or {
    precedence = 3

    calculate( stack ) {

    }

    toString = () => '||'
}

export class And {
    precedence = 4

    calculate( stack ) {

    }

    toString = () => '&'
}

export class Xor {
    precedence = 3

    toString = () => 'XOR'
}

export class Not {
    precedence = 5

    toString = () => '!'
}

export class If {
    precedence = 2

    toString = () => '=>'
}

export class Equivalent {
    precedence = 1

    toString = () => '<=>'
}

export function parseOperator( operatorStr ) {
    switch ( operatorStr ) {
        case '!':
        case 'NOT':
            return new Not()
        case '&':
        case 'AND':
            return new And()
        case '||':
        case 'OR':
            return new Or()
        case '=>':
        case 'IF':
            return new If()
        case '<=>':
            return new Equivalent()
        default:
            throw new SyntaxError( 'Unknown operator ' + operatorStr )
    }
}

export function getPrecedence( operator ) {
    return operator.precedence || 0
}