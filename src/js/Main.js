// string -> image
// renders a latex expression onto the canvas
import RenderObj from './Render.js'

// ===========================================================================================================
// DATA DEFINITIONS
// ===========================================================================================================
// EFFECTS: initialize graphing calculator class and configure settings


const graph = document.getElementById("root")
const derivativeButton = document.getElementById("button-derivative")
const taylorButton = document.getElementById("button-taylor")
const riemannButton = document.getElementById("button-riemann") 
const initializeGraph = Desmos.GraphingCalculator(graph)
const startVisualizing = document.getElementById("startVisualizing")
const startVisualizingRiemann = document.getElementById("startVisualizing_0")
const startBoundInputDerivatives = document.getElementById("startBoundInput")
const endBoundInputDerivatives = document.getElementById("endBoundInput")
const startBoundInputRiemann = document.getElementById("startBoundInput_0")
const endBoundInputRiemann = document.getElementById("endBoundInput_0")
const Render = new RenderObj()
initializeGraph.updateSettings({invertedColors: true})
initializeGraph.updateSettings({expressions: false})
initializeGraph.updateSettings({keypad: false})
initializeGraph.updateSettings({settingsMenu: false})
initializeGraph.updateSettings({zoomButtons: false})

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
      // console.log(func)
      // try{
      //   Render.renderDerivative(func, 0, 10) 
      // }
      // catch{
      //   console.log("invalid func")
      // }
      Render.renderFunc(func)
    }
  }
});

// EFFECTS: start the visualization process for DERIVATIVES
startVisualizing.onclick =  function(){
  // user clicked on the start initialization button
  if (startBoundInputDerivatives.value === "" || endBoundInputDerivatives.value === "" || Number(startBoundInputDerivatives.value) > Number(endBoundInputDerivatives.value) || func === undefined){
    alert("Hmm... check to see that you have a valid start and end bound and a valid function")
    return
  }
  try {
    Render.renderDerivative(func, Number(startBoundInputDerivatives.value), Number(endBoundInputDerivatives.value))
  }
  catch(err){
    alert("Check that you have a valid function. All trigonometric functions must have valid brackets ( ). i. e. sin(x), cos(x), tan(x)... etc. Error message: " + err)
  }
}

startVisualizingRiemann.onclick =  function(){
  // user clicked on the start initialization button
  if (startBoundInputRiemann.value === "" || endBoundInputRiemann.value === "" || Number(startBoundInputRiemann.value) > Number(endBoundInputRiemann.value) || func === undefined){
    alert("Hmm... check to see that you have a valid start and end bound and a valid function")
    return
  }
  try {
    alert("yay!")
  }
  catch(err){
    alert("Check that you have inputed a valid function. Error message: " + err)
  }
}

// EFFECTS: get Number x1 and Number x2 from user 
function askForBounds(ref){

      if (ref === "derivative") {


        if (document.getElementById("myDropdown").style.display === "block"){
          document.getElementById("myDropdown").style.display = "none"
          document.getElementById("button-derivative").innerHTML = "⇓ Visualize Derivative"
          return
        }
        document.getElementById("myDropdown").style.display = "block" 
        document.getElementById("button-derivative").innerHTML = "⇑ Close Menu" 


      } else if (ref === "riemann") {
        document.getElementById("myDropdown_0").style.backgroundColor = "red"
        if (document.getElementById("myDropdown_0").style.display === "block"){
          document.getElementById("myDropdown_0").style.display = "none"
          document.getElementById("button-riemann").innerHTML = "⇓ Visualize Riemann sums"
          return
        }
        document.getElementById("myDropdown_0").style.display = "block" 
        document.getElementById("button-riemann").innerHTML = "⇑ Close Menu" 

    }
}

// EFFECTS: get Number x from user
function askForPoint(){
  // asks for point where we will take the taylor expansion
}

derivativeButton.onclick = function() {
//  console.log("d/dx")
  askForBounds("derivative")
}

taylorButton.onclick = function(){
//  console.log("taylor")
  askForPoint()
}

riemannButton.onclick = function(){
//  console.log("riemann")
  askForBounds("riemann")
}

export default initializeGraph