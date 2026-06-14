import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@spendwise/users';
const SESSION_KEY = '@spendwise/currentUser';

const normalizeEmail = (email = '') => email.trim().toLowerCase();

const makeAuthError = (code, message) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

async function getStoredUsers() {
  const rawUsers = await AsyncStorage.getItem(USERS_KEY);
  return rawUsers ? JSON.parse(rawUsers) : [];
}

async function saveStoredUsers(users) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const publicUser = (user) => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  isLocal: true,
});

export async function getCurrentUser() {
  const rawSession = await AsyncStorage.getItem(SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  const session = JSON.parse(rawSession);
  const users = await getStoredUsers();
  const matchedUser = users.find((item) => item.uid === session.uid);

  if (!matchedUser) {
    await AsyncStorage.removeItem(SESSION_KEY);
    return null;
  }

  return publicUser(matchedUser);
}

export async function loginWithEmail(email, password) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    throw makeAuthError(
      'auth/missing-credentials',
      'Please enter both email and password.',
    );
  }

  const users = await getStoredUsers();
  const matchedUser = users.find((item) => item.email === normalizedEmail);

  if (!matchedUser || matchedUser.password !== password) {
    throw makeAuthError(
      'auth/invalid-credential',
      'Invalid email or password. Please use the same credentials you used while registering.',
    );
  }

  const user = publicUser(matchedUser);
  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ uid: user.uid, email: user.email }),
  );

  return { user };
}

export async function registerWithEmail(name, email, password) {
  const trimmedName = name.trim();
  const normalizedEmail = normalizeEmail(email);

  if (!trimmedName || !normalizedEmail || !password) {
    throw makeAuthError('auth/missing-fields', 'Please fill all fields.');
  }

  if (password.length < 6) {
    throw makeAuthError(
      'auth/weak-password',
      'Use a stronger password with at least 6 characters.',
    );
  }

  const users = await getStoredUsers();
  const alreadyExists = users.some((item) => item.email === normalizedEmail);

  if (alreadyExists) {
    throw makeAuthError(
      'auth/email-already-in-use',
      'This email is already registered. Please login instead.',
    );
  }

  const newUser = {
    uid: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    displayName: trimmedName,
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  await saveStoredUsers([...users, newUser]);

  // Important: registration should NOT create a logged-in session.
  // User must return to Login and sign in with the same credentials.
  return { user: publicUser(newUser) };
}

export async function resetPassword(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throw makeAuthError('auth/missing-email', 'Please enter your registered email.');
  }

  const users = await getStoredUsers();
  const matchedUser = users.find((item) => item.email === normalizedEmail);

  if (!matchedUser) {
    throw makeAuthError(
      'auth/user-not-found',
      'No account found with this email. Please register first.',
    );
  }

  return true;
}

export async function logout() {
  await AsyncStorage.removeItem(SESSION_KEY);
}
