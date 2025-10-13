import "./style.css";

let counter: number = 0;
document.body.innerHTML = `
<type = "button" id= "increment">📞</button>
<p id="counter">0 Callers Scammed</p>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

// Step 2
button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = `${counter} Callers Scammed`;
});

// Step 3:
setInterval(() => {
  counter++;
  counterElement.innerHTML = `${counter} Callers Scammed`;
}, 750);
