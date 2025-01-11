import { readFile as fsReadFile } from 'fs';
import { BrailleChar } from './BrailleChar';

/**
 * Parser class for handling Braille text files.
 * Processes files containing Braille alphabet and sentences to decode.
 */
export class Parser {
    /**
     * Reads a file asynchronously and returns its contents as a string.
     * @param filename - Path to the file to read
     * @returns Promise resolving to the file contents as string
     * @throws Error if file cannot be read
     */
    private static readFile(filename: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fsReadFile(filename, 'utf8', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    /**
     * Parses a solution file containing expected outputs.
     * Each line in the solution file contains an expected decoded sentence.
     * 
     * @param filename - Path to the solution file to parse
     * @returns Promise resolving to array of expected sentences
     * @throws Error if file cannot be read
     */
    static async parseSolution(filename: string): Promise<string[]> {
        const content = await this.readFile(filename);
        const lines = content
            .split('\n')
            .map((line) => line.trim().substring(line.indexOf(' ') + 1));
        return lines;
    }

    /**
     * Parses a Braille file and decodes all sentences within.
     * File format:
     * - First 3 lines: Braille alphabet definition (52 chars each)
     * - Line 4: Number of test cases
     * - Following lines: Test cases, 3 lines per case
     * 
     * @param filename - Path to the Braille file to parse
     * @returns Promise resolving to array of decoded sentences
     * @throws Error if file format is invalid
     */
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
