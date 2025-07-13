# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm test` - Run tests with Vitest
- `pnpm lint` - Run ESLint (note: configured to run on "lint" directory, not source files)
- `pnpm lint:fix` - Run ESLint with auto-fix

## Project Architecture

This is a Next.js 12 homepage/blog built with:

- **Framework**: Next.js 12.3.4 with React 18
- **Styling**: Tailwind CSS + shadcn/ui components
- **Content**: GitHub Issues as blog posts (fetched via GraphQL API)
- **Package Manager**: pnpm
- **Testing**: Vitest
- **Linting**: ESLint with @aiou/eslint-config

### Key Components

- **UI Components**: Uses shadcn/ui components for consistent design system
  - `components/ui/typography.tsx` - Text and heading components
  - `components/ui/link.tsx` - Link component with animation support
  - `components/ui/card.tsx` - Card component for layouts
  - `components/ui/separator.tsx` - Visual separators
  - `components/ui/toc.tsx` - Table of contents component
- **GitHub Integration**: `lib/github.ts` provides GraphQL client for fetching issues as blog content
- **3D Effects**: Atropos library for 3D card/banner effects on homepage
- **Path Aliases**: `~/` maps to project root (configured in tsconfig.json)

### Content Strategy

The site uses GitHub Issues as a CMS:
- Issues with `issues` label are published blog posts
- Issues with `issues-dev` label are development content
- Content is fetched server-side via GitHub GraphQL API
- Requires `GITHUB_TOKEN` environment variable

### Build Configuration

- **SVG Handling**: SVGs are processed via @svgr/webpack
- **Image Optimization**: Configured for specific domains including GitHub
- **Environment Variables**: Runtime environment detection for Vercel deployment
- **Webpack**: Custom alias configuration for React in development

### Page Structure

- `/` - Homepage with 3D banner and introduction
- `/issues` - Blog listing page
- `/issues/id/[id]` - Individual blog post pages
- `/projects` - Projects showcase
- `/readlist` - Reading list

### Styling Architecture

- **shadcn/ui**: Component library built on Radix UI + Tailwind CSS
- **CSS Variables**: Dark/light theme support via CSS custom properties
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Global Styles**: Located in `styles/` directory
- **Component System**: 
  - `lib/utils.ts` - Contains `cn()` utility for conditional classes
  - `components.json` - shadcn/ui configuration
  - Custom CSS for specific components (Atropos, NProgress, prose)

### API Routes

- `/api/readlist` - Readlist data endpoint
- `/api/revalidate` - ISR revalidation endpoint