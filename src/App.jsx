// src/App.jsx
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './screens/home/Home';
import Map from './screens/map/Map';
import Cafe from './screens/cafe/cafe';
import Login from './screens/login/Login';
import Profile from './screens/profile/Profile';
import About from './screens/about/About'; // <-- NEW
import { cafes } from './data/cafes';

function CozyWorld() {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedCafe, setSelectedCafe] = useState(null);

  const handleCafeSelect = (cafeId) => {
    const cafe = cafes.find(c => c.id === cafeId);
    setSelectedCafe(cafe);
    setCurrentScreen('cafe');
  };

  const handleBackToMap = () => {
    setSelectedCafe(null);
    setCurrentScreen('map');
  };

  const handleLogout = () => {
    setCurrentScreen('home');
  };

  const handleProfileClick = () => {
    if (user) {
      setCurrentScreen('profile');
    } else {
      setCurrentScreen('login');
    }
  };

  return (
    <div>
      {currentScreen === 'home' && (
        <Home onStart={() => setCurrentScreen('map')} />
      )}

      {currentScreen === 'map' && (
        <Map
          onCafeSelect={handleCafeSelect}
          onProfile={handleProfileClick}
        />
      )}

      {currentScreen === 'cafe' && selectedCafe && (
        <Cafe cafe={selectedCafe} onBack={handleBackToMap} />
      )}

      {currentScreen === 'login' && (
        <Login
          onBack={() => setCurrentScreen('map')}
          onLoginSuccess={() => setCurrentScreen('profile')}
        />
      )}

      {currentScreen === 'profile' && (
        <Profile
          onBack={() => setCurrentScreen('map')}
          onLogout={handleLogout}
          onAbout={() => setCurrentScreen('about')}
        />
      )}

      {currentScreen === 'about' && (
        <About onBack={() => setCurrentScreen('profile')} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CozyWorld />
    </AuthProvider>
  );
}

export default App;