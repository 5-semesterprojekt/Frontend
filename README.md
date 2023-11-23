![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

# 🛠️ Installation

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

<br>

# :rocket: Start

The frontend can be started by running the start script:

```
yarn start
```

It should open by itself, otherwise it is available here: [https://localhost:3010/](https://localhost:3010/)
<br>While the frontend can show the website by itself, there is practically no functionality or data without the corresponding [backend](https://github.com/5-semesterprojekt/Backend).

<br>

# :gem: Scripts

### `yarn start`
Starts the frontend on a local development server, which can be visited on [https://localhost:3010/](https://localhost:3010/).

### `yarn build`
Builds the project into the `/dist` directory in root.

### `yarn test`
Runs all tests (see [vitest](https://vitest.dev/) for more).

<br>

# :building_construction: Contribution

1. Make a branch from `main` using the suggested branch name in [Shortcut](https://app.shortcut.com/5-semester/stories/space/19/everything?team_scope_id=v2%3At%3A6536343c-3b19-48f3-96bd-e44481a7aefc%3A6536343c-ab85-4346-9338-ad967260f782). (i.e. feature/sc-{story number}/{feature-name})
2. Commit until the feature is "complete"
3. Run `yarn prettier` so code is formatted correctly
4. Make pull request to `main` and request for review
5. <ins>**Squash and merge**</ins> when all requirements are met

It is HIGHLY advisable not to branch off secondary branches. Only branch off `main`.

<br>

# :clipboard: Conventions

## Naming

- Variables are camelCased. Functional Components are PascalCased, but normal functions are camelCased. (ie. UI-related => PascalCasing)
- `.ts` files must be camelCased
- `.tsx` files must be PascalCased<br>
- If a `.tsx` file contains a modal or page, it must be named accordingly (fx. HomePage.tsx or EventModal.tsx)
- All folders are lower case and words are separated with dashes (fx. "sub-pages")
- Avoid abbreviations
- `.js` file are **NOT** allowed in `src`

Examples:
```
// Modal
✔️ EventModal.tsx
❌ Event.tsx               // Missing 'Modal'
❌ eventModal.tsx          // Not PascalCasing
❌ Event.Modal.tsx         // Don't dot separate

// Page
✔️ CalendarPage.tsx
❌ Calendar.tsx            // Missing 'Page'
❌ calendarpage.tsx        // Not PascalCasing
❌ Calendar.Page.tsx       // Don't dot separate

// Helper functions
✔️ eventValidation.ts
❌ EventValidation.tsx     // Not a UI component
❌ EventValidation.ts      // Not camelCasing

```

## Structure

### src

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
