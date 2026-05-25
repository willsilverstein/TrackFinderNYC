# Deploying the city-picker landing page at trackfindernyc.com

The landing page shows a city selector (NYC + Boston cards) and links out to each city's dedicated subdomain. It's a third Vercel project from the same repo.

---

## How it works

`NEXT_PUBLIC_CITY` controls what each deployment renders:

| Env var value | What renders | Domain |
|---|---|---|
| `landing` | City-picker welcome screen | `trackfindernyc.com` |
| `nyc` | NYC track map | `www.trackfindernyc.com` |
| `boston` | Boston track map | `boston.trackfindernyc.com` |

---

## Step 1 — Create a new Vercel project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the **same GitHub repo** (same one used for NYC and Boston)
3. Name it `trackfinder-landing` (or similar)
4. Before deploying, add the environment variable:
   - **Key:** `NEXT_PUBLIC_CITY`
   - **Value:** `landing`
   - Apply to: Production, Preview, Development
5. Click **Deploy**

---

## Step 2 — Add the root domain

1. Go to the new project → Settings → Domains
2. Add `trackfindernyc.com` (no www)
3. Vercel will prompt you to add a DNS record:
   - **Type:** A
   - **Name:** @ (root)
   - **Value:** `76.76.21.21` (Vercel's IP — verify in your Vercel dashboard)
4. Add it at your DNS provider
5. Wait a couple minutes — SSL auto-provisions

> **Note:** If `trackfindernyc.com` is currently set as a redirect-to-www alias on the NYC project, remove it from there first before adding it to this new project. The Vercel domain settings page will tell you if there's a conflict.

---

## Step 3 — Verify

Visit `https://trackfindernyc.com` — you should see:
- The TrackFinder logo and headline
- Two city cards: **New York City** and **Boston**
- Clicking NYC → `www.trackfindernyc.com`
- Clicking Boston → `boston.trackfindernyc.com`

---

## Adding a new city later

1. Add a new entry to `CITY_CONFIGS` in `lib/cityConfig.ts`
2. Create `lib/{city}MockData.ts`
3. Add a card to `CITIES` array in `components/LandingPage.tsx`
4. Deploy a new Vercel project with `NEXT_PUBLIC_CITY={city}` and a new subdomain
