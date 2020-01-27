// string -> image
// renders a latex expression onto the canvas
import renderFunc from './Render.js'

// string number -> number
// returns the derivative a given expressioin at a specific point


// ===========================================================================================================
// DATA DEFINITIONS
// ===========================================================================================================
// EFFECTS: initialize graphing calculator class and configure settings
const graph = document.getElementById("root")
const derivativeButton = document.getElementById("button-derivative")
const taylorButton = document.getElementById("button-taylor")
const riemannButton = document.getElementById("button-riemann") 
const initializeGraph = Desmos.GraphingCalculator(graph)
initializeGraph.updateSettings({invertedColors: true})
initializeGraph.updateSettings({expressions: false})
initializeGraph.updateSettings({keypad: false})
initializeGraph.updateSettings({settingsMenu: false})
initializeGraph.updateSettings({zoomButtons: false})
// console.log(initializeGraph)


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
      renderFunc(mathField.latex())
    }
  }
});



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