import React, { useState } from "react";
import {AccountDTO} from "../adapters/AccountDTO";
import {AccountDAO} from "../DB/AccountDAO";

const AppContext = React.createContext({
  showDrawer: false,
  isUserLoggedIn: false,
  toggleShowDrawer: () => {},
  setIsUserLoggedIn: () => {},
  account: new AccountDTO(),
  setAccount: () => {}
});

export const AppContextProvider = ({ children }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [account, setAccount] = useState(new AccountDAO())

  const data = {
    showDrawer,
    toggleShowDrawer: () => {
      setShowDrawer((prevData) => {
        return !prevData;
      });
    },

    isUserLoggedIn,
    setIsUserLoggedIn,

    account,
    setAccount
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppContext;
