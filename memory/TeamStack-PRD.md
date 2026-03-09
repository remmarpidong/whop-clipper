# OpenClaw Enterprise SaaS - PRD

## Product Name: **TeamStack** (working title)
_AI Team Platform for Business Owners_

---

## 1. Problem Statement

Business owners want AI agents but:
- Don't know how to structure multiple AI assistants
- Can't configure OpenClaw themselves (too technical)
- Need role-based AI for different departments
- Want dashboard to manage all AI workers

---

## 2. Solution

A SaaS platform where business owners can:
- Create departments/teams with pre-configured AI agents
- Connect their OpenClaw instance via API
- Manage all AI workers from one dashboard
- Get analytics on AI performance

---

## 3. Target Market

- Small business owners (5-50 employees)
- Solopreneurs needing "virtual team"
- Agencies managing client communications

---

## 4. Core Features

### MVP (v1.0)

| Feature | Description |
|---------|-------------|
| **Org Builder** | Create departments: Sales, Support, Operations, Marketing |
| **Agent Templates** | Pre-built agent configs per department role |
| **OpenClaw API Connect** | Secure API key connection to their OpenClaw |
| **Agent Chat UI** | Chat with any agent in their org |
| **Department Routing** | Route messages to right department/agent |
| **Basic Analytics** | Messages per agent, response times |

### v1.1 (Post-MVP)
- Custom agent instructions per department
- Webhooks for external integrations
- Team member seats & permissions
- Email integration

### v2.0
- No-code agent builder
- CRM integrations (HubSpot, Pipedrive)
- Voice agents
- API for custom integrations

---

## 5. Technical Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   TeamStack     │────▶│   OpenClaw API   │────▶│   AI Models     │
│   (SaaS)        │     │   (User's)       │     │   (Pi/OAI)      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │
        ▼
┌─────────────────┐
│  User's Apps   │
│ (WhatsApp/TG/  │
│  Discord/etc)  │
└─────────────────┘
```

**Tech Stack:**
- Frontend: Next.js + Tailwind
- Auth: Clerk or NextAuth
- DB: PostgreSQL (Supabase)
- API: REST + WebSocket
- Hosting: Vercel

---

## 6. Pricing Model

| Tier | Price | Features |
|------|-------|----------|
| **Starter** | $29/mo | 3 agents, 1 department |
| **Growth** | $79/mo | 10 agents, 5 departments, analytics |
| **Enterprise** | $199/mo | Unlimited, custom integrations, API |

---

## 7. Pre-Built Agent Templates

### Sales Team
- **Lead Qualifier** - Screens leads, books appointments
- **Follow-up Agent** - Nurtures cold leads

### Support Team
- **Customer Support** - Answers common questions
- **Ticket Router** - Categorizes & escalates issues

### Operations
- **Bookkeeper** - Categorizes expenses, generates reports
- **Scheduler** - Manages appointments & calendar

### Marketing
- **Content Assistant** - Generates social posts
- **Outreach Agent** - Cold emails/messages

---

## 8. OpenClaw API Integration

### Required Endpoints (from OpenClaw)

```javascript
// TeamStack → OpenClaw
POST /api/agents/create     // Create sub-agent
POST /api/agents/:id/chat   // Send message to agent
GET  /api/agents/:id/history // Get conversation history
GET  /api/analytics         // Usage stats
```

### Webhook Events (OpenClaw → TeamStack)
- `agent.response` - New message from agent
- `agent.error` - Agent failed
- `session.start` - User started conversation

---

## 9. MVP Scope

### Do
- [ ] Org/department management UI
- [ ] 5 pre-built agent templates
- [ ] OpenClaw API key connection flow
- [ ] Chat interface per agent
- [ ] Basic message routing
- [ ] Simple analytics (messages count)

### Don't (v1.0)
- Custom agent builder
- Multiple team members
- Complex permissions
- External integrations

---

## 10. Success Metrics

- **Launch**: 10 paying customers in 30 days
- **Retention**: 80% month-over-month
- **NPS**: >40

---

## Next Steps

1. Validate with 5-10 potential users (survey)
2. Design wireframes (Figma)
3. Build MVP (2-4 weeks)
4. Beta launch (waitlist)
5. Iterate based on feedback

---

_Want me to start building the MVP? I can create the project structure and core files._
