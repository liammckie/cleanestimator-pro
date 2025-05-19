# Agent Instructions

This project is a Vite + React + TypeScript application styled with Tailwind and shadcn-ui. Follow these guidelines whenever you modify the repository.

## Setup

1. Run `npm i` before testing or building.
2. Use `npm run dev` for the development server.
3. Check linting with `npm run lint` and build the project using `npm run build`.

## Style

- Follow the formatting rules defined in `.prettierrc` (2-space indents, single quotes, trailing commas where valid, 100 character line width).
- Ensure UI components follow the Spotify-inspired green color theme defined in `tailwind.config.ts` and `src/index.css`.
- Avoid purple box shadows; use a green shade like `rgba(29,185,84,0.5)` instead.

## Navigation

- Keep tab order in `src/components/layout/MainContent.tsx` aligned with the array in `src/components/navigation/MenuOptions.ts`.
- Sidebar items in `src/pages/Index.tsx` should mirror the same order and include all options.

## Cleanup Tasks

- Remove obsolete or duplicate files (e.g., the unused `src/components/task/TaskContext.tsx` or stray HTML/CSS duplicates under `src/`).
- Ensure no unused components or services remain. Verify imports to confirm which files are active.
- Fix missing exports or typos (e.g., `insertTask` in `src/integrations/supabase/taskService.ts`).

## General Guidance

- Keep commits focused and well-described.
- After each change, run `npm run lint` and `npm run build` to verify the project still compiles.
- Document any placeholders or TODOs added to the codebase in the PR summary.

