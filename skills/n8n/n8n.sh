#!/bin/bash
# n8n Workflow Trigger

N8N_URL="https://n8n-qfu4.onrender.com"

case "$1" in
  status)
    curl -s -o /dev/null -w "%{http_code}" "$N8N_URL"
    ;;
  trigger)
    WEBHOOK="$2"
    PAYLOAD="${3:-{}}"
    curl -s -X POST "${N8N_URL}/webhook/${WEBHOOK}" \
      -H "Content-Type: application/json" \
      -d "$PAYLOAD"
    ;;
  *)
    echo "Usage: n8n {status|trigger <webhook-path> [json-payload]}"
    ;;
esac
