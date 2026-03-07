#!/bin/bash
# Facebook AutopilotBiz - OpenClaw Business Steps Focus (Fixed)

PAGE_ID="945969738609798"
TOKEN="EAAmKJZAGdg3IBQxCpY3fA8VIPBopXG4bl4pNObRWMHZASUHtAPjjLgweMRqOzOOPjZB9TqfCgRTauMWYf3asGYgZCEC9jNu2Xln9q7o2L6t6m0kZCEiU6OQ0OAu0XDHFCpCurzgl3ZCRqtxwnbqDB2kl9uFoFfRTMZATzZBaAnveiZCGh6e0iNP8oAHqJuZBhal81HSQZDZD"

# Check if image URL is valid
check_image() {
  local url="$1"
  local code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  [ "$code" = "200" ]
}

# Step-by-step focused posts
get_post() {
  local posts=(
    "🚀 How to Automate Your Business with OpenClaw (Step by Step)

Step 1: Install OpenClaw on your machine
Step 2: Connect your communication channels
Step 3: Define your AI employee tasks
Step 4: Let it run 24/7

Your AI employee is now working!

#OpenClaw #AI #Automation #Business #AutopilotBiz"
    
    "💰 How to Save \$5K/Month with AI Employees

Step 1: Identify repetitive tasks
Step 2: Set up OpenClaw to handle them
Step 3: Let AI work while you sleep
Step 4: Reclaim 20+ hours weekly

AI employee: \$0-50/month vs Human: \$3,000-10,000/month

#AIBusiness #CostSaving #Automation #AutopilotBiz"
    
    "🤖 How to Hire Your First AI Employee

Step 1: Download OpenClaw
Step 2: Define the role
Step 3: Give it access to your tools
Step 4: Set goals and let it work

No interviews. No onboarding. Just results.

#AIEmployee #Hiring #OpenClaw #Automation #AutopilotBiz"
    
    "⚡ How to Scale from 1 to 100 Customers

Step 1: Automate lead capture
Step 2: Set up automated follow-ups
Step 3: Let AI handle initial queries
Step 4: Focus only on closing deals

Scale = automation.

#Scale #Growth #AI #Business #AutopilotBiz"
    
    "📧 How to Never Miss a Customer

Step 1: Connect email to OpenClaw
Step 2: Set up instant response rules
Step 3: Create follow-up sequences
Step 4: Get notified only for urgent items

Your AI assistant handles the rest.

#CustomerService #Automation #OpenClaw #AutopilotBiz"
    
    "🎯 How to Close More Sales While Sleeping

Step 1: Set up OpenClaw as sales agent
Step 2: Give it product knowledge
Step 3: Let it qualify leads 24/7
Step 4: Wake up to booked calls

Your best salesman never sleeps.

#Sales #Automation #AI #Business #AutopilotBiz"
    
    "⏰ How to Get 2 Extra Hours Every Day

Step 1: List tasks you do daily
Step 2: Identify repetitive ones
Step 3: Automate with OpenClaw
Step 4: Use freed time for growth

What would you do with 2 extra hours?

#TimeManagement #Productivity #Automation #OpenClaw #AutopilotBiz"
    
    "🔥 How to Build a 24/7 Business

Step 1: Set up OpenClaw timezone
Step 2: Create automated workflows
Step 3: Connect global channels
Step 4: Serve customers worldwide

Day 1: You sleep. Day 365: Your business doesnt.

#24/7Business #Global #AI #Automation #AutopilotBiz"
    
    "📝 How to Automate Content Creation

Step 1: Define content topics
Step 2: Set up OpenClaw research agent
Step 3: Create writing templates
Step 4: Schedule auto-publishing

Consistency beats quality at first.

#ContentMarketing #Automation #AI #OpenClaw #AutopilotBiz"
    
    "💡 How to Start for FREE

Step 1: Install OpenClaw (free)
Step 2: Connect one channel (free)
Step 3: Automate one task
Step 4: Scale from there

Zero investment. Infinite potential.

#StartFree #NoMoneyDown #OpenClaw #Automation #AutopilotBiz"
  )
  echo "${posts[$RANDOM % ${#posts[@]}]}"
}

# Image prompts (use URL encoding in script)
get_image_prompt() {
  local prompts=(
    "AI robot"
    "futuristic brain"
    "rocket business"
    "growth chart"
    "24 clock"
    "content desk"
    "money computer"
    "global network"
  )
  echo "${prompts[$RANDOM % ${#prompts[@]}]}"
}

# Post to Facebook
MESSAGE=$(get_post)
IMG_PROMPT=$(get_image_prompt)

# Build URL with proper encoding
IMAGE_URL="https://image.pollinations.ai/prompt/$(echo "$IMG_PROMPT" | sed 's/ /%20/g')"

echo "Posting..."
echo "Image: $IMAGE_URL"

# Use --data-urlencode which handles encoding automatically
curl -s -X POST "https://graph.facebook.com/v18.0/${PAGE_ID}/feed" \
  --data-urlencode "message=$MESSAGE" \
  --data-urlencode "link=$IMAGE_URL" \
  -d "access_token=$TOKEN"
