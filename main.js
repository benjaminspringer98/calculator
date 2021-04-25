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
    if(display.textContent === "" || display.textContent === "-" && this.value === "0") { // don't allow 0 as first number
        return;
    }
    if(display.textContent.length > 11) { // don't allow too large inputs
        return;
    }
    display.append(this.value);
}

function setOperation() {
    firstNumber = display.textContent // save currently displayed number
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
    if(display.textContent[0] === "-") { // reverse negation, if currently displayed number is already negative
        display.textContent = display.textContent.replace(display.textContent[0], "");
        return;
    }
    display.textContent = "-" + display.textContent;
}

function check() {
    secondNumber = display.textContent;

    if(currentOperation === null) {
        return;
    }
    if (currentOperation === "divide" && secondNumber === "0") {
        display.textContent = "Err: divide by 0";
        return;
    }
    display.textContent = operate(currentOperation, Number(firstNumber), Number(secondNumber));
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


