// check the correct userName and password
function getInfo() {
    let userName = document.getElementById("userName").value;
    let passWord = document.getElementById("passWord").value;
    let rightName = "abcd"
    let rightPass = "1234"

    for (i = 0; i < rightName.length && i < rightPass.length; i++) {
        if (userName == rightName && passWord == rightPass) {
            location.replace("sudokuLevelPage.html")
        }
        
    }
    if (!(userName == rightName) && passWord == rightPass) {
        alert("wrong UserName")
    }
    if (!(passWord == rightPass) && userName == rightName) {
        alert("wrong Password")
    }
    if (!(userName == rightName) && !(passWord == rightPass)) {
        alert("Both Username and Password are wrong")
    }
}

// pick random sudoku between 0-3 and return the number
function pickRandomSud() {
    let sudokuNum = Math.floor(Math.random() * (4 - 0)) + 0
    //math.random give a number btwenn 0-1
    //math.floor give you the option to increase the number from 0-9

    
    return sudokuNum;
}
  



const arrSudoku = [
    [[5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]],

    [[9, 1, 4, 7, 8, 2, 3, 6, 5],
    [3, 8, 5, 4, 1, 6, 7, 9, 2],
    [7, 2, 6, 5, 9, 3, 4, 1, 8],
    [8, 9, 2, 6, 3, 7, 5, 4, 1],
    [4, 6, 3, 2, 5, 1, 8, 7, 9],
    [5, 7, 1, 9, 4, 8, 2, 3, 6],
    [1, 4, 8, 3, 2, 9, 6, 5, 7],
    [2, 5, 7, 1, 6, 4, 9, 8, 3],
    [6, 3, 9, 8, 7, 5, 1, 2, 4]],

    [[8, 2, 7, 1, 5, 4, 3, 9, 6],
    [9, 6, 5, 3, 2, 7, 1, 4, 8],
    [3, 4, 1, 6, 8, 9, 7, 5, 2],
    [5, 9, 3, 4, 6, 8, 2, 7, 1],
    [4, 7, 2, 5, 1, 3, 6, 8, 9],
    [6, 1, 8, 9, 7, 2, 4, 3, 5],
    [7, 8, 6, 2, 3, 5, 9, 1, 4],
    [1, 5, 4, 7, 9, 6, 8, 2, 3],
    [2, 3, 9, 8, 4, 1, 5, 6, 7]],

    [[1, 5, 4, 8, 7, 3, 2, 9, 6],
    [3, 8, 6, 5, 9, 2, 7, 1, 4],
    [7, 2, 9, 6, 4, 1, 8, 3, 5],
    [8, 6, 3, 7, 2, 5, 1, 4, 9],
    [9, 7, 5, 3, 1, 4, 6, 2, 8],
    [4, 1, 2, 9, 6, 8, 3, 5, 7],
    [6, 3, 1, 4, 5, 7, 9, 8, 2],
    [5, 9, 8, 2, 3, 6, 4, 7, 1],
    [2, 4, 7, 1, 8, 9, 5, 6, 3]]]




//get the level from the level buttom and save on localStorage 
function saveLevel(num){
     level = num;
     console.log(level);
     localStorage.setItem("level" , level);//
     window.location.assign("sudokuIndex.html");//abrir a pagina do sudoku desejado
     
}

//tempSud save the changes in the new sudoku
let tempSud = [];
var level;// var pro level funcionar em tudo
let sudNum = pickRandomSud();
createSudoku()

// get the sudoku number and level and create sudoku with ramdom 0 cells
function createSudoku() {
    var savedLevel = localStorage.getItem("level");
    this.inputArr = []
    let erase = 20 * savedLevel; //20 is 25/100 from 81 cells
    let sud = copySud(arrSudoku[sudNum])
    for (let i = 0; i < erase; i++) {
        let row = Math.floor(Math.random() * (9 - 0)) + 0
        let col = Math.floor(Math.random() * (9 - 0)) + 0
        if (sud[row][col] == 0) {
            i--
            continue
        }
        sud[row][col] = 0;
        let inputCell = { r: row, c: col }
        this.inputArr.push(inputCell) // save array of the 0 cells(for the hint function)
    }
    printSudOnBord(sud);
    this.orgSud = sud;           // original sud
    this.tempSud = copySud(sud) // for changes like on hint
    //guarda original
}

// get the original sudoku and copy to new one
function copySud(original_sud) {
    let sud = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
    //pega o sudoku correto e coloca os zeros nos lugares vazios
    for (let index = 0; index < 9; index++) {
        for (let idx = 0; idx < 9; idx++) {
            sud[index][idx] = original_sud[index][idx]
        }
    }
    return sud
}

// print the sud on screen and change the 0 cells to inputs 
function printSudOnBord(sud) {
    let table = document.getElementById("tablee")
    for (let i = 0; i < 9; i++) {
        for (let idx = 0; idx < 9; idx++) {
            if (sud[i][idx] == 0) {
                let inpt = document.createElement("input")
                //deleta o numero e da a opcao de preencher
                table.rows[i].cells[idx].appendChild(inpt)//mossif element
                inpt.className = "sudokuInputs"
                inpt.maxLength = 1
            }
            else table.rows[i].cells[idx].innerHTML = sud[i][idx]//משנה את התוכן של האלמנט
            // deixa do jeito que esta
        }
    }
}



// compare the inputs to the original sudoku (compare to tempSud) and apear box if its right or wrong
function finish() {

    let sudok = copySud(arrSudoku[sudNum])
    for (let i = 0; i < 9; i++) {
        for (let idx = 0; idx < 9; idx++) {
            if (this.tempSud[i][idx] == 0) {
                if (sudok[i][idx] != document.getElementById("tablee").rows[i].cells[idx].querySelector('input').value) 
                //allows you to find the first element that matches one or more CSS selectors or html
                //querySelector you can select an element as you choose
                {
                    document.getElementById('finishAudio').play();
                    let winScreen = document.getElementById("lose")
                    winScreen.style.display = 'block'
                    return
                }
            }
        }
    }
    console.log("very good!!!!!")
    document.getElementById('audio').play();
    let winScreen = document.getElementById("win")
    winScreen.style.display = 'block'
}

// clean the screen and print the same sudoku
//me da o mesmo sudoku e apaga o que preenchi, tenho que preencher do 0
function tryAgain() {
    for (let i = 0; i < 9; i++) {
        for (let idx = 0; idx < 9; idx++) {
            document.getElementById("tablee").rows[i].cells[idx].innerHTML = "";
        }
    }
    // copy the original inputArray to tempInputArray
        //יצירת מערך חדש עם ערכים שונים
    tempInputArray = this.inputArr.map((item) => {    
        return item
    })
    printSudOnBord(this.orgSud)
    this.tempSud = copySud(this.orgSud)
}

  //save inputArray to tempInputArray for changes
  let tempInputArray = this.inputArr.map((item) => {
        return item
    })


    //check input from tempInputArray[0] if its empty its add the right number on 
    //screen and erase the first cell in the array 
function hint() {
    
    let solSud = arrSudoku[sudNum]
    let table = document.getElementById("tablee")
    let firstInputCell = tempInputArray[0]
    let cell = document.getElementById("tablee").rows[firstInputCell.r].cells[firstInputCell.c].querySelector('input').value
    if (cell == "") {
        table.rows[firstInputCell.r].cells[firstInputCell.c].innerHTML = solSud[firstInputCell.r][firstInputCell.c]
        this.tempSud[firstInputCell.r][firstInputCell.c] = solSud[firstInputCell.r][firstInputCell.c]
        tempInputArray.shift()
        return
    }
    tempInputArray.shift()

}
