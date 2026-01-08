#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CHAPTERS_DIR = join(__dirname, '..', 'src', 'content', 'chapters');

// Find all markdown files
const mdFiles = readdirSync(CHAPTERS_DIR).filter(file => file.endsWith('.md'));

console.log(`Fixing image paths in ${mdFiles.length} files...`);

let totalFixed = 0;

mdFiles.forEach(file => {
  const filePath = join(CHAPTERS_DIR, file);
  let content = readFileSync(filePath, 'utf8');

  // Fix Windows absolute paths - match various formats
  const originalContent = content;

  // Match the full Windows path pattern
  content = content.replace(
    /C:\\Users\\User\\OneDrive\\Desktop\\Policy Lab\\Publications\\my-ebook\\temp\\media\/media\//g,
    '/media/'
  );

  // Also handle forward slashes version
  content = content.replace(
    /C:\/Users\/User\/OneDrive\/Desktop\/Policy Lab\/Publications\/my-ebook\/temp\/media\/media\//g,
    '/media/'
  );

  if (content !== originalContent) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed ${file}`);
    totalFixed++;
  }
});

console.log(`\nFixed ${totalFixed} file(s)`);
