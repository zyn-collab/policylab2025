# Contributing Guide

Thank you for your interest in contributing to or customizing this ebook project!

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Pandoc (for DOCX conversion)
- Git
- A code editor (VS Code recommended)

### Setup Development Environment

1. Clone the repository
```bash
git clone <your-repo-url>
cd my-ebook
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open http://localhost:4321

## Project Structure

Understanding the codebase:

```
my-ebook/
├── scripts/           # Build pipeline scripts
├── src/
│   ├── components/   # Reusable Astro components
│   ├── content/      # Markdown content (gitignored except samples)
│   ├── data/         # Generated JSON data
│   ├── layouts/      # Page layouts
│   ├── pages/        # Route definitions
│   └── styles/       # CSS files
└── public/           # Static assets
```

## Development Workflow

### Making Changes

1. **Create a branch** for your changes
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes** to the relevant files

3. **Test locally**
```bash
npm run dev
# Test in browser
npm run build
npm run preview
```

4. **Commit your changes**
```bash
git add .
git commit -m "Description of changes"
```

5. **Push and create a pull request**
```bash
git push origin feature/your-feature-name
```

### Testing Content Pipeline

Test the conversion scripts:

1. Add a sample .docx to `input/`
2. Run conversion:
```bash
npm run clean:all  # Start fresh
npm run convert    # DOCX → Markdown
npm run process    # Markdown → Chapters
```
3. Verify output in `src/content/chapters/`
4. Check `src/data/toc.json`

## Code Style

### Astro Components

- Use `.astro` extension for components
- Prefer TypeScript for component props
- Keep components simple and focused

Example:
```astro
---
interface Props {
  title: string;
  optional?: boolean;
}

const { title, optional = false } = Astro.props;
---

<div class="component">
  <h2>{title}</h2>
  {optional && <p>Optional content</p>}
</div>

<style>
  .component {
    /* Component-scoped styles */
  }
</style>
```

### CSS

- Use CSS variables for theming
- Follow existing naming conventions
- Support both light and dark modes
- Mobile-first responsive design

```css
/* Good */
.element {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

/* Avoid */
.element {
  color: #333;  /* Hard-coded color */
}
```

### JavaScript

- Use vanilla JavaScript (no frameworks)
- Keep it minimal and progressive
- Add comments for complex logic

```javascript
// Good: Progressive enhancement
const toggle = document.getElementById('toggle');
toggle?.addEventListener('click', () => {
  // Handle click
});

// Avoid: Assuming elements exist
document.getElementById('toggle').addEventListener('click', ...);
```

## Adding Features

### Adding a New Page

1. Create file in `src/pages/`
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="My Page">
  <h1>My Page Content</h1>
</BaseLayout>
```

2. Link to it from sidebar or navigation

### Adding a New Component

1. Create file in `src/components/`
```astro
---
interface Props {
  // Define props
}
---

<div>
  <!-- Component markup -->
</div>

<style>
  /* Component styles */
</style>
```

2. Import and use in pages
```astro
---
import MyComponent from '../components/MyComponent.astro';
---

<MyComponent />
```

### Extending Content Schema

1. Edit `src/content/config.ts`
```typescript
const chaptersCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    newField: z.string().optional(),
  }),
});
```

2. Update frontmatter in chapter files
3. Update conversion scripts if auto-generating

### Adding CSS Variables

1. Add to `src/styles/global.css`:
```css
:root {
  --my-variable: #value;
}

html.dark {
  --my-variable: #dark-value;
}
```

2. Use in components:
```css
.element {
  color: var(--my-variable);
}
```

## Testing

### Manual Testing Checklist

Before submitting changes:

- [ ] Run `npm run build` successfully
- [ ] Test in development mode (`npm run dev`)
- [ ] Test production build (`npm run preview`)
- [ ] Verify both light and dark modes
- [ ] Test on mobile viewport
- [ ] Check browser console for errors
- [ ] Verify keyboard navigation works
- [ ] Test with sample content

### Browser Testing

Test in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Common Tasks

### Update Dependencies

```bash
npm update
npm run build  # Verify still works
```

### Debug Build Issues

```bash
# Clean everything and rebuild
npm run clean:all
rm -rf node_modules
npm install
npm run build
```

### Update Sample Content

Edit files in `src/content/chapters/`:
- `001-introduction.md`
- `002-getting-started.md`

These serve as examples for users.

## Pull Request Guidelines

When submitting a PR:

1. **Description**: Clearly explain what changes you made and why
2. **Testing**: Describe how you tested your changes
3. **Screenshots**: Include before/after screenshots for UI changes
4. **Documentation**: Update relevant docs if needed
5. **Breaking Changes**: Clearly mark any breaking changes

### PR Template

```markdown
## Description
[What does this PR do?]

## Motivation
[Why is this change needed?]

## Changes
- Change 1
- Change 2

## Testing
[How did you test this?]

## Screenshots
[If applicable]

## Checklist
- [ ] Code follows project style
- [ ] Tested locally
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## Reporting Issues

When reporting bugs:

1. **Search existing issues** first
2. **Use issue template** (if available)
3. **Include**:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment (OS, Node version, browser)
   - Error messages or screenshots

### Bug Report Template

```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Step 1
2. Step 2
3. See error

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- OS: [e.g., Windows 11, macOS 14]
- Node.js: [e.g., 18.17.0]
- Browser: [e.g., Chrome 120]
- Project version: [e.g., 1.0.0]

## Additional Context
[Any other relevant information]
```

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what's best for the project
- Show empathy towards other community members

## Questions?

If you have questions:

1. Check the documentation (README, ARCHITECTURE, etc.)
2. Search existing issues
3. Ask in discussions (if enabled)
4. Open a new issue with your question

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Markdown Guide](https://www.markdownguide.org/)
- [Pandoc Documentation](https://pandoc.org/MANUAL.html)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
