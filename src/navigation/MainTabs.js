import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/AccountScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ReportsScreen from '../screens/ReportsScreen';
import TransactionFormScreen from '../screens/TransactionFormScreen';
import { useAppTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

const icons = {
  Dashboard: ['home', 'home-outline'],
  Add: ['add-circle', 'add-circle-outline'],
  Reports: ['pie-chart', 'pie-chart-outline'],
  Account: ['person', 'person-outline'],
};

export default function MainTabs() {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarLabelStyle: {
          ...theme.typography.caption,
          fontSize: 11,
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 68,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, focused, size }) => {
          const [activeIcon, inactiveIcon] = icons[route.name];

          return (
            <Ionicons
              color={color}
              name={focused ? activeIcon : inactiveIcon}
              size={size}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="Add"
        component={TransactionFormScreen}
        initialParams={{ mode: 'add', type: 'expense' }}
      />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
