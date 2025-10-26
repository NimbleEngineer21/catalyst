# PRD Shard 02: User Personas & Use Cases

**Parent Document:** [prd.md](prd.md)
**Last Updated:** October 26, 2025

---

## Table of Contents

1. [User Personas](#user-personas)
2. [User Journeys](#user-journeys)
3. [Use Cases](#use-cases)
4. [User Stories](#user-stories)

---

## User Personas

### Primary Persona: Alex - The Solo Developer

**Demographics:**
- Age: 28
- Role: Full-stack Developer
- Experience: 5 years
- Location: San Francisco Bay Area
- Company: Startup (Series A)

**Tech Stack:**
- MacBook Pro M2
- VS Code
- React, Node.js, PostgreSQL
- Docker for local development
- GitHub for version control

**Goals:**
- Ship features faster
- Reduce context switching
- Learn best practices
- Maintain code quality
- Work efficiently with AI

**Pain Points:**
- Copy-pasting between ChatGPT and IDE
- Privacy concerns with cloud AI
- Lack of structured AI workflows
- Fragmented tooling
- Complex setup processes

**Motivation for Catalyst:**
- "I want AI that works with my tools, not separate from them"
- "I need local AI for client work (NDAs)"
- "I'm tired of configuring everything manually"
- "I want a proven methodology, not just autocomplete"

**Usage Pattern:**
- Daily driver for all development
- Uses 8-10 MCP servers regularly
- Invokes BMAD agents multiple times per day
- Values speed and reliability
- Contributes to open source

---

### Secondary Persona: Jordan - The Team Lead

**Demographics:**
- Age: 35
- Role: Engineering Manager / Tech Lead
- Experience: 12 years
- Location: Remote (Austin, TX)
- Company: Mid-size SaaS company (500 employees)

**Responsibilities:**
- Lead team of 6 developers
- Architecture decisions
- Code reviews
- Mentoring junior developers
- Process improvement

**Goals:**
- Standardize team development environment
- Improve team productivity
- Reduce onboarding time
- Ensure code quality and consistency
- Stay on top of new technologies

**Pain Points:**
- Inconsistent dev environments across team
- Junior devs struggle with setup
- AI tools not enterprise-friendly
- Lack of methodology adherence
- Security/privacy concerns with cloud AI

**Motivation for Catalyst:**
- "I can get my whole team set up in minutes"
- "BMAD provides structure for junior devs"
- "No licensing costs for my 6 person team"
- "Everything runs on our machines (security approved)"
- "Standardized workflows across projects"

**Usage Pattern:**
- Sets up team template configurations
- Creates custom MCP servers for internal tools
- Documents workflows for team
- Champions adoption through demos
- Reports issues and requests features

---

### Tertiary Persona: Sam - The BMAD Practitioner

**Demographics:**
- Age: 42
- Role: Senior Software Architect
- Experience: 18 years
- Location: London, UK
- Company: Consulting firm

**Background:**
- Early BMAD adopter
- Trains teams on agile methodologies
- Writes technical blog posts
- Conference speaker
- Open source contributor

**Goals:**
- Evangelize BMAD methodology
- Leverage AI to accelerate BMAD workflows
- Create reusable templates and workflows
- Build community around best practices
- Help others succeed with structured development

**Pain Points:**
- BMAD setup is manual and time-consuming
- No standard AI integration for BMAD
- Hard to demonstrate BMAD value quickly
- Each team implements BMAD differently
- Lack of tooling for BMAD workflows

**Motivation for Catalyst:**
- "Finally, BMAD with AI built-in!"
- "I can get clients up and running with BMAD in 10 minutes"
- "This is the reference implementation I've been waiting for"
- "Perfect demo platform for my talks"
- "Community will love this"

**Usage Pattern:**
- Uses all BMAD agents extensively
- Creates custom workflows for clients
- Contributes expansion packs
- Writes tutorials and guides
- Active in community/Discord
- Presents at conferences about Catalyst + BMAD

---

### Anti-Persona: Casey - The Windows Enterprise Developer

**Why Not a Target User:**
- Uses Windows exclusively (Catalyst is macOS-focused initially)
- Works in locked-down enterprise environment
- Cannot install tools without IT approval
- Required to use company-mandated IDEs
- No access to Homebrew or package managers

**Why This Matters:**
- Keeps scope focused for v2.0
- Linux/Windows support can come later (community-driven)
- Enterprise features are v3.0+ territory
- Different installation model needed for corporate environments

---

## User Journeys

### Journey 1: First-Time Installation (Alex)

**Trigger:** Alex hears about Catalyst on Hacker News

**Steps:**
1. **Discovery** (5 min)
   - Reads GitHub README
   - Watches 2-minute demo video
   - Checks system requirements
   - Decides to try it

2. **Installation** (10 min)
   - Runs `brew tap your-org/catalyst`
   - Runs `brew install catalyst`
   - Waits for download (~5 min)
   - Installation completes

3. **Setup** (15 min)
   - Runs `catalyst setup`
   - Wizard detects VS Code + Continue.dev
   - Prompts for GitHub token
   - Selects "Fullstack Web" preset
   - Optionally installs LM Studio
   - Configuration completes

4. **First Use** (10 min)
   - Restarts VS Code
   - Opens existing project
   - Types `@dev hello`
   - Agent responds with available tools
   - Tries `@dev create a user model`
   - Watches agent use MCP servers
   - Amazed it works!

5. **Adoption** (ongoing)
   - Uses Catalyst daily
   - Explores BMAD agents
   - Tries different MCP servers
   - Shares with coworkers

**Success Metrics:**
- Time to first successful AI interaction < 30 min
- Setup completion rate > 70%
- 7-day retention > 50%

**Pain Points to Avoid:**
- Confusing installation process
- Failures during setup
- Unclear next steps after install
- Poor initial experience with AI

---

### Journey 2: Team Rollout (Jordan)

**Trigger:** Jordan wants to standardize AI development for team

**Steps:**
1. **Evaluation** (1 week)
   - Tests Catalyst personally
   - Reviews security/privacy
   - Tests on team projects
   - Gets approval from leadership

2. **Planning** (3 days)
   - Creates team configuration template
   - Documents setup process
   - Prepares team demo
   - Schedules rollout meeting

3. **Rollout** (1 day)
   - Team demo and Q&A
   - Each dev installs Catalyst
   - Jordan helps with issues
   - Team shares configurations

4. **Adoption** (2 weeks)
   - Team uses in daily work
   - Jordan creates custom MCP server for internal API
   - Documents team workflows
   - Measures productivity impact

5. **Optimization** (ongoing)
   - Adds more MCP servers
   - Refines BMAD workflows
   - Trains new team members
   - Contributes improvements back

**Success Metrics:**
- Team setup time < 2 hours
- All team members successfully installed
- Daily active usage > 80% of team
- Positive feedback from team

---

### Journey 3: BMAD Workshop (Sam)

**Trigger:** Sam is conducting a 2-day BMAD training workshop

**Steps:**
1. **Preparation** (1 week before)
   - Creates workshop project template
   - Prepares exercises using BMAD agents
   - Tests all workflows
   - Creates handout materials

2. **Day 1: Introduction** (8 hours)
   - Morning: BMAD methodology overview
   - Attendees install Catalyst (30 min)
   - Afternoon: Hands-on with @analyst agent
   - Create project briefs using BMAD templates

3. **Day 2: Implementation** (8 hours)
   - Use @po to create stories
   - Use @architect for design
   - Use @dev to implement
   - Use @qa for testing
   - Complete mini-project with BMAD workflow

4. **Follow-up** (ongoing)
   - Attendees have working Catalyst + BMAD setup
   - Private Discord for continued support
   - Share additional resources
   - Collect feedback for next workshop

**Success Metrics:**
- 100% successful installations
- Attendees complete full BMAD workflow
- Positive workshop feedback
- Continued usage after workshop

---

## Use Cases

### Use Case 1: Implement New Feature with AI Assistance

**Actor:** Alex (Solo Developer)
**Frequency:** Daily
**Priority:** P0 (Must Have)

**Preconditions:**
- Catalyst installed and configured
- Project initialized with `catalyst init`
- GitHub repository connected

**Main Flow:**
1. Alex gets feature request from product manager
2. Uses `@analyst` to clarify requirements
3. Uses `@po` to create user story with acceptance criteria
4. Uses `@architect` to design implementation approach
5. Uses `@dev` to implement feature
   - Agent uses Git MCP to create branch
   - Agent uses Filesystem MCP to edit files
   - Agent generates tests
   - Agent runs tests with Vite MCP
6. Uses `@qa` to verify implementation
7. Uses `@dev` to create PR
   - Agent uses GitHub MCP to create PR
   - Agent adds description and links story
8. PR merged, feature complete

**Postconditions:**
- Feature implemented and tested
- PR created and merged
- Documentation updated
- Story marked complete

**Success Criteria:**
- Feature completed in < 2 hours (vs 4 hours without AI)
- All tests passing
- Code quality maintained
- Full BMAD process followed

---

### Use Case 2: Debug Production Issue

**Actor:** Alex
**Frequency:** Weekly
**Priority:** P0

**Preconditions:**
- Production error reported
- Access to logs and databases

**Main Flow:**
1. Alex gets error report
2. Uses `@dev` to analyze error logs
   - Agent uses Fetch MCP to get recent error logs
   - Agent identifies root cause
3. Uses `@dev` to check database state
   - Agent uses PostgreSQL MCP to query relevant tables
   - Agent identifies data inconsistency
4. Uses `@dev` to implement fix
   - Agent creates hotfix branch
   - Agent implements fix with tests
   - Agent runs tests locally
5. Uses `@qa` to verify fix
   - Agent runs additional edge case tests
6. Uses `@dev` to deploy
   - Agent creates PR
   - Agent monitors CI/CD pipeline

**Success Criteria:**
- Issue identified in < 15 minutes
- Fix implemented and tested in < 30 minutes
- Hotfix deployed in < 1 hour
- No new issues introduced

---

### Use Case 3: Onboard New Developer

**Actor:** Jordan (Team Lead)
**Frequency:** Monthly
**Priority:** P1

**Preconditions:**
- New developer has Mac
- GitHub access set up

**Main Flow:**
1. New developer joins team
2. Jordan provides onboarding checklist
3. New developer installs Catalyst
   ```bash
   brew install catalyst
   catalyst setup
   ```
4. Catalyst detects and configures IDE
5. New developer clones project repository
6. Runs `catalyst init` in project
7. Project-specific configuration applied
8. New developer has working environment

**Success Criteria:**
- Environment setup in < 30 minutes
- All team MCP servers configured
- First commit made same day
- No manual configuration needed

---

### Use Case 4: Create Project Documentation

**Actor:** Alex
**Frequency:** Per project start
**Priority:** P1

**Main Flow:**
1. Start new project
2. Use `@analyst` to create project brief
   - Agent asks clarifying questions
   - Agent generates structured brief using BMAD template
3. Use `@po` to create PRD
   - Agent expands brief into full PRD
   - Agent uses PRD template
4. Use `@architect` to create architecture document
   - Agent designs system architecture
   - Agent creates diagrams (text-based)
   - Agent documents tech stack choices
5. All docs saved in `docs/` directory
6. Docs tracked in Git

**Success Criteria:**
- Complete project documentation in < 2 hours
- All BMAD templates followed
- Documentation is clear and actionable
- Ready for team review

---

### Use Case 5: Set Up CI/CD Pipeline

**Actor:** Alex
**Frequency:** Per project
**Priority:** P1

**Main Flow:**
1. Alex wants to add GitHub Actions CI/CD
2. Uses `@dev create GitHub Actions workflow for this project`
3. Agent analyzes project:
   - Detects package.json (Node project)
   - Finds test scripts
   - Identifies Docker usage
4. Agent uses GitHub MCP to:
   - Create `.github/workflows/ci.yml`
   - Configure build, test, lint steps
   - Set up Docker build
   - Configure deploy to staging
5. Agent creates PR with workflow
6. Alex reviews and merges
7. Workflow runs on next commit

**Success Criteria:**
- CI/CD configured in < 15 minutes
- All tests run automatically
- Docker images built and pushed
- Deploy to staging automated

---

## User Stories

### Epic 1: Installation & Setup

**Story 1.1:** As a developer, I want to install Catalyst with one command so that I can get started quickly
- Acceptance: `brew install catalyst` completes successfully
- Acceptance: Installation takes < 10 minutes
- Acceptance: No manual dependencies required

**Story 1.2:** As a developer, I want Catalyst to detect my IDE automatically so that I don't have to configure it manually
- Acceptance: Detects VS Code, Cursor, Claude Code, Windsurf
- Acceptance: Detects Continue.dev extension if installed
- Acceptance: Provides appropriate configuration for detected IDE

**Story 1.3:** As a developer, I want an interactive setup wizard so that I can configure Catalyst for my needs
- Acceptance: Wizard presents clear options
- Acceptance: Intelligent defaults based on detected environment
- Acceptance: Can select MCP servers based on project type
- Acceptance: Setup completes in < 5 minutes

### Epic 2: Daily Development

**Story 2.1:** As a developer, I want to use BMAD agents in my IDE so that I can follow structured development workflows
- Acceptance: Can invoke `@analyst`, `@po`, `@architect`, `@dev`, `@qa`
- Acceptance: Agents use appropriate BMAD templates
- Acceptance: Agents have access to MCP servers
- Acceptance: Responses are contextual and helpful

**Story 2.2:** As a developer, I want MCP servers to work seamlessly so that agents can interact with my tools
- Acceptance: GitHub MCP creates PRs, issues, etc.
- Acceptance: Docker MCP manages containers
- Acceptance: PostgreSQL MCP queries databases
- Acceptance: All operations complete successfully

**Story 2.3:** As a developer, I want per-project configuration so that each project can have custom settings
- Acceptance: `catalyst init` creates project config
- Acceptance: Project config overrides global settings
- Acceptance: Multiple projects can have different configurations
- Acceptance: Config is git-friendly (small, readable files)

### Epic 3: Team Collaboration

**Story 3.1:** As a team lead, I want to share Catalyst configurations so that my team has consistent setups
- Acceptance: Can export configuration template
- Acceptance: Team members can import template
- Acceptance: Template includes MCP servers and BMAD settings
- Acceptance: Template can be version controlled

**Story 3.2:** As a team lead, I want to create custom MCP servers so that we can integrate internal tools
- Acceptance: Clear MCP server development guide
- Acceptance: TypeScript SDK available
- Acceptance: Can test servers locally
- Acceptance: Easy to distribute to team

### Epic 4: Maintenance & Updates

**Story 4.1:** As a developer, I want to easily update Catalyst so that I get new features and fixes
- Acceptance: `brew upgrade catalyst` updates to latest
- Acceptance: `catalyst update` applies configuration changes
- Acceptance: User customizations are preserved
- Acceptance: Update process is reversible

**Story 4.2:** As a developer, I want to troubleshoot issues easily so that I can fix problems myself
- Acceptance: `catalyst verify` checks installation
- Acceptance: `catalyst doctor` diagnoses common issues
- Acceptance: Clear error messages with actionable fixes
- Acceptance: Logs are accessible and readable

---

**Next:** Read [03-features-and-requirements.md](03-features-and-requirements.md) for detailed feature specifications.
