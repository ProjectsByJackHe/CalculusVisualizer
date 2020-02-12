import * as math from 'mathjs'
import initializeGraph from './Main.js'
import Render from './Render'

class Riemann {
    constructor(dx, startBound, endBound, latex, pos) {
        this.dx = dx 
        this.startBound = startBound 
        this.endBound = endBound 
        this.latexToExpression = new Render() 
        this.latex = latex
        this.pos = pos // pos is the point of approximation. i.e. we can start from the left, middle, or right
    }

    // EFFECTS: starts visualization process for riemann sums
    startVisualization() {
        console.log(this.pos)
        for (var point = this.startBound; point <= this.endBound; point += this.dx) {
            // (point, id, function-expression)
            this.graph(point, point, this.latex)
        }
    }


    // EFFECTS: graphs a polygon onto the canvas with given coordinate points. 
    graph(x0, id, latex) {
        const x = x0
        const x1 = x0 + this.dx
        var FofX;
        if (this.pos === "left") {
            FofX = this.getFx(latex, x)
        } else {
            FofX = this.getFx(latex, x1)
        }
        // left edge
        const polygon = "\\polygon\\left(\\left(" + x0 + ",0\\right),\\ \\left(" + x0 + "," + FofX + "\\right),\\ \\left(" + x1 + "," + FofX + "\\right),\\ \\left(" + x1 + ",\\ 0\\right)\\right)"
        
        initializeGraph.setExpression({id: String(id), latex: polygon})
    }

    // EFFECTS: should return F(x) at a specific point
    getFx(latex, point) {
        const expression = this.latexToExpression.latexToExpression(latex)
        let scope = {
            x:point
        }
        return math.evaluate(expression, scope) // stub
    }
}

export default Riemann