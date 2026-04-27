import React, { useState, useEffect } from 'react';
import { checkInventoryAlerts } from '../services/logicAgent';
import { motion, AnimatePresence } from 'framer-motion';

const InventoryGuardian = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Milk', expiry: new Date(new Date().getTime() + 86400000).toISOString() }, // Tomorrow
    { id: 2, name: 'Rice', expiry: new Date(new Date().getTime() + 30 * 86400000).toISOString() } // 30 days
  ]);
  const [itemName, setItemName] = useState('');
  const [expiryDays, setExpiryDays] = useState('');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts(checkInventoryAlerts(inventory));
  }, [inventory]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemName || !expiryDays) return;
    
    const expiryDate = new Date(new Date().getTime() + parseInt(expiryDays) * 86400000);
    const newItem = {
      id: Date.now(),
      name: itemName,
      expiry: expiryDate.toISOString()
    };
    
    setInventory(prev => [...prev, newItem]);
    setItemName('');
    setExpiryDays('');
  };

  const handleRemove = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="cyber-panel cyber-panel-green p-8 rounded-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="pixel-text text-sm text-[#00F0FF] flex items-center gap-2 m-0">
          <span className="w-2 h-2 bg-[#00F0FF] inline-block"></span>
          INV_GUARDIAN
        </h2>
        <span className="text-[10px] font-mono text-[#555] animate-pulse">Scanning...</span>
      </div>

      {/* Alerts Section - Toast Style */}
      <AnimatePresence>
        {alerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {alerts.map((alert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[rgba(255,0,60,0.1)] border-l-4 border-[#FF003C] text-[#e2e8f0] p-3 text-sm font-mono flex items-center gap-3 shadow-[0_0_10px_rgba(255,0,60,0.2)]"
              >
                <span className="text-[#FF003C] animate-pulse">⚠</span> 
                {alert}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Add Item Form */}
        <form onSubmit={handleAddItem} className="flex-1 text-left flex flex-col gap-5">
          <div>
            <label htmlFor="itemName" className="text-[10px] uppercase text-[#555] tracking-wider mb-1 block">Item ID</label>
            <input 
              type="text" 
              id="itemName" 
              className="cyber-input" 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Health Potion"
              required
            />
          </div>
          <div>
            <label htmlFor="expiry" className="text-[10px] uppercase text-[#555] tracking-wider mb-1 block">Cycles till Decay</label>
            <input 
              type="number" 
              id="expiry" 
              className="cyber-input" 
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              placeholder="Days"
              min="0"
              required
            />
          </div>
          <button type="submit" className="cyber-btn border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] mt-2">
            REGISTER ITEM
          </button>
        </form>

        {/* Inventory List Terminal */}
        <div className="flex-1 text-left bg-[#020202] border border-[#1a1a24] p-4 font-mono text-sm">
          <div className="flex justify-between text-[10px] text-[#555] uppercase tracking-widest border-b border-[#1a1a24] pb-2 mb-3">
            <span>Asset Vault</span>
            <span>Cmd</span>
          </div>
          <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {inventory.length === 0 && <p className="text-[#555] text-xs">Vault empty. No organic matter detected.</p>}
            <AnimatePresence>
              {inventory.map(item => {
                const isExpiring = alerts.some(a => a.includes(item.name));
                return (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`flex justify-between items-center group p-1 ${isExpiring ? 'text-[#FF003C]' : 'text-[#00F0FF]'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[8px] opacity-50">&gt;</span> {item.name}
                    </span>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-[#FF003C] hover:bg-[#FF003C] hover:text-black px-2 py-0.5"
                    >
                      DEL
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InventoryGuardian;
