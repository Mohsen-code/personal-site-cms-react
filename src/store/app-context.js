import React, { useState } from "react";

const AppContext = React.createContext({
  showDrawer: false,
  toggleShowDrawer: () => {},
});

export const AppContextProvider = ({ children }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const data = {
    showDrawer,
    toggleShowDrawer: () => {
      setShowDrawer((prevData) => {
        return !prevData;
      });
    },
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppContext;
