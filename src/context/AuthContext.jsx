import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eightBitLockerUser');
    return saved ? JSON.parse(saved) : { id: 'Player1', xp: 0, avatar: 'Small' };
  });

  useEffect(() => {
    localStorage.setItem('eightBitLockerUser', JSON.stringify(user));
  }, [user]);

  const updateXP = (amount) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const updateAvatar = (newAvatar) => {
    setUser(prev => ({ ...prev, avatar: newAvatar }));
  };

  return (
    <AuthContext.Provider value={{ user, updateXP, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
