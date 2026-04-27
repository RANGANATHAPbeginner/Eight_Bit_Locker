import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import QuestLog from './components/QuestLog';
import Dojo from './components/Dojo';
import Locker from './components/Locker';
import Arena from './components/Arena';
import LoginPage from './components/LoginPage';
import { SoundFX } from './services/HealthEngine';

function App() {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('Quest Log');

  const handleNav = (tab) => {
    SoundFX.coin();
    setActiveTab(tab);
  };

  const navItems = ['Quest Log', 'Dojo', 'Locker', 'Arena'];

  if (loading) {
    return (
      <div className="cabinet-wrapper flex items-center justify-center bg-[#212529]">
        <p className="text-xl blink">LOADING SYSTEM...</p>
      </div>
    );
  }

  // Force Login Screen if not authenticated
  if (!user.loggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="cabinet-wrapper">
      
      {/* Side Navigation */}
      <nav className="w-64 bg-[#111] border-r-4 border-white p-6 flex flex-col z-10 relative">
        <div className="text-center mb-12 nav-header">
          <h1 className="text-lg">8-BIT LOCKER</h1>
          <div className="flex flex-col items-center gap-3">
            <p className="text-[7px] text-white uppercase tracking-tighter truncate w-full">{user.id}</p>
            <button className="nes-btn is-error is-small text-[6px]" onClick={signOut}>LOGOUT</button>
          </div>
        </div>
        
        <div className="flex flex-col gap-5 flex-1">
          {navItems.map(item => (
            <button 
              key={item}
              className={`nes-btn text-[10px] ${activeTab === item ? 'is-primary' : ''}`}
              onClick={() => handleNav(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div className="mt-auto pt-8 text-center xp-counter">
          <p className="text-[8px] mb-2">XP: {user.xp || 0}</p>
          <p className="text-[7px] blink uppercase tracking-widest">Credit 99</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="arcade-content">
        {activeTab === 'Quest Log' && <QuestLog />}
        {activeTab === 'Dojo' && <Dojo />}
        {activeTab === 'Locker' && <Locker />}
        {activeTab === 'Arena' && <Arena />}
      </main>

    </div>
  );
}

export default App;
