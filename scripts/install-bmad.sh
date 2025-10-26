#!/bin/bash
set -e

echo "📚 Installing BMAD Method..."
echo ""

# Install BMAD with full configuration
echo "→ Running: npx bmad-method install --full --expansion-packs all --ides all --yes"
echo ""

npx bmad-method install \
  --full \
  --expansion-packs all \
  --ides all \
  --yes

echo ""
echo "→ Verifying BMAD installation..."

# Verify installation
if [ -d ".bmad-core" ]; then
  echo "✅ BMAD Core installed successfully"
  echo ""
  echo "Installed components:"
  ls -1 .bmad-core/ | sed 's/^/  • /'
  echo ""

  # Count expansion packs
  EXPANSION_COUNT=$(ls -1d .bmad-* 2>/dev/null | grep -v "\.bmad-core" | wc -l | tr -d ' ')
  if [ "$EXPANSION_COUNT" -gt 0 ]; then
    echo "Expansion packs installed: ${EXPANSION_COUNT}"
    ls -1d .bmad-* | grep -v "\.bmad-core" | sed 's/^/  • /'
    echo ""
  fi

  echo "✅ BMAD installation complete!"
else
  echo "❌ BMAD installation failed"
  echo "Expected .bmad-core directory not found"
  exit 1
fi
