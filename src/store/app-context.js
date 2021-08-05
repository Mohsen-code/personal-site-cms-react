import React, { useState } from "react";

const AppContext = React.createContext({
  showDrawer: false,
  isUserLoggedIn: false,
  toggleShowDrawer: () => {},
  setIsUserLoggedIn: () => {}
});

export const AppContextProvider = ({ children }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const data = {
    showDrawer,
    toggleShowDrawer: () => {
      setShowDrawer((prevData) => {
        return !prevData;
      });
    },

    isUserLoggedIn,
    setIsUserLoggedIn
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppContext;
