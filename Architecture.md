# Architecture Scan

## Overview

This repository is a **Next.js 14 frontend** for the ATMI e-learning platform.

At runtime, the app follows this basic flow:

`page` -> `feature component` -> `custom hook` -> `service` -> `axios client` -> `backend API`

The codebase is already using the **App Router** under `src/app`, but parts of the project still carry patterns and leftovers from an older template and earlier architecture decisions.

## Current Tech Stack

- Next.js `14.2.4`
- React `18.3.1`
- HeroUI (`@heroui/*`) for UI primitives
- Tailwind CSS for styling
- TanStack React Query for async server state
- React Hook Form + Yup for forms and validation
- Axios for HTTP
- `cookies-next` for auth/session cookies
- `next-themes` for theme wrapper
- `react-hot-toast` for notifications

## High-Level App Structure

### Main folders

- `src/app`
  App Router entrypoint, route groups, layouts, and pages.
- `src/components`
  Reusable UI plus feature-level page components.
- `src/hooks`
  React Query hooks and mutation hooks.
- `src/services`
  API-facing service layer.
- `src/utils`
  Shared technical utilities such as the axios client and error handling.
- `src/constants`
  API URL templates, route names, cookie keys, env constants.
- `src/context`
  Local React context providers for feature state.
- `src/layouts`
  Shared layout wrappers like navbar, admin shell, dashboard shell.
- `src/assets`
  Images and icon components.
- `src/styles`
  Global CSS.
- `public`
  Static assets such as the PDF worker.

### Route groups

The application is organized into four route groups:

- `(home)`
  Public landing pages like `/`, `/about`, `/topic/[id]`
- `(auth)`
  Login flows like `/login` and `/login-admin`
- `(trainee)`
  Learner dashboard pages under `/dashboard/...`
- `(admin)`
  Admin console pages under `/admin/...`

## Route Inventory

### Public

- `/`
- `/about`
- `/search`
- `/topic/[id]`

### Authentication

- `/login`
- `/login-admin`

### Trainee

- `/dashboard/training`
- `/dashboard/training/[id]`
- `/dashboard/profile`
- `/dashboard/certificate`

### Admin

- `/admin/profile`
- `/admin/management-user/trainee`
- `/admin/management-user/trainee/create`
- `/admin/management-user/trainee/edit/[id]`
- `/admin/management-user/trainer`
- `/admin/management-user/trainer/create`
- `/admin/management-user/trainer/edit/[id]`
- `/admin/management-user/admin`
- `/admin/management-user/admin/create`
- `/admin/management-user/admin/edit/[id]`
- `/admin/management-materi`
- `/admin/management-materi/create`
- `/admin/management-certificate`
- `/admin/management-certificate/create`
- `/admin/management-certificate/create-template`
- `/admin/management-certificate/edit/[id]`
- `/admin/management-notification`
- `/admin/questionnaire`
- `/admin/questionnaire/create`
- `/admin/questionnaire/[id]`
- `/admin/questionnaire/detail-template/[id]`
- `/admin/questionnaire/detail-answer/[id]`

## Layering Pattern

### 1. Pages

Pages are usually thin entrypoints that assemble feature components and trigger hooks.

Examples:

- `src/app/(home)/page.js`
- `src/app/(trainee)/dashboard/training/page.js`
- `src/app/(admin)/admin/management-user/trainee/page.js`

### 2. Feature components

Feature components live mostly under:

- `src/components/pages/home/*`
- `src/components/pages/login/*`
- `src/components/pages/dashboard/*`
- `src/components/pages/admin/*`

These files contain most of the rendering logic, HeroUI composition, and feature-specific UI behavior.

### 3. Hooks

Custom hooks in `src/hooks` wrap React Query and expose query/mutation state.

Examples:

- `useGetHome`
- `useGetTraining`
- `useGetTrainee`
- `useSignIn`

Pattern:

- hooks define `queryKey`
- hooks call a service method
- pages/components consume `data`, `isLoading`, `mutate`, and similar states

### 4. Services

Services in `src/services` are the API access layer.

Examples:

- `src/services/homeService.js`
- `src/services/authService.js`
- `src/services/trainee/trainingTraineeService.js`
- `src/services/admin/traineeAdminService.js`

Pattern:

- build URL from `src/constants/urls.js`
- serialize params using `stringifyQueryParam`
- call the shared axios client
- return backend payload, often with a partial `.data` unwrap

### 5. Shared HTTP client

`src/utils/api.js` creates one shared axios instance:

- `baseURL` comes from `NEXT_PUBLIC_API_URL`
- bearer token is read from cookies
- response interceptor handles some auth error behavior

## Layout and Provider Architecture

### Root layout

`src/app/layout.js` defines the outer HTML shell and wraps children with `HeroUIProvider`.

### Group layouts

Each route group also defines its own layout and usually wraps content with:

- `Providers` from `src/app/provider.js`
- `NextThemesProvider`
- `Head` and/or `Footer`
- feature shell components for admin/home flows

Examples:

- `src/app/(home)/layout.js`
- `src/app/(auth)/layout.js`
- `src/app/(admin)/layout.js`
- `src/app/(trainee)/layout.js`

### Shared layout components

- `src/layouts/default.js`
  Public navbar wrapper
- `src/layouts/dashboard-layout.js`
  Trainee sidebar + navbar shell
- `src/layouts/admin-layout.js`
  Admin sidebar + navbar shell + upload progress provider

## State Management

### Server state

React Query is the main server-state solution.

- provider: `src/config/react-query.provider.js`
- hooks define `queryKey` and call services
- mutation error handling is mostly local to each hook

### Client state

Client state is lightweight and mostly local:

- React state inside components
- route-local context providers:
  - `topic-context`
  - `upload-context`
  - `module-context`

There is no global store like Redux or Zustand in the current codebase.

## Auth Model

Authentication is cookie-based:

- token cookie: `AUTH_TOKEN`
- role cookie: `ROLE`

Relevant files:

- `src/hooks/auth/useSignIn.js`
- `src/hooks/auth/useSignInAdmin.js`
- `src/utils/api.js`
- `src/middleware.js`

Behavior:

- login mutation stores auth token and role in cookies
- axios request interceptor attaches bearer token
- middleware redirects logged-in users from base dashboard/login routes

Important limitation:

- current middleware mostly handles redirect convenience, not full route protection for every unauthorized path

## Styling System

The styling system is a mix of:

- HeroUI components
- Tailwind utility classes
- `tailwind-variants` primitives in `src/components/primitives.js`
- project theme extension in `tailwind.config.js`

The visual language uses branded greens/blues and many feature components style directly inline with utility classes.

## Responsive Architecture Notes

From the responsive work done in this repository, the practical rule is:

- keep desktop structure as the default
- apply phone/mobile fixes locally at the section level
- avoid global breakpoint or Tailwind screen changes unless the whole design system is being intentionally reworked

### Why this matters here

Several page sections in this codebase are built with:

- fixed multi-column layouts
- large desktop-first spacing
- HeroUI containers whose internal width behavior can unexpectedly shrink child content

That means responsive bugs are often caused by the **parent container path**, not the card or image itself.

### Responsive lessons from this repo

1. Do not use global breakpoint edits to solve one section.
   A Tailwind screen change affected unrelated desktop/tablet behavior across the app.

2. Check the real rendered container first.
   In the `Topics` section, the real bug was the `Tabs` wrapper/panel width, not just the cards.

3. If mobile uses a different UI control, render only one branch.
   In `Topics`, using both desktop tabs and mobile dropdown paths at once caused duplicate card data on phone.

4. Remote image dependencies are fragile here.
   If an image must render reliably in a section, confirm whether the component and config support that source.

5. Screenshot-first debugging works better than assumption-first debugging.
   The provided screenshots exposed width-collapse and duplication issues faster than code inspection alone.

## Current Responsive Strategy

The current safe strategy for this repository is:

### Home page

- desktop layout remains the reference layout
- phone adjustments are scoped with local mobile classes
- hero media can be hidden on phone without changing desktop
- `Topics` uses a phone-only dropdown and a desktop-only tab flow
- navbar search now redirects to a dedicated `/search?q=...` page instead of showing inline result cards in the navbar

### About page

- desktop section composition remains intact
- phone behavior stacks grids and two-column sections vertically
- media is hidden or resized on phone only where requested

### Search page

- `/search` is a public results page rendered under the `(home)` route group
- the navbar remains the search entrypoint, but result presentation happens in page content instead of an inline dropdown
- current flow is:
  `navbar form submit` -> `router.push('/search?q=...')` -> `useSearchParams()` -> `useSearchTraining()` -> result card grid or illustrated empty state
- the page reuses existing public-site sections like `Benefit`, `CTA`, and the shared footer to stay visually consistent with other public pages
- the empty state is intentionally a dedicated illustrated state, not a generic alert box

### Search result implementation notes

Relevant files:

- `src/components/navbar.js`
- `src/app/(home)/search/page.js`
- `src/hooks/home/useSearchTraining.js`
- `src/services/homeService.js`

Behavior:

- search input state in the navbar syncs with the `q` query parameter
- submitting desktop or mobile navbar search pushes the user to `/search`
- the search page reads `q` from the URL and triggers the React Query hook only when a real term exists
- when results exist, the page shows the result count and training cards
- when results are empty, the page hides result-heading copy and shows the dedicated illustration/message state instead

## Current Frontend Caveats

These are useful to remember before future UI work:

### 1. App Router metadata/viewport should live in `src/app/layout.js`

For reliable mobile behavior in this app-router setup, viewport configuration belongs in the root app layout rather than relying only on `next/head` helpers.

### 2. `Topics` is a special case

`src/components/pages/home/topics.js` now effectively has two UX modes:

- desktop: HeroUI `Tabs`
- phone: dropdown selector

If that file is edited again, treat those as separate presentation modes sharing the same data source.

### 3. External images need verification

This repo does not currently advertise a robust global remote-image strategy in `next.config.js`, so externally hosted images should be verified carefully when used in UI sections.

## Coding Patterns Found

### Forms

Common stack:

- `react-hook-form`
- `yupResolver`
- custom form input wrappers in `src/components/form`

Example:

- `src/components/pages/login/login-form.js`

### Tables and CRUD screens

Admin pages generally follow this pattern:

- route page renders section title + actions
- table component owns pagination/filter state
- table component calls a `useGet*` query hook
- filters are separate child components
- create/edit forms post multipart data through service functions

Example slice:

- page: `src/app/(admin)/admin/management-user/trainee/page.js`
- table: `src/components/pages/admin/management-user/trainee/table-trainee.js`
- hook: `src/hooks/admin/useGetTrainee.js`
- service: `src/services/admin/traineeAdminService.js`

### Query parameter building

Most list endpoints rely on `stringifyQueryParam` in `src/utils/common.js`.

That utility is shared across admin, home, and trainee services.

## Architectural Issues Found In The Scan

These are the first issues worth fixing after alignment on the architecture.

### 1. Documentation is outdated

- `README.md` still describes the repo as a generic NextUI template
- it says "pages directory" even though the real app is using `src/app`
- it mentions TypeScript, but the codebase is JavaScript

### 2. Provider/layout layering is duplicated

- `src/app/layout.js` already wraps with `HeroUIProvider`
- `src/app/provider.js` wraps with `HeroUIProvider` again
- every route group layout wraps with `Providers`

This should be simplified into one clear root provider strategy.

### 3. Layout responsibility is inconsistent

- route groups define layouts
- some pages still manually wrap themselves with shell layouts like `DashboardLayout`

Example:

- `src/app/(trainee)/dashboard/training/page.js` uses `DashboardLayout` inside the page component

This creates mixed responsibilities and makes future refactors harder.

### 4. App Router migration is incomplete in structure

The repo still contains legacy-looking leftovers:

- top-level `components/`
- top-level `pages/`
- `src/api/hello.js`

These should be reviewed and either removed or integrated intentionally.

### 5. Response shapes are inconsistent across services

Some services return:

- `res?.data`
- `res?.data?.data`
- transformed arrays

This inconsistency leaks backend response knowledge into many UI layers.

### 6. Naming quality is uneven

Examples:

- `src/utils/getQueryClient..js` has a double dot in the filename
- `useCreateTamplateQuestionnaire`
- `useUpdatetQustionnaireTemplate`
- `deleteQustionnaireTemplateAssign`

The naming inconsistency reduces maintainability and searchability.

### 7. Middleware does not look like full authorization control

Current middleware redirects some authenticated entry routes, but it does not appear to comprehensively guard all admin and trainee routes from unauthorized access.

### 8. Route constants are too coarse

`src/constants/route-names.js` only contains:

- `/dashboard`
- `/admin`
- `/`

But the real app navigates to deeper routes like `/dashboard/training` and `/admin/management-user/trainee`.

This makes route handling more brittle than necessary.

### 9. Global imports are repeated in multiple group layouts

Files repeatedly import:

- `@/styles/globals.css`
- `"swiper/css"`
- theme wrappers

That is usually better centralized unless there is a strong reason not to.

### 10. Error handling is centralized but rough

`src/utils/handleError.js` is doing broad response normalization, but:

- logic is repetitive
- one branch is duplicated
- default error code becomes `404` even for non-404 failures

This can misrepresent failures to the UI.

## Suggested Mental Model For This Codebase

If we work on this repo feature by feature, this is the right mental model:

1. The real product is organized by role: public, auth, trainee, admin.
2. Most business logic is still in client components.
3. API integration is service-driven and fairly centralized.
4. State is simple: React Query for server data, local/context state for UI.
5. The main technical debt is not one broken feature, but **inconsistent structure** across routing, providers, naming, and response handling.

## Recommended Fix Order

Before changing individual screens, the safest cleanup order is:

1. Align and simplify layouts/providers.
2. Standardize route and auth handling.
3. Normalize service return shapes and error handling.
4. Clean naming and dead/legacy files.
5. Then fix feature modules one by one starting from auth, trainee dashboard, and admin CRUD screens.

## First Learning Path

To learn this codebase efficiently, read it in this order:

1. `src/app/layout.js`
2. route-group layouts in `src/app/(...)`
3. `src/middleware.js`
4. `src/utils/api.js`
5. `src/constants/urls.js`
6. one full feature slice:
   trainee training or admin trainee management
7. shared form components in `src/components/form`
8. shared shell components in `src/layouts` and `src/components/shared`

## Output Of This Scan

This document is the architecture baseline for the next phase.

The next practical step is to choose the first cleanup area and fix it end-to-end instead of patching random files. The best first target is the **layout/provider/auth structure**, because it affects the whole application and will reduce noise for every later feature fix.
