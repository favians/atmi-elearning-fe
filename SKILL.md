---
name: responsive-guardrails
description: Use when improving responsiveness in this frontend, especially for phone/mobile-only fixes where desktop layout must remain unchanged unless the user explicitly asks for desktop changes.
---

# Responsive Guardrails

Apply this skill when editing UI responsiveness in this repository.

## Core Rule

Default to **mobile-only fixes**.

Do not change desktop or tablet behavior unless the user explicitly asks for it.

## What We Learned

1. Global responsive changes are risky.
   Avoid changing shared breakpoint behavior, Tailwind screen config, or global layout rules to solve one page problem.

2. CSS hiding is not enough when two render paths exist.
   If mobile uses a different UI structure than desktop, render only one path at a time when possible.

3. Match fixes to the actual screenshot, not assumptions.
   If the user provides a screenshot, inspect it first and identify the real container/layout bug before editing.

4. Keep desktop structure intact.
   When touching a section, preserve the original desktop markup and spacing as much as possible.

5. Prefer scoped overrides.
   Use local classes such as `max-[667px]:...` or section-level mobile variants instead of global changes.

6. Some layout bugs are actually component-mode bugs.
   If desktop and mobile use different controls, define a clear render split instead of relying only on CSS visibility.

## Workflow

1. Inspect the specific component first.
2. Identify whether the issue is:
   - container width
   - render duplication
   - overflow/scroll behavior
   - image fit/crop
   - spacing/alignment
3. Preserve the current desktop layout.
4. Apply mobile-only overrides first.
5. Recheck the exact affected route after the edit.
6. If a screenshot is provided, compare the fix against that screenshot symptom specifically.

## Repository-Specific Rules

### For home page work

- Fix one section at a time.
- Do not batch unrelated responsive edits into the same pass.
- If a desktop regression appears, revert that section before continuing.

### For `Topics`

- Phone mode may use a different control than desktop.
- If mobile uses dropdown/select, desktop should keep the tab layout unless requested otherwise.
- If cards appear duplicated, check whether both desktop and mobile render paths are mounted.
- If cards appear too narrow, inspect the width of the parent tab/panel/container before changing card widths.
- If tab/panel content collapses on either desktop or mobile, inspect the width of `Tabs`, `base`, `panel`, and `tabList` before changing card internals.

### For `About`

- Preserve the desktop hero composition unless the user explicitly asks for redesign.
- If a banner image disappears, verify the image source path/config first, not only the responsive classes.
- For phone mode, prefer stacking content and shrinking padding before changing typography scale aggressively.

### For media/content cards

- Use fixed thumbnail frames with `object-cover` when the image should crop to fill.
- If content looks too narrow, inspect the parent container before changing image or text sizes.

### For navbar search and search-result UX

- If the user wants a full result browsing experience, prefer redirecting to a dedicated search page instead of rendering inline navbar dropdown results.
- Keep the navbar search input as the entrypoint, but move result rendering into a normal page layout that matches the rest of the public site.
- On search result pages, only show the result count/title when real results exist.
- If the empty state has its own visual design, do not keep leftover result headings above it.
- Empty states should use local assets when a specific illustration is requested, rather than generic text-only boxes.
- Small spacing requests in search/empty states should be handled on the exact wrapper around the illustration/content, not by changing the entire page section padding unless the user asks for that.

### For hero/banner sections

- If the user asks to hide media on phone, keep desktop as-is and hide only the media container on mobile.
- Preserve original desktop spacing and headline structure unless explicitly asked to redesign it.

## Do Not Do

- Do not change Tailwind global screens to fix one page.
- Do not assume a mobile bug is caused by breakpoints before checking the component structure.
- Do not leave both mobile and desktop variants rendering at the same time if that duplicates content.
- Do not silently redesign desktop while fixing phone.

## Good Patterns

- `max-[667px]:hidden` for phone-only hiding
- `max-[667px]:w-full` for phone width fixes
- full-width mobile panels when desktop tabs shrink content unexpectedly
- isolated helper components when phone and desktop share the same content data
- phone-only dropdown/select replacing wide desktop tab rows
- fixed-height thumbnail frames with `object-cover` for uneven training cover images
- navbar search redirecting to `/search?q=...` instead of maintaining a complex inline result dropdown
- dedicated illustrated empty states that replace result headings when no data is found

## Validation

After each responsive edit:

1. Confirm the route recompiles.
2. Verify the fix only affects the requested viewport.
3. If the user says desktop changed, revert the desktop-facing change first.
4. If content appears duplicated, verify render branches before changing spacing or width again.
