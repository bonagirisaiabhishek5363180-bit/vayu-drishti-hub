# VayuDrishti Command

Build a multi-page web app called "VayuDrishti" — a National Weather Big Data Analytics Platform for India. This is a prototype for a government hackathon (Smart India Hackathon) that aggregates real-time weather data from social media, citizen reports, APIs, and public datasets into one command center. Use mock data throughout — no real API calls.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BRAND IDENTITY & DESIGN LANGUAGE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: "VayuDrishti" (meaning "Wind Vision" in Sanskrit)

Tagline: "India's Weather Intelligence, Unified."

Color System — TWO THEMES with a toggle in the header:

DARK THEME (default):

- Background: deep charcoal-navy gradient (#0B1120 → #111827), NOT pure black

- Primary accent: vivid electric cyan (#06B6D4)

- Secondary accent: warm amber-gold (#F59E0B)

- Alert/danger: coral-red (#EF4444)

- Success: emerald (#10B981)

- Surface cards: rgba(255,255,255,0.04) with subtle 1px border rgba(255,255,255,0.08)

- Text: #F1F5F9 primary, #94A3B8 secondary

LIGHT THEME:

- Background: warm off-white (#FAFBFE) with subtle cool gray tones

- Primary accent: deep teal (#0891B2)

- Secondary accent: rich indigo (#6366F1)

- Surface cards: white with soft shadow (0 1px 3px rgba(0,0,0,0.08))

- Text: #1E293B primary, #64748B secondary

Typography: Use "Plus Jakarta Sans" from Google Fonts for headings (bold, 700/800 weight) and "Inter" for body text. The numbers on KPI cards should use tabular figures and be extra-large (32-48px) to feel like a mission control dashboard.

Design Philosophy: This should look like it belongs on the screen of a disaster response war room — think Bloomberg Terminal meets a modern climate-tech startup. NOT a generic admin dashboard. Every element should feel intentional and data-dense but never cluttered. Use generous padding inside cards but tight spacing between them. Round corners at 12px for cards, 8px for buttons.

━━━━━━━━━━━━━━━━━━━━━━━━━

APP STRUCTURE (6 Pages)

━━━━━━━━━━━━━━━━━━━━━━━━━

Navigation: Collapsible sidebar on the left with icon + text labels. Icons should be from Lucide. Active state = highlighted background + accent color icon. Sidebar should have the VayuDrishti logo at top (a stylized "V" mark with a wind/wave motif — just use text styling, no image needed) and a user avatar at the bottom.

PAGE 1: COMMAND CENTER (Dashboard — default landing page)

This is the nerve center. Layout:

Row 1 — 5 KPI stat cards in a horizontal strip:

  1. "Live Reports" — count: 12,847 — icon: Radio — accent cyan — show a tiny sparkline inside the card showing last 24h trend

  2. "Active Alerts" — count: 34 — icon: AlertTriangle — accent amber

  3. "States Affected" — count: 12 — icon: MapPin — accent coral

  4. "Verified Reports" — count: 9,231 — icon: ShieldCheck — accent emerald

  5. "Avg Response Time" — value: "4.2 min" — icon: Clock — accent indigo

Each card should have a subtle percentage change indicator (e.g., "+12.4% ↑" in green or "-3.1% ↓" in red) compared to yesterday.

Row 2 — Two-column layout:

  LEFT (60% width): Interactive India Map

  - Render a simplified SVG map of India showing all states

  - Color-code states by alert severity (green = safe, yellow = watch, orange = warning, red = severe)

  - Show animated pulsing dots on cities with active weather events:

    • Mumbai — Flood (red pulse)

    • Chennai — Cyclone Warning (orange pulse)  

    • Delhi — Heat Wave (amber pulse)

    • Kolkata — Heavy Rain (yellow pulse)

    • Jaipur — Normal (green, no pulse)

    • Bangalore — Thunderstorm (orange pulse)

  - Clicking a dot should show a tooltip popup with: city name, event type, severity, report count, last update time

  - Include a small legend in the bottom-left corner of the map

  RIGHT (40% width): Live Event Feed

  - A scrolling vertical feed of the latest weather reports, styled like a real-time activity stream

  - Each feed item shows: timestamp (relative, like "2 min ago"), user avatar (colored circle with initials), city + state, event type with a colored badge, verification status (checkmark icon if verified, hourglass if pending), and a snippet of the report text

  - The feed should have a subtle "new item" animation — items slide in from the top with a brief glow

  - Show 15-20 mock items

  - Include a "Source" tag on each item: Twitter, Citizen App, IMD API, News Feed — each with a distinct icon

Row 3 — Two-column:

  LEFT: "Event Distribution" — A donut/ring chart showing breakdown by event type (Flood 34%, Cyclone 18%, Heavy Rain 22%, Heat Wave 12%, Earthquake 8%, Fire 6%) with a center label showing total count. Use the accent colors, not random colors.

  RIGHT: "Hourly Ingestion Rate" — An area chart showing data points collected per hour over the last 24 hours. The area should have a gradient fill from cyan to transparent. Show a peak annotation.

PAGE 2: DATA EXPLORER

A powerful filterable table page.

Top section — Filter Bar:

- Date Range picker (with presets: Today, Last 7 Days, Last 30 Days, Custom)

- Event Type dropdown multi-select (Flood, Cyclone, Heavy Rain, Heat Wave, Earthquake, Lightning, Thunderstorm, Fire)

- State dropdown multi-select (list 10 major Indian states)

- City search input with autocomplete

- Severity dropdown (Critical, High, Medium, Low)

- Verification Status toggle buttons (All | Verified | Pending | Rejected)

- Source filter chips (Twitter, Citizen, IMD, News, Satellite)

- A prominent "Apply Filters" button and a "Reset" text button

Below filters — Results Summary: "Showing 2,847 of 12,847 reports" with export buttons (CSV, PDF)

Main content — Data Table:

- Columns: ID, Date & Time, Event Type (colored badge), City, State, Severity (colored dot), Source, Verification Status (icon), GPS Coords, Media (camera icon if has photo/video), Actions (view button)

- Rows should have alternating subtle background colors

- Sortable columns (click header to sort)

- Pagination at bottom (showing 25 per page)

- Clicking "View" opens a slide-over panel from the right showing full report details: all metadata, a placeholder map showing GPS pin, report text, and verification timeline

Generate 50 rows of realistic mock data covering different Indian cities, event types, dates in September 2026, various sources, and verification statuses.

PAGE 3: ANALYTICS & INSIGHTS

This page shows deeper analysis with rich charts.

Section 1 — "Trend Analysis" header with a date range selector

- Large line chart showing event counts over time (last 30 days), with separate colored lines for each event type. Include hover tooltips showing exact values.

Section 2 — Two-column:

  LEFT: "Geographic Heatmap" — A colored grid/matrix showing states (rows) vs event types (columns), with cell colors representing intensity (use sequential color scale from light to dark cyan)

  RIGHT: "Source Reliability Score" — Horizontal bar chart showing each data source with a reliability percentage bar and exact score. IMD API: 98%, Satellite: 95%, News: 78%, Citizen App: 72%, Twitter: 61%

Section 3 — "AI Sentiment Analysis" card:

- Show a gauge/meter at 67% with label "Overall Public Concern Level"

- Below it, show 5 trending hashtags: #IMDAlert, #MumbaiRains, #CycloneWarning, #FloodRelief, #ChennaiWeather — each with a trend arrow and tweet count

- A "Word Cloud" section showing common terms from social media posts in varying font sizes

Section 4 — "Prediction Confidence" 

- Three cards showing ML model predictions:

  1. "Flood Risk — Mumbai" — 87% confidence — High — next 48h

  2. "Cyclone Landfall — AP Coast" — 73% confidence — Medium — next 72h  

  3. "Heat Wave — Rajasthan" — 92% confidence — Critical — next 24h

- Each card has a small circular progress ring showing the confidence percentage

PAGE 4: SOCIAL MEDIA MONITOR

Dedicated social media intelligence page.

Top — Search bar styled like a social media search with hashtag suggestions appearing below as chips (#IMD, #IMDAlert, #MumbaiRains, #CycloneUpdate, #FloodAlert, #WeatherIndia)

Below — Three-column masonry grid of social media cards:

- Each card looks like an embedded social media post (NOT a Twitter embed, design a custom card):

  - Profile picture (colored circle), username, handle, timestamp

  - Post text with highlighted hashtags in cyan

  - If has media: show a placeholder colored gradient rectangle (simulating an image)

  - Bottom row: like count, retweet count, reply count

  - A "Verification Badge" in the corner: green checkmark = verified, yellow clock = pending, red X = flagged

  - Source platform icon (Twitter/X bird, Facebook, Instagram)

- Generate 12 realistic-looking Indian weather-related social media posts

Side panel (right, 300px wide):

- "Trending Now" section with top 10 hashtags and their counts

- "Sentiment Breakdown" mini donut: Positive 23%, Neutral 45%, Negative 32%

- "Top Contributors" list with 5 usernames and their post counts

PAGE 5: CITIZEN REPORTS

A page showing crowdsourced citizen reports.

Top — A "Submit Report" button that opens a modal form with fields:

  - Event Type (dropdown)

  - Description (textarea)

  - City + State (dropdowns)

  - GPS Location (text input with a "Use My Location" button)

  - Severity (radio: Low, Medium, High, Critical)

  - Upload Photo/Video (file upload area with drag-and-drop styling)

  - "Submit Report" button (should just close the modal and show a success toast)

Below — Card grid (3 columns) of citizen reports:

  - Each card shows: reporter name (anonymized like "Citizen_MH_4521"), timestamp, city, event type badge, severity indicator, report text (2-3 lines), a "Verify" button and a "Flag" button

  - Some cards should show a verification status: "Verified by IMD" with green badge, or "Pending Review" with yellow badge

  - Cards with photos should show a placeholder image area

  - Generate 9 diverse mock citizen reports from different Indian cities

PAGE 6: SYSTEM STATUS

Shows the health and status of the data pipeline.

- "Pipeline Status" section: 5 horizontal status bars showing each data source pipeline:

  1. Twitter/X Stream — Active — 847 events/min — green

  2. IMD API — Active — 120 events/min — green

  3. Citizen Reports — Active — 34 events/min — green

  4. News Scraper — Degraded — 12 events/min — yellow

  5. Satellite Feed — Maintenance — 0 events/min — red

  Each bar should show a mini live-looking activity sparkline

- "Database Stats" cards: Total Records (2.4M), Storage Used (847 GB / 2 TB with progress bar), Avg Query Time (142ms), Uptime (99.97%)

- "Processing Queue" visualization: Show a horizontal pipeline/flow diagram with nodes: Ingestion → Deduplication → NLP Processing → Geocoding → Verification → Storage. Each node shows items in queue and processing rate.

- "System Logs" section at bottom: A terminal-style dark box with monospace font showing the last 10 log entries with timestamps, log levels (INFO, WARN, ERROR with colors), and messages

━━━━━━━━━━━━━━━━━━━━━

GLOBAL UI ELEMENTS

━━━━━━━━━━━━━━━━━━━━━

Header Bar (persistent across all pages):

- Left: VayuDrishti logo text

- Center: A global search bar with placeholder "Search reports, locations, events..."

- Right: Theme toggle (sun/moon icon with smooth transition), notification bell with a red badge showing "7", and a user avatar circle with "AS" initials

Animations & Micro-interactions:

- Cards should have a subtle scale-up (1.02) on hover with a soft shadow increase

- Page transitions should have a quick fade-in (200ms)

- Numbers on KPI cards should have a count-up animation on page load

- The theme toggle should smoothly transition all colors (300ms ease)

- Active navigation items should have a slide-in highlight bar

- Toast notifications should slide in from top-right

Responsive: The app should work on desktop (1440px+) and tablet (768px). On mobile, the sidebar collapses to a hamburger menu.

IMPORTANT STYLING NOTES:

- Do NOT use any default shadcn color schemes. Override everything to match the custom palette above.

- Card borders should be very subtle — almost invisible in dark mode, soft gray in light mode

- Use backdrop-blur(12px) on sidebar and header for a frosted glass effect

- Charts should use Recharts library with custom colors matching the palette

- No generic "Welcome back!" or placeholder hero sections. Every pixel should show data.

- The overall density should feel like a professional monitoring system, not a marketing landing page.

Make these refinements without changing the existing layout or data:

1. Add a smooth CSS transition (0.3s ease) to the theme toggle so colors blend instead of snapping

2. Make the KPI numbers on the Command Center count up from 0 using a 1.5s animation on mount

3. Add a subtle parallax-like depth effect on the map — when hovering over the map area, the pulsing dots should slightly shift

4. The live feed items should auto-scroll slowly (1 item every 4 seconds) and pause on hover

5. Add a very subtle grain/noise texture overlay on the dark theme background for a premium editorial feel (opacity 0.02)

6. The sidebar active item should have a glowing accent line on the left edge, not just a background color

On the Data Explorer page, make these specific improvements:

1. Add inline row expansion — clicking a row expands it downward to show full report details instead of a slide-over panel

2. Add a "Bulk Actions" toolbar that appears when rows are selected via checkboxes: "Verify Selected", "Flag Selected", "Export Selected"

3. The filter bar should be collapsible — show a "Filters (3 active)" summary bar that expands on click

4. Add a small "View: Table | Cards" toggle above the table to switch between table view and card grid view

5. Make the pagination show "Showing 1-25 of 2,847" with first/last page buttons

Upgrade the India map on the Command Center:

1. Replace the simplified SVG with a more detailed state boundary map of India

2. Add a zoom control (+ / -) in the top-right corner of the map

3. When a state is hovered, it should subtly highlight and show a mini tooltip with state name and active event count

4. Add a "Layer" toggle in the map corner to switch between: Alert View (current), Temperature Heatmap View, and Rainfall View

5. Show small weather icons (sun, cloud, rain, storm) floating near major cities

On the Social Media Monitor page:

1. Add an auto-refresh indicator in the top-right: "Last updated: 30 seconds ago" with a circular progress ring that fills up over 60 seconds before refreshing

2. Add a filter row below the search: "All Platforms" | "Twitter/X" | "Facebook" | "Instagram" | "News" as toggle buttons

3. Social media cards should have a "thread" indicator if they are part of a conversation (show "3 replies" link)

4. Add a "Verification Queue" tab at the top that shows only unverified posts in a single-column layout with Verify/Reject action buttons prominently displayed

5. The sentiment donut in the sidebar should animate on load with each segment drawing in sequentially

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f144db5d-6a83-454f-8ad0-ea805aacf298).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
