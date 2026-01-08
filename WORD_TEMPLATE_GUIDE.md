# Word Document Template Guide

This guide explains how to structure your Word document for optimal conversion to the ebook website.

## Heading Structure

The conversion scripts rely on Word's built-in Heading styles. Here's how they map:

| Word Style | Purpose | Becomes |
|------------|---------|---------|
| **Heading 1** | Section/Category group | Collapsible section in sidebar |
| **Heading 2** | Chapter title | Individual chapter page |
| **Heading 3** | Sub-section within chapter | H3 within chapter content |
| **Heading 4+** | Nested sub-sections | H4+ within chapter content |
| **Normal** | Body text | Paragraph content |

## Example Structure

```
Heading 1: Getting Started
  Heading 2: Introduction
    Normal: Welcome to this book...
    Heading 3: What You'll Learn
    Normal: In this chapter you will...

  Heading 2: Installation Guide
    Normal: To get started...
    Heading 3: Prerequisites
    Normal: You'll need...

Heading 1: Advanced Topics
  Heading 2: Deep Dive into Features
    Normal: Let's explore...
```

This creates:
- 2 sections ("Getting Started", "Advanced Topics")
- 3 chapters ("Introduction", "Installation Guide", "Deep Dive into Features")

## Best Practices

### 1. Always Use Heading Styles
Don't just make text big and bold. Use Word's actual Heading styles:
- Select text
- Go to Home tab
- Click "Heading 1", "Heading 2", etc. in the Styles group

### 2. Start with Heading 1
Begin your document with a Heading 1 to define the first section.

### 3. Chapter Titles are Heading 2
Each Heading 2 becomes its own chapter page with its own URL.

### 4. Body Text Should Be Normal Style
Don't use heading styles for emphasis. Use **bold** or *italic* instead.

### 5. Use Lists
Word's bullet points and numbered lists convert well:
- Bullet lists work great
- Numbered lists too

### 6. Add Footnotes
Use Word's Insert → Footnote feature. These will convert to markdown footnotes automatically.

### 7. Images
Images will be extracted but may need manual adjustment. Place them inline where you want them to appear.

## What Converts Well

✅ **Good:**
- Heading styles (H1-H6)
- Bold and italic text
- Bullet lists and numbered lists
- Footnotes
- Block quotes
- Tables (basic)
- Images

❌ **Avoid:**
- Text boxes (content may not export)
- Complex formatting (colors, backgrounds)
- Custom fonts (will use theme fonts)
- Headers and footers (not part of main content)
- Comments (won't be included)

## Sample Template

Here's a minimal example you can copy:

```
Heading 1: Introduction

Heading 2: Welcome
This is the first chapter of my book. It introduces the main concepts.

Here's what we'll cover:
- Topic one
- Topic two
- Topic three

Heading 3: Background
Some additional context about the topic...

Heading 2: Getting Started
Now let's dive into the practical steps...


Heading 1: Main Content

Heading 2: Chapter One
The main content begins here...
```

## Testing Your Structure

Before converting:

1. **View Document Outline**:
   - Go to View → Outline in Word
   - This shows your heading hierarchy
   - Verify H1s are sections, H2s are chapters

2. **Check Navigation Pane**:
   - Go to View → Navigation Pane
   - You'll see a clickable outline
   - This mimics how your sidebar will look

## After Conversion

After running `npm run convert` and `npm run process`:

1. Check `temp/raw-markdown/` to see the converted markdown
2. Check `src/content/chapters/` for individual chapter files
3. Check `src/data/toc.json` for the table of contents structure

If something looks wrong, adjust your Word document headings and re-run the conversion.

## Tips

- **Keep it simple**: The simpler your Word formatting, the better the conversion
- **One document or many**: You can convert multiple .docx files - they'll all be processed together
- **Chapter order**: Chapters are numbered in the order they appear in your document
- **URL slugs**: Chapter URLs are auto-generated from H2 titles (e.g., "Getting Started" → `/chapter/getting-started`)

## Need Help?

If your conversion doesn't look right:
1. Check your heading styles in Word
2. Review the `temp/raw-markdown/` output
3. Manually edit chapter files in `src/content/chapters/` if needed
4. See the main README.md for troubleshooting
