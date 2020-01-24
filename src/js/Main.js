import renderFunc from './Render.js'

// EFFECTS: initialize graphing calculator class and configure settings
const graph = document.getElementById("root")
const initializeGraph = Desmos.GraphingCalculator(graph)
initializeGraph.updateSettings({invertedColors: true})
initializeGraph.updateSettings({expressions: false})
initializeGraph.updateSettings({keypad: false})
initializeGraph.updateSettings({settingsMenu: false})
initializeGraph.updateSettings({zoomButtons: false})
console.log(initializeGraph)


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