import React from 'react';
import { useAuth } from '../context/AuthContext';

const Arena = () => {
  const { user } = useAuth();

  return (
    <div className="nes-container with-title is-centered bg-white text-black min-h-[400px] flex flex-col items-center justify-center">
      <p className="title uppercase">The Arena</p>
      
      {user.isVictory ? (
        <div className="text-center animate-bounce">
          <h2 className="text-2xl text-success mb-4">VICTORY!</h2>
          <div className="text-9xl">👑</div>
          <p className="mt-4 text-sm">DREAM BMI KILLER DEFEATED</p>
        </div>
      ) : (
        <div className="w-full max-w-lg">
          <h2 className="text-xl text-danger mb-2">DREAM BMI KILLER</h2>
          <p className="text-[8px] text-gray-500 mb-8 uppercase">Status: Threatening your progress</p>
          
          <div className="text-8xl mb-12 animate-pulse">👹</div>
          
          <div className="mb-8">
            <div className="flex justify-between text-[10px] mb-2">
              <span>BOSS HP</span>
              <span>{user.bossHp}/100</span>
            </div>
            <div className="pixel-bar-container">
              <div 
                className={`pixel-bar-fill ${user.bossHp < 30 ? 'danger' : ''}`} 
                style={{ width: `${user.bossHp}%` }}
              ></div>
            </div>
          </div>
          
          <div className="nes-container is-dark is-rounded p-4 text-left">
            <p className="text-[8px] text-primary mb-2">COMMANDER INTEL:</p>
            <p className="text-[10px] leading-relaxed">
              &gt; Consume healthy items from your <span className="text-success">LOCKER</span> to deal damage.<br/>
              &gt; Every healthy meal weakens the Killer's grip on your destiny.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Arena;
