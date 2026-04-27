// HealthEngine.js - The "Agentic" Brain

export const getCharacterClass = (weight, height) => {
  const bmi = weight / (height * height);
  if (bmi < 18.5) return { class: "Glitch", sprite: "👻", perk: "Agility+" };
  if (bmi < 25) return { class: "Hero", sprite: "🥷", perk: "Balanced" };
  if (bmi < 30) return { class: "Tank", sprite: "🛡️", perk: "Defense+" };
  return { class: "Berserker", sprite: "👹", perk: "Strength+" };
};

export const generateBoss = (calories, protein) => {
  const difficulty = calories > 800 ? "EPIC" : calories > 400 ? "ELITE" : "MINION";
  const name = calories > 800 ? "The Grease King" : "Carb Goblin";
  // Agentic suggestion:
  const defeatStrategy = protein > 20 ? "Physical Attack (Protein High)" : "Magic Required (Low Satiety)";
  return { name, difficulty, defeatStrategy };
};

export const checkLockerIntegrity = (inventory) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  return inventory.map(item => {
    const expDate = new Date(item.expiry);
    expDate.setHours(0,0,0,0);
    const daysLeft = (expDate - today) / (1000 * 60 * 60 * 24);
    
    if (daysLeft < 1) return { ...item, status: "CORRUPTED", icon: "☠️", daysLeft };
    if (daysLeft < 3) return { ...item, status: "WARNING", icon: "⚠️", daysLeft };
    return { ...item, status: "STABLE", icon: "💎", daysLeft };
  });
};

// Simple Web Audio API Sound generator for placeholding until actual files are used
let audioCtx = null;
const playTone = (frequency, type, duration) => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
};

export const SoundFX = {
  coin: () => {
    playTone(880, 'square', 0.1);
    setTimeout(() => playTone(1200, 'square', 0.15), 100);
  },
  buzzer: () => {
    playTone(150, 'sawtooth', 0.3);
    setTimeout(() => playTone(150, 'sawtooth', 0.3), 300);
  },
  attack: () => {
    playTone(200, 'square', 0.1);
    setTimeout(() => playTone(100, 'square', 0.2), 100);
  }
};
