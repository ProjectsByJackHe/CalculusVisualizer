import initializeGraph from './Main.js'
import Render from './Render'
import * as math from 'mathjs'



class Taylor {
    constructor(point, func) {
        this.latexToExpress = new Render()
        this.point = point
        this.polynomial = String(math.evaluate(this.latexToExpress.latexToExpression(func), {x: point}))
        this.derivative = this.latexToExpress.latexToExpression(func) // derivative will be the nth derivative of func
        this.pow = 0
        this.denominator = 0
        console.log(this.polynomial)
    }

    // MODIFIES: this
    // EFFECTS: starts the visalization process for this Taylor series expansion
    startApproximate() {
        if (String(this.denominator).includes("e")) {
            throw new Error("error! Cannot approximate further")
        }
        initializeGraph.setExpression({id: "taylorApproximation", latex: "y =" + this.polynomial, color: "#0000FF"})
        this.updateState()
        const slope = String(math.evaluate(this.derivative, {x: this.point}))
        if (slope.includes("e")) {
            throw new Error("error! Cannot approximate further")
        }
        this.polynomial = this.polynomial + " + (" + slope + "/" + this.denominator + ") * (x - " + String(this.point) + ")^{" + String(this.pow) + "}"
    //    console.log(this.polynomial)
    }

    // MODIFIES: this
    // EFFECTS: updates the state 
    updateState() {
        this.pow++
        this.denominator = String(math.factorial(this.pow))
        this.derivative = math.derivative(this.derivative, "x").toString()
    }

    // EFFECTS: calculates the factorial of n
    // factorial(n) {
    //     var total = 1
    //     for (var x = 1; x <= n; x++) {
    //         total = total * x
    //     }
    //     return total
    // }

    // Number -> String
    // eliminates "e" and appends e+ N number of zeroes in the end
    // checkValid(n) {
    //     var num = String(n)
    //     if (num.includes("e")) {

    //         // removes "." from string
    //         num = num.charAt(0) + num.slice(2, num.length)

    //         // get number of zeroes to append in the end
    //         var zeroes = ""
    //         for (var endBound = num.length - 1; num.charAt(endBound) != "+"; endBound--) {
    //             zeroes = zeroes + num.charAt(endBound)
    //         }
    //         zeroes = Number(zeroes)


    //         // remove chars before and including "+"
    //         for (var endBound = num.length - 1; endBound > 0; endBound--) {
    //             if (num.charAt(num.length - 1) === "e") {
    //                 num = num.substr(0, num.length - 1)
    //                 break
    //             }
    //             num = num.substr(0, num.length - 1)
    //         }

    //         // adds the zeroes to the end
    //         for (var i = 1; i <= zeroes; i++) {
    //             num = num + "0"
    //         }
    //         return num
    //     } else {
    //         return num
    //     }
    // }
}

export default Taylor