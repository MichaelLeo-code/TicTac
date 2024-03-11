class Game{
    #slider
    #checkLength
    #output
    #checkLength_output
    #winnerText
    #button
    constructor(){
        this.#slider = document.getElementById("fieldSize")
        this.#checkLength = document.getElementById("checkLength")
        this.#output = document.getElementById("sliderValue")
        this.#checkLength_output = document.getElementById("checkLengthValue")
        this.#winnerText = document.getElementById('output')
        this.#button = document.getElementById("button")
    }

    initializeEventListeners(){
        this.#slider.addEventListener("input", () => {
            this.#output.innerHTML = `Grid ${this.#slider.value} by ${this.#slider.value}`
            const tableToChange = document.body.getElementsByClassName('table')[0]
            const dim = parseInt(this.#slider.value)
            tableToChange.parentNode.replaceChild(this.createTable(dim, dim), tableToChange)
        })
        this.#checkLength.addEventListener("input", () => {
            this.#checkLength_output.innerHTML = this.#checkLength.value + ' in a row to win'
        })
        this.#button.addEventListener("click", () => {
            const tableToChange = document.body.getElementsByClassName('table')[0]
            const dim = parseInt(this.#slider.value)
            tableToChange.parentNode.replaceChild(createTable(dim, dim), tableToChange)
        })
    }

    initializeTable(){
        document.body.appendChild(this.createTable(3, 3))
    }

    createTable(x, y){
        let cross = false
        if (x <= 0 || y <= 0) {
            console.error("invalid dimensions")
            return null
        }

        let table = document.createElement('table')
        table.classList.add('table')

        //MAP OF TABLE
        var map = Array.from({ length: y }, (_, index)=> Array(x).fill(0))

        for (let i = 0; i < y; i++) {
            let row = table.insertRow()
            for (let j = 0; j < x; j++) {
                let cell = row.insertCell()
                cell.addEventListener('click', () => {
                    if(cell.innerHTML === ''){
                        cross = !cross
                        cell.appendChild(this.draw(cross))
                        cross ? map[i][j] = 1 : map[i][j] = 2;
                        this.#winnerText.textContent = cross ? "It is CIRCLES turn" : "It is CROSSES turn" 
                        this.checkForWin(map, cross)
                    }
                    else console.log("can't make a move twice on the same cell")
                })
            }
        }

        return table
    }
    
    draw(cross) {
        var circle = document.createElement('div')
        cross ? circle.className = "cross" : circle.className = "circle"
        
        return circle
    }

    checkForWin(map, cross){
        let check
        cross ? check = 1 : check = 2
        const rows = map.length
        const cols = map[0].length
        const cl = parseInt(checkLength.value)
        
    
        //row check
        if (map.some (row =>
            row.join('').includes(String(check).repeat(cl))
        )) return this.printWinner(cross)
    
        const rotatedMap = map[0].map((_, colIndex) =>
            map.map(row => row[colIndex]).reverse()
        )
    
        //col check
        if (rotatedMap.some(col =>
            col.join('').includes(String(check).repeat(cl))
        )) return this.printWinner(cross)
    
        //diagonal left to right check
        let consecutiveMatches = 0;
        map.some((row, i) => 
            row.slice(0, -2).some((element, j) => 
                {
                    for (let k = 0; k < cl; k++) {
                        if (map[i + k]?.[j + k] === check) {
                            consecutiveMatches++
                        } else {
                            break; // If the consecutive match is broken, exit the loop
                        }
                        if (consecutiveMatches === cl) return this.printWinner(cross)
                    }
                    consecutiveMatches = 0
                }
            )
        )
    
        //diagonal right to left check
        rotatedMap.some((row, i) => 
            row.slice(0, -2).some((element, j) => 
                {
                    for (let k = 0; k < cl; k++) {
                        if (rotatedMap[i + k]?.[j + k] === check) {
                            consecutiveMatches++
                        } else {
                            break; // If the consecutive match is broken, exit the loop
                        }
                        if (consecutiveMatches === cl) return this.printWinner(cross)
                    }
                    consecutiveMatches = 0
                }
            )
        )
    }
      
    printWinner(cross){
        const string = cross ? "CROSSES" : "CIRCLES"
        console.log("The winner is " + string)
        let output = document.getElementById('output')
        output.textContent = "The winner is " + string

        //redraw the table to remove all the listeners
        let old_element = document.getElementsByClassName("table")[0]
        var new_element = old_element.cloneNode(true)
        old_element.parentNode.replaceChild(new_element, old_element);
    }
}

const mygame = new Game()
mygame.initializeTable()
mygame.initializeEventListeners()