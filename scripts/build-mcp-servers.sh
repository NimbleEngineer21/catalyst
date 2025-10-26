#!/bin/bash
set -e

echo "🔧 Building MCP servers..."
echo ""

# List of MCP servers to build
MCP_SERVERS="docker postgres xcode storybook vite"

BUILD_COUNT=0
SKIP_COUNT=0

for server in $MCP_SERVERS; do
  if [ -d "mcp-servers/${server}" ]; then
    echo "📦 Building ${server} MCP server..."
    cd "mcp-servers/${server}"

    # Install dependencies if needed
    if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
      echo "  → Installing dependencies..."
      npm ci
    fi

    # Build the server
    echo "  → Compiling TypeScript..."
    npm run build

    # Run tests if available
    if grep -q "\"test\"" package.json; then
      echo "  → Running tests..."
      npm test || echo "  ⚠️  Tests failed for ${server}"
    fi

    cd ../..
    BUILD_COUNT=$((BUILD_COUNT + 1))
    echo "  ✓ ${server} built successfully"
    echo ""
  else
    echo "  ⚠️  Skipping ${server} (directory not found)"
    SKIP_COUNT=$((SKIP_COUNT + 1))
  fi
done

echo ""
echo "✅ MCP server build complete!"
echo "  Built: ${BUILD_COUNT}"
echo "  Skipped: ${SKIP_COUNT}"
echo ""
