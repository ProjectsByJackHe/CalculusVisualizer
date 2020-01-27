import initializeGraph from './Main.js'

function renderFunc(expression){
    // console.log(expression)
    var equation = "y = " + expression

    // console.log(equation)
    initializeGraph.setExpression({ id: 'oneAndOnlyGraph', latex: equation, color: "#00FFFF"});
}

export default renderFunc