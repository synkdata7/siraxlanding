#!/bin/bash
# Empaqueta el proyecto Sirax en un ZIP limpio, listo para distribuir.
# Excluye: node_modules, .next, .git, db local, logs, cache, etc.

set -euo pipefail

PROJECT_DIR="/home/z/my-project"
OUTPUT_FILE="/home/z/my-project/download/sirax.zip"

cd "$PROJECT_DIR"

# Limpia cualquier zip previo
rm -f "$OUTPUT_FILE"

# Lista de exclusiones (patrones para zip -r)
EXCLUDES=(
  "node_modules/*"
  "node_modules"
  ".next/*"
  ".next"
  ".git/*"
  ".git"
  ".zscripts/*"
  ".zscripts"
  "dev.log"
  "server.log"
  "db/*"
  "db"
  "download/*"
  "download"
  "upload/*"
  "upload"
  "skills/*"
  "skills"
  "examples/*"
  "examples"
  "mini-services/*"
  "mini-services"
  ".env"
  "*.log"
  ".DS_Store"
  "Thumbs.db"
  "bun.lock"
  ".vscode"
  ".idea"
)

# Construye argumentos -x para zip
EXCLUDE_ARGS=()
for pattern in "${EXCLUDES[@]}"; do
  EXCLUDE_ARGS+=("-x" "$pattern")
done

# Empaqueta
echo "📦 Empaquetando Sirax..."
zip -r "$OUTPUT_FILE" . \
  -x "node_modules/*" \
  -x "node_modules" \
  -x ".next/*" \
  -x ".next" \
  -x ".git/*" \
  -x ".git" \
  -x ".zscripts/*" \
  -x ".zscripts" \
  -x "dev.log" \
  -x "server.log" \
  -x "db/*" \
  -x "db" \
  -x "download/*" \
  -x "download" \
  -x "upload/*" \
  -x "upload" \
  -x "skills/*" \
  -x "skills" \
  -x "examples/*" \
  -x "examples" \
  -x "mini-services/*" \
  -x "mini-services" \
  -x ".env" \
  -x "*.log" \
  -x ".DS_Store" \
  -x "Thumbs.db" \
  -x "bun.lock" \
  -x ".vscode/*" \
  -x ".idea/*" \
  > /dev/null

# Resultado
SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
ENTRIES=$(unzip -l "$OUTPUT_FILE" | tail -1 | awk '{print $2}')
echo "✅ ZIP creado: $OUTPUT_FILE"
echo "   Tamaño: $SIZE"
echo "   Archivos: $ENTRIES"
