# My eBook - Static eBook Website

A beautifully designed static website that feels like reading a book. Built with Astro, this project converts Word documents into a navigable, searchable, book-like reading experience.

## Features

- **Book-like Reading Experience**: Clean typography with sticky sidebar navigation
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Sidebar Navigation**: Collapsible section groups with chapter listings
- **Search**: Full-text search across all chapter titles
- **Markdown Support**: Including footnotes, code blocks, lists, and more
- **DOCX Conversion Pipeline**: Automated scripts to convert Word documents to website content
- **Responsive Design**: Works beautifully on desktop and mobile devices

## Design

### Typography
- **Body Text**: Roboto (readable, book-like)
- **Headings**: IBM Plex Mono (distinctive, uppercase)

### Color Palette
Five carefully chosen accent colors:
- Teal: `#46bbb7`
- Blue: `#0097b2`
- Pink: `#ec9896`
- Coral: `#f05b4e`
- Green: `#3fad87`

### Layout
- Sticky left sidebar (~300px)
- Main reading pane (max-width 800px)
- Previous/Next navigation at chapter bottom

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Pandoc** (for DOCX conversion)
   - **Windows**: Download from [pandoc.org/installing.html](https://pandoc.org/installing.html)
   - **Mac**: `brew install pandoc`
   - **Linux**: `sudo apt-get install pandoc` or equivalent
   - Verify installation: `pandoc --version`

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

## Content Creation Workflow

### Step 1: Prepare Your Word Document

Structure your Word document with proper headings:

- **Heading 1**: Section/Category groups (e.g., "Introduction", "Advanced Topics")
- **Heading 2**: Individual chapters (each H2 becomes its own chapter page)
- **Heading 3+**: Sub-sections within chapters (rendered within the chapter)

**Example structure:**
```
# Getting Started          <- H1: Section group
## Introduction            <- H2: Chapter 1
## Quick Start Guide       <- H2: Chapter 2

# Advanced Topics          <- H1: New section group
## Deep Dive               <- H2: Chapter 3
## Best Practices          <- H2: Chapter 4
```

### Step 2: Convert DOCX to Markdown

Place your `.docx` file(s) in the `input/` directory, then run:

```bash
npm run convert
```

This script:
- Uses Pandoc to convert DOCX to Markdown
- Extracts images to `temp/media/`
- Outputs raw markdown to `temp/raw-markdown/`

### Step 3: Process Chapters

Split the markdown into individual chapter files:

```bash
npm run process
```

This script:
- Parses H1 headings as sections
- Splits H2 headings into separate chapter files
- Generates frontmatter for each chapter (title, section, order, slug)
- Creates chapter files in `src/content/chapters/`
- Generates `src/data/toc.json` for navigation

### Step 4: Preview Locally

Start the development server:

```bash
npm run dev
```

Open your browser to `http://localhost:4321` to preview your ebook.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run convert` - Convert DOCX files to markdown
- `npm run process` - Process markdown into chapter files

### Project Structure

```
my-ebook/
├── input/                      # Place .docx files here
├── scripts/
│   ├── convert-docx.js        # DOCX → Markdown converter
│   └── process-chapters.js    # Chapter splitter & TOC generator
├── src/
│   ├── components/
│   │   └── Sidebar.astro      # Sidebar navigation component
│   ├── content/
│   │   ├── config.ts          # Content collection config
│   │   └── chapters/          # Chapter markdown files (auto-generated)
│   ├── data/
│   │   └── toc.json           # Table of contents (auto-generated)
│   ├── layouts/
│   │   └── BaseLayout.astro   # Base page layout
│   ├── pages/
│   │   ├── index.astro        # Cover page
│   │   ├── toc.astro          # Table of contents page
│   │   └── chapter/
│   │       └── [slug].astro   # Dynamic chapter pages
│   └── styles/
│       └── global.css         # Global styles & theme
├── temp/                       # Temporary conversion files (gitignored)
├── astro.config.mjs
├── package.json
└── README.md
```

## Customization

### Updating the Cover Page

Edit [src/pages/index.astro](src/pages/index.astro):

```astro
<h1 class="cover-title">Your Book Title</h1>
<p class="cover-subtitle">Your Subtitle</p>
<p class="cover-author">Your Name</p>
```

### Changing Colors

Edit CSS variables in [src/styles/global.css](src/styles/global.css):

```css
:root {
  --color-teal: #46bbb7;
  --color-blue: #0097b2;
  --color-pink: #ec9896;
  --color-coral: #f05b4e;
  --color-green: #3fad87;
  --accent: var(--color-teal);  /* Change active accent */
}
```

### Modifying Typography

Update font imports and definitions in [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) and [src/styles/global.css](src/styles/global.css).

### Sidebar Title

Edit the sidebar title in [src/components/Sidebar.astro](src/components/Sidebar.astro):

```astro
<h2 class="sidebar-title">Your eBook Title</h2>
```

## Building for Production

Create a production build:

```bash
npm run build
```

The static site will be generated in the `dist/` directory.

Preview the production build:

```bash
npm run preview
```

## Deployment

Your ebook is a static site and can be deployed to any static hosting platform.

### Netlify

1. Push your repository to GitHub
2. Sign in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

**Note**: Make sure to run `npm run convert` and `npm run process` locally before pushing, as Netlify won't have Pandoc installed by default.

### Vercel

1. Push your repository to GitHub
2. Sign in to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Astro settings
6. Click "Deploy"

**Note**: Same as Netlify, run conversion scripts locally first.

### GitHub Pages

1. Create a repository on GitHub
2. Update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',
  // ... rest of config
});
```

3. Build the site:

```bash
npm run build
```

4. Deploy using GitHub Actions or manually push the `dist/` folder to the `gh-pages` branch.

### Manual Deployment

Simply upload the contents of the `dist/` folder to any web server or static hosting service.

## Markdown Features

### Footnotes

Add footnotes using markdown syntax:

```markdown
This is a statement with a footnote[^1].

[^1]: This is the footnote text.
```

### Code Blocks

```markdown
Inline code: `const x = 10;`

Code block:
\`\`\`javascript
function example() {
  return "Hello, world!";
}
\`\`\`
```

### Lists

```markdown
Ordered:
1. First
2. Second

Unordered:
- Item
- Item
```

### Blockquotes

```markdown
> This is a quote.
```

## Troubleshooting

### "Pandoc not found"

- Ensure Pandoc is installed: `pandoc --version`
- On Windows, restart your terminal after installation
- Verify Pandoc is in your system PATH

### "No chapters generated"

- Verify your Word document uses Heading 1 and Heading 2 styles
- Check `temp/raw-markdown/` for converted files
- Ensure H2 headings (##) are present in the markdown

### Dark mode not persisting

- Check browser console for localStorage errors
- Ensure JavaScript is enabled
- Try clearing browser cache

### Images not displaying

- Ensure images are extracted to `temp/media/`
- Copy media folder to `public/media/` if needed
- Update image paths in markdown files

## License

This project is provided as-is for your use. Customize and modify as needed for your ebook project.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the project structure and configuration files
3. Consult the [Astro documentation](https://docs.astro.build)

---

Built with [Astro](https://astro.build) - The web framework for content-driven websites.
