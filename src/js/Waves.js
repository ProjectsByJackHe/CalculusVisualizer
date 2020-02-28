import initializeGraph from './Main.js'

class Waves {
    constructor (a, w) {
        this.A = a
        this.w = w
    }

    doDaWave() {

        const FINISH_TIME = 3000 // 3000 milliseconds (3 seconds)
        const dx = 0.1
        const dt = 25 // 50 milliseconds
        var t = 0
        var x = 0

        var visualize = setInterval(() => {
            if (t >= FINISH_TIME) {
                initializeGraph.removeExpression({id: "daWave!"})
                clearInterval(visualize)
            } else {

                const TrigFunction = this.A + "\\sin\\left(" + this.w + "x + " + x + "\\right)"

                const params = {
                    "latex": TrigFunction,
                    "id":"daWave!"
                }

                initializeGraph.setExpression(params)

                x += dx
                t += dt
            }
        }, dt);
    }
}

export default Waves