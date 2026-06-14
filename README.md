# SpendWise

SpendWise is an Expo React Native expense tracker that uses AsyncStorage for local authentication, user sessions, and user-specific transactions.

## Run

```bash
npm install
npx expo start -c
```

## Test Flow

1. Register a new user with name, email, password, and confirm password.
2. After registration, the app returns to Login.
3. Login using the same email and password.
4. Add income and expense transactions.
5. Open a transaction and delete it.
6. Confirm dashboard totals and reports update correctly.

No Firebase setup is required.
