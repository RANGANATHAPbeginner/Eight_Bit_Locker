import React, { useState, useEffect } from 'react';
import { SoundFX } from '../services/HealthEngine';

const Typewriter = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(prev => prev + text.charAt(i));
      i++;
      if (i === text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 40);
    
    return () => clearInterval(timer);
  }, [text, onComplete]);

  return <span>{displayText}</span>;
};

const QuestLog = () => {
  const [quests, setQuests] = useState([
    { id: 1, title: 'Hydration Station', desc: 'Drink 2L of water.', done: false },
    { id: 2, title: 'Step Quest', desc: 'Walk 10,000 steps.', done: false },
    { id: 3, title: 'Sleep Module', desc: 'Get 8 hours of sleep.', done: false }
  ]);
  
  const [agentMessage, setAgentMessage] = useState('GREETINGS PLAYER. HERE ARE YOUR DAILY DIRECTIVES.');

  const handleComplete = (id) => {
    setQuests(quests.map(q => {
      if (q.id === id && !q.done) {
        SoundFX.coin();
        setAgentMessage(`EXCELLENT WORK ON [${q.title.toUpperCase()}]. KEEP GRINDING.`);
        return { ...q, done: true };
      }
      return q;
    }));
  };

  return (
    <div className="nes-container with-title is-centered w-full max-w-2xl mx-auto mt-4 bg-white text-black">
      <p className="title text-[10px]">QUEST LOG</p>
      
      {/* Agent Dialog Box */}
      <div className="nes-container is-dark with-title mb-8 min-h-[100px] text-left">
        <p className="title text-[8px] text-primary">HEALTH_AGENT</p>
        <p className="text-[10px]"><Typewriter text={agentMessage} /></p>
      </div>
      
      <div className="flex flex-col gap-4 text-left">
        {quests.map(q => (
          <div 
            key={q.id} 
            className={`nes-container is-rounded p-4 flex justify-between items-center ${q.done ? 'bg-gray-200 opacity-50' : 'bg-white'}`}
          >
            <div>
              <p className={`text-sm mb-2 ${q.done ? 'line-through text-gray-500' : 'text-primary'}`}>{q.title}</p>
              <p className="text-[8px] text-gray-600">{q.desc}</p>
            </div>
            <button 
              className={`nes-btn ${q.done ? 'is-disabled' : 'is-success'}`}
              onClick={() => handleComplete(q.id)}
              disabled={q.done}
            >
              {q.done ? 'DONE' : 'COMPLETE'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestLog;
