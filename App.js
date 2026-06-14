import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider, useAppTheme } from './src/context/ThemeContext';
import { TransactionsProvider } from './src/context/TransactionsContext';
import AppNavigator from './src/navigation/AppNavigator';

function ThemedStatusBar() {
  const theme = useAppTheme();

  return <StatusBar style={theme.isDark ? 'light' : 'dark'} />;
}

function Providers() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <TransactionsProvider>
            <AppNavigator />
            <ThemedStatusBar />
          </TransactionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default function App() {
  return <Providers />;
}
