import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';

// import Context from './context';

function App() {
  const [cart, setCart] = useState<ProductItem[]>([]);
  const value = { cart, setCart };

  const [user, setUser] = useState(null);
  const [cometChat, setCometChat] = useState(null);

  const context = {
    user,
    setUser,
    cometChat,
    setCometChat,
  };

  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };

  const initCometChat = async () => {
    const { CometChat } = await import('@cometchat-pro/chat');
    const appID = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const region = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        setCometChat((): any => CometChat);
      },
      (error) => {}
    );
  };

  useEffect(() => {
    initAuthUser();
    initCometChat();
  }, []);

  return (
    <CartContext.Provider value={value}>
      <Router>
        <AppRoutes></AppRoutes>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
