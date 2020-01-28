import initializeGraph from './Main.js'
import takeDx from './Derivative.js'

class Render{
    renderFunc(expression){
        // console.log(expression)
        var equation = "y = " + expression
    
        // console.log(equation)
        initializeGraph.setExpression({ id: 'oneAndOnlyGraph', latex: equation, color: "#00FFFF"});
    }

    renderDerivative(func, start, end){
        for (var i = start; i < end; i++){
            takeDx(func, i)
        }
    }
}

export default Render