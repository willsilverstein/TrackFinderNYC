export interface Track {
  id: string;
  name: string;
  lat: number;
  lon: number;
  distance?: number; // km from user
  rating: number;       // 0–5, kept for composite scoring only — not displayed
  reviewCount: number;  // kept for data purposes — not displayed
  reviewSummary: string; // AI-generated summary shown in place of individual reviews
  surface: string;
  lanes: number | null;
  lighting: boolean | null;
  hours: string | null;
  publicHours: string | null;         // When/how the track is open to the general public
  publicAccessType: "open" | "conditional" | "closed"; // open = drop-in anytime; conditional = restricted/paid/event-only; closed = temporarily shut
  access: string; // "public" | "permissive" | "yes" | "private"
  cost: string | null;
  tags: string[];
  osmId?: number;
  osmType?: "node" | "way" | "relation";
}

export interface Review {
  id: string;
  trackId: string;
  author: string;
  avatarInitials: string;
  rating: number;
  date: string;
  body: string;
}
