import "./style.css";

let counter: number = 0;
let growthRate: number = 0; // starts at 0
let lastTime = performance.now();

// Define upgrades
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
    name: "Hidden Office Building",
    cost: 1000,
    rate: 50.0,
    count: 0,
  },
];

// Build the page content
document.body.innerHTML = `
  <button type="button" id="increment">📞</button>
  <p id="counter">0 Callers Scammed</p>
  <p id="rate">Growth Rate: 0.0 Callers/sec</p>

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

// Step 2: Manual clicking
button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
});

// Step 7: Price increases with each purchase
upgradeButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const upgrade = upgrades[i];
    if (counter >= upgrade.cost) {
      // Deduct cost
      counter -= upgrade.cost;
      // Increment owned count
      upgrade.count++;
      // Increase growth rate
      growthRate += upgrade.rate;
      // Increase cost by 15% (rounded to whole number)
      upgrade.cost = Math.round(upgrade.cost * 1.2);

      // Update UI elements
      countElements[i].textContent = `Owned: ${upgrade.count}`;
      btn.textContent =
        `${upgrade.emoji} Buy "${upgrade.name}" (Cost: ${upgrade.cost})`;
      counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
      rateElement.innerHTML = `Growth Rate: ${
        growthRate.toFixed(1)
      } Callers/sec`;
    }
  });
});

// Continuous growth loop
function update(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  // Increase counter based on total growth rate
  counter += growthRate * delta;

  // Update main displays
  counterElement.innerHTML = `${Math.floor(counter)} Callers Scammed`;
  rateElement.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} Scammings/sec`;

  // Enable/disable buttons based on affordability
  upgradeButtons.forEach((btn, i) => {
    btn.disabled = counter < upgrades[i].cost;
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
