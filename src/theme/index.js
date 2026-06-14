const palette = {
  emerald: '#10B981',
  emeraldDark: '#059669',
  red: '#EF4444',
  redDark: '#DC2626',
  amber: '#F59E0B',
  blue: '#2563EB',
  violet: '#7C3AED',
  cyan: '#0891B2',
};

const lightColors = {
  mode: 'light',
  background: '#F7FAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF4F8',
  card: '#FFFFFF',
  text: '#102A43',
  textMuted: '#627D98',
  border: '#D9E2EC',
  primary: palette.emerald,
  primaryDark: palette.emeraldDark,
  danger: palette.red,
  dangerDark: palette.redDark,
  warning: palette.amber,
  info: palette.blue,
  success: palette.emerald,
  tabInactive: '#829AB1',
  overlay: 'rgba(16, 42, 67, 0.42)',
  chart: ['#10B981', '#2563EB', '#F59E0B', '#EF4444', '#7C3AED', '#0891B2'],
};

const darkColors = {
  mode: 'dark',
  background: '#071318',
  surface: '#102027',
  surfaceMuted: '#172F38',
  card: '#132A32',
  text: '#F0F7FA',
  textMuted: '#A6B7C2',
  border: '#24434D',
  primary: '#34D399',
  primaryDark: palette.emerald,
  danger: '#F87171',
  dangerDark: palette.red,
  warning: '#FBBF24',
  info: '#60A5FA',
  success: '#34D399',
  tabInactive: '#7A909A',
  overlay: 'rgba(0, 0, 0, 0.54)',
  chart: ['#34D399', '#60A5FA', '#FBBF24', '#F87171', '#A78BFA', '#22D3EE'],
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

const typography = {
  fontFamily: undefined,
  display: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
};

const shadows = {
  light: {
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  dark: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 5,
  },
};

export const createTheme = (mode = 'light') => {
  const colors = mode === 'dark' ? darkColors : lightColors;

  return {
    isDark: mode === 'dark',
    colors,
    spacing,
    radii,
    typography,
    shadows: mode === 'dark' ? shadows.dark : shadows.light,
  };
};

export const categoryColors = {
  Salary: palette.emerald,
  Freelance: palette.blue,
  Investments: palette.violet,
  Food: palette.amber,
  Transport: palette.cyan,
  Shopping: palette.red,
  Bills: '#6366F1',
  Health: '#14B8A6',
  Entertainment: '#EC4899',
  Other: '#64748B',
};

export const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Other'];

export const expenseCategories = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Health',
  'Entertainment',
  'Other',
];
