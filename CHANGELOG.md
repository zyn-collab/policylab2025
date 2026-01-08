# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-15

### Added
- Initial release of static ebook website
- Astro-based static site generator
- DOCX to Markdown conversion pipeline
- Automatic chapter splitting and TOC generation
- Sticky sidebar navigation with collapsible sections
- Dark mode with localStorage persistence
- Search functionality across chapter titles
- Previous/Next chapter navigation
- Responsive design for all devices
- Markdown support with footnotes
- Sample chapters and content
- Comprehensive documentation:
  - README.md (main setup guide)
  - QUICKSTART.md (5-minute start)
  - WORD_TEMPLATE_GUIDE.md (content structure)
  - ARCHITECTURE.md (technical details)
  - EXTENDING.md (feature additions)
  - DEPLOYMENT_CHECKLIST.md (launch prep)
  - CONTRIBUTING.md (contributor guide)
  - PROJECT_SUMMARY.md (overview)
- Deployment configurations:
  - Netlify (netlify.toml)
  - Vercel (vercel.json)
  - GitHub Actions workflow
- Color palette with 5 accent colors
- Typography system (Roboto + IBM Plex Mono)
- Accessibility features (WCAG AA compliant)
- Clean/reset scripts

### Features
- Static site generation (no server needed)
- Content collections with type safety
- Hot reload in development
- Fast production builds
- SEO-friendly HTML output
- Optimized for hosting platforms

### Documentation
- 10+ documentation files
- Code examples throughout
- Clear setup instructions
- Troubleshooting guides
- Extension examples

---

## Template for Future Releases

## [Unreleased]

### Added
- New features added

### Changed
- Changes to existing functionality

### Deprecated
- Features marked for removal

### Removed
- Features removed

### Fixed
- Bug fixes

### Security
- Security improvements

---

## Version History

- **1.0.0** - Initial release (2025-01-15)

---

## How to Use This Changelog

When making changes:

1. Add entries under `[Unreleased]` section
2. Use categories: Added, Changed, Deprecated, Removed, Fixed, Security
3. Write user-friendly descriptions
4. Include issue/PR references if applicable

When releasing a version:

1. Move `[Unreleased]` items to new version section
2. Add release date
3. Update version in package.json
4. Tag release in git: `git tag v1.0.0`
