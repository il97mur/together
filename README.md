# Together

A live wireframe globe — every open tab becomes a point of light, in real time.

## Structure

- `web/` — static frontend (plain HTML/CSS/JS, no build step). Deploy to Vercel with
  **Root Directory** set to `web`.
- `supabase/schema.sql` — the one table (`globe_stats`) that persists the highest
  concurrent-visitor count ever seen (the "record"). Presence itself (who's
  currently connected) never touches the database — it's handled entirely by
  [Supabase Realtime](https://supabase.com/realtime) in memory.

## Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `supabase/schema.sql`.
3. Go to **Project Settings → API** and copy the **Project URL** and the
   **anon public key**.
4. Paste them into `web/index.html`, near the top of the script
   (`SUPABASE_URL` and `SUPABASE_ANON_KEY`).

That's it — there's no separate realtime server to run or deploy. Supabase is
fully hosted, so the same `web/index.html` works identically whether you open
it straight from disk (`file://`), serve it locally, or deploy it.

## Deploying

Push to GitHub, import the repo in Vercel, set the project's Root Directory to
`web`, and deploy. Point your subdomain (e.g. `together.murzalev-labs.ru`) at
the Vercel project.
