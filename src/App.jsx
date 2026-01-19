// src/App.jsx
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Home from './screens/home/Home';
import Map from './screens/map/Map';
import Cafe from './screens/cafe/cafe';
import Login from './screens/login/Login';
import Profile from './screens/profile/Profile';
import About from './screens/about/About'; // <-- NEW
import { cafes } from './data/cafes';

function CozyWorld() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'var(--accent-color)', // Added background
          border: '2px solid var(--text-color)', // Added border
          color: 'var(--text-color)',
          padding: '8px 12px', // Added padding
          borderRadius: '8px', // Added rounding
          fontFamily: "'Press Start 2P', cursive",
          fontSize: '0.7rem',
          cursor: 'pointer',
          opacity: 0.8, // Increased opacity
          transition: 'all 0.2s',
          zIndex: 9999,
          boxShadow: '4px 4px 0px rgba(0,0,0,0.2)', // Added shadow
        }}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0.6'}
      >
        [ {theme} ]
      </button>

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
    <ThemeProvider>
      <AuthProvider>
        <CozyWorld />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;