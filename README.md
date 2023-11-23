## :wrench: Installation

Using [nvm](https://github.com/coreybutler/nvm-windows) is advised.

Using [yarn](https://yarnpkg.com/) is **required**. Install it with npm like this:

```
npm install -g yarn
```

Clone the project:

```
git clone https://github.com/5-semesterprojekt/Frontend.git
```

Install packages:
```
cd frontend
yarn install
```

Setting up the [backend](https://github.com/5-semesterprojekt/Backend) is also highly advisable.

## :rocket: Start

The frontend can be started by running the start script:

```
yarn start
```

It should open by itself, otherwise it is available here: [https://localhost:3010/](https://localhost:3010/)
<br>While the frontend can show the website by itself, there is practically no functionality or data without the corresponding [backend](https://github.com/5-semesterprojekt/Backend).

## :clipboard: Conventions

### Naming

- Variables are camelCased. Functional Components are PascalCased, but normal functions are camelCased. (ie. UI-related => PascalCasing)
- .ts files must be camelCased
- .tsx files must be PascalCased<br>
- If a .tsx file contains a modal or page, it must be named accordingly
- All folders are camelCased
- Avoid abbreviations

Examples:
```
// Modal
✔️ EventModal.tsx
✔️ Event.Modal.tsx
❌ Event.tsx           // Missing 'Modal'
❌ eventModal.tsx      // Not PascalCasing

// Page
✔️ CalendarPage.tsx
✔️ Calendar.Page.tsx
❌ Calendar.tsx        // Missing 'Page'
❌ calendarpage.tsx    // Not PascalCasing

// Helper functions
✔️ eventValidation.ts
❌ EventValidation.tsx // Not a UI component
❌ EventValidation.ts  // Not camelCasing

```

### Structure

#### Root

```
// Reusable components for the entire app
📁 components
// Library for more general purpose functions
📁 lib
// Pages contains folders named after the pages
📁 pages
    📁 home
    📁 calendar
        // Components folder for reusable components scoped to this page
        📁 components
            📄 Event.tsx
            📄 EventModal.tsx
        // File handling state (usually selectors and atoms from Recoil)
        📁 state
        // All test files
        📁 tests
        // Type definitions
        📁 types
            📄 event.ts
            📄 calendar.ts
        // Main page file
        📄 CalendarPage.tsx
        
// Without comments
📁 components
📁 pages
    📁 home
        📁 components
        📁 state
        📁 tests
        📁 types
        📄 HomePage.tsx
    📁 calendar
        📁 components
            📄 Event.tsx
            📄 EventModal.tsx
        📁 state
        📁 tests
        📁 types
            📄 event.ts
            📄 calendar.ts
        📄 CalendarPage.tsx
```
