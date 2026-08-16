# be-side

be-side is a private, comforting mood diary and self-reflection app built to feel like a calm digital safe space.

Tagline: "Be kind to yourself. You're not alone."

This repo is intentionally kept in a lowercase `be-side` project folder.

## 1. Install Node.js

Install Node.js 18 or newer.

## 2. Install dependencies

```bash
npm install
```

## 3. Create a Supabase project

- Create a new Supabase project in the Supabase dashboard.
- Keep the project URL and anon key ready.

## 4. Create your local environment file

Create a `.env.local` file in the project root with the values below:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Example values can be copied from your Supabase project settings.

## 5. Run your database migrations

Set up tables for:

- profiles
- check_ins
- journal_entries
- comfort_items
- partner_connections
- shared_status
- user_preferences

Enable Row Level Security and restrict access to authenticated users and explicit shared data.

## 6. Start the app

```bash
npm run dev
```

## 7. Build for production

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Notes

- This app is intentionally not a medical dashboard.
- It is built for gentle reflection, private journaling, and emotional support.
- The app is mobile-first, installable as a PWA, and designed to feel warm and safe.
