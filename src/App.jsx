import React, { useContext } from 'react';
import Chat from './components/Chat.jsx';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div data-theme={theme} className="flex flex-col h-screen">
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="flex-1 flex flex-col">
        <Chat />
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;
