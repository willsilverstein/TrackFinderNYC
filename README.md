# TrackFinder

Discover public running tracks near you — powered by OpenStreetMap data, displayed on a Leaflet map.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Map | Leaflet + react-leaflet (OpenStreetMap tiles) |
| Track data | Overpass API (live) + mock fallback |
| Database | Supabase (coming next step) |
| Satellite imagery | Mapbox Static API |

## Getting started

```bash
cd trackfinder
npm install
cp .env.local.example .env.local   # fill in tokens (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` → `.env.local`:

| Variable | Where to get it | Required? |
|---|---|---|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | [account.mapbox.com](https://account.mapbox.com) | Optional (satellite hero) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings | Next step |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings | Next step |

## Pages

### `/` — Map homepage
- Requests browser geolocation
- Queries the Overpass API for `leisure=track` within 5 km
- Falls back to mock NYC tracks if location is denied or Overpass times out
- Leaflet map with green pins + sidebar list showing name, distance, surface, rating

### `/track/[id]` — Track detail
- Mapbox satellite hero (placeholder if token not set)
- Track facts: surface, lanes, lighting, hours, access, cost
- Tag pills
- Reviews (mocked; Supabase wiring coming next)
- "Suggest an edit" banner

## Next steps (Supabase wiring)
1. Create a `tracks` table mirroring `lib/types.ts`
2. Create a `reviews` table
3. Replace `MOCK_TRACKS` in `app/page.tsx` with a Supabase query
4. Replace `getReviewsForTrack` in the detail page with a Supabase query
5. Wire up "Write a review" and "Suggest an edit" to insert rows

## License
MIT
