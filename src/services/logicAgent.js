// The Avatar Vault (BMI Morphing)
// Logic: BMI = weight(kg) / height(m)^2
export const calculateBMI = (heightM, weightKg) => {
  if (!heightM || !weightKg) return 0;
  return Number((weightKg / Math.pow(heightM, 2)).toFixed(1));
};

export const determineAvatar = (bmi) => {
  if (bmi === 0) return "Small";
  if (bmi < 18.5) return "Glitchy";
  if (bmi >= 18.5 && bmi <= 24.9) return "Hero";
  if (bmi >= 25 && bmi <= 29.9) return "Buff";
  return "Tank";
};

// Boss Fight Calorie Logger
// Logic: Meals over 800kcal = "Epic Boss", under 400kcal = "Minion". Everything else is "Monster".
export const determineBoss = (calories) => {
  if (calories > 800) return { type: "Epic Boss", sprite: "Dragon" };
  if (calories < 400) return { type: "Minion", sprite: "Health Fairy" };
  return { type: "Monster", sprite: "Burger Beast" };
};

// Side-Quest Weekly Planner
export const getDailyQuests = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = days[new Date().getDay()];

  const quests = {
    Monday: ["Hydration Station", "Step Quest", "Meatless Monday"],
    Tuesday: ["Taco Avoidance", "Stretching Session", "Drink Water"],
    Wednesday: ["Mid-week Run", "Veggie Power", "No Sugar"],
    Thursday: ["Stairs Master", "Protein Punch", "Sleep Early"],
    Friday: ["Hydration Station", "Dance Off", "Fruit Frenzy"],
    Saturday: ["Long Walk", "Meal Prep", "Relaxation"],
    Sunday: ["Rest Day", "Plan the Week", "Hydration Station"]
  };

  return quests[currentDay] || ["Hydration Station", "Step Quest", "Eat Veggies"];
};

// Inventory Guardian (The Agent)
// Logic: If currentDate - itemExpiry <= 2 days, trigger alert.
export const checkInventoryAlerts = (inventory) => {
  const alerts = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  inventory.forEach(item => {
    const expiryDate = new Date(item.expiry);
    expiryDate.setHours(0, 0, 0, 0);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 2 && diffDays >= 0) {
      alerts.push(`Agent Alert: ${item.name} is turning into a Slime Monster! Consume it now!`);
    } else if (diffDays < 0) {
      alerts.push(`Agent Alert: ${item.name} has expired! It is completely rotten!`);
    }
  });

  return alerts;
};
