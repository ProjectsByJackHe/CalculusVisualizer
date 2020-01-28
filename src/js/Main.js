// string -> image
// renders a latex expression onto the canvas
import RenderObj from './Render.js'

// string number -> List(Number, Number)
//                  List(dx,     f(x))
// returns the derivative a given expressioin at a specific point and F(x)


// ===========================================================================================================
// DATA DEFINITIONS
// ===========================================================================================================
// EFFECTS: initialize graphing calculator class and configure settings
const graph = document.getElementById("root")
const derivativeButton = document.getElementById("button-derivative")
const taylorButton = document.getElementById("button-taylor")
const riemannButton = document.getElementById("button-riemann") 
const initializeGraph = Desmos.GraphingCalculator(graph)
const startFn = document.getElementById("startFn")
const endFn = document.getElementById("endFn")
const start = document.getElementById("start")
const end = document.getElementById("end")
const Render = new RenderObj()
initializeGraph.updateSettings({invertedColors: true})
initializeGraph.updateSettings({expressions: false})
initializeGraph.updateSettings({keypad: false})
initializeGraph.updateSettings({settingsMenu: false})
initializeGraph.updateSettings({zoomButtons: false})
// console.log(initializeGraph)

var func;

// ===========================================================================================================
// FUNCTION DEFINITIONS
// ===========================================================================================================

// EFFECTS: initialize user input for graphing functions
var mathFieldSpan = document.getElementById('math-field');
var MQ = MathQuill.getInterface(2);
var mathField = MQ.MathField(mathFieldSpan, {
  spaceBehavesLikeTab: true, 
  handlers: {
    edit: function() {
      func = mathField.latex()
      Render.renderFunc(mathField.latex())
    }
  }
});

// EFFECTS: start the visualization process for DERIVATIVES
startFn.onclick =  function(){
  // user clicked on the start initialization button
  if (start.value === "" || end.value === "" || Number(start.value) > Number(end.value) || func === undefined){
    alert("Hmm... check to see that you have a valid start and end bound and a valid function")
    return
  }
  Render.renderDerivative(func, Number(start.value), Number(end.value))
}

// EFFECTS: get Number x1 and Number x2 from user 
function askForBounds(){
  if (document.getElementById("myDropdown").style.display === "block"){
    document.getElementById("myDropdown").style.display = "none"
    document.getElementById("button-derivative").innerHTML = "⇓ Visualize Derivative"
    return
  }
  document.getElementById("myDropdown").style.display = "block" 
  document.getElementById("button-derivative").innerHTML = "⇑ Close Menu" 
}

// EFFECTS: get Number x from user
function askForPoint(){
  // asks for point where we will take the taylor expansion
}

function askForBoundsIntegral(){
  // provide additional options to continuously take integrals
}

derivativeButton.onclick = function() {
  console.log("d/dx")
  askForBounds()
}

taylorButton.onclick = function(){
  console.log("taylor")
  askForPoint()
}

riemannButton.onclick = function(){
  console.log("riemann")
  askForBoundsIntegral()
}

export default initializeGraph