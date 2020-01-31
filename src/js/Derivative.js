import * as math from 'mathjs'


// String Number -> List(Number, Number)
// this function should return the derivative of a function at a specific point and f(x)
function takeDx(func, point){
    var derivativeFuncObj = math.derivative(func, "x")

    // string representation
    var derivativeFuncStr = derivativeFuncObj.toString()
    console.log(derivativeFuncStr)

    // evaluate the function at a specific point
    var derivativeFuncEval = derivativeFuncObj.compile()
    // use .evaluate({x: point}) once the derivative function works.

    return ["derivative", "F(x)"] // stub
}

export default takeDx