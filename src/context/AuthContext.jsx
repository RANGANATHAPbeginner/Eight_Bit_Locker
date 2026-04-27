import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getCharacterClass } from '../services/HealthEngine';
import { db, auth } from '../services/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();

const INITIAL_GAME_DATA = {
  xp: 0,
  currentMetrics: { height: 1.75, weight: 85, bmi: 27.8, class: 'Tank', sprite: '🛡️' },
  dreamMetrics: { height: 1.75, weight: 70, bmi: 22.9, class: 'Hero', sprite: '🥷' },
  bossHp: 100,
  fridgeItems: [
    { id: 1, name: 'Apple', expiry: new Date(Date.now() + 86400000 * 5).toISOString(), healthy: true, icon: '🍎' },
    { id: 2, name: 'Soda', expiry: new Date(Date.now() + 86400000 * 30).toISOString(), healthy: false, icon: '🥤' }
  ],
  isVictory: false
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [gameData, setGameData] = useState(INITIAL_GAME_DATA);
  const [loading, setLoading] = useState(true);
  const isInitialMount = useRef(true);

  // Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        
        // Load data from Firestore
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setGameData(docSnap.data());
        } else {
          // Initialize new user in Firestore
          await setDoc(docRef, INITIAL_GAME_DATA);
          setGameData(INITIAL_GAME_DATA);
        }
      } else {
        setCurrentUser(null);
        setGameData(INITIAL_GAME_DATA);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Real-time Sync to Firestore on local state changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (currentUser) {
      const syncData = async () => {
        try {
          await setDoc(doc(db, "users", currentUser.uid), gameData);
        } catch (e) {
          console.error("Firestore Sync Error", e);
        }
      };
      syncData();
    }
  }, [gameData, currentUser]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign-Out Error", error);
    }
  };

  const updateCurrentMetrics = (height, weight) => {
    const char = getCharacterClass(weight, height);
    const bmi = parseFloat((weight / (height * height)).toFixed(1));
    setGameData(prev => ({
      ...prev,
      currentMetrics: { height, weight, bmi, class: char.class, sprite: char.sprite }
    }));
  };

  const updateDreamMetrics = (height, weight) => {
    const char = getCharacterClass(weight, height);
    const bmi = parseFloat((weight / (height * height)).toFixed(1));
    setGameData(prev => ({
      ...prev,
      dreamMetrics: { height, weight, bmi, class: char.class, sprite: char.sprite }
    }));
  };

  const damageBoss = (amount) => {
    setGameData(prev => {
      const newHp = Math.max(0, prev.bossHp - amount);
      const isVictory = newHp === 0;
      return { ...prev, bossHp: newHp, isVictory };
    });
  };

  const addFridgeItem = (name, expiry, healthy) => {
    setGameData(prev => ({
      ...prev,
      fridgeItems: [...(prev.fridgeItems || []), { id: Date.now(), name, expiry, healthy }]
    }));
  };

  const removeFridgeItem = (id) => {
    setGameData(prev => ({
      ...prev,
      fridgeItems: (prev.fridgeItems || []).filter(item => item.id !== id)
    }));
  };

  const updateXP = (amount) => {
    setGameData(prev => ({ ...prev, xp: (prev.xp || 0) + amount }));
  };

  return (
    <AuthContext.Provider value={{ 
      user: { ...gameData, id: currentUser?.displayName || 'Guest', loggedIn: !!currentUser }, 
      loading,
      signInWithGoogle, 
      signOut,
      updateCurrentMetrics, 
      updateDreamMetrics, 
      damageBoss, 
      addFridgeItem, 
      removeFridgeItem,
      updateXP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
