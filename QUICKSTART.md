# Quick Start Guide

Get your ebook website running in 5 minutes.

## Prerequisites Check

```bash
# Check Node.js (need 18+)
node --version

# Check Pandoc (needed for DOCX conversion)
pandoc --version
```

If either is missing, install them first (see README.md).

## Installation

```bash
# Install dependencies
npm install
```

## Preview the Demo

The project includes sample chapters. Preview them:

```bash
npm run dev
```

Open http://localhost:4321 in your browser.

## Add Your Own Content

### Method 1: Use Word Documents (Recommended)

1. **Prepare your Word document** with this structure:
   ```
   Heading 1: Section Name
   Heading 2: Chapter Title
   [chapter content]
   Heading 2: Another Chapter
   [chapter content]
   ```

2. **Place .docx file** in `input/` directory

3. **Convert to markdown**:
   ```bash
   npm run convert
   ```

4. **Process into chapters**:
   ```bash
   npm run process
   ```

5. **Preview**:
   ```bash
   npm run dev
   ```

### Method 2: Write Markdown Directly

1. Create a file in `src/content/chapters/` like `003-my-chapter.md`

2. Add frontmatter:
   ```markdown
   ---
   title: "My Chapter Title"
   section: "My Section"
   order: 1
   slug: "my-chapter"
   ---

   Your chapter content here...
   ```

3. Update `src/data/toc.json` to include your chapter

4. Preview:
   ```bash
   npm run dev
   ```

## Customize

1. **Cover page**: Edit `src/pages/index.astro`
2. **Colors**: Edit CSS variables in `src/styles/global.css`
3. **Sidebar title**: Edit `src/components/Sidebar.astro`

## Deploy

### Build for production:
```bash
npm run build
```

### Deploy to Netlify/Vercel:
1. Push to GitHub
2. Connect repository in Netlify/Vercel
3. Build command: `npm run build`
4. Publish directory: `dist`

Done! 🎉

For more details, see [README.md](README.md).
