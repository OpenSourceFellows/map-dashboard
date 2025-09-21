# Contributing Guide

Thank you for your interest in contributing to this project! 🎉  
Please follow these steps to submit your contributions smoothly.

## 🚀 Quick Start

### 1. Fork the Repository

Click the **"Fork"** button on the top right of this page to create a copy of the repository under your GitHub account.

### 2. Clone Your Fork Locally

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-FORK.git
cd YOUR-FORK
```

### 3. Add the Original Repo as a Remote

```bash
git remote add upstream https://github.com/OpenSourceFellows/map-dashboard.git
```

### 4. Create a New Branch for Your Work

    Never work directly on main or reuse old branches.

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

### 5. Make Your Changes

Make your changes locally, and commit them:

```bash
git add .
git commit -m "Add: brief description of your change"
```

### 6. Push the Branch to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request

- Go to your fork on GitHub
- Click “Compare & Pull Request”
- Make sure the base repository is the original repo
- Add a clear title and description
- Submit the PR 🚀

## 🔁 Keeping Your Fork Up-to-Date

Before starting new work, always sync your fork:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

## 🔧 Guidelines

- [ ] One feature/bugfix per branch.
- [ ] Write clear commit messages.
- [ ] Test your changes before submitting.
- [ ] Follow project coding conventions (if any).
- [ ] Be kind in code reviews and comments.

Thank you for contributing! 🙌
