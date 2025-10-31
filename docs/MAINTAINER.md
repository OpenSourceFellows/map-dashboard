# Maintainer Guide

This guide is for maintainers with write access to the repository.

**Key difference from contributors:** You can create branches directly in the main repository instead of forking.

## Branch Naming Patterns

Based on existing branches in the repository:

- `feature/` - New features (e.g., `feature/dark-mode`, `feature/navbar`)
- `chore/` - Maintenance tasks (e.g., `chore/switch-to-pnpm`, `chore/organize-files`)
- `docs/` - Documentation updates (e.g., `docs/update-readme-and-package-metadata`)
- `Issue-##` - Issue-specific work (e.g., `Issue-10`, `Issue-67`)

**Creating a branch:**
```bash
git checkout main
git pull origin main
git checkout -b <type>/<descriptive-name>
```

## Creating Pull Requests

Push your branch:

```bash
git push -u origin <your-branch-name>
```

Create PR using [GitHub CLI](https://cli.github.com/) (requires installation):

```bash
gh pr create --title "Your PR title" --fill
```

## Reviewing Pull Requests

### 1. Review in GitHub UI

- Check the **"Files changed"** tab
- Comment on lines if needed
- Approve or request changes

### 2. Check out PR locally (optional)

If you want to test it locally, use [GitHub CLI](https://cli.github.com/):

```bash
gh pr checkout <PR-number>
```

### 3. Merge Strategy

- Use **Squash and Merge** to keep history clean
- Optionally delete the contributor's branch (GitHub prompts by default)

## If a Contributor Will Submit More Work

Remind them to:
- Create a new branch for each PR
- Keep their fork synced regularly

## Optional: Automation Tools to Consider

- GitHub Actions – for linting, testing, or builds
- PR Labelers – auto-label PRs
- CODEOWNERS – assign reviewers automatically
