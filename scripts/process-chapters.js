#!/usr/bin/env node

/**
 * Process raw markdown into chapter files
 *
 * Usage: npm run process
 *
 * This script:
 * 1. Reads markdown files from temp/raw-markdown/
 * 2. Splits content based on heading structure:
 *    - H1 (# ) = Section/Category group
 *    - H2 (## ) = Chapter (creates new file)
 * 3. Generates frontmatter for each chapter
 * 4. Outputs chapter files to src/content/chapters/
 * 5. Generates toc.json for navigation
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const INPUT_DIR = join(ROOT_DIR, 'temp', 'raw-markdown');
const OUTPUT_DIR = join(ROOT_DIR, 'src', 'content', 'chapters');
const DATA_DIR = join(ROOT_DIR, 'src', 'data');

// Ensure directories exist
if (!existsSync(INPUT_DIR)) {
  console.error('Error: temp/raw-markdown/ not found');
  console.error('Run "npm run convert" first');
  process.exit(1);
}

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Create a URL-safe slug from a title
 */
function createSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
}

/**
 * Extract all footnote definitions from the content
 */
function extractFootnotes(content) {
  const footnotes = new Map();
  const footnoteRegex = /^\[\^(\d+)\]:\s*(.+)$/gm;
  let match;

  while ((match = footnoteRegex.exec(content)) !== null) {
    const footnoteNum = match[1];
    const footnoteText = match[2];
    footnotes.set(footnoteNum, `[^${footnoteNum}]: ${footnoteText}`);
  }

  return footnotes;
}

/**
 * Find footnote references in text and return their numbers
 */
function findFootnoteReferences(text) {
  const references = new Set();
  const refRegex = /\[\^(\d+)\]/g;
  let match;

  while ((match = refRegex.exec(text)) !== null) {
    references.add(match[1]);
  }

  return references;
}

/**
 * Parse markdown content into sections and chapters
 */
function parseMarkdown(content) {
  const lines = content.split('\n');
  const structure = [];

  // Extract all footnote definitions first
  const allFootnotes = extractFootnotes(content);

  let currentSection = null;
  let currentChapter = null;
  let currentContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip footnote definition lines (they'll be added per-chapter later)
    if (/^\[\^\d+\]:\s/.test(line)) {
      continue;
    }

    // H1 = Section
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      const sectionTitle = line.substring(2).trim();

      // Save previous chapter if exists
      if (currentChapter) {
        currentChapter.content = currentContent.join('\n').trim();
        currentSection.chapters.push(currentChapter);
        currentChapter = null;
        currentContent = [];
      }

      // Create new section
      currentSection = {
        title: sectionTitle,
        chapters: []
      };
      structure.push(currentSection);
      continue;
    }

    // H2 = Chapter
    if (line.startsWith('## ')) {
      const chapterTitle = line.substring(3).trim();

      // Save previous chapter if exists
      if (currentChapter) {
        currentChapter.content = currentContent.join('\n').trim();
        currentSection?.chapters.push(currentChapter);
        currentContent = [];
      }

      // Create section if none exists
      if (!currentSection) {
        currentSection = {
          title: 'Introduction',
          chapters: []
        };
        structure.push(currentSection);
      }

      // Create new chapter
      currentChapter = {
        title: chapterTitle,
        content: ''
      };
      continue;
    }

    // Add content to current chapter
    if (currentChapter) {
      currentContent.push(line);
    }
  }

  // Save last chapter
  if (currentChapter && currentSection) {
    currentChapter.content = currentContent.join('\n').trim();
    currentSection.chapters.push(currentChapter);
  }

  // Add footnotes to chapters that reference them
  structure.forEach(section => {
    section.chapters.forEach(chapter => {
      const referencedFootnotes = findFootnoteReferences(chapter.content);
      if (referencedFootnotes.size > 0) {
        const footnoteLines = [];
        referencedFootnotes.forEach(num => {
          if (allFootnotes.has(num)) {
            footnoteLines.push(allFootnotes.get(num));
          }
        });
        if (footnoteLines.length > 0) {
          chapter.content += '\n\n' + footnoteLines.join('\n');
        }
      }
    });
  });

  return structure;
}

/**
 * Generate frontmatter for a chapter
 */
function generateFrontmatter(title, section, order, slug) {
  return `---
title: "${title.replace(/"/g, '\\"')}"
section: "${section.replace(/"/g, '\\"')}"
order: ${order}
slug: "${slug}"
---

`;
}

/**
 * Process all markdown files
 */
function processFiles() {
  const mdFiles = readdirSync(INPUT_DIR)
    .filter(file => file.endsWith('.md'))
    .sort(); // Sort alphabetically for deterministic ordering

  if (mdFiles.length === 0) {
    console.log('No markdown files found in temp/raw-markdown/');
    process.exit(0);
  }

  console.log(`Processing ${mdFiles.length} markdown file(s)...`);

  const allSections = [];
  let globalChapterCount = 0;

  mdFiles.forEach(file => {
    const filePath = join(INPUT_DIR, file);
    const content = readFileSync(filePath, 'utf-8');

    console.log(`\nProcessing ${file}...`);

    const structure = parseMarkdown(content);

    structure.forEach(section => {
      console.log(`  Section: ${section.title} (${section.chapters.length} chapters)`);

      const tocSection = {
        title: section.title,
        chapters: []
      };

      section.chapters.forEach((chapter, index) => {
        globalChapterCount++;
        const slug = createSlug(chapter.title);
        const filename = `${String(globalChapterCount).padStart(3, '0')}-${slug}.md`;
        const filepath = join(OUTPUT_DIR, filename);

        // Generate chapter file with frontmatter
        const frontmatter = generateFrontmatter(
          chapter.title,
          section.title,
          index + 1,
          slug
        );

        const fullContent = frontmatter + chapter.content;
        writeFileSync(filepath, fullContent, 'utf-8');

        console.log(`    ✓ ${filename}`);

        // Add to TOC
        tocSection.chapters.push({
          title: chapter.title,
          slug: slug,
          order: index + 1
        });
      });

      allSections.push(tocSection);
    });
  });

  // Generate TOC JSON
  const tocData = {
    sections: allSections
  };

  const tocPath = join(DATA_DIR, 'toc.json');
  writeFileSync(tocPath, JSON.stringify(tocData, null, 2), 'utf-8');

  console.log(`\n✓ Generated ${globalChapterCount} chapter files`);
  console.log(`✓ Generated toc.json with ${allSections.length} sections`);
  console.log('\nDone! Run "npm run dev" to preview your ebook.');
}

// Run the processor
processFiles();
