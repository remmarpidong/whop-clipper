# Guest List Manager

**Price:** $17 (one-time payment)

---

## What's Included

A standalone guest list and RSVP tracking system for weddings and events.

---

## Features

### Core Tracking
- Full contact information
- RSVP status
- Plus-one management
- Party size

### Meal Tracking
- Entrée selection
- Dietary restrictions
- Allergies
- Special requests

### Table Management
- Table assignments
- Visual seating chart
- Grouping by relationship

### Communication
- Address collection
- Save-the-date tracking
- Invitation tracking
- Thank you status

---

## Database Properties

| Field | Type | Description |
|-------|------|-------------|
| Guest Name | Title | Full name |
| Email | Email | Contact email |
| Phone | Phone | Contact number |
| Address | Text | Mailing address |
| RSVP Status | Select | Response status |
| Party Size | Number | Total in party |
| Plus One Name | Person | Guest's plus one |
| Meal Selection | Select | Entrée choice |
| Dietary Needs | Multi-select | Restrictions |
| Table Number | Select | Seating assignment |
| Invitation Sent | Date | When sent |
| Invitation Opened | Date | When opened |
| Thank You Sent | Date | When acknowledged |
| Notes | Text | Special notes |

---

## RSVP Status Options

1. **Not Sent** — Invitation not yet sent
2. **Sent** — Invitation delivered
3. **Opened** — Invitation viewed
4. **Pending** — Awaiting response
5. **Confirmed** — Attending
6. **Declined** — Not attending
7. **Waitlist** — Can't attend, backup

---

## Meal Options

| Meal Type | Description |
|-----------|-------------|
| Beef | Steak or roast beef |
| Chicken | Grilled or roasted |
| Fish | Salmon or white fish |
| Vegetarian | Meat-free option |
| Vegan | Plant-based |
| Kids | Children's menu |
| Other | Special request |

---

## Dietary Restrictions

Check all that apply:
- Vegetarian
- Vegan
- Gluten-Free
- Dairy-Free
- Nut Allergy
- Shellfish Allergy
- Kosher
- Halal
- Low Sodium
- Diabetic

---

## Table Assignment System

### Table Sizes:
- Round (8 guests)
- Round (10 guests)
- Rectangular (6 guests)
- Head table

### Suggested Groups:
- Bride's family
- Groom's family
- Bride's friends
- Groom's friends
- Coworkers (bride)
- Coworkers (groom)
- Mutual friends
- Plus ones

---

## Reports & Calculations

### Automatic Calculations:
```
Total Invited = COUNT(All)
Total Attending = SUM(Party Size WHERE Confirmed)
Total Declined = COUNT(Declined)
Pending Response = COUNT(Pending)
Response Rate = (Confirmed + Declined) / (Sent)
```

### Meal Counts:
```
Beef = COUNT(Meal="Beef")
Chicken = COUNT(Meal="Chicken")
Fish = COUNT(Meal="Fish")
Vegetarian = COUNT(Meal="Vegetarian")
Vegan = COUNT(Meal="Vegan")
Kids = COUNT(Meal="Kids")
```

---

## Communication Tracking

### Timeline:
1. Save-the-date (8 months out)
2. Invitation (6-8 weeks out)
3. RSVP deadline (3-4 weeks out)
4. Final count (1-2 weeks out)
5. Thank you notes (2-4 weeks after)

### Reminders:
- Auto-remind at 2 weeks
- Follow-up at 1 week
- Final push at 3 days

---

## Export Options

### CSV Export:
- All guest data
- Filter by status
- Selected fields

### Print Options:
- Address labels
- Place cards
- Seating chart
- Meal count report

---

## How to Use

### Step 1: Add Guests
- Manual entry
- Import from spreadsheet
- Copy from wedding planner

### Step 2: Track Invitations
- Update when sent
- Update when opened
- Set RSVP deadline

### Step 3: Manage Responses
- Update as responses come in
- Track plus ones
- Note dietary needs

### Step 4: Build Seating Chart
- Create tables
- Assign guests
- Handle changes

### Step 5: Follow Up
- Send thank yous
- Track completion

---

## Best Practices

1. **Start early** — Begin 6+ months out
2. **Double-check** — Verify all spellings
3. **Stay organized** — Update promptly
4. **Be flexible** — Plans change
5. **Backup** — Export regularly

---

## Support

Questions? Email: rypidong@gmail.com

---

*Guest List Manager © 2026*
