# PRD Shard 06: BMAD Integration

**Parent Document:** [prd.md](prd.md)
**Last Updated:** October 26, 2025

---

## Table of Contents

1. [BMAD Overview](#bmad-overview)
2. [Installation & Management](#installation--management)
3. [Agent Integration](#agent-integration)
4. [Template System](#template-system)
5. [Workflow Orchestration](#workflow-orchestration)
6. [Customization & Extension](#customization--extension)

---

## BMAD Overview

### What is BMAD?

**BMAD (Balanced Method for Agile Development)** is a comprehensive framework for AI-assisted software development created by Brian Madison.

**Core Philosophy:**
- Structured, repeatable processes
- Role-based agent system
- Template-driven documentation
- Quality-focused workflows
- AI-native methodology

### BMAD Components

**10 Agent Roles:**
1. **Analyst** - Requirements analysis and research
2. **Product Owner (PO)** - Story creation and prioritization
3. **Architect** - System design and technical decisions
4. **Developer (Dev)** - Implementation and coding
5. **QA** - Testing and quality assurance
6. **Project Manager (PM)** - Documentation and coordination
7. **UX Expert** - User experience design
8. **Scrum Master (SM)** - Process facilitation
9. **BMAD Master** - Methodology guidance
10. **BMAD Orchestrator** - Multi-agent workflow coordination

**24 Structured Tasks:**
- Story creation and validation
- Architecture design
- Test design and execution
- Documentation generation
- Elicitation and requirements gathering
- Risk assessment
- And more...

**14 Document Templates:**
- Project Brief
- PRD (Product Requirements Document)
- Architecture Document
- User Story
- QA Gate Report
- Market Research
- Competitor Analysis
- And domain-specific templates

**6 Core Workflows:**
- Greenfield UI
- Greenfield Service
- Greenfield Fullstack
- Brownfield UI
- Brownfield Service
- Brownfield Fullstack

**5+ Expansion Packs:**
- Game Development (Unity, Phaser, Godot)
- Creative Writing
- Infrastructure/DevOps
- And more...

---

## Installation & Management

### Installation Process

**During Catalyst Build (GitHub Actions):**

```bash
# scripts/install-bmad.sh
#!/bin/bash
set -e

echo "Installing BMAD Method..."

npx bmad-method install \
  --full \
  --expansion-packs all \
  --ides all \
  --non-interactive

# Verify installation
if [ -f ".bmad-core/install-manifest.yaml" ]; then
    VERSION=$(grep "^version:" .bmad-core/install-manifest.yaml | awk '{print $2}')
    echo "✅ BMAD Method ${VERSION} installed successfully"
else
    echo "❌ BMAD installation verification failed"
    exit 1
fi
```

**Result:**
```
.bmad-core/                    # Core framework
├── agents/                    # 10 agent definitions
├── tasks/                     # 24 task templates
├── templates/                 # 14 document templates
├── workflows/                 # 6 core workflows
├── checklists/                # Quality checklists
├── data/                      # Reference data
└── utils/                     # Utility scripts

.bmad-2d-unity-game-dev/       # Expansion pack
.bmad-2d-phaser-game-dev/      # Expansion pack
.bmad-creative-writing/        # Expansion pack
.bmad-godot-game-dev/          # Expansion pack
.bmad-infrastructure-devops/   # Expansion pack
```

### User Installation

**During `catalyst setup`:**

```ruby
# lib/catalyst/bmad/installer.rb
module Catalyst
  module BMAD
    class Installer
      def install
        catalyst_bundle = "/opt/homebrew/opt/catalyst/share/catalyst/bundles"
        bmad_target = File.expand_path("~/.bmad-core")

        # Create symlinks to Catalyst bundles
        %w[agents tasks templates workflows checklists data utils].each do |dir|
          source = "#{catalyst_bundle}/bmad-core/#{dir}"
          target = "#{bmad_target}/#{dir}"

          FileUtils.mkdir_p(File.dirname(target))
          FileUtils.ln_sf(source, target) unless File.exist?(target)
        end

        # Link expansion packs
        Dir.glob("#{catalyst_bundle}/.bmad-*").each do |pack|
          pack_name = File.basename(pack)
          target = File.expand_path("~/#{pack_name}")
          FileUtils.ln_sf(pack, target) unless File.exist?(target)
        end

        puts "✅ BMAD Method installed successfully"
      end
    end
  end
end
```

### Update Management

**Preserving Customizations:**

```ruby
# lib/catalyst/bmad/updater.rb
module Catalyst
  module BMAD
    class Updater
      def update
        # 1. Detect customizations
        customizations = detect_customizations

        # 2. Backup customized files
        backup_customizations(customizations)

        # 3. Update symlinks to new Catalyst bundles
        update_symlinks

        # 4. Restore customizations
        restore_customizations(customizations)

        puts "✅ BMAD updated successfully"
        puts "Backed up customizations: #{customizations.count} files"
      end

      private

      def detect_customizations
        bmad_dir = File.expand_path("~/.bmad-core")
        custom_files = {}

        %w[agents tasks templates].each do |type|
          dir = "#{bmad_dir}/#{type}"
          next unless Dir.exist?(dir)

          Dir.glob("#{dir}/*.{md,yaml}").each do |file|
            # Skip symlinked files
            next if File.symlink?(file)

            # This is a user customization
            custom_files[file] = File.read(file)
          end
        end

        custom_files
      end

      def backup_customizations(customizations)
        return if customizations.empty?

        backup_dir = File.expand_path("~/.catalyst/backups")
        FileUtils.mkdir_p(backup_dir)

        timestamp = Time.now.strftime('%Y%m%d_%H%M%S')
        backup_file = "#{backup_dir}/bmad_customizations_#{timestamp}.yaml"

        File.write(backup_file, customizations.to_yaml)
      end

      def restore_customizations(customizations)
        customizations.each do |file_path, content|
          File.write(file_path, content)
        end
      end
    end
  end
end
```

---

## Agent Integration

### Agent Invocation

**In IDE (Continue.dev/Claude Code):**

```
User types: @analyst create project brief for e-commerce platform
            ↓
IDE routes to configured AI model
            ↓
AI receives prompt + agent context + available tools
            ↓
AI loads analyst agent definition from ~/.bmad-core/agents/analyst.md
            ↓
AI uses template from ~/.bmad-core/templates/project-brief-tmpl.yaml
            ↓
AI asks clarifying questions (task: advanced-elicitation.md)
            ↓
AI generates structured project brief
            ↓
AI uses Filesystem MCP to save to docs/project-brief.md
```

### Agent Definitions

**Example: Product Owner Agent**

```markdown
# File: ~/.bmad-core/agents/po.md

# Product Owner Agent

## Role
Create and manage user stories, epics, and product backlog using BMAD methodology.

## Capabilities
- Create user stories from requirements
- Write acceptance criteria
- Prioritize backlog
- Validate stories against DoD checklist
- Create epics for large features

## Available Commands
- `*create-story` - Create new user story
- `*create-epic` - Create epic
- `*validate-story` - Validate story against checklist
- `*help` - Show available commands

## Templates
- story-tmpl.yaml
- epic-tmpl.yaml
- qa-gate-tmpl.yaml

## Tasks
- create-next-story.md
- validate-next-story.md
- brownfield-create-story.md
- create-brownfield-epic.md

## Checklists
- story-draft-checklist.md
- story-dod-checklist.md
- po-master-checklist.md

## Workflow
1. Understand requirements from analyst/user
2. Use create-next-story task to generate story
3. Write acceptance criteria using template
4. Validate against DoD checklist
5. Save to docs/stories/ directory
6. Link to epic if applicable
```

### Agent-MCP Integration

**Agents have access to all MCP servers:**

```
@dev implement user authentication
  ↓
Dev agent decides to:
  1. Use Filesystem MCP to read existing auth code
  2. Use Git MCP to create feature branch
  3. Use Filesystem MCP to write new auth module
  4. Use Vite MCP to run tests
  5. Use Git MCP to commit changes
  6. Use GitHub MCP to create PR
```

---

## Template System

### Template Structure

**YAML-based templates with frontmatter:**

```yaml
# File: ~/.bmad-core/templates/story-tmpl.yaml
---
template_type: user_story
version: "1.0"
bmad_version: "4.44.1"
---

# User Story: [Story Title]

**ID:** STORY-XXX
**Epic:** [Epic Name/ID]
**Priority:** [High/Medium/Low]
**Points:** [Story Points]
**Status:** Draft

## As a...
[User role]

## I want to...
[Goal/Desire]

## So that...
[Benefit/Value]

## Acceptance Criteria

1. **Given** [initial context]
   **When** [action taken]
   **Then** [expected outcome]

2. **Given** [initial context]
   **When** [action taken]
   **Then** [expected outcome]

3. [Additional criteria...]

## Technical Notes

[Implementation details, API endpoints, data models, etc.]

## Dependencies

- [Dependency 1]
- [Dependency 2]

## Definition of Done

- [ ] Code implemented and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] QA gate passed
- [ ] Deployed to staging
- [ ] Product owner acceptance

## Related Stories

- [Link to related story]

---

*Generated with BMAD Method v4.44.1*
*Story created by: @po agent*
*Date: YYYY-MM-DD*
```

### Template Usage

**In Agent Workflow:**

```markdown
# File: ~/.bmad-core/tasks/create-next-story.md

## Task: Create Next Story

### Inputs
- Requirements or feature description
- Epic (optional)

### Process
1. Elicit details using advanced-elicitation.md
2. Load story-tmpl.yaml template
3. Fill in template fields:
   - Generate story ID (increment from last)
   - Determine priority based on elicitation
   - Write user role, goal, benefit
   - Create acceptance criteria (Given/When/Then)
   - Add technical notes
   - List dependencies
4. Validate against story-draft-checklist.md
5. Save to docs/stories/STORY-XXX.md
6. Link to epic if provided

### Outputs
- Completed user story document
- Story ID for reference
- Validation report
```

### Template Customization

**Project-specific templates:**

```yaml
# project/.catalyst/templates/custom-story-tmpl.yaml
---
template_type: user_story
extends: "~/.bmad-core/templates/story-tmpl.yaml"
version: "1.0"
project_specific: true
---

# User Story: [Story Title]

[... standard fields ...]

## Security Considerations
[Project requires security section]

## Performance Requirements
[Project requires performance criteria]

[... rest of template ...]
```

---

## Workflow Orchestration

### Workflow Definition

**Example: Greenfield Fullstack Workflow**

```yaml
# File: ~/.bmad-core/workflows/greenfield-fullstack.yaml
---
workflow_name: Greenfield Fullstack Application
workflow_type: greenfield
project_type: fullstack
version: "1.0"
---

phases:
  - phase: discovery
    name: "Discovery & Planning"
    agents: [analyst, po, architect]
    steps:
      - step: project_brief
        agent: analyst
        task: create-doc
        template: project-brief-tmpl.yaml
        output: docs/project-brief.md

      - step: requirements
        agent: analyst
        task: advanced-elicitation
        output: docs/requirements.md

      - step: prd
        agent: po
        task: create-doc
        template: prd-tmpl.yaml
        output: docs/prd.md
        depends_on: [project_brief, requirements]

      - step: architecture
        agent: architect
        task: create-doc
        template: fullstack-architecture-tmpl.yaml
        output: docs/architecture.md
        depends_on: [prd]

  - phase: story_creation
    name: "Backlog Creation"
    agents: [po]
    steps:
      - step: create_epics
        agent: po
        task: brownfield-create-epic
        output: docs/epics/
        depends_on: [prd]

      - step: create_stories
        agent: po
        task: create-next-story
        template: story-tmpl.yaml
        output: docs/stories/
        repeat: true
        depends_on: [create_epics]

  - phase: implementation
    name: "Implementation"
    agents: [dev, qa]
    steps:
      - step: implement_story
        agent: dev
        task: implement-story
        input: docs/stories/STORY-*.md
        repeat: true

      - step: qa_gate
        agent: qa
        task: qa-gate
        template: qa-gate-tmpl.yaml
        depends_on: [implement_story]

  - phase: deployment
    name: "Deployment"
    agents: [dev, pm]
    steps:
      - step: deploy
        agent: dev
        task: deploy-application

      - step: document
        agent: pm
        task: create-doc
        template: deployment-guide-tmpl.yaml
        output: docs/deployment.md
```

### Workflow Execution

**Manual Invocation:**

```
User: @bmad-orchestrator run greenfield-fullstack workflow
      ↓
Orchestrator loads workflow YAML
      ↓
Executes phases in sequence
      ↓
For each step:
  - Invokes appropriate agent
  - Provides task and template
  - Validates output
  - Moves to next step
      ↓
Reports progress and completion
```

**Progressive Invocation:**

```
User: @analyst create project brief
[Complete]

User: @po create PRD
[Uses project brief as input]
[Complete]

User: @architect design system
[Uses PRD as input]
[Complete]

User: @po create stories from PRD
[Generates multiple stories]
[Complete]

User: @dev implement STORY-001
[Implements story]
[Complete]
```

---

## Customization & Extension

### Project-Specific Agents

**Custom Agent Definition:**

```markdown
# project/.catalyst/agents/payment-expert.md

# Payment Expert Agent

## Role
Specialized agent for payment integration using Stripe API.

## Extends
- Dev agent (implementation capabilities)
- Architect agent (design patterns)

## Additional Capabilities
- Stripe API integration
- PCI compliance validation
- Payment flow design
- Webhook handling

## Custom Templates
- payment-integration-tmpl.yaml
- pci-checklist.md

## Workflows
- stripe-integration-workflow.yaml
```

### Custom Tasks

**Project-Specific Task:**

```markdown
# project/.catalyst/tasks/implement-stripe-payment.md

## Task: Implement Stripe Payment

### Prerequisites
- Stripe account and API keys
- Payment requirements defined

### Process
1. Review payment requirements in PRD
2. Load payment-integration-tmpl.yaml
3. Use Filesystem MCP to create payment service
4. Use Git MCP to create feature branch
5. Implement Stripe checkout
6. Implement webhook handlers
7. Use Vite MCP to run tests
8. Validate against pci-checklist.md
9. Use GitHub MCP to create PR

### Outputs
- Payment service implementation
- Test coverage report
- PCI compliance validation
```

### Expansion Pack Usage

**Game Development Example:**

```bash
# User installs Catalyst
brew install catalyst
catalyst setup

# BMAD core + game dev expansion pack installed

# User initializes game project
cd ~/Projects/my-game
catalyst init --type game

# Game-specific agents available:
@game-designer create game design doc
@game-architect design game architecture
@game-developer implement player movement
@game-qa test game mechanics
```

### Team Configurations

**Shared Team Configuration:**

```yaml
# project/.catalyst/team-config.yaml
---
team: "MyApp Team"
bmad_version: "4.44.1"

custom_agents:
  - payment-expert
  - analytics-expert

custom_workflows:
  - payment-integration-workflow

templates:
  story: project-story-tmpl.yaml
  architecture: project-arch-tmpl.yaml

mcp_servers:
  - github
  - docker
  - postgres
  - stripe-mcp  # Custom team MCP server

quality_standards:
  test_coverage: 80
  code_review: required
  qa_gate: required
```

**Distribution:**

```bash
# Team member clones repo
git clone https://github.com/team/myapp.git
cd myapp

# Initialize with team config
catalyst init --team-config .catalyst/team-config.yaml

# All team customizations applied
```

---

## Integration with MCP Servers

### BMAD Agents Use MCP Tools

**Example: Dev Agent + MCP Servers:**

```
User: @dev implement user authentication with JWT

Dev Agent Workflow:
1. Analyze requirements
2. Design implementation approach
3. Use Filesystem MCP:
   - Read existing auth code
   - Create new auth module files
4. Write JWT implementation
5. Use Git MCP:
   - Create feature branch: feature/jwt-auth
   - Stage changes
6. Use Vite MCP:
   - Run unit tests
   - Generate coverage report
7. Validate tests passing
8. Use Git MCP:
   - Commit with message
9. Use GitHub MCP:
   - Create pull request
   - Add PR description linking to story
10. Report completion to user
```

### Task Execution with Tools

**create-next-story task with MCP:**

```markdown
## Task: Create Next Story

1. Use Memory MCP to retrieve project context
2. Load story template from BMAD
3. Elicit requirements from user
4. Fill in template with gathered info
5. Use Filesystem MCP to save story to docs/stories/
6. Use Git MCP to commit story document
7. Return story ID and location
```

---

**Next:** Read [07-user-experience.md](07-user-experience.md) for UX design and interaction patterns.
