# 2026-05-09 Summary

## Scope

This summary captures the frontend changes made during the current working session.

## Architecture and platform changes

- Added and updated repository documentation in `Architecture.md` and `SKILL.md`.
- Changed the dev script in `package.json` from `next dev --turbo` to `next dev`.
- Stabilized local development by clearing `.next` and restarting the dev server when corrupted chunk/runtime states appeared.

## Public site changes

### Navbar and search

- Removed the old inline navbar search result behavior.
- Navbar search now redirects to `/search?q=...`.
- Added a dedicated `/search` page under `src/app/(home)/search/page.js`.
- Added an illustrated empty state for `/search` using `src/assets/images/illustration/searc_not_found.webp`.
- Removed the result heading/subtitle from the empty state.

### Home page

- Hid the hero carousel on phone/mobile only.
- Reworked the `Topics` mobile behavior to use a dropdown instead of tabs.
- Fixed duplicated topic-card rendering by separating phone and desktop render paths.
- Adjusted topic-card image cropping and layout behavior.

### About page

- Applied mobile-only responsive fixes to the About page sections.
- Restored the desktop hero image and kept it hidden on phone where requested.
- Updated the desktop hero image source to the provided external training image.

### Category page

- Applied mobile-only responsive changes to category detail sections.
- Hid the `Bagaimana cara bergabung di kelas live ini?` section on phone.

### Footer

- Reworked footer stacking behavior for phone.
- Confirmed the footer implementation is centralized in `src/layouts/footer.js`.

## Authentication changes

- Updated login and login-admin mobile views to keep the blue background, logo, and welcome content.
- Changed mobile login text and input colors to white for contrast.
- Fixed user login redirect to go directly to `/dashboard/training`.

## Dashboard and trainee training changes

### Dashboard shell

- Adjusted `src/layouts/dashboard-layout.js`.
- Reworked the shared dashboard sidebar and navbar behavior for phone.
- Added a phone-only burger trigger in `src/components/shared/navbar/navbar.js`.
- Converted the trainee sidebar into an off-canvas mobile menu while preserving the fixed desktop sidebar.
- Fixed a desktop layout regression where the sidebar stopped being fixed and created a large empty left gap.

### Dashboard top bar

- Tightened the right-side user area in the dashboard navbar on phone.
- Hid full user text on phone and kept avatar/chevron only.

### Training list page

- Applied responsive fixes to `/dashboard/training`.
- Tightened tabs, alert, and section padding on phone.
- Switched the training list rendering away from a stretch-style grid toward a wrapping layout.
- Set the training card to fixed-width behavior.

### Training card

Current card direction:

- fixed width: `288px`
- content-driven height
- image thumbnail size: `288px x 131px`
- green CTA button fills the card width

During the session, the training card went through several iterations:

- fixed card height
- taller image area
- progress/button pinning
- spacing rollback after screenshot review
- final move toward fixed width with natural height

### Training detail and review

- Removed phone-only desktop offsets in `training-content.js` and `training-review.js`.
- Adjusted detail/review layouts to stack more cleanly on phone.

## Build and runtime findings

### Fixed

- Wrapped `useSearchParams()` usage with `Suspense` where needed for App Router prerender compatibility.
- Replaced `next/font/google` usage in `src/config/fonts.js` with local system font stacks to avoid network-dependent production builds.

### Still present in the repo

- ESLint config references `@typescript-eslint/parser`, but that package is not installed.
- Build still reports unrelated admin-route issues in some runs.
- Some admin pages still show route/build inconsistencies unrelated to the responsive work.

## Key files touched in this session

- `package.json`
- `Architecture.md`
- `SKILL.md`
- `src/components/navbar.js`
- `src/app/(home)/search/page.js`
- `src/hooks/home/useSearchTraining.js`
- `src/config/fonts.js`
- `src/constants/route-names.js`
- `src/layouts/dashboard-layout.js`
- `src/components/shared/navbar/navbar.js`
- `src/components/shared/navbar/user-dropdown.js`
- `src/components/shared/sidebar/sidebar.js`
- `src/app/(trainee)/dashboard/training/page.js`
- `src/components/pages/dashboard/training/card-training.js`
- `src/components/pages/dashboard/training/sidebar-training.js`
- `src/components/pages/dashboard/training/training-content.js`
- `src/components/pages/dashboard/training/training-review.js`

## Working rules reinforced

- Fix one section at a time.
- Preserve desktop unless explicitly asked to change it.
- Use screenshots to validate the real bug before changing layout logic.
- Treat shell/layout bugs separately from card/component bugs.
- If dev runtime errors look unrelated to the latest code, verify `.next` corruption before over-editing components.
