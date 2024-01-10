const fs = require('fs');
const path = require('path');
const filePath = process.argv[2];

const STOP_WORDS = [
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'but',
  'for',
  'from',
  'has',
  'he',
  'i',
  'in',
  'is',
  'it',
  'its',
  'of',
  'on',
  'our',
  'that',
  'this',
  'the',
  'to',
  'us',
  'we',
  'were',
  'will',
  'with',
];

function printWordFreq(file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Text processing
    const wordCounts = {};
    const words = data
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Remove punctuation
      .toLowerCase() // Convert to lowercase
      .split(/\s+/); // Split by whitespace

    for (const word of words) {
      if (!STOP_WORDS.includes(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    }

    // Sort and Display results
    const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
    for (const word of sortedWords) {
      console.log(`${word.padEnd(20)} | ${wordCounts[word]} ${'*'.repeat(wordCounts[word])}`);
    }
  });
}

printWordFreq(filePath);
