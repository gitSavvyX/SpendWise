# SpendWise 📊
*A simple, offline-first personal budget and expense tracker built with React Native (Expo).*

## About the Project
Keeping track of small daily expenses can be surprisingly hard. I built SpendWise to solve this by providing a clean, no-nonsense mobile interface where you can quickly log your income and expenses. All data is stored locally on your device, ensuring your financial data remains private.

## Current Progress
This project is being built over a 5-day internship sprint.

- **Day 1:** Project setup, database modeling, and basic tab navigation.
- **Day 2:** Built the transaction forms with validation. Implemented local persistence using `AsyncStorage` to save and restore transactions. Added Edit/Delete functionality with confirmation alerts.
- **Day 3-5:** *(Coming soon)* Budgeting features, filtering, and data visualization.

## Features Implemented So Far
- **Dashboard:** A modern summary of your total balance, income, and expenses. It dynamically calculates your remaining balance based on your transactions.
- **History:** View all your past transactions, sorted by newest first.
- **Add/Edit:** A clean bottom-sheet style form to log income or expenses. Includes validation to prevent bad data (like letters instead of numbers).
- **Delete:** Click to delete a transaction with a safety confirmation prompt.

## Tech Stack
- **Framework:** React Native with Expo
- **Routing:** Expo Router (File-based routing)
- **Storage:** `@react-native-async-storage/async-storage` (used to avoid complex native SQLite build issues on the web).
- **Language:** TypeScript

## Running the Project
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
