import "./style.css";

let counter: number = 0;
document.body.innerHTML = `
<type = "button" id= "increment">📞</button>
<p id="counter">0 Callers Scammed</p>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = `${counter} Callers Scammed`;
});
