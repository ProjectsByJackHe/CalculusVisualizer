import initializeGraph from './Main.js'
import takeDx from './Derivative.js'


class Render{
    // String -> Image
    // draws the graph onto the screen
    renderFunc(expression){
        initializeGraph.setExpression({ id: 'oneAndOnlyGraph', latex: expression, color: "#00FFFF"});
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

            // INCREMENT is Number
            // interp. as the dx value along the x axis
            let INCREMENT = 0.1

            // listOfDerivativesAndFunctions is [Number, Number]
            // the first item of the array represents the DERIVATIVE, 
            // the second item represents F(X).
            // Each tuple pair represents a new increment of x by INCREMENT 
            let listOfDerivativesAndFunctions = takeDx(this.latexToExpression(latex), start, end, INCREMENT)

            // interval is Number
            // interp. as the number of milliseconds per interval of setInterval
            let interval = 30

            var point = start
            var index = 0
            let finish = listOfDerivativesAndFunctions.length

            var visualize = setInterval(() => {
                if (index >= finish) {
                    initializeGraph.removeExpression({id: "visualizationGraph"})
                    clearInterval(visualize)
                } else {
                  //  console.log("point:", point)
                  //  console.log("index:", index)
                    let linearFunc = listOfDerivativesAndFunctions[index][0] + "(x -" + point + ") +" + listOfDerivativesAndFunctions[index][1]
                    initializeGraph.setExpression({id:"visualizationGraph",latex:linearFunc, color: "#c74440"})
                    index++
                    point += INCREMENT 
                }
            }, interval);
    }
}

export default Render