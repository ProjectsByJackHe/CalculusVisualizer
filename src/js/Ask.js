import initializeGraph from './Main.js'

/*
  EFFECTS: Makes shit visible and invisible
  Reduces the chunkiness of Main.js
*/
function  ask(ref) {
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

        document.getElementById("startBoundInput_0").value = ""
        document.getElementById("endBoundInput_0").value = ""
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
    //   if (func != undefined) {
    //     taylor = new Taylor(Number(pointOfApprox.value), func)
    //   }
      
      document.getElementById("centralPoint").value = ""

      document.getElementById("myDropdown_1").style.display = "none"
      document.getElementById("button-taylor").innerHTML = "⇓ Visualize Taylor Series"
      return
    }
    document.getElementById("myDropdown_1").style.display = "block" 
    document.getElementById("button-taylor").innerHTML = "⇑ Close Menu"

  } else if (ref === "waves") {

    document.getElementById("myDropdown_2").style.backgroundColor = "green"

      const x = window.innerWidth
      const y = x - 220
      if (x > 700) {
        document.getElementById("myDropdown_2").style.left = y + "px"
      }

    if (document.getElementById("myDropdown_2").style.display === "block"){

      initializeGraph.removeExpression({id: "taylorApproximation"})
    //   if (func != undefined) {
    //     taylor = new Taylor(Number(pointOfApprox.value), func)
    //   }
      
      document.getElementById("centralPoint").value = ""

      document.getElementById("myDropdown_2").style.display = "none"
      document.getElementById("button-waves").innerHTML = "⇓ Visualize Waves"
      return
    }
    document.getElementById("myDropdown_2").style.display = "block" 
    document.getElementById("button-waves").innerHTML = "⇑ Close Menu"

  }
}

export default ask