# Rocket Intro Animation Guide

## Overview
The website now features an animated rocket launch intro that plays on the first visit. The rocket launches from Earth's surface (positioned at the bottom center, half visible) and flies upward into space, blending into the main website with a white flash effect.

## How It Works

### Components Created:
1. **IntroAnimation.jsx** - The rocket launch animation component
   - Uses Framer Motion for smooth animations
   - Uses Lottie React for the rocket JSON animation
   - Duration: ~4 seconds
   - Effects: Launch animation + white flash blend

2. **App.jsx** - Updated with intro logic
   - Checks localStorage for first-time visit
   - Shows intro only once
   - Smooth fade transition to homepage

## Features

✨ **Animation Timeline:**
- 0s: Earth positioned at bottom center (50% visible)
- 0-3.5s: Rocket launches from Earth's surface upward
- 3.5-4s: White flash blend effect
- 4s+: Homepage fades in smoothly

🎯 **Key Features:**
- Only plays on first visit (localStorage flag)
- Smooth transitions using Framer Motion
- Responsive and fullscreen
- Uses existing dark theme assets

## Testing the Intro

### To See the Intro Again:
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Find localStorage
4. Delete the `hasSeenIntro` entry
5. Refresh the page

### Or use Console:
```javascript
localStorage.removeItem('hasSeenIntro')
location.reload()
```

## Customization

### Adjust Animation Duration:
Edit `IntroAnimation.jsx`:
```javascript
// Flash timing (line 11)
setTimeout(() => setShowFlash(true), 3500)

// Complete timing (line 16)
setTimeout(() => onComplete(), 4000)
```

### Adjust Rocket Speed:
Edit the `animate` transition duration (line 39):
```javascript
transition={{ duration: 3.5, ... }}
```

### Change Flash Color:
Edit line 53:
```javascript
<motion.div className="absolute inset-0 bg-white" ... />
// Change bg-white to any color
```

## Files Modified/Created:
- ✅ `src/components/IntroAnimation.jsx` (NEW)
- ✅ `src/App.jsx` (UPDATED)
- ✅ `package.json` (lottie-react added)

## Tech Stack:
- React 18
- React Router v6
- Framer Motion v12
- Lottie React
- Tailwind CSS
- Vite

## Running the Project:
```bash
cd exoplanet-detector
npm run dev
```

Visit `http://localhost:5173` to see the intro animation!

