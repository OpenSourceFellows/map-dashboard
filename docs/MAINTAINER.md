1. **Review in GitHub UI**:

   - Check "Files changed" tab.
   - Comment on lines if needed.
   - Approve or request changes.

2. **Check out the PR locally (optional)**:
   If you want to test it locally:

   ```bash
   gh pr checkout <PR-number>
   ```

3. **Merge strategy:**

- Use Squash and Merge to keep history clean.
- Optionally delete the contributor’s branch (GitHub asks this by default).

---

### 🔁 If the Contributor Will Submit More Work

- Remind them to:
  - Create a new branch for each PR.
  - Keep their fork synced regularly.

---

### 🧪 Optional: Automation Tools to Consider

- GitHub Actions – for linting, testing, or builds.
- PR Labelers – auto-label PRs.
- CODEOWNERS – assign reviewers automatically.
