# ==============================================================================
# INFO — MUST HAVE (future agents / operators)
# ------------------------------------------------------------------------------
# Edit tree:   /home/rootrecord/.ollama/skills/website/site
# Baks:        /home/rootrecord/Database/GITHUB/website-site.bak-*
# Public paths (Vercel stage):
#   /home           — core landing
#   /home/status    — ONLY status/energy board (globe iframe = only AWS hook)
#   /               — redirect → /home
#   /status,/energy — redirect → /home/status (legacy)
# Data API:    /api/energy  (stub until measured files)
# Truth tree:  /home/rootrecord/Database/ENERGY
#   soc/{delta2|river2pro}-last.json
#   watts/*-last.json
#   samples/read-*.json
# Empty/missing file → No data / Waiting. Never invent watts/SOC.
# AWS lander (rootrecord.cloud) untouched until cutover → /home.
# Owners: Grok Bot (page foundation) · Bruce (BLE/ENERGY writers) · Carly (seal)
# Layout rule: jobs.py-clean — banner, one owner path, labeled sections, no secrets.
# ==============================================================================

# HOW TO EDIT (no AI required)
#   1) Bak the files you will touch under Database/GITHUB/.
#   2) Change only one section (landing vs status board vs API stub).
#   3) Keep labeled comment blocks; do not invent live numbers.
#   4) Ship/deploy only after Carly re-seals (measured samples present).
