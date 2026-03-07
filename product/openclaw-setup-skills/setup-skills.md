# OpenClaw Setup & Skills Guide
## Everything You Need to Build Your AI Empire

---

# PART 1: TOOLS NEEDED

## Free Tools (Start Here)

### Core
- [ ] Node.js (v18+) - https://nodejs.org
- [ ] npm or yarn
- [ ] Text editor (VS Code recommended)
- [ ] Terminal/Command line

### Communication Channels
- [ ] Telegram account (free)
- [ ] Discord account (free)
- [ ] WhatsApp account (free)
- [ ] Gmail account (free)

### Development (Optional)
- [ ] GitHub account (free)
- [ ] Vercel account (free for hosting)
- [ ] Cloudflare account (free DNS)

### Marketing
- [ ] PayPal business account (free to set up)
- [ ] Gumroad account (free)
- [ ] Stripe account (free)
- [ ] Canva (free tier)

### Research
- [ ] Google Alerts (free)
- [ ] Twitter/X account (free)
- [ ] Reddit account (free)
- [ ] LinkedIn profile (free)

---

# PART 2: SKILL CREATION

## What is a Skill?

A skill is a reusable module that adds capabilities to OpenClaw. Think of it like an app for your AI.

## Skill Structure

```
my-skill/
├── SKILL.md          # Definition & instructions
├── skills/
│   └── my-command.js # The actual code
└── config.json       # Settings
```

## Simple Skill Example

```javascript
// skills/hello.js
module.exports = {
  name: 'hello',
  description: 'Say hello with style',
  
  async handler(args, context) {
    const name = args.name || 'friend'
    return `Hello, ${name}! 👋 Welcome to OpenClaw!`
  }
}
```

## Advanced Skill with AI

```javascript
// skills/analyze.js
module.exports = {
  name: 'analyze',
  description: 'Analyze text with AI',
  
  async handler(args, context) {
    const { ai } = context
    
    const analysis = await ai.prompt(`
      Analyze this text and provide:
      - Sentiment (positive/negative/neutral)
      - Key themes
      - Action items
      
      Text: ${args.text}
    `)
    
    return analysis
  }
}
```

## Skill with Memory

```javascript
// skills/remember.js
module.exports = {
  name: 'remember',
  description: 'Store and retrieve information',
  
  async handler(args, context) {
    const { memory } = context
    
    if (args.action === 'save') {
      await memory.save(args.key, { 
        value: args.value,
        timestamp: Date.now()
      })
      return `Saved: ${args.key}`
    }
    
    if (args.action === 'get') {
      const data = await memory.get(args.key)
      return data ? JSON.stringify(data) : 'Not found'
    }
  }
}
```

## Skill with External API

```javascript
// skills/weather.js
module.exports = {
  name: 'weather',
  description: 'Get weather for a location',
  
  async handler(args, context) {
    const { fetch } = context
    
    const response = await fetch(
      `https://api.weather.com?city=${args.city}&key=YOUR_KEY`
    )
    
    const data = await response.json()
    return `Weather in ${args.city}: ${data.temp}°C, ${data.condition}`
  }
}
```

---

# PART 3: COMMON SKILLS TO BUILD

## 1. Content Skills

### Blog Post Generator
```javascript
// Generates blog posts from outlines
module.exports = {
  name: 'blog',
  async handler(args, context) {
    const { ai } = context
    return await ai.prompt(`Write a blog post about ${args.topic}`)
  }
}
```

### Social Media Manager
```javascript
// Create posts for multiple platforms
module.exports = {
  name: 'social',
  async handler(args, context) {
    const { ai } = context
    const platforms = ['twitter', 'linkedin', 'instagram']
    // Generate posts for each
  }
}
```

## 2. Sales Skills

### Lead Qualifier
```javascript
module.exports = {
  name: 'qualify',
  async handler(args, context) {
    const { ai } = context
    return await ai.prompt(`
      Score this lead from 1-10:
      Budget: ${args.budget}
      Timeline: ${args.timeline}
      Need: ${args.need}
    `)
  }
}
```

### Follow-up Reminder
```javascript
module.exports = {
  name: 'followup',
  async handler(args, context) {
    // Check last contact, send reminder if needed
  }
}
```

## 3. Research Skills

### Competitor Analyzer
```javascript
module.exports = {
  name: 'competitor',
  async handler(args, context) {
    // Research competitor and return analysis
  }
}
```

### Trend Hunter
```javascript
module.exports = {
  name: 'trends',
  async handler(args, context) {
    // Scan for trending topics in niche
  }
}
```

## 4. Automation Skills

### Meeting Scheduler
```javascript
module.exports = {
  name: 'schedule',
  async handler(args, context) {
    // Check calendar, propose times
  }
}
```

### Invoice Generator
```javascript
module.exports = {
  name: 'invoice',
  async handler(args, context) {
    // Generate invoice from details
  }
}
```

---

# PART 4: SETUP CHECKLIST

## Day 1: Foundation
- [ ] Install Node.js
- [ ] Install OpenClaw: `npm install -g openclaw`
- [ ] Set up Telegram bot
- [ ] Connect to Discord
- [ ] Run first test command

## Day 2: Basic Skills
- [ ] Create hello skill
- [ ] Create help skill
- [ ] Create reminder skill
- [ ] Test all skills

## Day 3: Advanced Skills
- [ ] Create AI-powered skills
- [ ] Add memory persistence
- [ ] Connect external APIs

## Day 4: Automation
- [ ] Set up cron jobs
- [ ] Create heartbeat checks
- [ ] Build first automation workflow

## Day 5: Business Skills
- [ ] Lead qualification skill
- [ ] Content generation skill
- [ ] Research automation

---

# PART 5: RESOURCES

## Documentation
- Official docs: https://docs.openclaw.ai
- GitHub: https://github.com/openclaw/openclaw
- Discord: https://discord.com/invite/clawd

## Learning
- Start with basics
- Build one skill per day
- Join community for help

## Tools Used
- VS Code: https://code.visualstudio.com
- Postman: https://postman.com (API testing)
- Ngrok: https://ngrok.com (local tunneling)

---

*OpenClaw Setup & Skills Guide © 2026*
