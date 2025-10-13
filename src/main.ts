import "./style.css";

let counter: number = 0;
let growthRate: number = 0;
let lastTime = performance.now();

// Step 10: Expanded and described items
interface Item {
  id: string;
  emoji: string;
  name: string;
  description: string;
  cost: number;
  rate: number;
  count: number;
}

const availableItems: Item[] = [
  {
    id: "support",
    emoji: "👨🏾‍💻",
    name: "Customer Support Line",
    description: "A 'support' line that conveniently never solves real issues.",
    cost: 10,
    rate: 0.1,
    count: 0,
  },
  {
    id: "email",
    emoji: "📥",
    name: "Scam Email",
    description: "Mass-send fake prize notifications to unsuspecting inboxes.",
    cost: 100,
    rate: 2.0,
    count: 0,
  },
  {
    id: "callcenter",
    emoji: "🏢",
    name: "Call Center",
    description:
      "Hire a full team of fake tech support agents to scale operations.",
    cost: 1000,
    rate: 50.0,
    count: 0,
  },
  {
    id: "dialer",
    emoji: "☎️",
    name: "Automated Dialer",
    description: "Dials thousands of victims per minute, hands-free profit!",
    cost: 5000,
    rate: 200.0,
    count: 0,
  },
  {
    id: "spoofer",
    emoji: "🎭",
    name: "Caller ID Spoofer",
    description:
      "Masks numbers and badges to appear as verified callers, trickier to spot and more convincing.",
    cost: 20000,
    rate: 1000.0,
    count: 0,
  },
];

// Build layout from data
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
            <p class="desc">${item.description}</p>
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

// Upgrade purchase logic (data-driven)
for (let i = 0; i < availableItems.length; i++) {
  upgradeButtons[i].addEventListener("click", () => {
    const item = availableItems[i];
    if (counter >= item.cost) {
      counter -= item.cost;
      item.count++;
      growthRate += item.rate;

      // Step 10: cost multiplier changed to 1.2
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

// Continuous growth
function update(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  counter += growthRate * delta;

  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
  rateElement.innerHTML = `Scammings/sec: ${growthRate.toFixed(1)}`;

  // Enable buttons based on affordability
  for (let i = 0; i < availableItems.length; i++) {
    upgradeButtons[i].disabled = counter < availableItems[i].cost;
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
