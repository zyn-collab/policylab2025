#!/usr/bin/env node

/**
 * Convert DOCX files to Markdown using Pandoc
 *
 * Usage: npm run convert
 *
 * Prerequisites:
 * - Pandoc must be installed (https://pandoc.org/installing.html)
 *
 * This script:
 * 1. Finds all .docx files in the input/ directory
 * 2. Converts each to markdown using Pandoc
 * 3. Outputs to temp/raw-markdown/
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const INPUT_DIR = join(ROOT_DIR, 'input');
const OUTPUT_DIR = join(ROOT_DIR, 'temp', 'raw-markdown');

// Ensure directories exist
if (!existsSync(INPUT_DIR)) {
  mkdirSync(INPUT_DIR, { recursive: true });
  console.log('Created input/ directory. Place your .docx files there.');
  process.exit(0);
}

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Check if Pandoc is installed
let pandocCommand = 'pandoc';
try {
  execSync('pandoc --version', { stdio: 'ignore' });
} catch (error) {
  // Try common Windows installation paths
  const windowsPaths = [
    'C:\\Users\\User\\AppData\\Local\\Pandoc\\pandoc.exe',
    'C:\\Program Files\\Pandoc\\pandoc.exe',
    'C:\\Program Files (x86)\\Pandoc\\pandoc.exe'
  ];

  let found = false;
  for (const path of windowsPaths) {
    try {
      execSync(`"${path}" --version`, { stdio: 'ignore' });
      pandocCommand = `"${path}"`;
      found = true;
      console.log(`Found Pandoc at: ${path}`);
      break;
    } catch (e) {
      // Continue searching
    }
  }

  if (!found) {
    console.error('Error: Pandoc is not installed or not in PATH');
    console.error('Please install Pandoc: https://pandoc.org/installing.html');
    process.exit(1);
  }
}

// Find all .docx files
const docxFiles = readdirSync(INPUT_DIR).filter(file => file.endsWith('.docx'));

if (docxFiles.length === 0) {
  console.log('No .docx files found in input/ directory');
  process.exit(0);
}

console.log(`Found ${docxFiles.length} .docx file(s)`);

// Convert each file
docxFiles.forEach(file => {
  const inputPath = join(INPUT_DIR, file);
  const outputName = basename(file, '.docx') + '.md';
  const outputPath = join(OUTPUT_DIR, outputName);

  console.log(`Converting ${file}...`);

  try {
    // Run Pandoc conversion
    // Options:
    // -f docx: from Word
    // -t gfm: to GitHub-flavored Markdown (supports pipe tables and footnotes)
    // --wrap=none: don't wrap lines
    // --extract-media=./temp/media: extract images
    execSync(
      `${pandocCommand} -f docx -t gfm --wrap=none --extract-media="${join(ROOT_DIR, 'temp', 'media')}" -o "${outputPath}" "${inputPath}"`,
      { stdio: 'inherit' }
    );

    console.log(`✓ Created ${outputName}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${file}`);
    console.error(error.message);
  }
});

console.log('\nConversion complete!');
console.log('Next step: npm run process');
