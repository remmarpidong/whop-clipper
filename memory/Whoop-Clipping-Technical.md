# WHOOP Clipping - Technical Deep Dive

## How "Clipping" Actually Works

### 1. Authentication (OAuth 2.0)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │────▶│  WHOOP      │────▶│  Your App  │
│             │     │  OAuth      │     │  (Token)   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. User clicks "Connect WHOOP" on your app
2. Redirect to WHOOP OAuth: `https://api.whoop.com/oauth/authorize`
3. User logs in and approves
4. WHOOP redirects back with `code`
5. Exchange code for `access_token`

**Scopes needed:**
- `read:recovery` - Recovery scores
- `read:workout` - Workout data
- `read:sleep` - Sleep data
- `read:cycles` - Daily health cycles

---

### 2. API Endpoints (What You Can Fetch)

Based on WHOOP 101 docs, available via API:

#### Daily Data
```
GET /v1/activity/daily/{date}
GET /v1/cycles
```

#### Recovery
```
GET /v1/recovery/{date}
```
Returns:
- Recovery score (0-100%)
- HRV, RHR, respiratory rate
- Skin temperature, blood oxygen

#### Strain
```
GET /v1/activity/{activityId}
GET /v1/strain/{date}
```
Returns:
- Strain score (0-21)
- Strain during workouts
- Heart rate zones

#### Sleep
```
GET /v1/sleep/{date}
```
Returns:
- Total sleep duration
- Sleep stages (Light, REM, SWS)
- Sleep performance %
- Sleep debt

---

### 3. Webhooks (Real-time)

WHOOP sends webhooks when:
- Daily data available (usually morning)
- Workout completed
- Sleep recorded

**Webhook events:**
- `DAILY_RECORD_UPDATED`
- `WORKOUT_COMPLETED`
- `SLEEP_RECORDED`

---

### 4. Building "Clipping" Products

#### A. Daily Recovery Card Generator
```
1. Fetch user's recovery score
2. Generate image with:
   - Recovery % (big number)
   - Color (Green/Yellow/Red)
   - Strain recommendation
3. Output: Shareable image
```

#### B. Whoop-to-Notion Sync
```
1. Daily webhook triggers
2. Fetch: sleep, recovery, strain
3. Write to Notion database
```

#### C. Smart Calendar
```
1. Fetch recovery every morning
2. If recovery < 40%:
   - Block "High Intensity" events
   - Suggest "Rest Day"
3. Update Google Calendar
```

#### D. Slack Bot
```
1. Daily at 7am:
2. Fetch today's recovery + strain
3. Post to Slack channel:
   "🌡️ Today's Whoop: Recovery 78% 🟢 | Strain: 12.5 🔵"
```

---

### 5. Code Examples

#### Fetch Recovery (curl)
```bash
curl -X GET "https://api.whoop.com/v1/recovery/2026-03-09" \
  -H "Authorization: Bearer {access_token}"
```

#### Response Example
```json
{
  "recoveryScore": 78,
  "recoveryRecommendation": {
    "description": "Green - Ready for high strain"
  },
  "hrv": 55,
  "rhr": 48,
  "respiratoryRate": 14.2,
  "skinTemperatureDeviation": -0.5,
  "bloodOxygen": 98
}
```

#### Fetch Sleep
```bash
curl -X GET "https://api.whoop.com/v1/sleep/2026-03-09" \
  -H "Authorization: Bearer {access_token}"
```

#### Response Example
```json
{
  "start": "2026-03-08T23:30:00.000Z",
  "end": "2026-03-09T07:15:00.000Z",
  "totalDuration": 7.75,
  "sleepPerformance": 92,
  "stages": {
    " Awake": 0.25,
    "Light": 3.5,
    "REM": 2.0,
    "SWS": 2.0
  },
  "cycles": 5
}
```

---

### 6. Technical Stack

| Layer | Technology |
|-------|------------|
| Auth | OAuth 2.0 |
| Backend | Node.js / Python |
| Database | PostgreSQL / Supabase |
| Hosting | Vercel / Railway |
| Notifications | Slack API, Email, Push |

---

### 7. Development Steps

1. **Apply for WHOOP Developer** (developer.whoop.com)
2. **Create OAuth App** in WHOOP dashboard
3. **Build auth flow** (connect button → OAuth → token)
4. **Fetch sample data** (test with your WHOOP)
5. **Build first feature** (e.g., daily card)
6. **Launch** (get users)

---

### 8. Alternatives (If No API Access)

If WHOOP API is hard to get:

| Alternative | How |
|------------|-----|
| Apple Health | Sync WHOOP → Apple Health → Your App |
| Manual Entry | User exports WHOOP → uploads to your app |
| Third-party | Use existing integrations (Zapier, etc.) |

---

## Key Insight

WHOOP data is simple:
- **3 main metrics**: Recovery, Strain, Sleep
- **Daily cadence**: New data every morning
- **User behavior**: Check daily, love sharing

**Best clipping product:** Daily automated insight that syncs to their existing tools (Notion, Slack, Calendar)

---

Want me to create tasks for the dev team?
