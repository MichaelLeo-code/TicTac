function createTable(x, y) {
    winnerText.textContent = "It is CROSSES turn"

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
            cell.addEventListener('click', function() {
                if(cell.innerHTML === ''){
                    cross = !cross
                    cell.appendChild(draw(cross))
                    cross ? map[i][j] = 1 : map[i][j] = 2;
                    winnerText.textContent = cross ? "It is CIRCLES turn" : "It is CROSSES turn" 
                    checkForWin(map, cross)
                }
                else console.log("can't make a move twice on the same cell")
            }, { once: true })
        }
    }

    return table
}

function draw(cross) {
    var circle = document.createElement('div')
    cross ? circle.className = "cross" : circle.className = "circle"
    
    return circle
}

function checkForWin(map, cross){
    let check
    cross ? check = 1 : check = 2
    const rows = map.length
    const cols = map[0].length
    const cl = parseInt(checkLength.value)
    

    //row check
    if (map.some (row =>
        row.join('').includes(String(check).repeat(cl))
    )) return printWinner(cross)

    const rotatedMap = map[0].map((_, colIndex) =>
        map.map(row => row[colIndex]).reverse()
    )

    //col check
    if (rotatedMap.some(col =>
        col.join('').includes(String(check).repeat(cl))
    )) return printWinner(cross)

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
                    if (consecutiveMatches === cl) return printWinner(cross)
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
                    if (consecutiveMatches === cl) return printWinner(cross)
                }
                consecutiveMatches = 0
            }
        )
    )
}

function printWinner(cross){
    const string = cross ? "CROSSES" : "CIRCLES"
    console.log("The winner is " + string)
    winnerText.textContent = "The winner is " + string

    //redraw the table to remove all the listeners
    let old_element = document.getElementsByClassName("table")[0]
    var new_element = old_element.cloneNode(true)
    old_element.parentNode.replaceChild(new_element, old_element);
}

let winnerText = document.getElementById('output')

document.body.appendChild(createTable(3, 3))

const slider = document.getElementById("fieldSize")
const checkLength = document.getElementById("checkLength")
const output = document.getElementById("sliderValue")
const checkLength_output = document.getElementById("checkLengthValue")
const button = document.getElementById("button")

slider.addEventListener("input", () => {
    output.innerHTML = `Grid ${slider.value} by ${slider.value}`
    const tableToChange = document.body.getElementsByClassName('table')[0]
    const dim = parseInt(slider.value)
    tableToChange.parentNode.replaceChild(createTable(dim, dim), tableToChange)
})

checkLength.addEventListener("input", () => {
    checkLength_output.innerHTML = checkLength.value + ' in a row to win'
})

button.addEventListener("click", () => {
    const tableToChange = document.body.getElementsByClassName('table')[0]
    const dim = parseInt(slider.value)
    tableToChange.parentNode.replaceChild(createTable(dim, dim), tableToChange)
})