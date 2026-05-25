# Deploying boston.trackfindernyc.com on Vercel

The app is now city-agnostic. One codebase, two Vercel projects, one env var difference.

---

## Step 1 — Confirm the NYC project is still working

Your existing Vercel project for `www.trackfindernyc.com` should have:

- **Environment variable:** `NEXT_PUBLIC_CITY` = `nyc`
- If this variable is missing, add it now (it defaults to `nyc` in code, but explicit is better)

Go to: Vercel → your NYC project → Settings → Environment Variables → add `NEXT_PUBLIC_CITY` = `nyc`

Redeploy once to pick it up.

---

## Step 2 — Create a new Vercel project for Boston

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the **same GitHub repo** you use for TrackFinderNYC
3. Name the project something like `trackfinder-boston`
4. Before deploying, add an environment variable:
   - **Key:** `NEXT_PUBLIC_CITY`
   - **Value:** `boston`
   - Apply to: Production, Preview, Development
5. Click **Deploy**

---

## Step 3 — Add the custom domain

Once the Boston project is deployed:

1. Go to the Boston Vercel project → Settings → Domains
2. Add `boston.trackfindernyc.com`
3. Vercel will show you a DNS record to add — it will be a CNAME:
   - **Name:** `boston`
   - **Value:** `cname.vercel-dns.com`
4. Go to wherever your domain DNS is managed (Namecheap, GoDaddy, Cloudflare, etc.)
5. Add that CNAME record
6. Wait a few minutes — Vercel auto-provisions the SSL certificate

---

## Step 4 — Verify it works

Visit `https://boston.trackfindernyc.com` — you should see:
- Map centered on Boston (not NYC)
- 9 Boston tracks in the sidebar
- Page title: "TrackFinderBoston – Find Public Running Tracks in Boston"

---

## How the city switching works (for reference)

`lib/cityConfig.ts` reads `process.env.NEXT_PUBLIC_CITY` at build time.
- `NEXT_PUBLIC_CITY=nyc` → loads NYC tracks, NYC metadata, NYC map center
- `NEXT_PUBLIC_CITY=boston` → loads Boston tracks, Boston metadata, Boston map center

To add a new city later: add a new entry to `CITY_CONFIGS` in `cityConfig.ts`, create a `{city}MockData.ts`, and deploy a third Vercel project with the new env var.
