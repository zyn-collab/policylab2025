#!/usr/bin/env node

/**
 * Clean/reset the ebook content
 *
 * Usage: node scripts/clean.js [--all]
 *
 * This script removes generated content files to start fresh.
 * Use --all to also remove temporary conversion files.
 */

import { existsSync, rmSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const CHAPTERS_DIR = join(ROOT_DIR, 'src', 'content', 'chapters');
const TOC_FILE = join(ROOT_DIR, 'src', 'data', 'toc.json');
const TEMP_DIR = join(ROOT_DIR, 'temp');
const DIST_DIR = join(ROOT_DIR, 'dist');

const cleanAll = process.argv.includes('--all');

console.log('🧹 Cleaning ebook content...\n');

// Remove generated chapter files (except samples)
if (existsSync(CHAPTERS_DIR)) {
  const files = readdirSync(CHAPTERS_DIR);
  let removed = 0;

  files.forEach(file => {
    const filePath = join(CHAPTERS_DIR, file);

    // Keep sample files
    if (file === '001-introduction.md' || file === '002-getting-started.md') {
      console.log(`⏭️  Keeping sample: ${file}`);
      return;
    }

    rmSync(filePath);
    removed++;
    console.log(`✓ Removed: ${file}`);
  });

  if (removed === 0) {
    console.log('📝 No generated chapters to remove');
  } else {
    console.log(`\n✓ Removed ${removed} generated chapter(s)`);
  }
}

// Remove TOC (will be regenerated)
if (existsSync(TOC_FILE)) {
  rmSync(TOC_FILE);
  console.log('✓ Removed toc.json');
}

// Remove temp directory if --all
if (cleanAll && existsSync(TEMP_DIR)) {
  rmSync(TEMP_DIR, { recursive: true, force: true });
  console.log('✓ Removed temp/ directory');
}

// Remove dist directory if exists
if (existsSync(DIST_DIR)) {
  rmSync(DIST_DIR, { recursive: true, force: true });
  console.log('✓ Removed dist/ directory');
}

console.log('\n✨ Clean complete!');

if (!cleanAll) {
  console.log('\nℹ️  Tip: Use "node scripts/clean.js --all" to also remove temp files');
}

console.log('\nNext steps:');
console.log('1. Place .docx files in input/');
console.log('2. Run: npm run convert');
console.log('3. Run: npm run process');
