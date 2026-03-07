# n8n Automation Templates

**Price:** $29 (one-time payment)

---

## What's Included

20 ready-to-use n8n workflows in JSON format. Import directly into your n8n instance.

---

## Workflow 1: Telegram Alert System

**Purpose:** Get instant notifications for important business events

**Trigger:** Webhook or Schedule

**Setup:**
1. Import JSON file to n8n
2. Configure Telegram credentials
3. Set your chat ID
4. Deploy

```json
{
  "name": "Telegram Alert",
  "nodes": [
    {
      "parameters": {
        "channelType": "telegram",
        "text": "🚨 New Alert: {{$json.message}}"
      },
      "name": "Send Alert",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1
    }
  ]
}
```

---

## Workflow 2: Discord Auto-Responder

**Purpose:** Automatically respond to common queries in Discord

**Trigger:** Discord Webhook

**Features:**
- Keyword detection
- Response templates
- No-match handling

```json
{
  "name": "Discord Auto-Respond",
  "nodes": [
    {
      "parameters": {
        "channel": "discord",
        "message": "{{responses[$json.content]}}"
      }
    }
  ]
}
```

---

## Workflow 3: Webhook to Email Bridge

**Purpose:** Convert webhook data into formatted emails

**Trigger:** Webhook

**Use cases:**
- Form submissions
- Order notifications
- Lead alerts

---

## Workflow 4: Lead Capture Form

**Purpose:** Collect leads from any website and store in database

**Trigger:** Webhook

**Flow:**
1. Receive form data
2. Validate email
3. Add to Airtable/Google Sheets
4. Send confirmation email

---

## Workflow 5: Auto Follow-Up Sequence

**Purpose:** Nurture leads with timed follow-up emails

**Trigger:** Schedule (daily)

**Flow:**
1. Query "pending" leads older than 3 days
2. Send follow-up email
3. Update status based on response

---

## Workflow 6: Social Media Scheduler

**Purpose:** Schedule posts across multiple platforms

**Trigger:** Schedule

**Features:**
- Twitter, LinkedIn, Facebook support
- Image upload
- Hashtag suggestions
- Best time to post optimization

---

## Workflow 7: Calendar Event Reminders

**Purpose:** Get reminders before meetings

**Trigger:** Schedule (hourly)

**Flow:**
1. Query today's events
2. Send reminder 1 hour before
3. Include video link and notes

---

## Workflow 8: CRM Data Sync

**Purpose:** Keep CRM data synchronized across tools

**Trigger:** Schedule or Webhook

**Features:**
- Two-way sync
- Field mapping
- Conflict resolution

---

## Workflow 9: Payment Notifications

**Purpose:** Alert when payments are received

**Trigger:** Stripe/PayPal webhook

**Flow:**
1. Listen for payment events
2. Format notification
3. Send to Telegram/Discord/Email

---

## Workflow 10: Customer Onboarding

**Purpose:** Welcome new customers automatically

**Trigger:** New row in spreadsheet

**Sequence:**
- Day 0: Welcome email + login details
- Day 1: Getting started guide
- Day 3: Quick win checklist
- Day 7: Book a call CTA

---

## Workflow 11: Lead Scoring

**Purpose:** Rank leads by engagement

**Trigger:** Schedule (daily)

**Scoring criteria:**
- Email opens (+1)
- Link clicks (+2)
- Website visits (+3)
- Demo requested (+10)

---

## Workflow 12: Data Enrichment

**Purpose:** Auto-fill lead information

**Trigger:** New lead added

**Data sources:**
- Clearbit
- Hunter
- LinkedIn

---

## Workflow 13: Invoice Processing

**Purpose:** Extract and organize invoice data

**Trigger:** Email received

**Flow:**
1. Parse PDF attachment
2. Extract: date, amount, vendor
3. Add to accounting software

---

## Workflow 14: Support Ticket Routing

**Purpose:** Direct tickets to the right person

**Trigger:** New ticket (Zendesk/Intercom)

**Rules:**
- Billing questions → Finance team
- Technical issues → Support team
- Sales inquiries → Sales team

---

## Workflow 15: Content Reposting

**Purpose:** Repurpose content across platforms

**Trigger:** New blog post

**Flow:**
1. Fetch blog content
2. Convert to Twitter thread
3. Convert to LinkedIn post
4. Schedule all

---

## Workflow 16: Price Monitoring

**Purpose:** Track competitor pricing

**Trigger:** Schedule (daily)

**Flow:**
1. Scrape competitor pages
2. Compare prices
3. Alert if significant change

---

## Workflow 17: Review Aggregation

**Purpose:** Collect and display reviews

**Trigger:** Schedule

**Sources:**
- Google
- Trustpilot
- G2
- Yelp

---

## Workflow 18: Survey Automation

**Purpose:** Send and collect surveys

**Trigger:** Purchase completed

**Flow:**
1. Send survey email (Day 7)
2. Collect responses
3. Send reminder (Day 10)
4. Aggregate results

---

## Workflow 19: Affiliate Tracking

**Purpose:** Monitor referral conversions

**Trigger:** Webhook from payment processor

**Flow:**
1. Identify affiliate
2. Calculate commission
3. Log to tracking sheet
4. Send payout notification

---

## Workflow 20: Weekly Report

**Purpose:** Automated business summaries

**Trigger:** Schedule (Monday 9am)

**Includes:**
- Sales this week
- New leads
- Support tickets
- Website analytics

---

## How to Use

1. Open your n8n instance
2. Click "Import from File"
3. Select the JSON file
4. Configure credentials
5. Activate workflow

---

## Support

Questions? Email: rypidong@gmail.com

---

*n8n Automation Templates © 2026*
