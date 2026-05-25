import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getTrackById, getCityConfig } from "@/lib/cityConfig";
import { computeScore, scoreColor } from "@/lib/scoring";

const city = getCityConfig();
const SITE_URL = city.siteUrl;

interface Props {
  params: { id: string };
}

// Pre-generate paths so Next can statically render all track pages
export function generateStaticParams() {
  return city.tracks.map((t) => ({ id: t.id }));
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Extract neighborhood/borough from tags using city-specific list */
function getBoroughFromTags(tags: string[]): string {
  for (const n of city.neighborhoods) {
    if (tags.some((t) => t.toLowerCase().includes(n.toLowerCase()))) return n;
  }
  return city.displayName;
}

/** Build a plain-English access label for meta descriptions */
function accessLabel(type: string): string {
  if (type === "open") return "open to the public";
  if (type === "closed") return "temporarily closed";
  return "conditionally open";
}

// ── Per-track metadata ────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = getTrackById(params.id);
  if (!track) return {};

  const borough = getBoroughFromTags(track.tags);
  const lanes = track.lanes ? `${track.lanes}-lane` : "";
  const surface = track.surface ?? "running";
  const access = accessLabel(track.publicAccessType);

  const title = `${track.name} — ${[lanes, surface].filter(Boolean).join(" ")} track in ${borough}`;
  const description =
    `${track.name} is a ${[lanes, surface].filter(Boolean).join(" ")} running track in ${borough}, ${city.displayName}. ` +
    `Currently ${access}. ` +
    (track.lighting === true ? "Floodlit for evening runs. " : "") +
    (track.cost === "Free" ? "Free to use. " : "") +
    `TrackScore™: ${computeScore(track).composite.toFixed(1)}/10.`;

  const url = `${SITE_URL}/track/${track.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          // ESRI satellite tile as a social preview
          url:
            `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/export` +
            `?f=image&format=png32&transparent=false&size=1200,630` +
            `&bboxSR=4326&imageSR=4326` +
            `&bbox=${track.lon - 0.006},${track.lat - 0.0033},${track.lon + 0.006},${track.lat + 0.0033}`,
          width: 1200,
          height: 630,
          alt: `Satellite view of ${track.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function TrackDetailPage({ params }: Props) {
  const track = getTrackById(params.id);
  if (!track) notFound();

  const score = computeScore(track);
  const color = scoreColor(score.composite);

  // Free ESRI World Imagery static tile — no API key required.
  // bbox: west,south,east,north (degrees). ±0.0032 lon / ±0.0018 lat ≈ 500 m wide at NYC latitudes.
  const lonD = 0.0032;
  const latD = 0.0018;
  const bbox = [
    track.lon - lonD,
    track.lat - latD,
    track.lon + lonD,
    track.lat + latD,
  ].join(",");
  const satelliteUrl =
    `https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/export` +
    `?f=image&format=png32&transparent=false&size=800,320&bboxSR=4326&imageSR=4326&bbox=${bbox}`;

  // Fact row helper
  const facts = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      label: "Surface",
      value: track.surface,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      label: "Lanes",
      value: track.lanes ? `${track.lanes} lanes` : "Unknown",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      label: "Lighting",
      value:
        track.lighting === true
          ? "Yes – floodlit"
          : track.lighting === false
          ? "No lighting"
          : "Unknown",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Hours",
      value: track.hours ?? "Always open",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      label: "Access",
      value:
        track.access === "public"
          ? "Public"
          : track.access === "permissive"
          ? "Permissive (ask)"
          : track.access === "yes"
          ? "Open"
          : track.access === "private"
          ? "Private"
          : track.access,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Cost",
      value: track.cost ?? "Free",
    },
  ];

  // ── JSON-LD structured data ─────────────────────────────────────────────────
  const borough = getBoroughFromTags(track.tags);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: track.name,
    description: track.reviewSummary,
    url: `${SITE_URL}/track/${track.id}`,
    sport: "Running",
    geo: {
      "@type": "GeoCoordinates",
      latitude: track.lat,
      longitude: track.lon,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: borough,
      addressRegion: "NY",
      addressCountry: "US",
    },
    ...(track.hours
      ? { openingHours: track.hours }
      : {}),
    ...(track.cost === "Free"
      ? { isAccessibleForFree: true }
      : {}),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Surface", value: track.surface },
      ...(track.lanes != null
        ? [{ "@type": "LocationFeatureSpecification", name: "Lanes", value: track.lanes }]
        : []),
      ...(track.lighting != null
        ? [{ "@type": "LocationFeatureSpecification", name: "Lighting", value: track.lighting }]
        : []),
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back nav */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="mx-auto max-w-[430px] px-4 h-14 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#1D9E75] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Map
          </Link>
          <span className="text-gray-200 dark:text-gray-600">/</span>
          <span className="text-sm text-gray-400 dark:text-gray-500 truncate">{track.name}</span>
        </div>
      </nav>

      <main className="mx-auto max-w-[430px] pb-16">
        {/* ── Hero: ESRI World Imagery satellite (no API key needed) ── */}
        <div className="relative w-full h-52 bg-gray-900 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={satelliteUrl}
            alt={`Satellite view of ${track.name}`}
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Track name overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h1 className="text-white font-bold text-xl leading-tight drop-shadow">
              {track.name}
            </h1>
            {track.distance != null && track.distance > 0 && (
              <p className="text-white/80 text-sm mt-0.5">
                {track.distance} mi from you
              </p>
            )}
          </div>
        </div>

        {/* ── Composite score ── */}
        <div className="bg-white dark:bg-gray-800 px-4 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black tabular-nums leading-none" style={{ color }}>
                {score.composite.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-500 font-medium mb-0.5">/ 10</span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${color}18`, color }}>
              TrackScore™
            </span>
          </div>

          {/* Factor breakdown */}
          {([
            { label: "Surface",       value: score.surface,       desc: "Quality of the running surface" },
            { label: "Accessibility", value: score.accessibility, desc: "How freely the public can use it" },
            { label: "Lanes",         value: score.lanes,         desc: "Width and capacity" },
            { label: "Lighting",      value: score.lighting,      desc: "Evening usability" },
            { label: "Community",     value: score.community,     desc: "Sentiment from runner reviews" },
          ] as const).map(({ label, value, desc }) => (
            <div key={label} className="flex items-center gap-3 py-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">{label}</span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${value * 10}%`, backgroundColor: scoreColor(value) }}
                />
              </div>
              <span className="text-sm font-bold tabular-nums text-gray-800 dark:text-gray-200 w-7 text-right">
                {value % 1 === 0 ? value : value.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block w-36">{desc}</span>
            </div>
          ))}
        </div>

        {/* ── Tags ── */}
        {track.tags.length > 0 && (
          <div className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {track.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 dark:bg-teal-900/30 text-[#1D9E75] border border-teal-100 dark:border-teal-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Public Access ── */}
        {track.publicHours && (() => {
          const type = track.publicAccessType;
          const isOpen = type === "open";
          const isClosed = type === "closed";
          // isClosed → red, isOpen → teal, conditional → amber
          const borderColor = isClosed ? "#ef4444" : isOpen ? "#1D9E75" : "#f59e0b";
          const bgColor    = isClosed ? "#fef2f2"  : isOpen ? "#f0faf6" : "#fffbeb";
          const iconColor  = isClosed ? "#ef4444" : isOpen ? "#1D9E75" : "#d97706";
          const heading    = isClosed
            ? "Temporarily Closed"
            : isOpen
            ? "Open to the Public"
            : "Restricted Public Access";

          const icon = isClosed ? (
            // X circle
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : isOpen ? (
            // Person / check
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ) : (
            // Warning triangle
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          );

          return (
            <section className="mt-2">
              <div
                className="border-l-4 px-4 py-4"
                style={{ backgroundColor: bgColor, borderColor }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5" style={{ color: iconColor }}>
                    {icon}
                  </div>
                  <div>
                    <h2
                      className="text-sm font-semibold mb-1"
                      style={{ color: iconColor }}
                    >
                      {heading}
                    </h2>
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                      {track.publicHours}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── Track facts ── */}
        <section className="bg-white dark:bg-gray-800 mt-2 px-4 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-widest">
            Track Details
          </h2>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {facts.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 py-3">
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">{icon}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 w-20 flex-shrink-0 font-medium">
                  {label}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Runner Summary ── */}
        <section className="bg-white dark:bg-gray-800 mt-2 px-4 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
            Runner Summary
          </h2>
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${color}22` }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
              {track.reviewSummary}
            </p>
          </div>
        </section>

        {/* ── OSM attribution ── */}
        {track.osmId && (
          <div className="px-4 py-3 bg-white dark:bg-gray-800 mt-2 border-b border-gray-100 dark:border-gray-700">
            <a
              href={`https://www.openstreetmap.org/${track.osmType}/${track.osmId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-[#1D9E75] flex items-center gap-1 transition-colors"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              View on OpenStreetMap
            </a>
          </div>
        )}

        {/* ── Suggest an edit banner ── */}
        <div className="mx-4 mt-4 mb-4 rounded-xl border border-[#1D9E75]/25 bg-[#f0faf6] p-4">
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#1D9E75" }}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">
                Something wrong or missing?
              </p>
              <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                Help keep TrackFinderNYC accurate — suggest updated hours, surface
                info, or anything else you notice.
              </p>
              <a
                href={`mailto:w.silverstein@bowdoin.edu?subject=${encodeURIComponent(`Track edit suggestion: ${track.name}`)}&body=${encodeURIComponent(`Hi TrackFinderNYC,\n\nI'd like to suggest an edit for: ${track.name}\n\n--- What's wrong or missing? ---\n\n\n--- Suggested correction ---\n\n\n--- Source (if any) ---\n\n\nThanks!`)}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D9E75] hover:underline"
              >
                Suggest an edit
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
