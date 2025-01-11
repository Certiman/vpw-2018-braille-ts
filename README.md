# Braille Decoder (VPW 2018)

TypeScript implementation of the Braille decoder challenge from the [2018 Flemish Programming Contest](https://github.com/vlaamseprogrammeerwedstrijd/opgaves/tree/master/2018/cat1/braille).

## Description

This program decodes text written in Braille patterns into regular text. It processes input files containing:

1. A Braille alphabet definition (A-Z, and a space)
2. Multiple test cases of Braille text to decode

## Project Structure

- `src\BrailleChar.ts` - Core Braille character handling
- `src\BraillePhrase.ts` - Manages phrases of Braille characters
- `src\parse.ts` - File parsing and processing
- `src\runner.ts` - Main program entry point

## Installation

```bash
npm install
```

## Usage

Run the decoder on the test files:

```bash
npm run run
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- TypeScript 5.6
- Vite 6.0
- Node.js

## License

See the original challenge repository for licensing information.
