# Extending Your eBook

This guide shows you how to add advanced features and customizations to your ebook website.

## Table of Contents

1. [Add Reading Progress Bar](#add-reading-progress-bar)
2. [Add Reading Time Estimates](#add-reading-time-estimates)
3. [Add Print Styles](#add-print-styles)
4. [Add Breadcrumb Navigation](#add-breadcrumb-navigation)
5. [Add Chapter Metadata](#add-chapter-metadata)
6. [Add Full-Text Search](#add-full-text-search)
7. [Add Analytics](#add-analytics)
8. [Add Social Sharing](#add-social-sharing)

---

## Add Reading Progress Bar

Show a progress bar as users scroll through chapters.

### 1. Update global.css

Add to [src/styles/global.css](src/styles/global.css):

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: var(--accent);
  z-index: 1000;
  transition: width 0.1s ease;
}
```

### 2. Update BaseLayout.astro

Add to [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro):

```astro
<body>
  <div class="progress-bar" id="reading-progress"></div>
  <div class="app-layout">
    {showSidebar && <Sidebar />}
    <main class="main-content">
      <slot />
    </main>
  </div>

  <script>
    const progressBar = document.getElementById('reading-progress');

    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    });
  </script>
</body>
```

---

## Add Reading Time Estimates

Display estimated reading time for each chapter.

### 1. Update content schema

Edit [src/content/config.ts](src/content/config.ts):

```typescript
import { defineCollection, z } from 'astro:content';

const chaptersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    section: z.string(),
    order: z.number(),
    slug: z.string(),
    readingTime: z.number().optional(), // Add this
  }),
});
```

### 2. Update process-chapters.js

Add reading time calculation in [scripts/process-chapters.js](scripts/process-chapters.js):

```javascript
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// In the chapter processing loop:
const readingTime = calculateReadingTime(chapter.content);

const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
section: "${section.replace(/"/g, '\\"')}"
order: ${order}
slug: "${slug}"
readingTime: ${readingTime}
---

`;
```

### 3. Display in chapter page

Update [src/pages/chapter/[slug].astro](src/pages/chapter/[slug].astro):

```astro
<article class="prose">
  <h1>{chapter.data.title}</h1>
  {chapter.data.readingTime && (
    <p class="reading-time">
      {chapter.data.readingTime} min read
    </p>
  )}
  <Content />
</article>
```

Add CSS:

```css
.reading-time {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-family: 'IBM Plex Mono', monospace;
  text-transform: uppercase;
  margin-top: -1rem;
}
```

---

## Add Print Styles

Optimize the ebook for printing.

Add to [src/styles/global.css](src/styles/global.css):

```css
@media print {
  /* Hide UI elements */
  .sidebar,
  .chapter-nav,
  .dark-mode-toggle,
  .search-box {
    display: none !important;
  }

  /* Full width for content */
  .main-content {
    max-width: 100%;
    margin: 0;
    padding: 0;
  }

  /* Page breaks */
  h1, h2, h3 {
    page-break-after: avoid;
  }

  /* Ensure links are visible */
  a[href]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  /* Footnotes */
  .footnotes {
    page-break-before: always;
  }

  /* Black text for printing */
  body {
    color: #000;
    background: #fff;
  }
}
```

---

## Add Breadcrumb Navigation

Show where the user is in the book structure.

### 1. Create Breadcrumb component

Create [src/components/Breadcrumb.astro](src/components/Breadcrumb.astro):

```astro
---
interface Props {
  section: string;
  chapter: string;
}

const { section, chapter } = Astro.props;
---

<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/toc">Contents</a></li>
    <li><span>{section}</span></li>
    <li aria-current="page">{chapter}</li>
  </ol>
</nav>

<style>
  .breadcrumb {
    margin-bottom: 2rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .breadcrumb ol {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 0.5rem;
  }

  .breadcrumb li:not(:last-child)::after {
    content: "›";
    margin-left: 0.5rem;
    color: var(--text-secondary);
  }

  .breadcrumb a {
    color: var(--accent);
  }
</style>
```

### 2. Use in chapter page

Update [src/pages/chapter/[slug].astro](src/pages/chapter/[slug].astro):

```astro
---
import Breadcrumb from '../../components/Breadcrumb.astro';
// ... other imports
---

<BaseLayout title={chapter.data.title}>
  <Breadcrumb
    section={chapter.data.section}
    chapter={chapter.data.title}
  />
  <article class="prose">
    <!-- content -->
  </article>
</BaseLayout>
```

---

## Add Chapter Metadata

Add author, date, or other metadata to chapters.

### 1. Extend schema

Update [src/content/config.ts](src/content/config.ts):

```typescript
const chaptersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    section: z.string(),
    order: z.number(),
    slug: z.string(),
    author: z.string().optional(),
    date: z.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
```

### 2. Add to frontmatter

Manually or via script:

```markdown
---
title: "Chapter Title"
section: "Section"
order: 1
slug: "chapter-slug"
author: "Author Name"
date: 2025-01-15
tags: ["concept", "tutorial"]
---
```

### 3. Display metadata

```astro
{chapter.data.author && (
  <p class="chapter-meta">
    By {chapter.data.author}
  </p>
)}

{chapter.data.tags && (
  <div class="chapter-tags">
    {chapter.data.tags.map(tag => (
      <span class="tag">{tag}</span>
    ))}
  </div>
)}
```

---

## Add Full-Text Search

Implement client-side full-text search with Pagefind.

### 1. Install Pagefind

```bash
npm install -D pagefind
```

### 2. Update package.json

```json
{
  "scripts": {
    "build": "astro build && npx pagefind --source dist"
  }
}
```

### 3. Add search component

Create [src/components/Search.astro](src/components/Search.astro):

```astro
<div id="search-container">
  <div id="search-results"></div>
</div>

<script>
  async function initSearch() {
    const pagefind = await import('/pagefind/pagefind.js');

    const searchBox = document.getElementById('sidebar-search');
    const resultsContainer = document.getElementById('search-results');

    searchBox?.addEventListener('input', async (e) => {
      const query = e.target.value;

      if (query.length < 2) {
        resultsContainer.innerHTML = '';
        return;
      }

      const search = await pagefind.search(query);

      resultsContainer.innerHTML = search.results
        .map(result => `<a href="${result.url}">${result.title}</a>`)
        .join('');
    });
  }

  initSearch();
</script>
```

---

## Add Analytics

Track page views with Google Analytics or Plausible.

### Google Analytics

Add to [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) in `<head>`:

```astro
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible Analytics

```astro
<!-- Plausible Analytics -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Add Social Sharing

Add Open Graph and Twitter Card metadata.

Add to [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) in `<head>`:

```astro
---
interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const {
  title = 'My eBook',
  description = 'A beautifully designed digital book',
  image = '/og-image.png'
} = Astro.props;
---

<head>
  <!-- ... existing meta tags ... -->

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</head>
```

Create [public/og-image.png](public/og-image.png) (1200x630px recommended).

---

## Custom Markdown Components

Add custom components to markdown using MDX.

### 1. Create component

Create [src/components/Callout.astro](src/components/Callout.astro):

```astro
---
interface Props {
  type?: 'info' | 'warning' | 'success';
}

const { type = 'info' } = Astro.props;
---

<div class={`callout callout-${type}`}>
  <slot />
</div>

<style>
  .callout {
    padding: 1rem;
    border-left: 4px solid var(--accent);
    margin: 1.5rem 0;
    background: var(--bg-secondary);
  }

  .callout-warning {
    border-color: var(--color-coral);
  }

  .callout-success {
    border-color: var(--color-green);
  }
</style>
```

### 2. Use in MDX

Rename chapter files from `.md` to `.mdx`, then:

```mdx
---
title: "My Chapter"
---

import Callout from '../../components/Callout.astro';

Regular markdown content here.

<Callout type="info">
This is an important note!
</Callout>

More content...
```

---

## Tips for Extensions

1. **Keep it simple**: Don't over-engineer. Static is beautiful.
2. **Test thoroughly**: Check both light and dark modes.
3. **Mobile-first**: Ensure features work on small screens.
4. **Accessibility**: Maintain keyboard navigation and screen reader support.
5. **Performance**: Keep JavaScript minimal and CSS efficient.

---

For more ideas, see:
- [Astro Integrations](https://astro.build/integrations/)
- [Remark/Rehype Plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
- [CSS Tricks](https://css-tricks.com/)
