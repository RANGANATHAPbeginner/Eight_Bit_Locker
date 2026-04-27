import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { determineBoss } from '../services/logicAgent';
import { useAuth } from '../context/AuthContext';

const BossFight = () => {
  const { updateXP } = useAuth();
  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const [boss, setBoss] = useState(null);
  const [isAttacking, setIsAttacking] = useState(false);
  const [damage, setDamage] = useState(0);
  const [isSpittingFire, setIsSpittingFire] = useState(false);

  // Fire spitting logic for the Dragon (Epic Boss)
  useEffect(() => {
    if (!boss || boss.type !== 'Epic Boss') return;
    
    const fireInterval = setInterval(() => {
      setIsSpittingFire(true);
      setTimeout(() => setIsSpittingFire(false), 1000); // spits fire for 1 sec
    }, 4000); // every 4 seconds

    return () => clearInterval(fireInterval);
  }, [boss]);

  const handleSpawn = (e) => {
    e.preventDefault();
    if (!calories) return;
    const currentBoss = determineBoss(parseInt(calories, 10));
    setBoss(currentBoss);
    setDamage(0);
  };

  const handleAttack = () => {
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 200);
    
    setDamage(prev => prev + 25);
    
    if (damage >= 75) {
      setTimeout(() => {
        setBoss(null);
        updateXP(100);
        setMeal('');
        setCalories('');
        setDamage(0);
      }, 500);
    }
  };

  const renderBossSprite = () => {
    if (!boss) return null;
    switch (boss.sprite) {
      case 'Dragon': return '🐉';
      case 'Burger Beast': return '🍔';
      case 'Health Fairy': return '🧚';
      default: return '👹';
    }
  };

  return (
    <div className="cyber-panel cyber-panel-pink p-8 rounded-sm">
      <h2 className="pixel-text text-sm text-[#FF003C] mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#FF003C] inline-block animate-pulse"></span>
        COMBAT_LOG
      </h2>

      {!boss ? (
        <form onSubmit={handleSpawn} className="flex flex-col gap-6 max-w-sm mx-auto text-left">
          <div>
            <label htmlFor="meal" className="text-[10px] uppercase text-[#555] tracking-wider mb-1 block">Entity Name</label>
            <input 
              type="text" 
              id="meal" 
              className="cyber-input" 
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              placeholder="e.g. Double Cheeseburger"
              required
            />
          </div>
          <div>
            <label htmlFor="calories" className="text-[10px] uppercase text-[#555] tracking-wider mb-1 block">Energy (kcal)</label>
            <input 
              type="number" 
              id="calories" 
              className="cyber-input" 
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="e.g. 900"
              required
            />
          </div>
          <button type="submit" className="cyber-btn is-error w-full mt-2">
            INITIATE COMBAT
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex w-full justify-between items-center text-[10px] font-mono tracking-widest text-[#555] uppercase">
            <span>Target: {boss.sprite}</span>
            <span>Class: <span className={boss.type === 'Epic Boss' ? 'text-[#FF003C]' : 'text-[#00F0FF]'}>{boss.type}</span></span>
          </div>
          
          <div className="relative h-40 w-full flex justify-center items-center border border-[#1a1a24] bg-[#000] overflow-hidden">
            <AnimatePresence>
              <motion.div
                key="boss"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  x: isAttacking ? [0, -15, 15, -15, 15, 0] : 0,
                  y: isSpittingFire ? [-5, 5, -5] : [0, -5, 0] // angry bobbing
                }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ 
                  duration: isAttacking ? 0.2 : 2, 
                  repeat: isAttacking ? 0 : Infinity 
                }}
                className="text-8xl select-none relative z-10"
              >
                {renderBossSprite()}
                
                {/* Fire Spit Animation */}
                <AnimatePresence>
                  {isSpittingFire && (
                    <motion.div 
                      initial={{ scale: 0, x: -20, opacity: 0 }}
                      animate={{ scale: [1, 1.5, 2], x: -60, y: 10, opacity: [1, 0.8, 0] }}
                      exit={{ opacity: 0 }}
                      className="absolute top-1/2 left-0 text-5xl z-20 pointer-events-none"
                    >
                      🔥
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            </AnimatePresence>
            
            {/* Screen static/scan line effect inside combat window */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,60,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-30"></div>
          </div>

          {/* Cyber Health Bar */}
          <div className="w-full">
            <div className="flex justify-between text-[10px] font-mono text-[#555] mb-1">
              <span>HP</span>
              <span>{100 - damage}%</span>
            </div>
            <div className="w-full h-2 bg-[#1a1a24] overflow-hidden">
              <motion.div 
                className="h-full bg-[#FF003C] shadow-[0_0_10px_#FF003C]"
                initial={{ width: '100%' }}
                animate={{ width: `${100 - damage}%` }}
                transition={{ type: 'spring' }}
              />
            </div>
          </div>

          <button 
            onClick={handleAttack} 
            className="cyber-btn is-error w-full mt-2 relative overflow-hidden group"
          >
            <span className="relative z-10">EXECUTE ATTACK</span>
            <div className="absolute inset-0 bg-[#FF003C] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0"></div>
            <span className="relative z-10 group-hover:text-black hidden group-hover:block absolute inset-0 pt-3">EXECUTE ATTACK</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BossFight;
