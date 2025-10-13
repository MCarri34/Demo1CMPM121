import "./style.css";

let counter: number = 0;
let growthRate: number = 0; // Step 5: starts at 0
document.body.innerHTML = `
<type = "button" id= "increment">📞</button>
<button type="button" id="upgrade" disabled>👨🏽‍💻 Buy "Customer Support Line" (Cost: 10)</button>
<p id="counter">0 Callers Scammed</p>
`;

const button = document.getElementById("increment") as HTMLButtonElement;
const upgradeButton = document.getElementById("upgrade") as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;

// Step 2
button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
});

// Step 5
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1; // increase automatic growth by 1 per sec
  }
});

// Step 4 (Removed Step 3)
let lastTime = performance.now();

function update(time: number) {
  // Calculating how much time has passed since the last frame (sec)
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  // Increase counter based on growth rate
  counter += growthRate * delta;

  // Update display (using Math.floor makes it only display full numbers)
  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;

  // Enable/disable upgrade based on affordability
  upgradeButton.disabled = counter < 10;

  // Keep looping
  requestAnimationFrame(update);
}

// Start loop
requestAnimationFrame(update);
