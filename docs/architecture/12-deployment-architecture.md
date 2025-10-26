# Deployment Architecture

**Version:** 0.1.0
**Last Updated:** October 26, 2025

[Back to Architecture Index](README.md)

---

## Homebrew Distribution

### Homebrew Formula (`Formula/catalyst.rb`)

```ruby
class Catalyst < Formula
  desc "AI-powered development environment with MCP servers and BMAD methodology"
  homepage "https://github.com/your-org/catalyst"
  url "https://github.com/your-org/catalyst/releases/download/v0.1.0/catalyst-0.1.0.tar.gz"
  sha256 "CALCULATED_DURING_BUILD"
  version "0.1.0"
  license "MIT"

  depends_on "node@20"

  def install
    # Install to libexec to avoid conflicts
    libexec.install Dir["*"]

    # Create bin symlink
    bin.install_symlink libexec/"bin/catalyst"

    # Install node_modules
    system "npm", "install", "--production", "--prefix", libexec

    # Set up shell completions (optional future feature)
    # bash_completion.install "completions/catalyst.bash"
    # zsh_completion.install "completions/_catalyst"
  end

  def post_install
    # Create catalyst directory in user home
    (var/"catalyst").mkpath
    (var/"catalyst/logs").mkpath
    (var/"catalyst/cache").mkpath

    ohai "Catalyst installed successfully!"
    ohai "Run 'catalyst setup' to configure your environment"
  end

  test do
    system bin/"catalyst", "--version"
    assert_match "0.1.0", shell_output("#{bin}/catalyst --version")
  end
end
```

---

## Release Process

### 1. Update Version
```bash
# Update package.json
npm version patch|minor|major
```

### 2. Update CHANGELOG.md
```markdown
## [2.1.0] - 2025-11-15
### Added
- New MCP server for Redis
### Fixed
- Bug in setup wizard
```

### 3. Create Git Tag
```bash
git add .
git commit -m "chore: release v2.1.0"
git tag v2.1.0
git push origin main --tags
```

### 4. GitHub Actions Handles
- Building CLI
- Running tests
- Installing BMAD
- Building MCP servers
- Creating tarball
- Publishing GitHub Release
- Updating Homebrew tap

### 5. User Installation
```bash
brew upgrade catalyst
catalyst update
```

---

## Version Management

### Semantic Versioning

- **MAJOR** (0.1.0): Breaking changes
- **MINOR** (2.1.0): New features, backwards compatible
- **PATCH** (2.0.1): Bug fixes

### Version stored in:
- `package.json` - Single source of truth
- `Formula/catalyst.rb` - Updated automatically by CI

---

## Related Sections

- [Build & Release](05-build-and-release.md) - Build automation and GitHub Actions
- [Technology Stack](02-technology-stack.md) - Distribution technologies
- [Overview](01-overview.md) - Distribution layer architecture
