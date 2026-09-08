export type EventType =
  | "Flood"
  | "Cyclone"
  | "Heavy Rain"
  | "Heat Wave"
  | "Earthquake"
  | "Lightning"
  | "Thunderstorm"
  | "Fire";

export type Severity = "Critical" | "High" | "Medium" | "Low";
export type Verification = "Verified" | "Pending" | "Rejected";
export type Source = "Twitter" | "Citizen" | "IMD" | "News" | "Satellite";

export const EVENT_TYPES: EventType[] = [
  "Flood",
  "Cyclone",
  "Heavy Rain",
  "Heat Wave",
  "Earthquake",
  "Lightning",
  "Thunderstorm",
  "Fire",
];

export const SEVERITIES: Severity[] = ["Critical", "High", "Medium", "Low"];
export const SOURCES: Source[] = ["Twitter", "Citizen", "IMD", "News", "Satellite"];

export const STATES = [
  "Maharashtra",
  "Tamil Nadu",
  "Delhi",
  "West Bengal",
  "Rajasthan",
  "Karnataka",
  "Kerala",
  "Gujarat",
  "Uttar Pradesh",
  "Andhra Pradesh",
];

export const CITIES: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
  Rajasthan: ["Jaipur", "Jodhpur", "Bikaner"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
  Gujarat: ["Ahmedabad", "Surat", "Rajkot"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati"],
};

export const eventColor: Record<EventType, string> = {
  Flood: "var(--sev-cyan)",
  Cyclone: "var(--sev-indigo)",
  "Heavy Rain": "var(--sev-emerald)",
  "Heat Wave": "var(--sev-amber)",
  Earthquake: "var(--sev-orange)",
  Lightning: "var(--sev-yellow)",
  Thunderstorm: "var(--sev-indigo)",
  Fire: "var(--sev-coral)",
};

export const severityColor: Record<Severity, string> = {
  Critical: "var(--sev-coral)",
  High: "var(--sev-orange)",
  Medium: "var(--sev-amber)",
  Low: "var(--sev-emerald)",
};

// deterministic pseudo random so SSR + client match
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export interface Report {
  id: string;
  timestamp: string;
  date: Date;
  event: EventType;
  city: string;
  state: string;
  severity: Severity;
  source: Source;
  verification: Verification;
  coords: string;
  media: boolean;
  text: string;
  reporter: string;
}

const SNIPPETS = [
  "Water level rising rapidly near the main junction, traffic diverted.",
  "Strong winds uprooting trees along the coastal road, avoid the area.",
  "Continuous downpour for the past four hours, drains overflowing.",
  "Temperature crossed 46C, several heat exhaustion cases reported.",
  "Tremors felt for about 8 seconds, residents evacuated buildings.",
  "Lightning strike damaged a transformer, area without power.",
  "Hailstorm damaged standing crops across nearby villages.",
  "Dry grass fire spreading near the industrial belt, fire tenders on site.",
  "Underpass fully submerged, local trains delayed by 25 minutes.",
  "Fishermen advised not to venture into the sea for next 48 hours.",
];

const pick = <T,>(arr: readonly T[], v: number): T => arr[Math.floor(v * arr.length)] as T;

export const REPORTS: Report[] = (() => {
  const r = rng(20260908);
  const out: Report[] = [];
  for (let i = 0; i < 50; i++) {
    const state = pick(STATES, r());
    const cityList = CITIES[state] as string[];
    const city = pick(cityList, r());
    const event = pick(EVENT_TYPES, r());
    const severity = pick(SEVERITIES, r());
    const source = pick(SOURCES, r());
    const vRoll = r();
    const verification: Verification =
      vRoll > 0.45 ? "Verified" : vRoll > 0.15 ? "Pending" : "Rejected";
    const day = 1 + Math.floor(r() * 8);
    const hour = Math.floor(r() * 24);
    const min = Math.floor(r() * 60);
    const date = new Date(Date.UTC(2026, 8, day, hour, min));
    out.push({
      id: `VD-${(10240 + i * 7).toString()}`,
      date,
      timestamp: `${date.toISOString().slice(0, 10)} ${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`,
      event,
      city,
      state,
      severity,
      source,
      verification,
      coords: `${(8 + r() * 24).toFixed(4)}, ${(69 + r() * 20).toFixed(4)}`,
      media: r() > 0.5,
      text: pick(SNIPPETS, r()),
      reporter: `Citizen_${state.slice(0, 2).toUpperCase()}_${1000 + Math.floor(r() * 8999)}`,
    });
  }
  return out;
})();

export interface FeedItem {
  id: number;
  minsAgo: number;
  initials: string;
  color: string;
  city: string;
  state: string;
  event: EventType;
  verified: boolean;
  text: string;
  source: Source;
}

export const FEED: FeedItem[] = (() => {
  const r = rng(770077);
  const avatarColors = [
    "var(--sev-cyan)",
    "var(--sev-amber)",
    "var(--sev-coral)",
    "var(--sev-emerald)",
    "var(--sev-indigo)",
  ];
  const names = [
    "AR",
    "SK",
    "PM",
    "NV",
    "RJ",
    "DK",
    "MG",
    "TS",
    "VB",
    "AK",
    "HS",
    "LN",
    "BM",
    "GP",
    "JS",
    "KC",
    "RS",
    "UD",
  ];
  return names.map((initials, i) => {
    const state = pick(STATES, r());
    const city = pick(CITIES[state] as string[], r());
    return {
      id: i,
      minsAgo: 2 + i * 3 + Math.floor(r() * 3),
      initials,
      color: pick(avatarColors, (i % avatarColors.length) / avatarColors.length),
      city,
      state,
      event: pick(EVENT_TYPES, r()),
      verified: r() > 0.4,
      text: pick(SNIPPETS, r()),
      source: pick(SOURCES, r()),
    };
  });
})();

export const CITY_EVENTS = [
  {
    city: "Mumbai",
    state: "Maharashtra",
    event: "Flood",
    severity: "Severe",
    color: "var(--sev-coral)",
    reports: 2418,
    updated: "1 min ago",
    x: 131,
    y: 419,
    pulse: true,
    temp: 31,
    rain: 214,
    icon: "rain",
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    event: "Cyclone Warning",
    severity: "Warning",
    color: "var(--sev-orange)",
    reports: 1876,
    updated: "3 min ago",
    x: 240,
    y: 528,
    pulse: true,
    temp: 34,
    rain: 168,
    icon: "storm",
  },
  {
    city: "Delhi",
    state: "Delhi",
    event: "Heat Wave",
    severity: "Warning",
    color: "var(--sev-amber)",
    reports: 1490,
    updated: "6 min ago",
    x: 195,
    y: 244,
    pulse: true,
    temp: 44,
    rain: 4,
    icon: "sun",
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    event: "Heavy Rain",
    severity: "Watch",
    color: "var(--sev-yellow)",
    reports: 1105,
    updated: "8 min ago",
    x: 359,
    y: 354,
    pulse: true,
    temp: 29,
    rain: 142,
    icon: "rain",
  },
  {
    city: "Jaipur",
    state: "Rajasthan",
    event: "Normal",
    severity: "Safe",
    color: "var(--sev-emerald)",
    reports: 212,
    updated: "12 min ago",
    x: 174,
    y: 275,
    pulse: false,
    temp: 38,
    rain: 12,
    icon: "sun",
  },
  {
    city: "Bangalore",
    state: "Karnataka",
    event: "Thunderstorm",
    severity: "Warning",
    color: "var(--sev-orange)",
    reports: 934,
    updated: "14 min ago",
    x: 201,
    y: 530,
    pulse: true,
    temp: 26,
    rain: 88,
    icon: "storm",
  },
];

export const DONUT = [
  { name: "Flood", value: 34, color: "var(--sev-cyan)" },
  { name: "Heavy Rain", value: 22, color: "var(--sev-emerald)" },
  { name: "Cyclone", value: 18, color: "var(--sev-indigo)" },
  { name: "Heat Wave", value: 12, color: "var(--sev-amber)" },
  { name: "Earthquake", value: 8, color: "var(--sev-orange)" },
  { name: "Fire", value: 6, color: "var(--sev-coral)" },
];

export const HOURLY = (() => {
  const r = rng(4242);
  return Array.from({ length: 24 }, (_, h) => ({
    hour: `${String(h).padStart(2, "0")}:00`,
    value:
      h === 18
        ? 1840
        : Math.round(380 + 620 * Math.sin((h / 24) * Math.PI * 1.4) + r() * 220),
  }));
})();

export const SPARK = (seed: number) => {
  const r = rng(seed);
  return Array.from({ length: 24 }, (_, i) => ({ i, v: 20 + r() * 60 }));
};

export const TREND_30D = (() => {
  const r = rng(9001);
  return Array.from({ length: 30 }, (_, i) => ({
    day: `Aug ${i + 10 > 31 ? i - 21 : i + 10}`,
    label: `D${i + 1}`,
    Flood: Math.round(40 + 60 * Math.abs(Math.sin(i / 4)) + r() * 20),
    Cyclone: Math.round(10 + 40 * Math.abs(Math.cos(i / 6)) + r() * 12),
    "Heavy Rain": Math.round(30 + 50 * Math.abs(Math.sin(i / 5 + 1)) + r() * 18),
    "Heat Wave": Math.round(15 + 35 * Math.abs(Math.cos(i / 3)) + r() * 10),
    Thunderstorm: Math.round(12 + 30 * Math.abs(Math.sin(i / 7)) + r() * 10),
  }));
})();

export const HEATMAP_EVENTS: EventType[] = [
  "Flood",
  "Cyclone",
  "Heavy Rain",
  "Heat Wave",
  "Earthquake",
  "Fire",
];

export const HEATMAP = (() => {
  const r = rng(31337);
  return STATES.map((state) => ({
    state,
    cells: HEATMAP_EVENTS.map((e) => ({ event: e, value: Math.round(r() * 100) })),
  }));
})();

export const SOURCE_RELIABILITY = [
  { source: "IMD API", score: 98, color: "var(--sev-cyan)" },
  { source: "Satellite", score: 95, color: "var(--sev-emerald)" },
  { source: "News", score: 78, color: "var(--sev-indigo)" },
  { source: "Citizen App", score: 72, color: "var(--sev-amber)" },
  { source: "Twitter", score: 61, color: "var(--sev-coral)" },
];

export const HASHTAGS = [
  { tag: "#IMDAlert", count: 48210, up: true },
  { tag: "#MumbaiRains", count: 39184, up: true },
  { tag: "#CycloneWarning", count: 27430, up: true },
  { tag: "#FloodRelief", count: 19822, up: false },
  { tag: "#ChennaiWeather", count: 15390, up: true },
  { tag: "#WeatherIndia", count: 12044, up: true },
  { tag: "#HeatWave", count: 10877, up: false },
  { tag: "#RainAlert", count: 9421, up: true },
  { tag: "#NDRF", count: 7318, up: true },
  { tag: "#StormUpdate", count: 6120, up: false },
];

export const WORD_CLOUD = [
  { w: "flood", s: 44 },
  { w: "waterlogging", s: 28 },
  { w: "IMD", s: 36 },
  { w: "rescue", s: 22 },
  { w: "cyclone", s: 40 },
  { w: "alert", s: 30 },
  { w: "rainfall", s: 34 },
  { w: "NDRF", s: 20 },
  { w: "evacuation", s: 24 },
  { w: "traffic", s: 18 },
  { w: "power cut", s: 16 },
  { w: "heatwave", s: 32 },
  { w: "landslide", s: 21 },
  { w: "warning", s: 26 },
  { w: "relief camp", s: 19 },
];

export const PREDICTIONS = [
  {
    title: "Flood Risk — Mumbai",
    confidence: 87,
    level: "High",
    window: "next 48h",
    color: "var(--sev-orange)",
  },
  {
    title: "Cyclone Landfall — AP Coast",
    confidence: 73,
    level: "Medium",
    window: "next 72h",
    color: "var(--sev-amber)",
  },
  {
    title: "Heat Wave — Rajasthan",
    confidence: 92,
    level: "Critical",
    window: "next 24h",
    color: "var(--sev-coral)",
  },
];

export type Platform = "Twitter" | "Facebook" | "Instagram" | "News";

export interface Post {
  id: number;
  name: string;
  handle: string;
  platform: Platform;
  time: string;
  text: string;
  tags: string[];
  media: boolean;
  gradient: string;
  likes: number;
  retweets: number;
  replies: number;
  status: "verified" | "pending" | "flagged";
  thread?: number;
}

export const POSTS: Post[] = [
  {
    id: 1,
    name: "Ananya Rao",
    handle: "@ananya_blr",
    platform: "Twitter",
    time: "2m",
    text: "Andheri subway completely submerged again. Third time this week. #MumbaiRains #IMDAlert",
    tags: ["#MumbaiRains", "#IMDAlert"],
    media: true,
    gradient: "linear-gradient(135deg,#06B6D4,#1E3A8A)",
    likes: 1284,
    retweets: 412,
    replies: 63,
    status: "verified",
    thread: 3,
  },
  {
    id: 2,
    name: "Chennai Live",
    handle: "@chennailive",
    platform: "News",
    time: "9m",
    text: "IMD issues orange alert for coastal districts as depression intensifies. #CycloneWarning",
    tags: ["#CycloneWarning"],
    media: false,
    gradient: "linear-gradient(135deg,#F59E0B,#B91C1C)",
    likes: 902,
    retweets: 611,
    replies: 88,
    status: "verified",
  },
  {
    id: 3,
    name: "Rohit Verma",
    handle: "@rohitv_delhi",
    platform: "Twitter",
    time: "14m",
    text: "46.2C in Najafgarh today. Streets empty by noon. #HeatWave #WeatherIndia",
    tags: ["#HeatWave", "#WeatherIndia"],
    media: true,
    gradient: "linear-gradient(135deg,#F59E0B,#EF4444)",
    likes: 640,
    retweets: 210,
    replies: 41,
    status: "pending",
  },
  {
    id: 4,
    name: "Kolkata Weather Watch",
    handle: "@kolwx",
    platform: "Facebook",
    time: "21m",
    text: "Salt Lake sector V reporting 92mm rainfall in 3 hours. Avoid EM Bypass. #FloodAlert",
    tags: ["#FloodAlert"],
    media: true,
    gradient: "linear-gradient(135deg,#10B981,#0F766E)",
    likes: 388,
    retweets: 143,
    replies: 27,
    status: "verified",
    thread: 5,
  },
  {
    id: 5,
    name: "Priya Nair",
    handle: "@priya_kochi",
    platform: "Instagram",
    time: "33m",
    text: "Backwaters overflowing near Alappuzha. Boats being used on the main road. #FloodRelief",
    tags: ["#FloodRelief"],
    media: true,
    gradient: "linear-gradient(135deg,#0EA5E9,#312E81)",
    likes: 2210,
    retweets: 130,
    replies: 190,
    status: "pending",
  },
  {
    id: 6,
    name: "Weather Bhai",
    handle: "@weatherbhai",
    platform: "Twitter",
    time: "41m",
    text: "BREAKING: 300kmph winds hitting Gujarat coast tonight. Share fast!! #CycloneUpdate",
    tags: ["#CycloneUpdate"],
    media: false,
    gradient: "linear-gradient(135deg,#EF4444,#7F1D1D)",
    likes: 5420,
    retweets: 3110,
    replies: 820,
    status: "flagged",
  },
  {
    id: 7,
    name: "Sandeep Kulkarni",
    handle: "@sandeepk_pune",
    platform: "Twitter",
    time: "52m",
    text: "Hailstorm in Baramati damaged grape crops across several farms. #WeatherIndia",
    tags: ["#WeatherIndia"],
    media: true,
    gradient: "linear-gradient(135deg,#6366F1,#1E1B4B)",
    likes: 471,
    retweets: 188,
    replies: 34,
    status: "verified",
  },
  {
    id: 8,
    name: "NDRF Updates",
    handle: "@ndrf_official",
    platform: "Twitter",
    time: "1h",
    text: "6 teams deployed across Thane and Palghar districts for flood response. #FloodRelief #IMD",
    tags: ["#FloodRelief", "#IMD"],
    media: false,
    gradient: "linear-gradient(135deg,#10B981,#064E3B)",
    likes: 3120,
    retweets: 1802,
    replies: 210,
    status: "verified",
    thread: 8,
  },
  {
    id: 9,
    name: "Meera Joshi",
    handle: "@meeraj_ahd",
    platform: "Instagram",
    time: "1h",
    text: "Dust storm rolling into Ahmedabad, visibility under 200m on SG Highway.",
    tags: [],
    media: true,
    gradient: "linear-gradient(135deg,#F59E0B,#78350F)",
    likes: 812,
    retweets: 96,
    replies: 51,
    status: "pending",
  },
  {
    id: 10,
    name: "Vizag Coastal Desk",
    handle: "@vizagcoast",
    platform: "News",
    time: "2h",
    text: "Fishermen advised against venturing to sea till Thursday. #CycloneWarning #IMDAlert",
    tags: ["#CycloneWarning", "#IMDAlert"],
    media: false,
    gradient: "linear-gradient(135deg,#0891B2,#0C4A6E)",
    likes: 244,
    retweets: 130,
    replies: 12,
    status: "verified",
  },
  {
    id: 11,
    name: "Arjun Sethi",
    handle: "@arjun_lko",
    platform: "Facebook",
    time: "2h",
    text: "Lightning strike knocked out power in Gomti Nagar for 4 hours. #WeatherIndia",
    tags: ["#WeatherIndia"],
    media: false,
    gradient: "linear-gradient(135deg,#EAB308,#713F12)",
    likes: 178,
    retweets: 42,
    replies: 19,
    status: "pending",
  },
  {
    id: 12,
    name: "Tamil Nadu Alerts",
    handle: "@tn_alerts",
    platform: "Twitter",
    time: "3h",
    text: "Marina Beach access closed as sea turns rough. #ChennaiWeather #CycloneWarning",
    tags: ["#ChennaiWeather", "#CycloneWarning"],
    media: true,
    gradient: "linear-gradient(135deg,#6366F1,#0F172A"
      .concat(")"),
    likes: 1024,
    retweets: 560,
    replies: 77,
    status: "verified",
    thread: 2,
  },
];

export const TOP_CONTRIBUTORS = [
  { name: "@ndrf_official", posts: 412 },
  { name: "@Indiametdept", posts: 388 },
  { name: "@chennailive", posts: 265 },
  { name: "@kolwx", posts: 194 },
  { name: "@ananya_blr", posts: 151 },
];

export const CITIZEN_REPORTS = [
  {
    id: "Citizen_MH_4521",
    city: "Mumbai, Maharashtra",
    time: "4 min ago",
    event: "Flood" as EventType,
    severity: "Critical" as Severity,
    text: "Knee-deep water inside ground floor shops at Dadar market. Shopkeepers moving stock upstairs.",
    status: "Verified by IMD",
    media: true,
    gradient: "linear-gradient(135deg,#06B6D4,#1E3A8A)",
  },
  {
    id: "Citizen_TN_1180",
    city: "Chennai, Tamil Nadu",
    time: "12 min ago",
    event: "Cyclone" as EventType,
    severity: "High" as Severity,
    text: "Very strong gusts near Besant Nagar, hoardings shaking badly. Police clearing the beach road.",
    status: "Pending Review",
    media: true,
    gradient: "linear-gradient(135deg,#6366F1,#111827)",
  },
  {
    id: "Citizen_DL_9032",
    city: "New Delhi, Delhi",
    time: "26 min ago",
    event: "Heat Wave" as EventType,
    severity: "High" as Severity,
    text: "Auto drivers reporting dizziness near ITO. Water booths have run dry since noon.",
    status: "Verified by IMD",
    media: false,
    gradient: "",
  },
  {
    id: "Citizen_WB_2274",
    city: "Kolkata, West Bengal",
    time: "38 min ago",
    event: "Heavy Rain" as EventType,
    severity: "Medium" as Severity,
    text: "Sealdah underpass waterlogged, buses taking a long detour via APC Road.",
    status: "Pending Review",
    media: true,
    gradient: "linear-gradient(135deg,#10B981,#064E3B)",
  },
  {
    id: "Citizen_KA_6641",
    city: "Bangalore, Karnataka",
    time: "51 min ago",
    event: "Thunderstorm" as EventType,
    severity: "Medium" as Severity,
    text: "Continuous thunder near Whitefield, two trees down on Varthur Road blocking one lane.",
    status: "Verified by IMD",
    media: false,
    gradient: "",
  },
  {
    id: "Citizen_RJ_3390",
    city: "Jodhpur, Rajasthan",
    time: "1 hr ago",
    event: "Heat Wave" as EventType,
    severity: "Critical" as Severity,
    text: "Surface temperature unbearable after 11am. Local school announced early closure.",
    status: "Pending Review",
    media: true,
    gradient: "linear-gradient(135deg,#F59E0B,#7C2D12)",
  },
  {
    id: "Citizen_KL_7715",
    city: "Kochi, Kerala",
    time: "1 hr ago",
    event: "Flood" as EventType,
    severity: "High" as Severity,
    text: "Water entering houses near Chellanam. Volunteers arranging boats for elderly residents.",
    status: "Verified by IMD",
    media: true,
    gradient: "linear-gradient(135deg,#0EA5E9,#0F172A)",
  },
  {
    id: "Citizen_GJ_5508",
    city: "Surat, Gujarat",
    time: "2 hr ago",
    event: "Lightning" as EventType,
    severity: "Low" as Severity,
    text: "Multiple lightning strikes observed over the Tapi river belt in the last half hour.",
    status: "Pending Review",
    media: false,
    gradient: "",
  },
  {
    id: "Citizen_AP_8827",
    city: "Visakhapatnam, Andhra Pradesh",
    time: "3 hr ago",
    event: "Cyclone" as EventType,
    severity: "Critical" as Severity,
    text: "Sea has turned very rough at RK Beach, fishing boats being pulled ashore by locals.",
    status: "Verified by IMD",
    media: true,
    gradient: "linear-gradient(135deg,#EF4444,#450A0A)",
  },
];

export const PIPELINES = [
  { name: "Twitter/X Stream", status: "Active", rate: "847 events/min", color: "var(--sev-emerald)", pct: 92, seed: 11 },
  { name: "IMD API", status: "Active", rate: "120 events/min", color: "var(--sev-emerald)", pct: 78, seed: 22 },
  { name: "Citizen Reports", status: "Active", rate: "34 events/min", color: "var(--sev-emerald)", pct: 54, seed: 33 },
  { name: "News Scraper", status: "Degraded", rate: "12 events/min", color: "var(--sev-yellow)", pct: 28, seed: 44 },
  { name: "Satellite Feed", status: "Maintenance", rate: "0 events/min", color: "var(--sev-coral)", pct: 4, seed: 55 },
];

export const QUEUE_NODES = [
  { name: "Ingestion", queue: "12,480", rate: "1.2k/s" },
  { name: "Deduplication", queue: "8,204", rate: "980/s" },
  { name: "NLP Processing", queue: "3,116", rate: "640/s" },
  { name: "Geocoding", queue: "1,742", rate: "520/s" },
  { name: "Verification", queue: "914", rate: "310/s" },
  { name: "Storage", queue: "0", rate: "2.1k/s" },
];

export const LOGS = [
  { t: "14:58:12", lvl: "INFO", m: "ingest.twitter: batch 88213 committed (847 records)" },
  { t: "14:58:04", lvl: "INFO", m: "nlp.classifier: model weather-bert-v4 latency 42ms" },
  { t: "14:57:51", lvl: "WARN", m: "scraper.news: source thehindu.com responded 429, backing off 30s" },
  { t: "14:57:33", lvl: "INFO", m: "geocode: resolved 512 place mentions (cache hit 78%)" },
  { t: "14:57:10", lvl: "ERROR", m: "satellite.feed: connection refused — node under maintenance" },
  { t: "14:56:58", lvl: "INFO", m: "dedup: removed 1,204 duplicate reports in window 5m" },
  { t: "14:56:41", lvl: "WARN", m: "verify.queue: backlog above threshold (914 > 800)" },
  { t: "14:56:20", lvl: "INFO", m: "imd.api: sync complete for 36 subdivisions" },
  { t: "14:56:02", lvl: "INFO", m: "storage.pg: checkpoint written, 2.41M total records" },
  { t: "14:55:47", lvl: "INFO", m: "alerts.engine: 3 new severe alerts dispatched to state EOCs" },
];
