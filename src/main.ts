import "./style.css";

// ✅ Inspired UI changes credited per assignment guide
// Button animation enhancements based on Noah’s clicker design:
// https://github.com/Noah2271/cmpm-121-incremental-nbilledo/blob/main/src/main.ts
//
// Upgrade card layout inspired by Neila’s project:
// https://github.com/BellaTheAlien/cmpm-121-D1-NeilaMiranda/blob/main/src/main.ts

// --- Game State and Data ---
let counter: number = 0;
let growthRate: number = 0;
let lastTime = performance.now();

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

// --- DOM Setup ---
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

// --- DOM References ---
const button = document.getElementById("increment") as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;
const upgradeButtons = availableItems.map(
  (item) => document.getElementById(`upgrade-${item.id}`) as HTMLButtonElement,
);
const countElements = availableItems.map(
  (item) => document.getElementById(`count-${item.id}`)!,
);

// --- Event Handlers ---
button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
});

for (let i = 0; i < availableItems.length; i++) {
  upgradeButtons[i].addEventListener("click", () => {
    const item = availableItems[i];
    if (counter >= item.cost) {
      counter -= item.cost;
      item.count++;
      growthRate += item.rate;

      item.cost = Math.round(item.cost * 1.2);

      countElements[i].textContent = `Owned: ${item.count}`;
      upgradeButtons[i].textContent =
        `${item.emoji} Buy "${item.name}" (Cost: ${item.cost})`;
    }
  });
}

// --- Game Loop ---
function update(time: number) {
  counter += growthRate * ((time - lastTime) / 1000);
  lastTime = time;

  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
  rateElement.innerHTML = `Scammings/sec: ${growthRate.toFixed(1)}`;

  for (let i = 0; i < availableItems.length; i++) {
    upgradeButtons[i].disabled = counter < availableItems[i].cost;
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
