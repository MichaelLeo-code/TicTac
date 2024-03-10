function createTable(x, y) {
    let cross = false
    if (x <= 0 || y <= 0) {
        console.error("invalid dimensions")
        return null
    }

    let table = document.createElement('table')
    table.className = 'table'

    //MAP OF TABLE
    var map = Array.from({ length: y }, (_, index)=> Array(x).fill(0))
    console.log(Array(x).fill(0).length);

    for (let i = 0; i < y; i++) {
        let row = table.insertRow()
        for (let j = 0; j < x; j++) {
            let cell = row.insertCell()
            cell.addEventListener('click', function() {
                if(cell.innerHTML === ''){
                    cross = !cross
                    cell.appendChild(draw(cross))
                    cross ? map[i][j] = 1 : map[i][j] = 2;
                    checkForWin(map, cross)
                }
                else console.log("can't make a move twice on the same cell")
            })
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
    if (map.some((row, i) => 
        row.slice(0, -2).some((element, j) => 
            element === check && map[i+1]?.[j+1] === check && map[i+2]?.[j+2] === check
        )
    )) return printWinner(cross)

    console.log(map)
    //diagonal right to left check
    if (rotatedMap.some((row, i) => 
        row.slice(0, -2).some((element, j) => 
            element === check && rotatedMap[i+1]?.[j+1] === check && rotatedMap[i+2]?.[j+2] === check
        )
    )) return printWinner(cross)
}

function printWinner(cross){
    const string = cross ? "CROSSES" : "CIRCLES"
    console.log("The winner is " + string)
}

document.body.appendChild(createTable(3, 3))


const slider = document.getElementById("fieldSize")
const checkLength = document.getElementById("checkLength")
const output = document.getElementById("sliderValue")
const checkLength_output = document.getElementById("checkLengthValue")

slider.addEventListener("input", () => {
    output.innerHTML = slider.value
    const tableToChange = document.body.getElementsByClassName('table')[0]
    const dim = parseInt(slider.value)
    tableToChange.parentNode.replaceChild(createTable(dim, dim), tableToChange)
})

checkLength.addEventListener("input", () => {
    checkLength_output.innerHTML = checkLength.value
})