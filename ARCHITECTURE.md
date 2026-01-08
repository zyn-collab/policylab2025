# Architecture Documentation

This document explains the technical architecture and design decisions of the ebook website.

## Technology Stack

- **Framework**: Astro 4.x (static site generator)
- **Content**: Markdown with MDX support
- **Styling**: Pure CSS with CSS variables
- **Build**: Node.js-based build pipeline
- **Conversion**: Pandoc (external dependency)

## Design Principles

1. **Static-first**: Everything generates to static HTML/CSS/JS
2. **Progressive enhancement**: Works without JavaScript, enhanced with it
3. **Semantic HTML**: Proper heading hierarchy and document structure
4. **Accessibility**: Keyboard navigation, ARIA labels, focus management
5. **Performance**: Minimal JavaScript, no client-side routing overhead

## Directory Structure

```
my-ebook/
├── input/                          # User's source .docx files
├── temp/                          # Temporary conversion artifacts
│   ├── raw-markdown/              # Initial Pandoc output
│   └── media/                     # Extracted images
├── scripts/                       # Build pipeline scripts
│   ├── convert-docx.js           # Pandoc wrapper
│   └── process-chapters.js       # Chapter splitter
├── src/
│   ├── components/               # Astro components
│   │   └── Sidebar.astro        # Navigation sidebar
│   ├── content/                 # Content collections
│   │   ├── config.ts           # Collection schema
│   │   └── chapters/           # Chapter markdown files
│   ├── data/                   # Generated data files
│   │   └── toc.json           # Table of contents
│   ├── layouts/                # Page layouts
│   │   └── BaseLayout.astro   # Base HTML structure
│   ├── pages/                  # Route pages
│   │   ├── index.astro        # Cover page (/)
│   │   ├── toc.astro          # TOC page (/toc)
│   │   └── chapter/
│   │       └── [slug].astro   # Dynamic chapter route
│   └── styles/
│       └── global.css         # Global styles
├── public/                     # Static assets
│   └── favicon.svg
└── dist/                       # Build output (generated)
```

## Content Pipeline

### Phase 1: DOCX → Markdown (convert-docx.js)

```
input/*.docx
    ↓ [Pandoc]
temp/raw-markdown/*.md
```

**Process**:
1. Scans `input/` for .docx files
2. Calls Pandoc for each file
3. Pandoc extracts images to `temp/media/`
4. Outputs markdown to `temp/raw-markdown/`

**Pandoc Command**:
```bash
pandoc -f docx -t markdown \
  --wrap=none \
  --extract-media=./temp/media \
  -o output.md input.docx
```

### Phase 2: Markdown → Chapters (process-chapters.js)

```
temp/raw-markdown/*.md
    ↓ [Parser]
src/content/chapters/*.md
src/data/toc.json
```

**Process**:
1. Reads each .md file
2. Parses line-by-line looking for headings
3. H1 (`# `) creates/switches section context
4. H2 (`## `) creates new chapter file
5. Content until next H2 goes into current chapter
6. Generates frontmatter with metadata
7. Writes individual chapter files
8. Builds TOC structure and exports JSON

**Output Format**:
```markdown
---
title: "Chapter Title"
section: "Section Name"
order: 1
slug: "chapter-title"
---

Chapter content here...
```

### Phase 3: Build (Astro)

```
src/content/chapters/*.md
    ↓ [Astro Build]
dist/**/*.html
```

**Process**:
1. Astro reads content collection
2. Generates static pages for each chapter
3. Sidebar component loads toc.json
4. Outputs fully static site

## Routing

| URL | Component | Description |
|-----|-----------|-------------|
| `/` | `pages/index.astro` | Cover page |
| `/toc` | `pages/toc.astro` | Table of contents |
| `/chapter/[slug]` | `pages/chapter/[slug].astro` | Individual chapter |

**Dynamic Route Resolution**:
- Astro's `getStaticPaths()` generates routes from content collection
- Each chapter gets a URL based on its `slug` field
- Slug is auto-generated from H2 title via `slugify()`

## Component Architecture

### BaseLayout.astro

Base HTML structure for all pages.

**Props**:
- `title`: Page title (string)
- `showSidebar`: Whether to show sidebar (boolean)

**Features**:
- Includes global CSS
- Loads web fonts (Roboto, IBM Plex Mono)
- Provides slot for page content
- Conditionally renders Sidebar

### Sidebar.astro

Navigation sidebar with search and dark mode.

**Data Sources**:
- `src/data/toc.json`: Section and chapter structure

**Features**:
- Collapsible section groups (client-side JS)
- Active chapter highlighting (via URL matching)
- Search filter (client-side JS)
- Dark mode toggle (localStorage persistence)

**Client-side Behavior**:
```javascript
// Dark mode
localStorage.setItem('theme', 'dark');
document.documentElement.classList.add('dark');

// Collapsible sections
section.addEventListener('click', () => {
  section.classList.toggle('collapsed');
});

// Search
searchBox.addEventListener('input', (e) => {
  // Filter chapters by query
});
```

## Styling Architecture

### CSS Variables

All colors defined as CSS variables in `:root`:

```css
:root {
  --color-teal: #46bbb7;
  --color-blue: #0097b2;
  --color-pink: #ec9896;
  --color-coral: #f05b4e;
  --color-green: #3fad87;

  --accent: var(--color-teal);
  --bg-primary: #ffffff;
  --text-primary: #2c3e50;
}

html.dark {
  --bg-primary: #1a1a1a;
  --text-primary: #e8e8e8;
}
```

### Theme System

Dark mode is implemented via a class toggle:
- Default: light mode
- `html.dark`: dark mode
- Persisted in localStorage
- All colors use CSS variables that adapt

### Typography Scale

```css
body: Roboto, 16px, 1.7 line-height
h1: IBM Plex Mono, 2.5rem, uppercase
h2: IBM Plex Mono, 2rem, uppercase
h3: IBM Plex Mono, 1.5rem, uppercase
.prose: 1.125rem, 1.8 line-height (reading text)
```

### Layout System

```
┌─────────────────────────────────────────┐
│ html.app-layout (flex)                  │
│ ┌─────────┬─────────────────────────┐  │
│ │ sidebar │ main-content            │  │
│ │ 300px   │ max-width: 800px        │  │
│ │ sticky  │ centered, padding       │  │
│ └─────────┴─────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Content Schema

### Chapter Frontmatter

Defined in `src/content/config.ts`:

```typescript
{
  title: string,      // Chapter display title
  section: string,    // Parent section name
  order: number,      // Order within section (1, 2, 3...)
  slug: string        // URL slug (kebab-case)
}
```

### TOC JSON Structure

```json
{
  "sections": [
    {
      "title": "Section Name",
      "chapters": [
        {
          "title": "Chapter Title",
          "slug": "chapter-title",
          "order": 1
        }
      ]
    }
  ]
}
```

## Build Process

### Development

```bash
npm run dev
```

Starts Astro dev server with:
- Hot module reloading
- Instant content updates
- Source maps for debugging

### Production

```bash
npm run build
```

Generates static files:
1. Processes all markdown content
2. Generates HTML for each route
3. Bundles and minifies CSS
4. Outputs to `dist/`
5. Includes all public assets

**Output**:
- `dist/index.html`: Cover page
- `dist/toc/index.html`: TOC page
- `dist/chapter/[slug]/index.html`: Each chapter
- `dist/_astro/`: Bundled assets

## JavaScript Footprint

**Total client-side JS**:
- Dark mode toggle (~20 lines)
- Collapsible sections (~15 lines)
- Search filter (~30 lines)
- **Total: ~65 lines** (all inline, no external dependencies)

No frameworks, no build step for JS. Pure vanilla JavaScript for progressive enhancement.

## Performance Optimizations

1. **Static generation**: No server-side rendering overhead
2. **Minimal JS**: Only essential interactivity
3. **CSS variables**: Instant theme switching, no JS calculation
4. **Font preloading**: Google Fonts with preconnect
5. **Semantic HTML**: Faster rendering, better SEO

## Accessibility Features

1. **Keyboard navigation**: All interactive elements focusable
2. **Focus rings**: Visible focus indicators using accent color
3. **ARIA roles**: Proper semantic structure
4. **Heading hierarchy**: Proper H1-H6 nesting
5. **Color contrast**: Meets WCAG AA standards

## Extension Points

### Adding New Color Schemes

1. Add new CSS variables in `:root`
2. Update `html.dark` overrides
3. Use variables in component styles

### Custom Page Types

1. Create new file in `src/pages/`
2. Import BaseLayout
3. Build custom content structure

### Custom Content Types

1. Define new collection in `src/content/config.ts`
2. Create collection directory in `src/content/`
3. Add frontmatter schema

### Markdown Extensions

Update `astro.config.mjs`:
```javascript
markdown: {
  remarkPlugins: ['remark-plugin-name'],
  rehypePlugins: ['rehype-plugin-name']
}
```

## Deployment Targets

The static output works on any web server:

- **Netlify/Vercel**: Auto-deploy from Git
- **GitHub Pages**: Upload `dist/` to gh-pages branch
- **AWS S3**: Upload `dist/` to bucket
- **Traditional hosting**: Upload `dist/` via FTP

No server-side requirements. Just serve static files.

## Troubleshooting

### Content not showing

Check:
1. Frontmatter syntax is valid YAML
2. Chapter files are in `src/content/chapters/`
3. TOC JSON includes the chapter
4. Slug matches between frontmatter and TOC

### Dark mode not persisting

Check:
1. Browser allows localStorage
2. No console errors
3. `<html>` tag receives `dark` class
4. CSS variables are defined in `:root` and `html.dark`

### Build failures

Check:
1. All markdown frontmatter is valid
2. No TypeScript errors in .astro files
3. All imports resolve correctly
4. Content schema matches frontmatter

## Future Enhancements

Possible additions:
- Full-text search with Lunr.js or Pagefind
- Chapter progress tracking
- Print stylesheet
- Reading time estimates
- Breadcrumb navigation
- Chapter notes/annotations
- PDF export
- Multi-language support
