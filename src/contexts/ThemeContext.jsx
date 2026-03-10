import React, { useState, createContext, useContext } from "react";
import { useMemo } from "react";

const ThemeContext = createContext(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContext.");
  }

  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    background: "#41ceff",
    card: "#5ed3ff",
  });

  const changeTheme = (day) => {
    setTheme((prev) => {
      return {
        ...prev,
        background: day === 1 ? "#41ceff" : "#0073ff",
        card: day === 1 ? "#5ed3ff" : "#1380ff",
      };
    });
  };

  const value = useMemo(() => ({ theme, changeTheme }), [theme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
