#!/bin/bash
# n8n Workflow Trigger Tool

N8N_URL="https://n8n-qfu4.onrender.com"

# Trigger a workflow webhook
trigger_workflow() {
  local webhook_path="$1"
  local payload="${2:-{}}"
  
  curl -s -X POST "${N8N_URL}/webhook/${webhook_path}" \
    -H "Content-Type: application/json" \
    -d "$payload"
}

# Get workflow status (if API available)
get_status() {
  curl -s -o /dev/null -w "%{http_code}" "${N8N_URL}/"
}

# Main command
CMD="$1"
shift

case "$CMD" in
  status)
    get_status
    ;;
  trigger)
    trigger_workflow "$@"
    ;;
  *)
    echo "Usage: $0 {status|trigger <webhook-path> [json-payload]}"
    ;;
esac
