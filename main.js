const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", saveNumber);
});

function saveNumber() {
    const display = document.querySelector("#display");
    display.textContent = this.getAttribute("value");
}

