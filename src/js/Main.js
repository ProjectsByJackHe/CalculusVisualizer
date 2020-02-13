import RenderObj from './Render.js'
import Riemann from './Riemann.js'
import Taylor from './TaylorSeries.js'

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
const startVisalizingTaylor = document.getElementById("startVisualizing_1")
const startBoundInputDerivatives = document.getElementById("startBoundInput")
const endBoundInputDerivatives = document.getElementById("endBoundInput")
const startBoundInputRiemann = document.getElementById("startBoundInput_0")
const endBoundInputRiemann = document.getElementById("endBoundInput_0")
const pointOfApprox = document.getElementById("centralPoint")
const Render = new RenderObj()
initializeGraph.updateSettings({invertedColors: true})
initializeGraph.updateSettings({expressions: false})
initializeGraph.updateSettings({keypad: false})
initializeGraph.updateSettings({settingsMenu: false})
initializeGraph.updateSettings({zoomButtons: false})

// global function object
var func;

// global taylor object
var taylor;

// TESTING:
// const temp = "-2.7755575615628914e-16(x --1.3877787807814457e-16) +1.9259299443872359e-32"
// initializeGraph.setExpression({latex: temp, id: "temp"})


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
       console.log(func)
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


// "\\polygon\\left(\\left(0,0\\right),\\ \\left(0,1\\right),\\ \\left(1,1\\right),\\ \\left(1,\\ 0\\right)\\right)"
        

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

// global riemann object
var riemann;

startBoundInputRiemann.oninput = function() {updateDx()}
endBoundInputRiemann.oninput = function() {updateDx()}

// MODIFIES: riemann
// EFFECTS: updates global object
function updateDx() {
  if (startBoundInputRiemann.value != "" && endBoundInputRiemann.value != ""){
    // we set the dx here:
    const dx = Number(endBoundInputRiemann.value) - Number(startBoundInputRiemann.value)
    //    console.log(dx)
    riemann = new Riemann(dx, 0, 0, func)
  }
}

startVisualizingRiemann.onclick =  function(){
  // user clicked on the start initialization button
  if (startBoundInputRiemann.value === "" || endBoundInputRiemann.value === "" || Number(startBoundInputRiemann.value) > Number(endBoundInputRiemann.value) || func === undefined){
    alert("Hmm... check to see that you have a valid start and end bound and a valid function")
    return
  }
  try {
    const originalValue = Number(endBoundInputRiemann.value) - Number(startBoundInputRiemann.value)
    if (riemann.dx === originalValue / 128) {
      alert("Warning: continuing to approximate will slow down your computer")
    }
    let e = document.getElementById("pointOfApproximation");
    riemann.pos = e.options[e.selectedIndex].value 

    riemann.startBound = Number(startBoundInputRiemann.value)
    riemann.endBound = Number(endBoundInputRiemann.value)
    riemann.dx = riemann.dx / 2
    riemann.startVisualization()
  }
  catch(err){
    alert("Check that you have inputed a valid function. Error message: " + err)
  }
}



pointOfApprox.oninput = function() {
  taylor = new Taylor(Number(pointOfApprox.value), func)
}


startVisalizingTaylor.onclick = function() {
   // user clicked on the start initialization button
   if (pointOfApprox.value === "" || func === undefined){
    alert("hmm... Check that you have a valid function and point entry and that the derivative exists at that point.")
    return
  }

  try {
    taylor.point = Number(pointOfApprox.value)
    taylor.startApproximate()
  } catch (err) {
    alert("Oh no! error: " + err)
  }

}


// EFFECTS: get Number x1 and Number x2 from user 
function askForBounds(ref) {
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
        document.getElementById("myDropdown_0").style.left = "240px"

        if (document.getElementById("myDropdown_0").style.display === "block"){
          // clear all expressions on the screen
          const allExpressions = initializeGraph.getExpressions()
          for (var i = 1; i < allExpressions.length; i++) {
              initializeGraph.removeExpression({id: allExpressions[i].id})
          }

          startBoundInputRiemann.value = ""
          endBoundInputRiemann.value = ""

          document.getElementById("myDropdown_0").style.display = "none"
          document.getElementById("button-riemann").innerHTML = "⇓ Visualize Riemann sums"
          return
        }

        document.getElementById("myDropdown_0").style.display = "block" 
        document.getElementById("button-riemann").innerHTML = "⇑ Close Menu" 

    } else if (ref === "taylor") {

        document.getElementById("myDropdown_1").style.backgroundColor = "orange"

        if (window.innerWidth > 700) {
          document.getElementById("myDropdown_1").style.left = "480px"
        }


      if (document.getElementById("myDropdown_1").style.display === "block"){

        initializeGraph.removeExpression({id: "taylorApproximation"})
        if (func != undefined) {
          taylor = new Taylor(Number(pointOfApprox.value), func)
        }
        

        document.getElementById("myDropdown_1").style.display = "none"
        document.getElementById("button-taylor").innerHTML = "⇓ Visualize Taylor Series"
        return
      }
      document.getElementById("myDropdown_1").style.display = "block" 
      document.getElementById("button-taylor").innerHTML = "⇑ Close Menu"

    }
}


derivativeButton.onclick = function() {
//  console.log("d/dx")
  askForBounds("derivative")
}

taylorButton.onclick = function(){
//  console.log("taylor")
  askForBounds("taylor")
}

riemannButton.onclick = function(){
//  console.log("riemann")
  askForBounds("riemann")
}

export default initializeGraph