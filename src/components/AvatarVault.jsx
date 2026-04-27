import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateBMI, determineAvatar } from '../services/logicAgent';
import { useAuth } from '../context/AuthContext';

const AvatarVault = () => {
  const { user, updateAvatar } = useAuth();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();
    const calculatedBmi = calculateBMI(parseFloat(height), parseFloat(weight));
    setBmi(calculatedBmi);
    
    const newAvatar = determineAvatar(calculatedBmi);
    updateAvatar(newAvatar);
  };

  const renderSprite = () => {
    switch (user.avatar) {
      case 'Glitchy': return '👾';
      case 'Hero': return '🥷';
      case 'Buff': return '🦸';
      case 'Tank': return '🛡️';
      case 'Small':
      default:
        return '🧍';
    }
  };

  return (
    <div className="cyber-panel cyber-panel-purple p-8 rounded-sm">
      <h2 className="pixel-text text-sm text-[#AA3BFF] mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#AA3BFF] inline-block"></span>
        AVATAR_VAULT
      </h2>
      
      <div className="flex flex-col md:flex-row items-center gap-12 justify-center">
        
        {/* Animated Character */}
        <div className="relative w-32 h-32 flex justify-center items-center">
          <div className="absolute inset-0 bg-[#AA3BFF] opacity-10 rounded-full blur-xl animate-pulse"></div>
          <motion.div 
            className="text-7xl relative z-10"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {renderSprite()}
          </motion.div>
          {/* Greeting Speech Bubble */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-6 -right-12 bg-[#1a1a24] text-[#00F0FF] text-[10px] font-mono p-2 border border-[#00F0FF] rounded-sm"
          >
            WELCOME!
          </motion.div>
        </div>
        
        <form onSubmit={handleCalculate} className="flex flex-col gap-6 text-left w-full max-w-[200px]">
          <div>
            <label htmlFor="height" className="text-[10px] uppercase text-[#555] tracking-wider mb-1 block">Height (m)</label>
            <input 
              type="number" 
              id="height" 
              className="cyber-input" 
              step="0.01"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="1.80"
              required
            />
          </div>
          <div>
            <label htmlFor="weight" className="text-[10px] uppercase text-[#555] tracking-wider mb-1 block">Weight (kg)</label>
            <input 
              type="number" 
              id="weight" 
              className="cyber-input"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="75.0"
              required
            />
          </div>
          
          <button type="submit" className="cyber-btn is-primary w-full mt-2">
            SCAN STATS
          </button>
        </form>
      </div>

      {bmi > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 pt-4 border-t border-[#1a1a24] flex justify-between font-mono text-xs"
        >
          <div>
            <span className="text-[#555]">BMI_INDEX: </span>
            <span className="text-white">{bmi}</span>
          </div>
          <div>
            <span className="text-[#555]">CLASS_MATCH: </span>
            <span className="text-[#AA3BFF]">{user.avatar}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AvatarVault;
