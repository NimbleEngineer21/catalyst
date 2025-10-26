# Epic 5: Build & Release Pipeline

**Status:** Draft
**Priority:** P0 (Must Have)
**Estimated Stories:** 7
**Dependencies:** Epic 1 (Project Scaffolding), Epic 2 (Core CLI), Epic 3 (MCP Servers), Epic 4 (BMAD Integration)

---

## Epic Goal

Implement a complete automated build and release pipeline using GitHub Actions that compiles TypeScript, builds MCP servers, bundles BMAD, creates tarballs, publishes to GitHub Releases, and automatically updates the Homebrew tap, enabling one-command distribution via `brew install catalyst`.

---

## Epic Description

This epic delivers the complete CI/CD infrastructure for Catalyst, including:

- Build scripts for CLI, MCP servers, and BMAD bundling
- GitHub Actions workflows for testing and releasing
- Homebrew formula for distribution
- Version management and changelog automation
- Release artifact creation and publishing
- Automated Homebrew tap updates

**Success Criteria:**
- Pushing a git tag triggers automated release
- Build artifacts include all necessary components
- Homebrew formula installs Catalyst successfully
- GitHub Releases are created automatically
- Homebrew tap is updated automatically
- Local builds work for development/testing
- CI/CD runs tests before releasing

---

## Stories

### 5.1 Create Build Scripts
**As a** developer,
**I want** scripts to build all Catalyst components,
**so that** I can create distribution packages locally and in CI/CD.

**Acceptance Criteria:**
1. scripts/build.sh created - builds complete tarball
2. scripts/build-mcp-servers.sh created - compiles all MCP servers
3. scripts/install-bmad.sh created - installs BMAD for bundling
4. scripts/test-install.sh created - validates local installation
5. All scripts have proper error handling
6. Scripts work on both Intel and Apple Silicon Macs
7. Build output directory structure matches Homebrew expectations
8. SHA256 checksum calculated for tarball
9. Scripts documented with usage examples

---

### 5.2 Create Homebrew Formula
**As a** user,
**I want** to install Catalyst via Homebrew,
**so that** I can get started quickly with a single command.

**Acceptance Criteria:**
1. Formula/catalyst.rb created
2. Formula follows Homebrew guidelines
3. Includes description, homepage, license
4. Depends on node@20
5. `install` block copies files to libexec
6. `post_install` creates ~/.catalyst directories
7. `test` block validates installation
8. `caveats` provides helpful next steps
9. Formula passes `brew audit --strict`

---

### 5.3 Implement GitHub Actions: CI Workflow
**As a** developer,
**I want** automated testing on every push and PR,
**so that** we catch issues before merging.

**Acceptance Criteria:**
1. .github/workflows/ci.yml created
2. Runs on push to main and all PRs
3. Sets up Node.js 20
4. Installs dependencies with npm ci
5. Runs TypeScript type checking
6. Runs ESLint
7. Runs Prettier check
8. Runs unit tests
9. Runs integration tests
10. Fails CI if any check fails

---

### 5.4 Implement GitHub Actions: Test Workflow
**As a** developer,
**I want** comprehensive testing across scenarios,
**so that** we ensure quality before release.

**Acceptance Criteria:**
1. .github/workflows/test.yml created
2. Runs on push and PR
3. Tests CLI commands
4. Tests MCP servers independently
5. Tests BMAD installation
6. Generates test coverage report
7. Uploads coverage to GitHub
8. Tests on both Intel and Apple Silicon (matrix)
9. Fails if coverage drops below 80%

---

### 5.5 Implement GitHub Actions: Release Workflow
**As a** developer,
**I want** automated releases when I push a git tag,
**so that** new versions are published without manual steps.

**Acceptance Criteria:**
1. .github/workflows/release.yml created
2. Triggers on tags matching 'v*' (e.g., v2.0.0)
3. Runs all tests first
4. Builds CLI via npm run build
5. Installs BMAD via scripts/install-bmad.sh
6. Builds MCP servers via scripts/build-mcp-servers.sh
7. Creates tarball via scripts/build.sh
8. Calculates SHA256 checksum
9. Creates GitHub Release with tarball
10. Uploads tarball as release artifact

---

### 5.6 Implement Homebrew Tap Auto-Update
**As a** developer,
**I want** the Homebrew tap updated automatically on release,
**so that** users can install the latest version immediately.

**Acceptance Criteria:**
1. Release workflow updates Homebrew formula
2. Clones homebrew-catalyst repository
3. Updates Formula/catalyst.rb with new version
4. Updates URL to point to new tarball
5. Updates SHA256 with calculated checksum
6. Commits and pushes to homebrew-catalyst repo
7. Uses GitHub token for authentication
8. Handles errors gracefully
9. Provides clear log output

---

### 5.7 Implement Version Management and Changelog
**As a** developer,
**I want** version management automated,
**so that** releases are properly tracked and documented.

**Acceptance Criteria:**
1. CHANGELOG.md created with format specification
2. Version in package.json is source of truth
3. Changelog updated before tagging release
4. Release notes generated from changelog
5. GitHub Release includes changelog section
6. Version bumping documented (manual for now)
7. Git tags follow semantic versioning (v2.0.0, v2.0.1, etc.)
8. Changelog format supports automated parsing

---

## Epic Dependencies

**Depends On:**
- Epic 1: Project Scaffolding (build tooling)
- Epic 2: Core CLI (artifact being built)
- Epic 3: MCP Server Framework (MCP servers being bundled)
- Epic 4: BMAD Integration (BMAD being bundled)

**Enables:**
- Public release of Catalyst
- Homebrew distribution
- Automated updates

---

## Technical Notes

**Key Technologies:**
- GitHub Actions for CI/CD
- Bash scripts for building
- Homebrew for distribution
- tar and shasum for packaging
- Git tags for versioning

**Architecture References:**
- [Build & Release Architecture](../architecture/05-build-and-release.md)
- [Deployment Architecture](../architecture/12-deployment-architecture.md)
- [PRD: Build Pipeline](../prd/04-technical-architecture.md#build--release-pipeline)

**Build Process Flow:**
```
1. Developer pushes git tag (e.g., v2.0.0)
2. GitHub Actions triggered
3. Run all tests
4. Build CLI (npm run build)
5. Install BMAD (npx bmad-method install)
6. Build MCP servers
7. Create tarball with all components
8. Calculate SHA256
9. Create GitHub Release
10. Update Homebrew formula
11. Push to homebrew-catalyst repo
12. Users can: brew install catalyst
```

**Critical Considerations:**
- Tarball must include node_modules (production only)
- BMAD bundles must be included in tarball
- All MCP servers must be compiled
- Formula must match tarball structure
- SHA256 must match for Homebrew
- Release must be tagged in git

**Testing Checklist:**
- Local build works (./scripts/build.sh)
- Local Homebrew install works (file:// URL)
- GitHub Actions workflow succeeds
- Release artifacts are complete
- Homebrew tap updates correctly
- Fresh install on clean Mac works

---

## Definition of Done

- [ ] All 7 stories completed and acceptance criteria met
- [ ] Build scripts create valid tarballs
- [ ] Homebrew formula works locally and remotely
- [ ] CI workflow runs on every push/PR
- [ ] Test workflow achieves 80%+ coverage
- [ ] Release workflow publishes to GitHub
- [ ] Homebrew tap auto-updates on release
- [ ] Version management documented
- [ ] CHANGELOG.md established
- [ ] End-to-end release tested on clean macOS
- [ ] Rollback procedures documented
