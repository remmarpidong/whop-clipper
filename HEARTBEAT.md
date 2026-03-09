# HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.

## n8n Site Keep-Alive
- Check https://n8n-qfu4.onrender.com every 5 minutes to prevent sleep
- Just fetch the page (HEAD request is enough)

## TeamStack Kanban (Every 30 min)
- Check https://teamstack-kanban.vercel.app
- Test API: /api/columns and /api/tasks
- If 200 OK and showing data: Working ✅
- If Loading... or error: Note issue ❌

## QA Checklist (Priya's test cases)
- [ ] Site loads without error
- [ ] Kanban columns display
- [ ] Tasks display from database
- [ ] API endpoints return data
