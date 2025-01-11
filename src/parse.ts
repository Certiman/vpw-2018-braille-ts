import * as fs from 'fs';
import { BrailleChar } from './BrailleChar';

export class Parser {
    private static async readFile(filename: string): Promise<string> {
        try {
            // Try Node.js fs first
            return fs.readFileSync(filename, 'utf-8');
        } catch (e) {
            // Fallback to fetch
            const response = await fetch(filename);
            if (!response.ok) {
                throw new Error(`Failed to load file: ${filename}`);
            }
            return response.text();
        }
    }

    static async parseSolution(filename: string): Promise<string[]> {
        const content = await this.readFile(filename);
        const lines = content
            .split('\n')
            .map((line) => line.trim().substring(line.indexOf(' ') + 1));
        return lines;
    }

    static async parseFile(filename: string): Promise<string[]> {
        const content = await this.readFile(filename);
        const lines = content.split('\n').map((line) => line.trim());

        // Initialize alphabet with first 3 lines
        BrailleChar.initializeAlphabet(lines[0], lines[1], lines[2]);

        // Read number of test cases
        const numCases = parseInt(lines[3]);
        const results: string[] = [];

        let currentLine = 4;
        for (let i = 0; i < numCases; i++) {
            const row1 = lines[currentLine];
            const row2 = lines[currentLine + 1];
            const row3 = lines[currentLine + 2];

            const decoded = BrailleChar.decodeSentence(row1, row2, row3);
            results.push(decoded);

            currentLine += 3;
        }

        return results;
    }
}
