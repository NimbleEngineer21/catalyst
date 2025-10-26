# Epic 6: Documentation & Launch Preparation

**Status:** Draft
**Priority:** P1 (Should Have)
**Estimated Stories:** 8
**Dependencies:** Epic 1-5 (all previous epics must be complete)

---

## Epic Goal

Create comprehensive user and developer documentation, implement CLI help text and error messages, add troubleshooting tools (`catalyst doctor`), and prepare launch materials, enabling users to successfully install, configure, and use Catalyst from day one.

---

## Epic Description

This epic delivers all documentation and user experience polish needed for launch, including:

- Comprehensive user guide and quick start
- Developer documentation and API references
- CLI help text for all commands
- Error messages and troubleshooting
- `catalyst doctor` diagnostic command
- MCP server documentation
- Video tutorials and examples
- Launch preparation materials

**Success Criteria:**
- Users can successfully install and configure Catalyst using only documentation
- All CLI commands have helpful `--help` output
- Error messages provide clear next steps
- `catalyst doctor` diagnoses common issues
- MCP server APIs are documented
- Developer contribution guide exists
- Launch checklist complete

---

## Stories

### 6.1 Create Comprehensive User Guide
**As a** user,
**I want** complete documentation on using Catalyst,
**so that** I can successfully install and use it without assistance.

**Acceptance Criteria:**
1. docs/guides/user-guide.md created
2. Installation section (Homebrew install)
3. Quick start guide (setup → init → first use)
4. Configuration guide (global and project configs)
5. MCP server guide (what they are, how to use them)
6. BMAD agent guide (how to invoke, what they do)
7. Troubleshooting section (common issues)
8. FAQ section
9. Examples for common workflows
10. Screenshots/asciicast demos where helpful

---

### 6.2 Create Developer Contribution Guide
**As a** developer,
**I want** documentation on contributing to Catalyst,
**so that** I can add features or fix bugs effectively.

**Acceptance Criteria:**
1. docs/guides/contributing.md created and comprehensive
2. **Getting Started**: Fork → clone → setup steps (with npm install, build, test)
3. **Development environment**: Local setup, required tools, recommended IDE extensions
4. **Code structure**: Explanation of src/, mcp-servers/, architecture
5. **Testing guidelines**: How to write tests, run tests, coverage requirements
6. **Pull request process**: Branch naming, commit messages, PR template usage
7. **Coding standards**: ESLint rules, Prettier config, TypeScript best practices
8. **Commit message conventions**: Format (e.g., "feat:", "fix:", "docs:")
9. **Release process**: Versioning, tagging, changelog updates
10. **How to add new MCP servers**: Step-by-step with template
11. **How to add new CLI commands**: Step-by-step with template
12. **First-time contributor guidance**: Good first issues, where to ask questions
13. **Code review expectations**: What reviewers look for, timelines
14. **Community standards**: Link to CODE_OF_CONDUCT, expected behavior

---

### 6.3 Implement CLI Help Text for All Commands
**As a** user,
**I want** helpful `--help` output for every command,
**so that** I understand how to use each command.

**Acceptance Criteria:**
1. `catalyst --help` shows overview and command list
2. `catalyst setup --help` explains setup wizard
3. `catalyst init --help` explains project initialization
4. `catalyst verify --help` explains verification
5. `catalyst update --help` explains update process
6. `catalyst doctor --help` explains diagnostics
7. `catalyst config --help` explains config management
8. `catalyst mcp --help` shows MCP subcommands
9. All help text includes examples
10. Help text follows consistent format

---

### 6.4 Implement Comprehensive Error Messages
**As a** user,
**I want** clear, actionable error messages,
**so that** I know how to fix problems when they occur.

**Acceptance Criteria:**
1. Error messages explain what went wrong
2. Error messages suggest next steps
3. Error messages reference documentation links when relevant
4. Error codes assigned to common errors
5. Errors logged to ~/.catalyst/logs/
6. `--verbose` flag provides detailed error info
7. Network errors handled gracefully with retry suggestions
8. Permission errors explain required permissions
9. Missing dependency errors suggest installation
10. Configuration errors show validation details

---

### 6.5 Implement `catalyst doctor` Diagnostic Command
**As a** user,
**I want** a diagnostic command to troubleshoot issues,
**so that** I can fix problems without manual investigation.

**Acceptance Criteria:**
1. src/cli/commands/doctor.ts created
2. Checks Node.js version (>= 20)
3. Checks macOS version (>= 13.0)
4. Checks Homebrew installation
5. Checks ~/.catalyst directory structure
6. Checks configuration file validity
7. Checks BMAD installation
8. Checks MCP server connectivity
9. Checks IDE detection
10. Tests Keychain access
11. Provides recommendations for each issue found
12. Generates diagnostic report for GitHub issues
13. `--fix` flag attempts auto-repair where possible

---

### 6.6 Create MCP Server API Documentation
**As a** developer,
**I want** API documentation for all MCP servers,
**so that** I understand what tools are available and how to use them.

**Acceptance Criteria:**
1. docs/mcp-servers/ directory created
2. Docker MCP documentation (tools, parameters, examples)
3. PostgreSQL MCP documentation
4. Xcode MCP documentation
5. Storybook MCP documentation
6. Vite MCP documentation
7. Official MCP servers documented (GitHub, Git, etc.)
8. Each tool has description, input schema, output format
9. Examples for common use cases
10. Error scenarios documented

---

### 6.7 Create Video Tutorials and Examples
**As a** user,
**I want** video tutorials and sample projects,
**so that** I can see Catalyst in action.

**Acceptance Criteria:**
1. Installation and setup video (< 5 minutes)
2. First project walkthrough video (< 10 minutes)
3. MCP server demo video (< 5 minutes)
4. BMAD agent usage video (< 10 minutes)
5. Sample project: React app with Catalyst
6. Sample project: Node.js backend with Catalyst
7. Sample project: Mobile app (iOS) with Catalyst
8. Videos uploaded to YouTube/hosting
9. Sample projects published on GitHub
10. README includes video links

---

### 6.8 Complete Launch Preparation Checklist
**As a** product owner,
**I want** a launch checklist to ensure readiness,
**so that** we don't miss critical items before going public.

**Acceptance Criteria:**
1. All tests passing (unit, integration, e2e)
2. Documentation reviewed for accuracy
3. All commands tested on fresh macOS
4. Homebrew formula tested on clean install
5. GitHub repository organized (labels, milestones, issues)
6. README polished with badges, screenshots
7. LICENSE file present (MIT)
8. CODE_OF_CONDUCT.md created
9. CONTRIBUTING.md finalized
10. Initial GitHub Issues for known feature requests
11. Community Discord server ready (if applicable)
12. Launch blog post/announcement drafted
13. Social media posts prepared
14. Product Hunt launch prepared
15. Analytics/telemetry (opt-in) configured

---

## Epic Dependencies

**Depends On:**
- Epic 1: Project Scaffolding
- Epic 2: Core CLI
- Epic 3: MCP Server Framework
- Epic 4: BMAD Integration
- Epic 5: Build & Release Pipeline

**Enables:**
- Public launch
- Community growth
- User adoption

---

## Technical Notes

**Documentation Tools:**
- Markdown for all documentation
- GitHub Pages for hosting (optional)
- Asciinema for terminal recordings
- OBS/ScreenFlow for video tutorials

**Architecture References:**
- [PRD Features: Documentation](../prd/03-features-and-requirements.md#user-experience-features)
- [PRD: Success Metrics](../prd/01-vision-and-goals.md#success-criteria)

**Launch Checklist Categories:**
- **Technical:** All features working, tests passing, build succeeds
- **Documentation:** Complete, accurate, helpful
- **Community:** Repository ready, support channels set up
- **Marketing:** Announcement materials ready
- **Legal:** License, CoC, proper attributions

**Error Message Guidelines:**
- Start with what failed
- Explain why it failed (if known)
- Suggest specific next steps
- Include documentation link if relevant
- Use consistent formatting
- Avoid jargon

**Doctor Command Checks:**
```
✅ Node.js version (20.10.0) - OK
✅ macOS version (14.1) - OK
✅ Homebrew installed - OK
✅ ~/.catalyst/ directory - OK
✅ Configuration valid - OK
✅ BMAD installed (4.44.1) - OK
❌ Docker MCP server - FAILED (Docker not running)
   → Start Docker Desktop and run: catalyst mcp test docker
✅ GitHub MCP server - OK
⚠️  Keychain access - WARNING (First time - permission needed)
   → Run 'catalyst setup' to configure API keys

Score: 8/10 - 1 error, 1 warning

Run 'catalyst doctor --fix' to attempt automatic repairs.
```

---

## Definition of Done

- [ ] All 8 stories completed and acceptance criteria met
- [ ] User guide complete and accurate
- [ ] Developer guide complete
- [ ] All CLI commands have --help text
- [ ] Error messages are clear and actionable
- [ ] `catalyst doctor` diagnoses common issues
- [ ] MCP server APIs documented
- [ ] Video tutorials published
- [ ] Sample projects created
- [ ] Launch checklist completed
- [ ] Documentation reviewed by at least 2 people
- [ ] Beta testing conducted
- [ ] Known issues documented
- [ ] Ready for public announcement
