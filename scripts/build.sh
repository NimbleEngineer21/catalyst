#!/bin/bash
set -e

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")

echo "🏗️  Building Catalyst ${VERSION}..."
echo ""

# 1. Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf build/
mkdir -p build/catalyst

# 2. Install dependencies (if not already done)
echo "📦 Installing dependencies..."
if [ ! -d "node_modules" ]; then
  npm ci
fi

# 3. Build CLI
echo "🔨 Building CLI..."
npm run build

# 4. Install production dependencies only
echo "📦 Installing production dependencies..."
npm ci --production --ignore-scripts

# 5. Copy compiled CLI
echo "📋 Copying compiled CLI..."
mkdir -p build/catalyst/dist
cp -r dist/* build/catalyst/dist/

# 6. Copy node_modules (production only)
echo "📚 Copying dependencies..."
cp -r node_modules build/catalyst/

# 7. Copy source files
echo "📄 Copying project files..."
cp -r bin templates config build/catalyst/ 2>/dev/null || true
cp package.json package-lock.json tsconfig.json LICENSE README.md build/catalyst/

# 8. Copy MCP servers (if they exist)
echo "🔧 Copying MCP servers..."
mkdir -p build/catalyst/mcp-servers
for server in docker postgres xcode storybook vite; do
  if [ -d "mcp-servers/${server}/dist" ]; then
    echo "  ✓ Copying ${server} MCP server..."
    mkdir -p build/catalyst/mcp-servers/${server}
    cp -r mcp-servers/${server}/dist build/catalyst/mcp-servers/${server}/
    cp mcp-servers/${server}/package.json build/catalyst/mcp-servers/${server}/ 2>/dev/null || true
  else
    echo "  ⚠️  Warning: mcp-servers/${server}/dist not found (will be created later)"
  fi
done

# 9. Copy BMAD bundles (if they exist)
echo "📚 Copying BMAD bundles..."
mkdir -p build/catalyst/bundles
if ls .bmad-* 1> /dev/null 2>&1; then
  cp -r .bmad-* build/catalyst/bundles/
  echo "  ✓ BMAD bundles copied"
else
  echo "  ⚠️  Warning: No BMAD bundles found (run ./scripts/install-bmad.sh first)"
fi

# 10. Copy docs
echo "📖 Copying documentation..."
mkdir -p build/catalyst/docs
cp -r docs/* build/catalyst/docs/ 2>/dev/null || true

# 11. Create tarball
echo "📦 Creating tarball..."
cd build
tar -czf "catalyst-${VERSION}.tar.gz" catalyst/
cd ..

# 12. Calculate checksum
SHA256=$(shasum -a 256 "build/catalyst-${VERSION}.tar.gz" | awk '{print $1}')

echo ""
echo "✅ Build complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Package: build/catalyst-${VERSION}.tar.gz"
echo "📏 Size: $(du -h "build/catalyst-${VERSION}.tar.gz" | awk '{print $1}')"
echo "🔐 SHA256: ${SHA256}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "  1. Test the build: tar -xzf build/catalyst-${VERSION}.tar.gz && cd catalyst && node dist/index.js --version"
echo "  2. Update Formula/catalyst.rb with the new SHA256"
echo "  3. Create a git tag: git tag v${VERSION}"
echo "  4. Push the tag: git push origin v${VERSION}"
echo ""
