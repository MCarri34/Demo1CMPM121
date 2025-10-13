import "./style.css";

let counter: number = 0;
let growthRate: number = 0;
let lastTime = performance.now();

// Step 9: Data-driven design
interface Item {
  id: string;
  emoji: string;
  name: string;
  cost: number;
  rate: number;
  count: number;
}

const availableItems: Item[] = [
  {
    id: "support",
    emoji: "👨🏾‍💻",
    name: "Customer Support Line",
    cost: 10,
    rate: 0.1,
    count: 0,
  },
  {
    id: "email",
    emoji: "📥",
    name: "Scam Email",
    cost: 100,
    rate: 2.0,
    count: 0,
  },
  {
    id: "office",
    emoji: "🏢",
    name: "Call Center",
    cost: 1000,
    rate: 50.0,
    count: 0,
  },
];

// Build layout using data
document.body.innerHTML = `
  <div class="game-container">
    <div class="info">
      <p id="counter">0 Callers Scammed</p>
      <p id="rate">Scammings/sec: 0.0</p>
    </div>

    <div class="main-clicker">
      <button id="increment" class="clicker-btn">📞</button>
    </div>

    <div id="upgrades">
      ${
  availableItems
    .map(
      (item) => `
          <div class="upgrade">
            <button type="button" id="upgrade-${item.id}" disabled>
              ${item.emoji} Buy "${item.name}" (Cost: ${item.cost})
            </button>
            <span id="count-${item.id}">Owned: 0</span>
          </div>
        `,
    )
    .join("")
}
    </div>
  </div>
`;

// DOM references
const button = document.getElementById("increment") as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;
const upgradeButtons = availableItems.map(
  (item) => document.getElementById(`upgrade-${item.id}`) as HTMLButtonElement,
);
const countElements = availableItems.map(
  (item) => document.getElementById(`count-${item.id}`)!,
);

// Manual click increments
button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
});

// Handle upgrade purchases dynamically
for (let i = 0; i < availableItems.length; i++) {
  upgradeButtons[i].addEventListener("click", () => {
    const item = availableItems[i];
    if (counter >= item.cost) {
      counter -= item.cost;
      item.count++;
      growthRate += item.rate;
      item.cost = Math.round(item.cost * 1.2);

      // Update UI
      countElements[i].textContent = `Owned: ${item.count}`;
      upgradeButtons[i].textContent =
        `${item.emoji} Buy "${item.name}" (Cost: ${item.cost})`;
      counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
      rateElement.innerHTML = `Scammings/sec: ${growthRate.toFixed(1)}`;
    }
  });
}

// Continuous auto-increment logic (requestAnimationFrame)
function update(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  counter += growthRate * delta;

  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
  rateElement.innerHTML = `Scammings/sec: ${growthRate.toFixed(1)}`;

  // Enable or disable each upgrade based on current amount
  for (let i = 0; i < availableItems.length; i++) {
    upgradeButtons[i].disabled = counter < availableItems[i].cost;
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
