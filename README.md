# Together

A live wireframe globe — every open tab becomes a point of light, in real time.

## Structure

- `web/` — static frontend (plain HTML/CSS/JS, no build step). Deploy to Vercel with
  **Root Directory** set to `web`.
- `party/` — [PartyKit](https://www.partykit.io/) realtime server: tracks who's
  currently connected (presence) and the highest concurrent-visitor count ever seen
  (record), persisted in room storage.

## Local development

```bash
cd party
npm install
npm run dev       # starts PartyKit on ws://localhost:1999
```

Then open `web/index.html` directly in a browser (or serve it with any static
file server). It automatically connects to `ws://localhost:1999` when running
on `localhost`.

## Deploying

**Party (realtime server):**

```bash
cd party
npx partykit deploy
```

First run opens a browser to log in and provisions a host like
`together.<your-partykit-user>.partykit.dev`. If the assigned host differs from
`together.il97mur.partykit.dev`, update `PARTY_HOST` near the top of
`web/index.html`.

**Web (frontend):**

Push to GitHub, import the repo in Vercel, set the project's Root Directory to
`web`, and deploy. Point your subdomain (e.g. `together.murzalev-labs.ru`) at
the Vercel project.
