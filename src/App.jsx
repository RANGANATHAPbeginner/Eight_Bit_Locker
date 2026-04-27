import React from 'react';
import { useAuth } from './context/AuthContext';
import AvatarVault from './components/AvatarVault';
import BossFight from './components/BossFight';
import SideQuest from './components/SideQuest';
import InventoryGuardian from './components/InventoryGuardian';

function App() {
  const { user } = useAuth();

  return (
    <>
      <div className="scanlines"></div>
      
      <div className="min-h-screen bg-[#050507] pixel-bg p-4 md:p-8 relative z-10">
        
        {/* Header Dashboard */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-center border-b border-[#1a1a24] pb-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-[#00F0FF] rounded-sm animate-pulse"></div>
            <p className="pixel-text text-xl m-0 tracking-widest text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
              EIGHT_BIT<span className="text-white">_LOCKER</span>
            </p>
          </div>
          
          <div className="flex gap-6 items-center text-xs md:text-sm font-mono tracking-wider">
            <div className="flex flex-col">
              <span className="text-[#555] text-[10px] uppercase">Player ID</span>
              <span className="text-[#00F0FF]">{user.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555] text-[10px] uppercase">Class</span>
              <span className="text-[#AA3BFF]">{user.avatar}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555] text-[10px] uppercase">Experience</span>
              <span className="text-[#FF003C] drop-shadow-[0_0_5px_rgba(255,0,60,0.5)]">{user.xp} XP</span>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <AvatarVault />
          <BossFight />
          <SideQuest />
          <InventoryGuardian />
        </div>
        
        <footer className="text-center mt-16 text-[#333] text-[10px] font-mono pb-8 uppercase tracking-widest">
          <p>Sys.Ver 2.0.0 // Cyber-Arcade Protocol Active</p>
        </footer>
      </div>
    </>
  );
}

export default App;
