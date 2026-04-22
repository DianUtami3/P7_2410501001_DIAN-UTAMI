import { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

export default function App() {
  const [screen, setScreen] = useState('login');

  if (screen === 'register') {
    return <RegisterScreen onGoToLogin={() => setScreen('login')} />;
  }

  return <LoginScreen onGoToRegister={() => setScreen('register')} />;
}