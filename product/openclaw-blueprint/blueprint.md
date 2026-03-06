# OpenClaw Setup & Mastery Blueprint

## The Complete Guide to Setting Up and Using OpenClaw

---

# TABLE OF CONTENTS

1. Introduction to OpenClaw
2. Getting Started
3. Channel Setup
4. Browser Automation
5. AI Agent Mastery
6. Automation & Cron Jobs
7. Advanced Features
8. Security Best Practices
9. Use Cases & Examples
10. Troubleshooting

---

# CHAPTER 1: INTRODUCTION TO OPENCLAW

## What is OpenClaw?

OpenClaw is an AI-powered assistant that runs on your machine and can automate tasks, manage your communications, and work 24/7 while you sleep. It connects to various messaging platforms and can control web browsers, making it one of the most versatile AI tools available.

## Why Use OpenClaw?

- **24/7 Automation**: Your AI never sleeps
- **Multi-Platform**: Works with Telegram, Discord, WhatsApp, Signal
- **Browser Control**: Automate web tasks
- **Custom Skills**: Build your own commands
- **Free to Start**: Basic features are free

---

# CHAPTER 2: GETTING STARTED

## System Requirements

- Node.js v18 or higher
- Linux, macOS, or Windows (WSL)
- 2GB RAM minimum
- Internet connection

## Installation

### Step 1: Install Node.js

```bash
# macOS with Homebrew
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
```

### Step 2: Install OpenClaw

```bash
# Install globally
npm install -g openclaw

# Or clone from GitHub
git clone https://github.com/openclaw/openclaw.git
cd openclaw
npm install
```

### Step 3: Initial Setup

```bash
# Initialize OpenClaw
openclaw init

# Follow the prompts
# - Enter your name
# - Set up initial channel
# - Configure AI model
```

### Step 4: Verify Installation

```bash
openclaw status
```

You should see:
- Version number
- Connected channels
- Memory usage
- Uptime

---

# CHAPTER 3: CHANNEL SETUP

## Telegram Setup

### Step 1: Create a Bot

1. Open Telegram
2. Search for @BotFather
3. Send `/newbot`
4. Follow instructions
5. Copy the API token

### Step 2: Configure OpenClaw

```bash
openclaw config add telegram
# Enter your bot token
# Set bot username
```

### Step 3: Start the Bot

```bash
openclaw start --telegram
```

Your bot is now live! Send `/help` to see available commands.

---

## Discord Setup

### Step 1: Create Application

1. Go to https://discord.com/developers/applications
2. Click "New Application"
3. Name your bot
4. Go to "Bot" section
5. Click "Reset Token" and copy it

### Step 2: Add to Server

1. Go to "OAuth2" → "URL Generator"
2. Select `bot` scope
3. Select permissions: `Administrator` (or specific permissions)
4. Copy the generated URL
5. Open in browser and select server

### Step 3: Configure OpenClaw

```bash
openclaw config add discord
# Enter your bot token
# Set command prefix (default:## !)
```

---

 WhatsApp Setup

### Using QR Code

```bash
openclaw config add whatsapp
# Will display QR code
# Scan with WhatsApp mobile app
```

### Tips
- Keep session alive by using OpenClaw regularly
- QR code expires after time - regenerate if needed

---

## Signal Setup

```bash
openclaw config add signal
# Follow phone number verification
```

---

# CHAPTER 4: BROWSER AUTOMATION

## Installation

```bash
# Install browser dependencies
openclaw browser install

# Or manually
npm install -g playwright
playwright install chromium
```

## Basic Browser Control

### Open a Page

```javascript
// In your skill or command
await browser.open('https://example.com')
```

### Take Screenshot

```javascript
await browser.screenshot()
```

### Click Elements

```javascript
await browser.click('#submit-button')
```

### Fill Forms

```javascript
await browser.fill('#email', 'user@example.com')
await browser.fill('#password', 'secret')
await browser.click('#login')
```

## Advanced Automation

### Waiting for Elements

```javascript
await browser.waitForSelector('.result', { timeout: 5000 })
```

### Handling Multiple Tabs

```javascript
const tabs = await browser.getTabs()
await browser.switchTab(tabs[1])
```

### Extract Data

```javascript
const title = await browser.getText('h1')
const links = await browser.getAllAttributes('a', 'href')
```

---

# CHAPTER 5: AI AGENT MASTERY

## Understanding Agents

OpenClaw uses sub-agents to handle specialized tasks. You can spawn agents for:
- Research tasks
- Content generation
- Code writing
- Data analysis

## Creating Sub-Agents

### Basic Spawn

```javascript
const agent = await subagents.spawn({
  task: 'Research the latest AI trends',
  mode: 'run'  // One-shot task
})
```

### Persistent Agent

```javascript
const agent = await subagents.spawn({
  task: 'Manage my email',
  mode: 'session',  // Ongoing agent
  thread: true  // Can be referenced later
})
```

## Prompt Engineering

### System Prompts

Set custom instructions in your config:

```yaml
system_prompt: |
  You are a professional copywriter.
  Always write in a friendly, conversational tone.
  Never use jargon.
```

### Few-Shot Examples

Include examples in your prompts:

```
Write a product description for:
Product: Running shoes
Tone: Energetic
Length: 50 words

Example:
Product: Yoga mat
Description: Find your zen with our premium yoga mat. Non-slip, eco-friendly, and perfect for any practice.
```

## Memory Management

### Short-Term Memory

OpenClaw automatically remembers the current conversation.

### Long-Term Memory

```javascript
// Save important info
memory.save('customer_preferences', {
  name: 'John',
  favorite_color: 'blue'
})

// Retrieve later
const prefs = memory.get('customer_preferences')
```

---

# CHAPTER 6: AUTOMATION & CRON JOBS

## Scheduling Tasks

### Basic Cron

```bash
openclaw cron add "0 9 * * *" morning-briefing
# Runs at 9 AM daily
```

### In Code

```javascript
await cron.schedule('0 9 * * *', async () => {
  await message.send({
    channel: 'telegram',
    chatId: 'YOUR_CHAT_ID',
    message: 'Good morning! Here is your daily briefing.'
  })
})
```

## Heartbeat Monitoring

Set up health checks:

```yaml
heartbeat:
  enabled: true
  interval: 300  # seconds
  channels:
    - telegram
```

## Example Automations

### Daily Research Report

```javascript
cron.schedule('0 8 * * *', async () => {
  // Search for industry news
  const news = await web_search({ query: 'AI trends 2026', count: 5 })
  
  // Format and send
  const message = formatNews(news)
  await telegram.send(message)
})
```

### Weekly Summary

```javascript
cron.schedule('0 18 * * Friday', async () => {
  const summary = await generateWeeklySummary()
  await discord.send(summary)
})
```

---

# CHAPTER 7: ADVANCED FEATURES

## MCP Server Integration

### What is MCP?

Model Context Protocol (MCP) lets OpenClaw connect to external tools and services.

### Setup

```bash
# Install MCP server
npm install -g @modelcontextprotocol/server-filesystem

# Configure
openclaw config add mcp ./mcp-servers/filesystem.json
```

### Example Configuration

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    }
  }
}
```

## Custom Skills

### Create a Skill

```bash
mkdir -p ~/.openclaw/skills/my-skill
```

### Skill Structure

```
my-skill/
├── SKILL.md
├── run.js
└── config.json
```

### SKILL.md Example

```markdown
# My Custom Skill

## Description
Processes customer orders

## Commands
- order <product> - Place an order
- status <order_id> - Check order status
```

## Node Pairing

Connect to your devices:

```bash
# On your computer
openclaw node pair

# On your phone (install OpenClaw app)
# Scan QR code
```

Now you can:
- Take photos remotely
- Get screenshots
- Run commands on paired devices

---

# CHAPTER 8: SECURITY BEST PRACTICES

## API Key Management

### Environment Variables

```bash
# Never commit keys to Git
export OPENAI_API_KEY="sk-..."
export TELEGRAM_TOKEN="123:ABC..."
```

### Secrets File

```yaml
# config/secrets.yaml (add to .gitignore)
api_keys:
  openai: sk-...
  telegram: 123:...
```

## Access Control

### Rate Limiting

```yaml
rate_limit:
  enabled: true
  requests_per_minute: 60
```

### Allowed Channels

```yaml
allowed_channels:
  - telegram:123456789
  - discord:channel_id
```

## Safe Browsing

### Sandbox Mode

```yaml
browser:
  sandbox: true
  headless: true
```

### Content Security

```javascript
// Don't execute unknown scripts
await browser.setContent(html, { runScripts: 'dangerously' })
```

---

# CHAPTER 9: USE CASES & EXAMPLES

## Use Case 1: Automated Research

```javascript
subagents.spawn({
  task: `Research ${topic}. Find:
  - Latest news
  - Top 5 companies
  - Market trends
  Format as bullet points.`
})
```

## Use Case 2: Content Generation

```javascript
async function generateBlogPost(topic) {
  const outline = await ai.prompt('Create outline for: ' + topic)
  const content = await ai.prompt('Write article from outline: ' + outline)
  return content
}
```

## Use Case 3: Customer Support

```javascript
on.message('customer', async (msg) => {
  const response = await ai.prompt(
    `Customer asks: ${msg.text}
     Help them with their issue.`
  )
  await message.reply(response)
})
```

## Use Case 4: Data Analysis

```javascript
async function analyzeData(file) {
  const data = await file.read(file)
  const insights = await ai.prompt(
    `Analyze this data and find patterns:
     ${JSON.stringify(data)}`
  )
  return insights
}
```

---

# CHAPTER 10: TROUBLESHOOTING

## Common Issues

### Bot Not Responding

1. Check status: `openclaw status`
2. Restart: `openclaw restart`
3. Check logs: `openclaw logs`

### Authentication Errors

- Verify API keys are correct
- Check token permissions
- Ensure channel is properly configured

### Browser Won't Start

```bash
# Reinstall browsers
openclaw browser install

# Check dependencies
playwright install-deps
```

### Memory Issues

```bash
# Check memory usage
openclaw status

# Clear cache
openclaw cache clear
```

## Getting Help

- Documentation: https://docs.openclaw.ai
- Discord: https://discord.gg/clawd
- GitHub Issues: https://github.com/openclaw/openclaw/issues

---

# CONCLUSION

Congratulations! You're now ready to master OpenClaw. Remember:

1. Start simple - automate one task at a time
2. Iterate - improve your automations gradually
3. Learn from logs - they're your best debugging tool
4. Join the community - learn from others

**Happy Automating!** 🤖

---

*© 2026 OpenClaw Blueprint*
*Version 1.0*
