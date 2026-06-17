#!/bin/bash
# Watchdog para mantener el dev server vivo
cd /home/z/my-project

while true; do
  if ! pgrep -f "next-server" > /dev/null 2>&1; then
    echo "[$(date '+%H:%M:%S')] Dev server down, restarting..." >> /home/z/my-project/.zscripts/watchdog.log
    setsid /usr/local/bin/bun run dev < /dev/null > /home/z/my-project/dev.log 2>&1 &
    disown
    sleep 10
  fi
  sleep 5
done
