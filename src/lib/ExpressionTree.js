
function getNodeOutput( node, parameters ) {
    if ( typeof( node ) === 'string' ) {
        return parameters[node]
    }

    return node.calculate( parameters )
}

class Or {
    precedence = 3
    calculate( args ) {
        let left = getNodeOutput( this.children[0], args )
        let right = getNodeOutput( this.children[1], args )

        return left || right
    }

    toString = () => '||'
}

class And {
    precedence = 4
    calculate( args ) {
        let left = getNodeOutput( this.children[0], args )
        let right = getNodeOutput( this.children[1], args )

        return left && right
    }

    toString = () => '&'
}

class Xor {
    precedence = 3
    calculate( args ) {
        let left = getNodeOutput( this.children[0], args )
        let right = getNodeOutput( this.children[1], args )

        if ( left === right ) return 0
        else return 1
    }

    toString = () => 'XOR'
}

class Not {
    precedence = 5
    childNodes = 1

    calculate( args ) {
        let left = getNodeOutput( this.children[0], args )

        return !left ? 1 : 0
    }

    toString = () => '!'
}

class If {
    precedence = 2

    calculate( args ) {
        let left = getNodeOutput( this.children[0], args )
        let right = getNodeOutput( this.children[1], args )

        return left === 1 && right === 0 ? 0 : 1
    }

    toString = () => '=>'
}

class Equivalent {
    precedence = 1

    calculate( args ) {
        let left = getNodeOutput( this.children[0], args )
        let right = getNodeOutput( this.children[1], args )

        return left === right ? 1 : 0
    }

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
        case '^':
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