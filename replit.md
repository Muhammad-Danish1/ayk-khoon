# Ayk Khoon - Blood Donation Platform

## Project Overview
**Ayk Khoon** is a comprehensive blood donation and blood bank management platform built with React Native (Expo). The app connects blood donors with those in need and provides blood banks with powerful management tools.

## Recent Changes (November 7, 2025)

### ✅ Completed Redesign Tasks
1. **Branding Update**: Renamed from BloodLinkPlus to Ayk Khoon
   - Updated app.json, package.json
   - Updated splash screen with new branding
   - Route now goes directly to login instead of onboarding

2. **Navigation Cleanup**: Removed screens not in documentation
   - Deleted: `welcome.tsx`, `blood-type.tsx`, `location.tsx`
   - Deleted: `donor-profile/` directory
   - Updated root layout to include only: index, (auth), (onboarding), (user), (bloodbank)

3. **Profile Setup Consolidation**: Simplified to single screen
   - Collects: Phone, Name, Blood Group, Location
   - Removed multi-step wizard
   - Clean, modern UI with blood group selector

4. **Design System Enhancements**:
   - Added complete gray scale (gray50-gray900) for WCAG AA compliance
   - Platform-specific fonts: SF Pro Display (iOS), Roboto (Android)
   - 8px grid system (already in place)
   - Minimum 16pt body text (already in place)
   - Updated color palette for healthcare trust

5. **Build Fixes**:
   - Installed missing packages: react-native-chart-kit, @react-native-picker/picker
   - Fixed all import path issues across codebase
   - Fixed syntax errors in login.tsx, signup.tsx

## Project Structure

```
/app
  ├── index.tsx                  # Splash screen → routes to login
  ├── (auth)/
  │   ├── login.tsx             # Email/password login
  │   ├── signup.tsx            # Email/password signup  
  │   └── forgot-password.tsx   # Password recovery
  ├── (onboarding)/
  │   └── profile-setup.tsx     # Phone, name, blood group, location
  ├── (user)/                    # User mode - 5 bottom tabs
  │   ├── home/
  │   │   ├── index.tsx         # Need blood / Donate
  │   │   ├── create-request.tsx
  │   │   ├── find-donors.tsx
  │   │   └── request-detail.tsx
  │   ├── chats/
  │   │   ├── index.tsx         # Chat list
  │   │   └── [id].tsx          # Individual chat
  │   ├── alerts/
  │   │   └── index.tsx         # Notifications
  │   ├── history/
  │   │   └── index.tsx         # Donation history
  │   └── profile/
  │       ├── index.tsx         # Profile + mode switch
  │       └── setup-bloodbank.tsx
  └── (bloodbank)/               # Blood bank mode - 4 tabs
      ├── dashboard/
      │   └── index.tsx
      ├── stock/
      │   └── index.tsx
      ├── requests/
      │   └── index.tsx
      └── reports/
          └── index.tsx
```

## Tech Stack
- **Framework**: React Native (Expo ~54.0)
- **Language**: TypeScript  
- **Navigation**: Expo Router (file-based)
- **Styling**: StyleSheet with design system tokens
- **Icons**: @expo/vector-icons (Ionicons, MaterialIcons)
- **Maps**: react-native-maps
- **Charts**: react-native-chart-kit

## Design System

### Colors
- Primary: `#D32F2F` (Crimson red for healthcare/blood)
- Secondary: `#1976D2` (Trust blue)
- Success: `#4CAF50`
- Warning: `#FF9800`
- Error: `#F44336`
- Gray scale: gray50-gray900 (WCAG AA compliant)

### Typography
- **iOS**: SF Pro Display
- **Android**: Roboto
- **Body**: 16pt minimum
- **Scale**: 12pt (xs) → 48pt (7xl)

### Spacing (8px Grid)
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 40px, 3xl: 48px, 4xl: 64px

## User Flow

1. **Splash** (3s) → **Login/Signup**
2. **Signup** → **Profile Setup** (phone, name, blood, location)
3. **Profile Setup** → **User Home** (default mode)
4. **User** can switch to **Blood Bank** mode via Profile tab

## Remaining Work

### High Priority
- [ ] Audit all User tab screens for dummy data consistency
- [ ] Audit all Blood Bank tab screens for dummy data consistency
- [ ] Ensure all components use design system tokens
- [ ] Add mode switching functionality in profile
- [ ] Test complete user flow: signup → profile → user mode → blood bank mode

### Medium Priority
- [ ] Implement proper form validation across all screens
- [ ] Add loading states and error handling
- [ ] Implement real-time features scaffolding (chat, notifications)
- [ ] Add accessibility labels for screen readers

### Low Priority
- [ ] Add animations and micro-interactions
- [ ] Implement dark mode support
- [ ] Add unit tests
- [ ] Performance optimization

## Running the App

```bash
npm install
npm run dev
```

The app will start on http://localhost:5000

## Environment
- **Node**: v20.19.3
- **npm**: 10.8.2
- **Expo**: ~54.0.21
- **React Native**: 0.81.5

## Notes
- All screens use dummy data (no backend integration)
- Firebase schema defined in documentation but not implemented
- App is fully functional for frontend demonstration
- Design follows WCAG AA accessibility guidelines
