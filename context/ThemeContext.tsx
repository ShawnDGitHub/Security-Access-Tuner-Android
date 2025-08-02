
import { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeProviderProps = {
  children: React.ReactNode;
}

export const themes = {
  light: {
    type: 'light',
    surface: '#d2f4d6',
    background: '#121212',
    container: '#121212',
    onContainer: '#d2f4d6',
    border: '#121212',
    onBorder: '#d2f4d6',
    text: '#000000',
    success: '#02c820',
    outstanding: '#f9c314',
    error: '#ff1414',
  },
  dark: {
    type: 'dark',
    surface: '#003507',
    background: '#121212',
    container: '#003507',
    onContainer: '#d2f4d6',
    border: '#d2f4d6',
    onBorder: '#003507',
    text: '#FFFFFF',
    success: '#02c820',
    outstanding: '#f9c314',
    error: '#ff1414',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = (props: ThemeProviderProps) => {
  const themeMode = useColorScheme();

  const { children } = props;
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(currentTheme => (
      currentTheme === themes.dark ? themes.light : themes.dark
    ));
  };

  useEffect(() => {
    if (themeMode !== theme.type) toggleTheme()
  }, [theme.type, themeMode])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
