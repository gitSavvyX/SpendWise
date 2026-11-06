# SpendWise 💸
*A simple, offline-first personal budget and expense tracker built with React Native.*

## 📖 About the Project
Keeping track of small daily expenses can be surprisingly difficult. I built SpendWise to solve this by providing a clean, no-nonsense mobile interface where users can quickly log their income and expenses. All data is stored locally on the device, ensuring financial data remains private and accessible offline.

This project was developed over a 5-day sprint as part of the **Stack & Scale Week 2 Mobile App Development Internship**.

## ✨ Core Features
- **Dashboard:** A real-time summary of your Total Balance, Income, and Expenses. It includes a dynamic "Spending Breakdown" chart to visualize where your money is going.
- **History Management:** A fully functional CRUD (Create, Read, Update, Delete) list for transactions. Includes a dynamic search filter to find expenses by Category or Month.
- **Budget Tracking:** Set monthly spending limits for specific categories. The app automatically calculates "Spent vs. Limit" and displays visual progress bars that turn **red** when you exceed your budget.
- **Local Persistence:** Data is saved securely on the device using `@react-native-async-storage/async-storage`. It survives app restarts and browser refreshes.
- **Form Validation:** Built-in error handling prevents users from submitting empty fields or invalid (negative) amounts.

## 🛠️ Tech Stack
- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Routing:** Expo Router (File-based routing)
- **Storage:** AsyncStorage (Local Persistence)
- **UI/UX:** Expo Linear Gradient, Expo Vector Icons (Ionicons)

## 🚀 How to Run the Project Locally

1. Clone the repository:
   git clone https://github.com/gitSavvyX/SpendWise.git

2. Navigate into the folder and install dependencies:
   cd SpendWise
   npm install

3. Start the Expo development server:
   npx expo start

4. Open the app:
   - Press `w` to open the web version in your browser.
   - Or scan the QR code with the **Expo Go** app on your Android/iOS device.

