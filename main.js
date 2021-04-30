const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector("#equals");
const deleteButton = document.querySelector("#delete");
const decimalPointButton = document.querySelector("#decimalPoint");
const negativeButton = document.querySelector("#negative");
const clearButton = document.querySelector("#clear");
const display = document.querySelector("#display");

let firstNumber, secondNumber;
let currentOperation = null;

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", appendNumber);
});

operationButtons.forEach((operationButton) => {
    operationButton.addEventListener("click", setOperation)
});

equalsButton.addEventListener("click", check);
deleteButton.addEventListener("click", deleteLastDigit);
clearButton.addEventListener("click", reset);
decimalPointButton.addEventListener("click", appendDecimalPoint);
negativeButton.addEventListener("click", makeNegative);


function appendNumber() { 
    /*if((display.textContent === "" || display.textContent === "-") && this.value === "0") { // don't allow 0 as first number
        return;
    }*/
    if(display.textContent === "0" && this.value === "0") { // don't allow more than one 0 if there's nothing else on the screen
        return;
    }
    if(display.textContent === "0" && this.value !== "0") { // if 0 is the only number on the screen and user inputs a number different from 0, replace 0 with input number
        display.textContent = this.value;
        return;     
    }
    if(display.textContent.length > 11) { // don't allow too large inputs
        return;
    }
    display.append(this.value);
}

function setOperation() {
    firstNumber = display.textContent // save currently displayed number as first number for the calculation
    currentOperation = this.id; // save operation that was clicked
    clearDisplay();
}

function clearDisplay() {
    display.textContent = "";
}

function reset() {
    clearDisplay();
    firstNumber = null;
    secondNumber = null;
    currentOperation = null;
}

function deleteLastDigit() {
    currentNumber = display.textContent;
    display.textContent = currentNumber.replace(currentNumber[currentNumber.length-1], "");
}

function appendDecimalPoint() {
    if(display.textContent.includes(".")) { // return if there's currently a decimal point in the display
        return;
    }
    display.textContent = display.textContent + ".";
}

function makeNegative() {
    if(display.textContent === "") { // don't allow - as first input
        return;
    }
    if(display.textContent[0] === "-") { // reverse negation, if currently displayed number is already negative
        display.textContent = display.textContent.replace(display.textContent[0], "");
        return;
    }
    display.textContent = "-" + display.textContent;
}

function check() {
    secondNumber = display.textContent; // save currently displayed number as second number for the calculation

    if(currentOperation === null) { 
        return;
    }
    if (currentOperation === "divide" && secondNumber === "0") {
        display.textContent = "Err: divide by 0";
        return;
    }

    result = operate(currentOperation, Number(firstNumber), Number(secondNumber));
    // we have 3 possibilities here:
    if(result.toString().length > 12 && result > 999999999999) { // 1: result is too large for the display AND bigger than 999 999 999 999
        display.textContent = result.toExponential(6); // we then want to return scientific notation
    } 
    else if(result.toString().length > 12) { // 2: result is too large for the display but not bigger than 999 999 999 999 
        display.textContent = result.toFixed(10); // we then round it to 10 decimal places to fit in the display
    }
    else {
        display.textContent = result; // 3: none of the above, so we just display the result
    } 
    currentOperation = null;
}

function operate(operator, a, b) {
    switch(operator) {
        case "add":
            return add(a,b);
        case "subtract":
            return subtract(a,b);
        case "multiply":
            return multiply(a,b);
        case "divide":
            return divide(a,b);    
    }
}

// mathematical operations:

add = (a, b) => a + b;

subtract = (a, b) => a - b;

multiply = (a, b) => a * b;

divide = (a, b) => a / b;


