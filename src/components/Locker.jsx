import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SoundFX } from '../services/HealthEngine';

const Locker = () => {
  const { user, addFridgeItem, removeFridgeItem, damageBoss } = useAuth();
  const [view, setView] = useState('fridge');
  const [newItem, setNewItem] = useState('');
  const [isHealthy, setIsHealthy] = useState(true);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addFridgeItem(newItem, new Date(Date.now() + 86400000 * 7).toISOString(), isHealthy);
    setNewItem('');
    SoundFX.coin();
  };

  const handleConsume = (item) => {
    if (item.healthy) {
      damageBoss(5);
      SoundFX.coin();
    } else {
      SoundFX.buzzer();
    }
    removeFridgeItem(item.id);
  };

  const dreamDiet = [
    { name: 'Grilled Chicken', reason: 'High Protein' },
    { name: 'Broccoli', reason: 'Low Calorie' },
    { name: 'Quinoa', reason: 'Complex Carbs' },
    { name: 'Salmon', reason: 'Healthy Fats' }
  ];

  return (
    <div className="nes-container with-title bg-white text-black">
      <p className="title">THE LOCKER</p>
      
      <div className="flex gap-4 mb-8">
        <button className={`nes-btn flex-1 ${view === 'diet' ? 'is-primary' : ''}`} onClick={() => setView('diet')}>DREAM DIET</button>
        <button className={`nes-btn flex-1 ${view === 'fridge' ? 'is-success' : ''}`} onClick={() => setView('fridge')}>ACTUAL FRIDGE</button>
      </div>

      {view === 'diet' ? (
        <div className="text-left">
          <h3 className="text-sm mb-4 text-primary">RECOMMENDED FUEL FOR DREAM BMI</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dreamDiet.map(food => (
              <div key={food.name} className="nes-container is-rounded bg-[#f0f0f0] p-4">
                <p className="text-[12px] font-bold">{food.name}</p>
                <p className="text-[8px] text-gray-500">{food.reason}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-left">
          <form onSubmit={handleAdd} className="mb-8 flex flex-col gap-4">
            <div className="nes-field">
              <label htmlFor="item_name">NEW ITEM</label>
              <input type="text" id="item_name" className="nes-input" value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="e.g. Avocado" />
            </div>
            <label>
              <input type="checkbox" className="nes-checkbox" checked={isHealthy} onChange={e => setIsHealthy(e.target.checked)} />
              <span>IS HEALTHY?</span>
            </label>
            <button type="submit" className="nes-btn is-primary">ADD TO FRIDGE</button>
          </form>

          <h3 className="text-sm mb-4">INVENTORY</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.fridgeItems?.map(item => (
              <div key={item.id} className="nes-container is-rounded p-2 flex flex-col items-center">
                <div className="text-3xl mb-2">{item.icon || (item.healthy ? '🥬' : '🍕')}</div>
                <p className="text-[8px] mb-2 truncate w-full text-center">{item.name}</p>
                <button className="nes-btn is-warning is-small p-1 text-[8px]" onClick={() => handleConsume(item)}>CONSUME</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Locker;
