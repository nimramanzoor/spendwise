# SpendWise

**SpendWise** is a cross-platform personal finance tracker built with **Expo, React Native, and React Native Web**. It helps users record income and expenses, review their balance, and understand spending patterns through a simple dashboard and weekly/monthly reports.

The app uses **AsyncStorage for local data persistence**. User accounts, the signed-in session, and transactions are stored locally—there is no Firebase or other backend setup required.

<p align="center">
  <a href="https://spendwise-five-gold.vercel.app/"><strong>Live Demo</strong></a>
  &nbsp; · &nbsp;
  <a href="https://github.com/nimramanzoor/spendwise"><strong>GitHub Repository</strong></a>
</p>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [How Data Is Stored](#how-data-is-stored)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [How to Use](#how-to-use)
- [Project Structure](#project-structure)
- [Important Notes and Limitations](#important-notes-and-limitations)
- [Deployment](#deployment)

## Features

### Account and session management
- Register with a name, email address, password, and password confirmation.
- Validate required fields and enforce a minimum password length of six characters.
- Log in using the credentials created on the same device or browser.
- Restore the saved local session when the app is reopened.
- Log out and clear the active session.
- Check whether an account exists using the forgot-password screen.

### Income and expense tracking
- Add income and expense records.
- Enter a transaction title, amount, category, and date.
- Edit existing transactions.
- Delete transactions with a confirmation prompt.
- Keep transactions separated by the signed-in user's local account.
- Sort transactions by date, with the newest entries shown first.

### Dashboard and reports
- View total income, total expenses, balance, and savings summary.
- Review recent transactions from the dashboard.
- View spending grouped by category in a pie chart.
- Switch reports between the current week and current month.
- See income, expenses, and the net result for the selected reporting period.
- Automatically refresh dashboard totals and reports after transaction changes.

### User interface
- Bottom-tab navigation for Dashboard, Add, Reports, and Account.
- Responsive interface for supported native and web platforms.
- Light and dark appearance based on the device color scheme.
- Reusable UI components and shared theme tokens.

## Tech Stack

| Area | Technology |
|---|---|
| App framework | Expo SDK 56 |
| UI | React Native 0.85, React 19 |
| Web support | React Native Web |
| Language | JavaScript |
| Local persistence | `@react-native-async-storage/async-storage` |
| Navigation | React Navigation (native stack and bottom tabs) |
| Charts | `react-native-chart-kit`, `react-native-svg` |
| Icons | `@expo/vector-icons` |
| Date selection | `@react-native-community/datetimepicker` |
| Safe areas | `react-native-safe-area-context` |
| Web deployment | Vercel |

## How Data Is Stored

SpendWise is a **local-first application**. It does not connect to Firebase, a remote database, or a custom API.

AsyncStorage keys used by the app:

| Key | Purpose |
|---|---|
| `@spendwise/users` | Locally registered account records |
| `@spendwise/currentUser` | Active local session |
| `@spendwise/transactions/<user-id>` | Transactions belonging to a particular local user |

Transactions are stored separately for each local user ID. The app loads the current session on startup and then loads the corresponding user's transactions.

> **Important:** Local storage is not cloud synchronization. Data is tied to the app's local storage on that device or browser profile and is not automatically shared between devices.

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js (use a current supported LTS release)
- npm
- Expo Go for testing on a physical mobile device, or an Android/iOS simulator if preferred

No Firebase project, Firebase configuration file, API key, or `.env` file is needed.

### 1. Clone the repository

```bash
git clone https://github.com/nimramanzoor/spendwise.git
cd spendwise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Expo

```bash
npx expo start -c
```

The `-c` option clears the Metro bundler cache.

## Running the App

After starting Expo, use the terminal shortcuts:

```bash
# Start the development server
npx expo start

# Run in a web browser
npx expo start --web

# Run on Android (with an emulator/device configured)
npx expo start --android

# Run on iOS (macOS with Xcode configured)
npx expo start --ios
```

You can also use the npm scripts:

```bash
npm start
npm run web
npm run android
npm run ios
```

Scan the QR code shown by Expo using Expo Go to open the app on a compatible physical device.

## How to Use

### Registration and login

1. Open SpendWise.
2. Select **Create an account**.
3. Enter your name, email, password, and confirm password.
4. Submit the registration form. The app returns you to the Login screen; registration does not automatically sign you in.
5. Log in using the same email and password.

### Add income or an expense

1. From the Dashboard, choose **Income** or **Expense**, or open the **Add** tab.
2. Enter a transaction title and an amount greater than zero.
3. Select a category.
4. Choose the transaction date.
5. Save the transaction.

Available income categories: Salary, Freelance, Investments, and Other.

Available expense categories: Food, Transport, Shopping, Bills, Health, Entertainment, and Other.

### Edit or delete a transaction

1. Open a transaction from the Recent Transactions list on the Dashboard.
2. Update its details and select **Save changes**, or choose **Delete transaction**.
3. Confirm deletion when prompted.

### View reports

1. Open the **Reports** tab.
2. Choose **Weekly** or **Monthly**.
3. Review income, expenses, spending by category, and the net result for the selected period.

### Log out

Open the **Account** tab and select **Log out**. The active session is cleared. Your locally stored account and transaction records remain on that device/browser unless its app storage is cleared.

## Project Structure

```text
spendwise/
├── App.js
├── app.json
├── index.js
├── package.json
├── vercel.json
├── src/
│   ├── components/          # Reusable buttons, inputs, cards, and controls
│   ├── context/
│   │   ├── AuthContext.js   # Authentication and session state
│   │   ├── ThemeContext.js  # Device-based light/dark theme
│   │   └── TransactionsContext.js
│   ├── navigation/          # Auth stack, app stack, and bottom tabs
│   ├── screens/             # Login, register, dashboard, reports, etc.
│   ├── services/
│   │   ├── authService.js   # AsyncStorage-based local accounts
│   │   └── transactionService.js
│   ├── theme/               # Colors, typography, spacing, categories
│   └── utils/                # Formatting and friendly error helpers
├── ui-ux-pictures/           # App screen screenshots
├── module-pictures/          # Project documentation images
└── README.md
```

### Manual Test Flow

1. Register a new user with name, email, password, and confirm password.
2. Verify that registration returns to Login rather than signing in automatically.
3. Log in using the same email and password.
4. Add at least one income transaction and one expense transaction.
5. Confirm that the dashboard totals update.
6. Open a transaction, edit it, and save the changes.
7. Open a transaction and delete it.
8. Confirm that dashboard totals and weekly/monthly reports reflect the changes.
9. Log out, then log back in and verify that the local data is still available.

## Deployment

The web version is deployed on Vercel:

**Live website:** https://spendwise-five-gold.vercel.app/

To deploy your own web build, connect the repository to Vercel and configure the project for Expo's web output. The included `vercel.json` rewrites incoming routes to `index.html` for the single-page web app. Confirm the build and output-directory settings in your Vercel project configuration when setting up a new deployment.

## Links

- **Live Demo:** https://spendwise-five-gold.vercel.app/
- **GitHub Repository:** https://github.com/nimramanzoor/spendwise

---

Developed as a local-first expense tracking project using Expo and React Native.
