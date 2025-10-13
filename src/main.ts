import "./style.css";

let counter: number = 0;
let growthRate: number = 0;
let lastTime = performance.now();

// Define Upgrades
type Upgrade = {
  id: string;
  emoji: string;
  name: string;
  cost: number;
  rate: number; // growth per second
  count: number;
};

const upgrades: Upgrade[] = [
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

// Build layout
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
  upgrades
    .map(
      (u) => `
          <div class="upgrade">
            <button type="button" id="upgrade-${u.id}" disabled>
              ${u.emoji} Buy "${u.name}" (Cost: ${u.cost})
            </button>
            <span id="count-${u.id}">Owned: 0</span>
          </div>
        `,
    )
    .join("")
}
    </div>
  </div>
`;

const button = document.getElementById("increment") as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;
const upgradeButtons = upgrades.map(
  (u) => document.getElementById(`upgrade-${u.id}`) as HTMLButtonElement,
);
const countElements = upgrades.map(
  (u) => document.getElementById(`count-${u.id}`)!,
);

// Manual click
button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
});

// Purchasing upgrades
upgradeButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const upgrade = upgrades[i];
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      upgrade.count++;
      growthRate += upgrade.rate;
      upgrade.cost = Math.round(upgrade.cost * 1.2);

      // Update UI
      countElements[i].textContent = `Owned: ${upgrade.count}`;
      btn.textContent =
        `${upgrade.emoji} Buy "${upgrade.name}" (Cost: ${upgrade.cost})`;
      counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
      rateElement.innerHTML = `Scammings/sec: ${growthRate.toFixed(1)}`;
    }
  });
});

// Continuous growth
function update(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  counter += growthRate * delta;

  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
  rateElement.innerHTML = `Scammings/sec: ${growthRate.toFixed(1)}`;

  // Enable or Disable Buying Upgrade Based off Affordability
  upgradeButtons.forEach((btn, i) => {
    btn.disabled = counter < upgrades[i].cost;
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
