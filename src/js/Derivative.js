import * as math from 'mathjs'


// String Number -> List(List(Number, Number))
// this function should return the derivative of a function at a specific point and f(x)
function takeDx(func, start, end, increment){
    var derivativeFuncObj = math.derivative(func, "x")

    // string representation
    var derivativeFuncStr = derivativeFuncObj.toString()
    console.log(derivativeFuncStr)

    // evaluate the function at a specific point
    var derivativeFuncEval = derivativeFuncObj.compile()
    // use .evaluate({x: point}) once the derivative function works.


    var derivativesAndF = []

    for (var point = start; point <= end; point += increment) {
        let scope = {
            x:point
        }
        derivativesAndF.push([derivativeFuncEval.evaluate(scope), math.evaluate(func, scope)])
    }

    return derivativesAndF // stub
}

export default takeDx