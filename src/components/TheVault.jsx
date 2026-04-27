import React, { useState } from 'react';
import { getCharacterClass, SoundFX } from '../services/HealthEngine';

const TheVault = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [character, setCharacter] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!height || !weight) return;
    
    SoundFX.coin(); // Play sound
    const charData = getCharacterClass(parseFloat(weight), parseFloat(height));
    setCharacter(charData);
  };

  return (
    <div className="nes-container with-title is-centered w-full max-w-2xl mx-auto mt-4 bg-white text-black">
      <p className="title text-[10px]">THE VAULT</p>
      <p className="mb-6 text-[10px] text-gray-600">INPUT BIOMETRICS TO GENERATE CLASS</p>
      
      <form onSubmit={handleGenerate} className="flex flex-col gap-6 text-left">
        <div className="nes-field">
          <label htmlFor="height_field">HEIGHT (m)</label>
          <input 
            type="number" 
            id="height_field" 
            className="nes-input" 
            step="0.01"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="1.75"
          />
        </div>
        
        <div className="nes-field">
          <label htmlFor="weight_field">WEIGHT (kg)</label>
          <input 
            type="number" 
            id="weight_field" 
            className="nes-input" 
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
          />
        </div>
        
        <button type="submit" className="nes-btn is-success w-full">
          GENERATE AVATAR
        </button>
      </form>

      {character && (
        <div className="nes-container is-rounded mt-8 bg-[#f8f8f8]">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl p-4 bg-white border-4 border-black inline-block shadow-[4px_4px_0_0_#000]">
              {character.sprite}
            </div>
            <div className="text-left flex-1">
              <h3 className="text-xl text-primary mb-4">{character.class.toUpperCase()}</h3>
              <p className="mb-2"><span className="text-gray-500">PERK:</span> {character.perk}</p>
              <div className="mt-4">
                <p className="text-[8px] mb-1">HEALTH SYNC</p>
                <progress className="nes-progress is-success w-full" value="100" max="100"></progress>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheVault;
