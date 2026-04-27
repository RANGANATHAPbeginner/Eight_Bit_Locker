import React, { useState, useEffect } from 'react';
import { getDailyQuests } from '../services/logicAgent';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const SideQuest = () => {
  const { updateXP } = useAuth();
  const [quests, setQuests] = useState([]);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    setQuests(getDailyQuests());
  }, []);

  const handleComplete = (index) => {
    if (completed[index]) return;
    
    setCompleted(prev => ({ ...prev, [index]: true }));
    updateXP(50);
  };

  return (
    <div className="cyber-panel cyber-panel-green p-8 rounded-sm">
      <h2 className="pixel-text text-sm text-[#00FF66] mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#00FF66] inline-block"></span>
        DAILY_DIRECTIVES
      </h2>
      
      <div className="text-left w-full mx-auto font-mono text-sm">
        <div className="flex justify-between text-[10px] text-[#555] uppercase tracking-widest border-b border-[#1a1a24] pb-2 mb-4">
          <span>Directive</span>
          <span>Status</span>
        </div>
        
        <ul className="space-y-3">
          {quests.map((quest, index) => {
            const isDone = completed[index];
            return (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 border-l-2 transition-colors duration-300 ${
                  isDone 
                    ? 'border-[#00FF66] bg-[rgba(0,255,102,0.05)] text-[#00FF66]' 
                    : 'border-[#333] hover:border-[#00F0FF] hover:bg-[rgba(0,240,255,0.02)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleComplete(index)}
                    disabled={isDone}
                    className={`w-4 h-4 border ${isDone ? 'bg-[#00FF66] border-[#00FF66]' : 'border-[#555] bg-transparent'} transition-all`}
                  >
                    {isDone && <span className="text-black text-[10px] leading-none block text-center">✓</span>}
                  </button>
                  <span className={`transition-all duration-500 ${isDone ? 'line-through opacity-70' : 'text-[#e2e8f0]'}`}>
                    {quest}
                  </span>
                </div>
                
                <div className="text-[10px]">
                  {isDone ? (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[#00FF66] drop-shadow-[0_0_5px_rgba(0,255,102,0.8)]"
                    >
                      +50 XP
                    </motion.span>
                  ) : (
                    <span className="text-[#555]">PENDING</span>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideQuest;
