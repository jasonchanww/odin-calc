let storedVal = "";
let displayVal = "0";
let currentOp = "";
let lastClickedOp = false;

const calc = document.querySelector("#calc");
calc.addEventListener('click', e => {
    switch (e.target.id) {
        case 'b0':
        case 'b1':
        case 'b2':
        case 'b3':
        case 'b4':
        case 'b5':
        case 'b6':
        case 'b7':
        case 'b8':
        case 'b9':
            clickedNumber(e.target.id.substring(1));
            break;
        case 'clear':
            clear();
            break;
        case 'plus':
            clickedOp('+');
            break;
        case 'minus':
            clickedOp('-');
            break;
        case 'multiply':
            clickedOp('*');
            break;
        case 'divide':
            clickedOp('/');
            break;
        case 'equals':
            clickedEquals();
            break;
        case 'sign':
            clickedSign();
            break;
        case 'backspace':
            backspace();
            break;
        case 'decimal':
            decimal();
            break;
    }
});

function updateDisplay() {
    const truncated = displayVal.substring(0,8);
    document.querySelector("#value").textContent = truncated;
}

function clear() {
    displayVal = "0";
    storedVal = currentOp = "";
    updateDisplay();
}

function clickedNumber(num) {
    //digits exceed 8 -> return
    if (displayVal.length >= 8) {
        return;
    }
    //starts with 0 -> replace
    else if (displayVal === "0") {
        displayVal = "" + num;
    }
    //append
    else {
        displayVal += "" + num;
    }
    lastClickedOp = false;
    updateDisplay();
}

function clickedOp(op){
    //op and store exists
    if(currentOp && storedVal && !lastClickedOp){
        evaluate();
        currentOp = op;
        storedVal = displayVal;
        updateDisplay();
        displayVal = '0';
    }
    //op exists -> replace
    else if(currentOp){
        currentOp = op;
    }
    //add op, store val
    else{
        currentOp = op;
        storedVal = displayVal;
        displayVal = '0';
    }
    lastClickedOp = true;
}

function evaluate(){
    if(!currentOp || !storedVal || !displayVal) return false;
    switch(currentOp){
        case '+':
        displayVal = "" + (+storedVal + +displayVal);
        break;
        case '-':
        displayVal = "" + (+storedVal - +displayVal);
        break;
        case '*':
        displayVal = "" + (+storedVal * +displayVal);
        break;
        case '/':
        displayVal = "" + (+storedVal / +displayVal);
        break;
    }
    storedVal = currentOp = "";
    return true;
}

function clickedEquals(){
    if(!lastClickedOp && evaluate()) {
        updateDisplay();
    }
}

function clickedSign(){
    //is 0 -> return
    if(displayVal === "0") return;

    const result = "" + - +displayVal;
    if(+result){
        displayVal = result;
        updateDisplay();
    }
}

function backspace(){
    //is 0 -> return
    if(displayVal === "0") return;
    //is single -> 0
    if(displayVal.replaceAll(/[^0-9]/ig,'').length === 1) {
        displayVal = '0'
        updateDisplay();
        return;
    }
    const result = displayVal.substring(0, displayVal.length - 1);
    if(+result){
        displayVal = result;
        updateDisplay();
    }
}

function decimal(){
    //has decimal -> return
    if(displayVal.includes('.')) return;
    displayVal += '.';
    updateDisplay();
}




updateDisplay();