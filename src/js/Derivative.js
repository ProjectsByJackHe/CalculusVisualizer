import math from 'mathjs'
// String Number -> List(Number, Number)
// this function should return the derivative of a function at a specific point and f(x)
console.log(math)
function takeDx(func, point){
    const slope = math.derivative(func, "x").evaluate({x: point})
    console.log(slope)
}

export default takeDx