import React, { createContext } from "react";
export const PurchaseContext = createContext();
export const PurchaseProvider = ({ children }) => {
  return (
    <PurchaseContext.Provider value={{}}>{children}</PurchaseContext.Provider>
  );
};
