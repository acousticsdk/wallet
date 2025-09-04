# Wallet App

Standalone wallet application extracted from 100KLAB project.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Features

- Balance display with gradient text
- Team member management
- Transaction history
- Bank and crypto withdrawal options
- Responsive design

## Project Structure

- `app/` - Main application screens
- `components/ui/` - Reusable UI components
- `assets/fonts/` - Custom fonts
- `config/` - Configuration files

## Backend Integration

The app uses global variables for backend integration:
- `WALLET_BALANCE` - Current balance
- `WALLET_FROZEN` - Frozen amount
- `WALLET_TEAM_MEMBERS` - Team members list
- `WALLET_RECENT_TRANSACTIONS` - Recent transactions

Update these variables when receiving data from your backend.