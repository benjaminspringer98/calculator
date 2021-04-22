const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector("#equals");
const deleteButton = document.querySelector("#delete");
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


function appendNumber() {
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


function check() {
    secondNumber = display.textContent;
    if (currentOperation === "divide" && secondNumber === "0") {
        display.textContent = "Err: divide by 0";
        return;
    }
    display.textContent = operate(currentOperation, Number(firstNumber), Number(secondNumber));
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


