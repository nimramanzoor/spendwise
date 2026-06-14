import { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { createTheme } from '../theme';

const ThemeContext = createContext(createTheme('light'));

export function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();
  const theme = useMemo(
    () => createTheme(colorScheme === 'dark' ? 'dark' : 'light'),
    [colorScheme],
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
