import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SoundFX } from '../services/HealthEngine';

const Dojo = () => {
  const { user, updateCurrentMetrics, updateDreamMetrics } = useAuth();
  const [currH, setCurrH] = useState(user.currentMetrics?.height || 1.75);
  const [currW, setCurrW] = useState(user.currentMetrics?.weight || 70);
  const [dreamW, setDreamW] = useState(user.dreamMetrics?.weight || 65);

  const handleUpdateCurrent = (e) => {
    e.preventDefault();
    updateCurrentMetrics(parseFloat(currH), parseFloat(currW));
    SoundFX.coin();
  };

  const handleUpdateDream = (e) => {
    e.preventDefault();
    updateDreamMetrics(parseFloat(currH), parseFloat(dreamW));
    SoundFX.coin();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="nes-container with-title is-centered bg-white text-black">
        <p className="title">THE DOJO</p>
        
        {user.isVictory ? (
          <div className="py-8">
            <h2 className="text-2xl text-success mb-4">🏆 GOAL ACHIEVED 🏆</h2>
            <div className="text-8xl mb-4">{user.dreamMetrics.sprite}</div>
            <p className="text-lg">BMI: {user.dreamMetrics.bmi} ({user.dreamMetrics.class})</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current BMI Section */}
            <div className="nes-container is-rounded bg-[#f8f8f8]">
              <h3 className="text-sm mb-4">CURRENT STATE</h3>
              <div className="text-6xl mb-4">{user.currentMetrics.sprite}</div>
              <p className="text-[10px] mb-4">BMI: {user.currentMetrics.bmi} | {user.currentMetrics.class}</p>
              
              <form onSubmit={handleUpdateCurrent} className="text-left space-y-4">
                <div className="nes-field is-inline">
                  <label htmlFor="h">H(m)</label>
                  <input type="number" id="h" step="0.01" className="nes-input is-small" value={currH} onChange={e => setCurrH(e.target.value)} />
                </div>
                <div className="nes-field is-inline">
                  <label htmlFor="w">W(kg)</label>
                  <input type="number" id="w" step="0.1" className="nes-input is-small" value={currW} onChange={e => setCurrW(e.target.value)} />
                </div>
                <button type="submit" className="nes-btn is-primary is-small w-full">SYNC STATUS</button>
              </form>
            </div>

            {/* Dream BMI Section */}
            <div className="nes-container is-rounded bg-[#f8f8f8]">
              <h3 className="text-sm mb-4">DREAM STATE</h3>
              <div className="text-6xl mb-4 grayscale opacity-50">{user.dreamMetrics.sprite}</div>
              <p className="text-[10px] mb-4">GOAL BMI: {user.dreamMetrics.bmi} | {user.dreamMetrics.class}</p>
              
              <form onSubmit={handleUpdateDream} className="text-left space-y-4">
                <div className="nes-field is-inline">
                  <label htmlFor="dw">GOAL W(kg)</label>
                  <input type="number" id="dw" step="0.1" className="nes-input is-small" value={dreamW} onChange={e => setDreamW(e.target.value)} />
                </div>
                <button type="submit" className="nes-btn is-success is-small w-full">SET DESTINY</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dojo;
