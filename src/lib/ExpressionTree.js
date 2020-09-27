
class Or {
    precedence = 3
    calculate( stack ) {

    }

    toString = () => '||'
}

class And {
    precedence = 4
    calculate( stack ) {

    }

    toString = () => '&'
}

class Xor {
    precedence = 3
    toString = () => 'XOR'
}

class Not {
    precedence = 5
    childNodes = 1
    toString = () => '!'
}

class If {
    precedence = 2
    toString = () => '=>'
}

class Equivalent {
    precedence = 1
    toString = () => '<=>'
}

export function createNode( operator ) {
    switch( operator ) {
        case '&':
        case 'AND':
            return new And()
        case '!':
        case 'NOT':
            return new Not()
        case '||':
        case 'OR':
            return new Or()
        case 'XOR':
            return new Xor()
        case '=>':
        case 'IF':
            return new If()
        case '<=>':
            return new Equivalent()
        default: 
            throw new Error( "Syntax error: unrecognized operator " + operator )
    }
}

export function insertNode( node, output ) {
    let stackItemsUsed = node.childNodes || 2
    
    let nodes = output.splice( output.length - stackItemsUsed )
    node.children = nodes

    output.push( node )
    return output
}

export function getPrecedence( operator ) {
    return operator.precedence || 0
}