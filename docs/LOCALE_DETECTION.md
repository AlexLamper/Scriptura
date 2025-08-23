# Automatic Locale Detection Implementation

This document explains how automatic locale detection has been implemented in the Scriptura application following Next.js App Router best practices.

## Overview

The application now automatically detects the user's preferred language when they first visit the site, while also allowing manual language switching that persists across sessions.

## How It Works

### 1. Automatic Detection Priority
The middleware uses this priority order for locale detection:

1. **Saved Cookie Preference** - If the user has previously selected a language
2. **Browser Accept-Language Header** - Detects the user's browser language preferences
3. **Fallback Language** - English (en) as the default

### 2. Implementation Components

#### Middleware (`middleware.ts`)
- Uses `@formatjs/intl-localematcher` and `negotiator` for proper language matching
- Handles automatic redirects for URLs without locale prefixes
- Sets and maintains the language preference cookie
- Integrates with authentication redirects

#### Language Switcher (`components/language-switcher.tsx`)
- Allows manual language switching
- Sets the language preference cookie when user switches languages
- Uses Next.js router for smooth navigation
- Preserves the current page path when switching languages

#### I18n Settings (`app/i18n/settings.js`)
- Defines supported languages: English (en), German (de), Dutch (nl)
- Sets the fallback language to English
- Configures the cookie name for language preferences

## User Experience

### First Visit
1. User visits the root URL (`/`)
2. Middleware detects browser language from Accept-Language header
3. User is automatically redirected to the appropriate language prefix (e.g., `/en/`, `/de/`, `/nl/`)
4. Language preference is saved in a cookie

### Subsequent Visits
1. User visits any URL
2. Middleware checks for saved language cookie
3. If cookie exists, user sees content in their preferred language
4. If no cookie, browser language detection is used again

### Manual Language Switch
1. User clicks the language switcher
2. Language preference cookie is updated
3. User is navigated to the same page in the new language
4. Future visits will use the manually selected language

## Technical Details

### Cookie Configuration
- **Name**: `i18next`
- **Expiry**: 1 year
- **HttpOnly**: `false` (allows client-side access for the language switcher)
- **Secure**: `true` in production
- **SameSite**: `lax`

### Supported Languages
- `en` - English (default/fallback)
- `de` - German (Deutsch)
- `nl` - Dutch (Nederlands)

### URL Structure
All URLs follow the pattern: `/{locale}/{page}`
- `/en/dashboard` - English dashboard
- `/de/dashboard` - German dashboard
- `/nl/dashboard` - Dutch dashboard

## Testing the Implementation

### To Test Automatic Detection:
1. Clear browser cookies for the site
2. Change your browser's language preference
3. Visit the root URL (`/`)
4. Verify you're redirected to the correct language

### To Test Manual Switching:
1. Use the language switcher in the UI
2. Verify the URL changes to the new language
3. Verify the cookie is set with the new language
4. Refresh the page to confirm the language persists

### Test Page
Visit `/en/test-locale` (or your current language equivalent) to see detailed information about the current locale detection.

## Benefits

1. **Better User Experience** - Users see content in their preferred language immediately
2. **SEO Friendly** - Each language has its own URL structure
3. **Persistent Preferences** - User language choices are remembered
4. **Standards Compliant** - Uses proper HTTP Accept-Language header parsing
5. **Graceful Fallbacks** - Always has a working default language

## Compatibility

This implementation follows Next.js 13+ App Router patterns and is compatible with:
- Server-side rendering (SSR)
- Static site generation (SSG)
- Client-side navigation
- Authentication systems (NextAuth.js)
