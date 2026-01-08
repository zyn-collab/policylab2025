# Documentation Index

Welcome to the my-ebook documentation! This index helps you find the right documentation for your needs.

## Quick Links by Task

### I want to...

**Get started quickly**
→ [QUICKSTART.md](QUICKSTART.md) - 5-minute setup guide

**Understand the full system**
→ [README.md](README.md) - Comprehensive setup and usage guide

**Convert my Word document**
→ [WORD_TEMPLATE_GUIDE.md](WORD_TEMPLATE_GUIDE.md) - How to structure your document

**Deploy to production**
→ [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pre-launch verification

**Add new features**
→ [EXTENDING.md](EXTENDING.md) - Feature extension guide

**Understand the architecture**
→ [ARCHITECTURE.md](ARCHITECTURE.md) - Technical deep-dive

**Contribute or customize**
→ [CONTRIBUTING.md](CONTRIBUTING.md) - Developer guide

**Get an overview**
→ [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete project summary

## Documentation Files

### For Users

| File | Purpose | When to Read |
|------|---------|--------------|
| [QUICKSTART.md](QUICKSTART.md) | Fast 5-minute setup | Starting out, want to preview quickly |
| [README.md](README.md) | Complete user guide | Setting up, need detailed instructions |
| [WORD_TEMPLATE_GUIDE.md](WORD_TEMPLATE_GUIDE.md) | Word document structure | Before creating content |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Pre-deployment checks | Before going live |

### For Developers

| File | Purpose | When to Read |
|------|---------|--------------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical architecture | Understanding internals, debugging |
| [EXTENDING.md](EXTENDING.md) | Adding features | Want to add functionality |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guide | Want to contribute code |

### Reference

| File | Purpose | When to Read |
|------|---------|--------------|
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Complete overview | Want high-level understanding |
| [CHANGELOG.md](CHANGELOG.md) | Version history | Checking what's changed |
| [LICENSE](LICENSE) | MIT License | Legal/licensing questions |

## By Experience Level

### Beginner (New to static sites)

1. Start with [QUICKSTART.md](QUICKSTART.md)
2. Read [WORD_TEMPLATE_GUIDE.md](WORD_TEMPLATE_GUIDE.md) to structure your content
3. Follow [README.md](README.md) for detailed setup
4. Use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) when ready to deploy

### Intermediate (Familiar with web development)

1. Skim [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for overview
2. Review [ARCHITECTURE.md](ARCHITECTURE.md) to understand structure
3. Check [EXTENDING.md](EXTENDING.md) for customization options
4. Refer to [README.md](README.md) as needed

### Advanced (Want to contribute)

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) thoroughly
2. Review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
3. Check [EXTENDING.md](EXTENDING.md) for extension patterns
4. Use [README.md](README.md) as reference

## By Content Type

### Setup & Installation
- [QUICKSTART.md](QUICKSTART.md) - Fast setup
- [README.md](README.md) - Detailed installation
- Prerequisites and dependencies

### Content Creation
- [WORD_TEMPLATE_GUIDE.md](WORD_TEMPLATE_GUIDE.md) - Document structure
- [README.md](README.md) - Conversion workflow
- Markdown formatting guide

### Customization
- [EXTENDING.md](EXTENDING.md) - Adding features
- [README.md](README.md) - Basic customization
- CSS and component modification

### Deployment
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pre-deployment
- [README.md](README.md) - Platform-specific guides
- Configuration files (netlify.toml, vercel.json)

### Development
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development workflow
- [EXTENDING.md](EXTENDING.md) - Extension patterns

### Reference
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete overview
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [LICENSE](LICENSE) - Legal information

## Troubleshooting Guide

**Problem**: Can't get started
→ Read [QUICKSTART.md](QUICKSTART.md) section by section

**Problem**: Pandoc not found
→ See [README.md](README.md) "Prerequisites" section

**Problem**: Chapters not generating correctly
→ See [WORD_TEMPLATE_GUIDE.md](WORD_TEMPLATE_GUIDE.md) for proper heading structure

**Problem**: Build failing
→ Check [README.md](README.md) "Troubleshooting" section

**Problem**: Dark mode not working
→ See [ARCHITECTURE.md](ARCHITECTURE.md) "Theme System" section

**Problem**: Want to add a feature
→ Follow examples in [EXTENDING.md](EXTENDING.md)

**Problem**: Understanding the codebase
→ Start with [ARCHITECTURE.md](ARCHITECTURE.md)

**Problem**: Ready to deploy
→ Use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

## Reading Order Recommendations

### For First-Time Users
1. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Get the big picture
2. [QUICKSTART.md](QUICKSTART.md) - Try it out
3. [WORD_TEMPLATE_GUIDE.md](WORD_TEMPLATE_GUIDE.md) - Create content
4. [README.md](README.md) - Deep dive as needed

### For Customizers
1. [README.md](README.md) - Understand the basics
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Learn the structure
3. [EXTENDING.md](EXTENDING.md) - Add your features
4. [CONTRIBUTING.md](CONTRIBUTING.md) - Best practices

### For Contributors
1. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Overview
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details
3. [CONTRIBUTING.md](CONTRIBUTING.md) - Guidelines
4. [README.md](README.md) - User perspective

## Documentation Standards

All documentation follows these principles:

- **Clear**: Written for the target audience
- **Actionable**: Includes specific steps
- **Complete**: Covers common scenarios
- **Current**: Updated with code changes
- **Examples**: Shows real code/commands

## Getting Help

If you can't find what you need:

1. **Search**: Use your editor's search across all .md files
2. **Check README**: Most common tasks are in [README.md](README.md)
3. **Review Examples**: [EXTENDING.md](EXTENDING.md) has many code examples
4. **Technical Deep Dive**: [ARCHITECTURE.md](ARCHITECTURE.md) explains how it works

## Contributing to Documentation

Found a mistake or want to improve docs?

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Edit the relevant .md file
3. Submit a pull request

Documentation improvements are always welcome!

---

## Quick Reference Card

```
Setup:        npm install
Convert:      npm run convert
Process:      npm run process
Develop:      npm run dev
Build:        npm run build
Preview:      npm run preview
Clean:        npm run clean
Deploy:       git push (with CI/CD)

Files:
input/        → Place .docx here
src/content/  → Generated chapters
src/data/     → Generated TOC
dist/         → Built site
```

---

**Still lost?** Start with [QUICKSTART.md](QUICKSTART.md) - you'll be up and running in 5 minutes! 📚
