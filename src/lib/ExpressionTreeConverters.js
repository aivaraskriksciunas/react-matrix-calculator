export function treeToPrefix( tree ) {
    return getPrefixStr( tree )
} 

export function treeToPostfix( tree ) {
    return getPostfixStr( tree )
}

function getPrefixStr( node ) {

    if ( typeof( node ) === 'string' ) return node;

    let result = node.toString() + ' '

    for ( let i = 0; i < node.children.length; i++ ) {
        result += getPrefixStr( node.children[i] ) + ' '
    }

    return result
}

function getPostfixStr( node ) {

    if ( typeof( node ) === 'string' ) return node;

    let result = ''
    
    for ( let i = 0; i < node.children.length; i++ ) {
        result += getPostfixStr( node.children[i] ) + ' '
    }

    return result + node.toString() + ' '
}