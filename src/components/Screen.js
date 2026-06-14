import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export default function Screen({
  children,
  contentContainerStyle,
  scroll = false,
  style,
}) {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: theme.spacing.lg,
    },
    scrollContent: {
      flexGrow: 1,
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xxxl,
    },
  });
