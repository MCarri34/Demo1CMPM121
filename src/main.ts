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
  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
});

// Step 4 (Removed Step 3)
let lastTime = performance.now();

function update(time: number) {
  // Calculating how much time has passed since the last frame (sec)
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  // Increase counter proportionally to elapsed time (1/sec)
  counter += delta;

  // Update display (using Math.floor makes it only display full numbers)
  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;

  // Keep looping
  requestAnimationFrame(update);
}

// Start loop
requestAnimationFrame(update);
