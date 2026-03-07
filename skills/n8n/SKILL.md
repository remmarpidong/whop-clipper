# n8n Skill

Use n8n workflows via webhooks.

## Setup

Your n8n URL: `https://n8n-qfu4.onrender.com`

## Usage

### Trigger a workflow
```bash
# Create a workflow in n8n with a Webhook node
# Set the webhook path (e.g., "my-workflow")

# Then trigger it:
curl -X POST "https://n8n-qfu4.onrender.com/webhook/my-workflow" \
  -H "Content-Type: application/json" \
  -d '{"data": "your payload"}'
```

### Check n8n status
```bash
curl -s -o /dev/null -w "%{http_code}" "https://n8n-qfu4.onrender.com"
```

## Create a Workflow in n8n

1. Go to n8n → New → Workflow
2. Add a **Webhook** node as the trigger
3. Set the webhook path (e.g., `send-tweet`, `process-lead`)
4. Connect actions (Slack, Email, etc.)
5. Click "Test workflow" to get the URL
6. Save and activate

Then I can trigger it by calling that webhook URL!
