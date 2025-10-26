# Story 1.8: Configure GitHub Repository for Community

**Epic:** Epic 1 - Project Scaffolding & Development Environment
**Story ID:** 1.8
**Priority:** P0 (Must Have)
**Status:** Approved
**Estimated Effort:** 3 hours

---

## User Story

**As a** project maintainer,
**I want** the GitHub repository configured for community engagement,
**so that** contributors can easily participate and collaborate.

---

## Context

This story configures the GitHub repository settings and features to maximize community engagement, discoverability, and collaboration. This includes repository metadata, discussions, issue labels, branch protection, and social preview.

**Dependencies:**
- Story 1.6: Set Up Open-Source Community Foundation (uses issue templates, CODEOWNERS)
- Story 1.7: Create Multi-Audience Top-Level README (README is main landing page)
- Story 1.9: Initialize Git Repository and First Commit (repo must exist first)

**Enables:**
- Public repository launch
- Community contributions
- Issue tracking and project management
- Social sharing and discoverability

**Reference Documentation:**
- [OSS Community Readiness](../OSS_COMMUNITY_READINESS.md) - GitHub configuration guidance

---

## Acceptance Criteria

### 1. Repository Description
- [ ] Short description set (max 120 chars):
  - Example: "AI-powered development environment with BMAD methodology and MCP servers for automated workflows"
- [ ] Description is clear and compelling
- [ ] Includes key terms for searchability

### 2. Repository Topics/Tags
- [ ] Topics added for discoverability:
  - `ai`
  - `development-tools`
  - `mcp`
  - `model-context-protocol`
  - `homebrew`
  - `cli`
  - `typescript`
  - `bmad`
  - `automation`
  - `developer-experience`
  - `open-source`
  - `macos`
- [ ] Topics are relevant and accurate
- [ ] Maximum of 20 topics (GitHub limit)

### 3. GitHub Discussions
- [ ] GitHub Discussions enabled
- [ ] Categories configured:
  - **General** - General discussion
  - **Q&A** - Questions and answers
  - **Ideas** - Feature ideas and suggestions
  - **Show and Tell** - Community projects and showcases
  - **Announcements** - Project announcements (maintainers only)
- [ ] Welcome message posted in Announcements
- [ ] Categories have descriptions

### 4. Issues Configuration
- [ ] Issues enabled
- [ ] Issue templates visible (from Story 1.6)
- [ ] Labels configured:
  - **Type labels:**
    - `bug` (red) - Something isn't working
    - `enhancement` (blue) - New feature or request
    - `documentation` (green) - Documentation improvements
    - `question` (purple) - Further information is requested
  - **Priority labels:**
    - `priority: high` (red) - High priority
    - `priority: medium` (orange) - Medium priority
    - `priority: low` (yellow) - Low priority
  - **Status labels:**
    - `status: triage` (gray) - Needs triage
    - `status: in-progress` (yellow) - Currently being worked on
    - `status: blocked` (red) - Blocked by dependencies
  - **Community labels:**
    - `good first issue` (green) - Good for newcomers
    - `help wanted` (blue) - Extra attention is needed
    - `duplicate` (gray) - This issue already exists
    - `wontfix` (gray) - This will not be worked on
- [ ] Label colors and descriptions are clear

### 5. Wiki Configuration
- [ ] Wiki **disabled** with note to use `docs/` directory
  - Or: Wiki enabled with link to main documentation
- [ ] If disabled: README points to `docs/` for documentation

### 6. Branch Protection Rules
- [ ] Branch protection configured for `main`:
  - **Require pull request reviews** - At least 1 approval
  - **Require status checks** - CI must pass (when Epic 5 complete)
  - **Require branches to be up to date** - Enforce linear history
  - **Include administrators** - Applies to maintainers too
  - **Restrict force push** - Prevent force pushes
  - **Allow deletion** - Disabled
- [ ] Protection rules documented in CONTRIBUTING.md

### 7. Automatic Label Assignment
- [ ] `.github/labeler.yml` created (optional, for auto-labeling PRs):
  - Labels PRs based on files changed
  - Example: PRs touching `docs/` get `documentation` label
- [ ] GitHub Actions workflow for labeler (optional, Epic 5)

### 8. Repository Social Preview
- [ ] Social preview image created (1280x640 PNG)
  - Catalyst logo/branding
  - Project name
  - Tagline
  - Visually appealing design
- [ ] Image uploaded to repository settings
- [ ] Preview tested on Twitter/LinkedIn/etc.

### 9. Funding Configuration (Optional)
- [ ] `.github/FUNDING.yml` created
  - If accepting donations: Add sponsor links
  - If not yet: Add placeholder for future
  - Example:
    ```yaml
    # Funding options (coming soon)
    # github: [your-username]
    # ko_fi: catalyst
    ```
- [ ] Funding links working (if configured)

### 10. Repository Links
- [ ] All links in README point to correct locations
- [ ] Documentation links work
- [ ] Issue tracker link works
- [ ] Discussions link works
- [ ] License link works

---

## Technical Implementation Notes

### Repository Topics Selection

Choose topics that:
- Accurately describe the project
- Match what users would search for
- Include primary technologies (TypeScript, MCP, etc.)
- Include use cases (automation, development-tools)
- Are popular enough to be discovered

### GitHub Discussions Categories

```
General
  Description: General discussion about Catalyst
  Format: Discussion

Q&A
  Description: Ask questions and get help from the community
  Format: Q&A (with accepted answers)

Ideas
  Description: Share ideas for new features or improvements
  Format: Discussion

Show and Tell
  Description: Show off your projects using Catalyst
  Format: Discussion

Announcements
  Description: Official project announcements
  Format: Announcement (maintainers only)
```

### Issue Labels Configuration

```yaml
# Type labels
- name: bug
  color: d73a4a
  description: Something isn't working

- name: enhancement
  color: a2eeef
  description: New feature or request

- name: documentation
  color: 0075ca
  description: Documentation improvements

- name: question
  color: d876e3
  description: Further information is requested

# Priority labels
- name: "priority: high"
  color: b60205
  description: High priority

- name: "priority: medium"
  color: ff9800
  description: Medium priority

- name: "priority: low"
  color: fef2c0
  description: Low priority

# Status labels
- name: "status: triage"
  color: ededed
  description: Needs triage

- name: "status: in-progress"
  color: fbca04
  description: Currently being worked on

- name: "status: blocked"
  color: d93f0b
  description: Blocked by dependencies

# Community labels
- name: "good first issue"
  color: 7057ff
  description: Good for newcomers

- name: "help wanted"
  color: 008672
  description: Extra attention is needed

- name: duplicate
  color: cfd3d7
  description: This issue already exists

- name: wontfix
  color: ffffff
  description: This will not be worked on
```

### Branch Protection Rules

Navigate to: `Settings → Branches → Add rule`

Branch name pattern: `main`

Rules to enable:
- ✅ Require a pull request before merging
  - ✅ Require approvals: 1
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners
- ✅ Require status checks to pass before merging (when CI added)
  - ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Restrict who can push to matching branches
  - Only maintainers
- ✅ Do not allow bypassing the above settings (applies to administrators)

### Social Preview Image

**Required Specifications:**
- **Dimensions:** 1280x640 pixels (exactly - GitHub's required size)
- **File format:** PNG (recommended) or JPG
- **File size:** Under 1MB (GitHub limit)
- **Aspect ratio:** 2:1 (matches Open Graph standard)
- **Color mode:** RGB

**Design Elements to Include:**
1. **Catalyst Logo** - Prominent placement (top-left or center)
2. **Project Name** - "Catalyst" in large, readable font
3. **Tagline** - Brief description (e.g., "AI-Powered Development Environment")
4. **Visual Identity** - Background pattern, gradient, or tech imagery
5. **Technology Icons** - Optional: TypeScript, MCP, AI icons

**Design Best Practices:**
- Use high contrast for readability
- Avoid text smaller than 60px font size
- Test on both dark and light backgrounds
- Ensure text is readable when scaled down (Twitter, LinkedIn preview is smaller)
- Leave safe margins (50px) around edges
- Use brand colors consistently
- Avoid busy backgrounds that reduce text legibility

**Recommended Tools:**
- **Figma** - Professional design tool (free tier available)
- **Canva** - Easy templates (search "GitHub Social Preview")
- **Adobe Express** - Quick design with templates
- **Sketch** - macOS design app
- **GIMP** - Free open-source alternative

**Design Template Structure:**
```
┌────────────────────────────────────────────┐
│  [Logo]           CATALYST                  │
│                                             │
│  AI-Powered Development Environment         │
│  with BMAD Methodology & MCP Servers        │
│                                             │
│  [Tech Icons: TS · MCP · AI · CLI]          │
└────────────────────────────────────────────┘
```

**Upload Instructions:**
1. Navigate to: `Settings → General → Social preview`
2. Click "Upload an image"
3. Select your 1280x640 PNG file
4. Verify preview appears correctly

**Testing Your Image:**
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- Create a test share and verify image appears correctly

**Example Repository Social Previews for Inspiration:**
- [Vite](https://github.com/vitejs/vite)
- [Homebrew](https://github.com/Homebrew/brew)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Next.js](https://github.com/vercel/next.js)

**Placeholder Option:**
If design resources aren't immediately available:
1. Use a simple gradient background with text
2. GitHub's default generic preview is better than a poor-quality image
3. Can update later when professional design is ready

---

## Architecture References

- [OSS Community Readiness](../OSS_COMMUNITY_READINESS.md) - Complete GitHub setup guide
- [PRD: Metrics & Launch](../../prd/08-metrics-and-launch.md) - Launch strategy

---

## Testing Strategy

**For this story:**
- Verify repository description appears on GitHub
- Search GitHub for topics and verify Catalyst appears
- Test creating issues with templates
- Test GitHub Discussions categories
- Verify branch protection rules work (try force push)
- Preview social card on Twitter Card Validator
- Verify all links in README and docs work

**Success Criteria:**
- Repository is discoverable via GitHub search
- Issue templates work correctly
- Discussions are functional
- Branch protection prevents unauthorized changes
- Social preview looks good when shared

---

## Definition of Done

- [ ] All acceptance criteria met and verified
- [ ] Repository description set
- [ ] Topics/tags configured (12 topics)
- [ ] GitHub Discussions enabled with categories
- [ ] Issues enabled with comprehensive labels
- [ ] Wiki disabled (or configured with link to docs/)
- [ ] Branch protection rules configured for `main`
- [ ] Social preview image created and uploaded
- [ ] FUNDING.yml created (placeholder if not accepting donations yet)
- [ ] All repository links tested and working
- [ ] Settings documented in CONTRIBUTING.md (if applicable)
- [ ] Repository settings reviewed and approved by PO

---

## Notes

- **Timing:** This story is completed **after** Story 1.9 (initial commit) when repository is ready for public access
- **Repository Visibility:** Decide if starting as public or private
  - Public: Immediate community engagement
  - Private: Launch when more complete
- **Social Preview:** Create after branding/logo is finalized
- **Branch Protection:** May need to adjust rules as team grows
- **Labels:** Can add more labels as project evolves
- **Discussions vs Issues:**
  - Issues: Bug reports, feature requests (actionable)
  - Discussions: Questions, ideas, general discussion
- **Future Enhancements:**
  - GitHub Projects for roadmap tracking
  - Automated issue triaging with GitHub Actions
  - Issue templates with more validation
  - PR template auto-assignment
  - Stale issue bot
  - Release automation

---

**Created:** October 26, 2025
**Last Updated:** October 26, 2025
