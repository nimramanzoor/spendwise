import { useEffect, useMemo, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';
import SplashScreen from '../screens/SplashScreen';
import TransactionFormScreen from '../screens/TransactionFormScreen';
import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const theme = useAppTheme();
  const { initializing, user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  const navigationTheme = useMemo(() => {
    const baseTheme = theme.isDark ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: theme.colors.background,
        border: theme.colors.border,
        card: theme.colors.surface,
        notification: theme.colors.primary,
        primary: theme.colors.primary,
        text: theme.colors.text,
      },
    };
  }, [theme]);

  if (showSplash || initializing) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? (
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: theme.colors.background },
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerTitleStyle: theme.typography.h3,
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TransactionForm"
            component={TransactionFormScreen}
            options={{
              presentation: 'modal',
              title: 'Transaction',
            }}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
