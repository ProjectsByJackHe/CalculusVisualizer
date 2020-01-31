import initializeGraph from './Main.js'
import takeDx from './Derivative.js'

class Render{
    renderFunc(expression){
        // console.log(expression)
        var equation = "y = " + expression
    
        // console.log(equation)
        initializeGraph.setExpression({ id: 'oneAndOnlyGraph', latex: equation, color: "#00FFFF"});
    }

    // String -> String
    // transforms latex string to an expression mathjs will understand
    // get rid of all instances of { and }
    // replace \sin x with sin(x), \sin\left(x\right) with sin(x)
    latexToExpression(latex) {
        var expr = ""

        // removes all instances of '{' and '}'
        // removes all instances of \left and \right
        for (var i = 0; i < latex.length; i++){
            if (latex[i] != "{" && latex[i] != "}") {
                if (latex[i] === "\\" && latex[i+5] === "t"){
                    i += 5 // skips 'right'
                } else if (latex[i] === "\\" && latex[i+4] === "t") {
                    i += 4 // skips 'left'
                } else if (latex[i] != "\\") { 
                    expr = expr + latex[i]
                }
            }
        }

        return expr
    }

    renderDerivative(latex, start, end) {
      //    console.log(this.latexToExpression(latex))
            takeDx(this.latexToExpression(latex), 0)
    }
}

export default Render