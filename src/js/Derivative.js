import * as math from 'mathjs'
// String Number -> List(Number, Number)
// this function should return the derivative of a function at a specific point and f(x)
var func = math.derivative("x^2", "x").compile()
for (var i = 1; i <= 100; i++){
    console.log(func.evaluate({x: i}))
}


const LibraryOfDerivatives = {
    "\sin x":function(x){math.cos(x)}, "\tan x": function(x){(math.sec(x))**2}
}
function takeDx(func, point){
   // const slope = math.derivative(func, "x").evaluate({x: point})
   // console.log(slope)
}

export default takeDx