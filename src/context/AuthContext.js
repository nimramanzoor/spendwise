import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  getCurrentUser,
  loginWithEmail,
  logout as clearLocalSession,
  registerWithEmail,
  resetPassword,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const savedUser = await getCurrentUser();
        if (isMounted) {
          setUser(savedUser);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setInitializing(false);
        }
      }
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const credential = await loginWithEmail(email, password);
    setUser(credential.user);
    return credential;
  }, []);

  const register = useCallback(async (name, email, password) => {
    // Do not set user here. Registration must go back to Login screen first.
    return registerWithEmail(name, email, password);
  }, []);

  const logout = useCallback(async () => {
    await clearLocalSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      login,
      register,
      resetPassword,
      logout,
    }),
    [initializing, login, logout, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
