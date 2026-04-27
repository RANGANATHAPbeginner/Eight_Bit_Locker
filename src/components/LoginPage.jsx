import React from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="cabinet-wrapper flex items-center justify-center bg-[#212529]">
      <div className="nes-container is-dark is-rounded text-center p-12 max-w-lg border-4 border-white">
        <h1 className="text-4xl mb-12 text-primary glow animate-pulse">8-BIT LOCKER</h1>
        
        <div className="text-6xl mb-12">👾</div>
        
        <p className="text-xl mb-12 blink text-white">INSERT COIN TO START</p>
        
        <button 
          onClick={signInWithGoogle} 
          className="nes-btn is-primary text-xl py-6 px-12"
        >
          LOGIN WITH GOOGLE
        </button>
        
        <div className="mt-16 text-[8px] text-gray-500">
          <p>© 2026 ARCADE HEALTH SYSTEMS</p>
          <p>PLAYER 1: READY</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
