/**
 * Represents a Braille character and provides methods for Braille text processing.
 * Handles initialization of Braille alphabet and decoding of Braille characters.
 */
export class BrailleChar {
    /**
     * Static map storing Braille patterns and their corresponding letters.
     * Key: 6-character Braille pattern
     * Value: Corresponding letter (A-Z) or space
     */
    private static alphabet: Map<string, string> = new Map();

    /**
     * The 6-character Braille pattern representing this character
     */
    private value: string;

    /**
     * Creates a new BrailleChar instance
     * @param brailleStr - 6-character string representing a Braille character
     * @throws Error if brailleStr is not exactly 6 characters
     */
    constructor(brailleStr: string) {
        if (brailleStr.length !== 6) {
            throw new Error('Braille character must be 6 characters long');
        }
        this.value = brailleStr;
    }

    /**
     * Initializes the Braille alphabet mapping from three rows of Braille patterns
     * @param row1 - First row of Braille patterns (52 characters)
     * @param row2 - Second row of Braille patterns (52 characters)
     * @param row3 - Third row of Braille patterns (52 characters)
     * @throws Error if any row is not exactly 52 characters
     */
    public static initializeAlphabet(row1: string, row2: string, row3: string): void {
        if (row1.length !== 52 || row2.length !== 52 || row3.length !== 52) {
            throw new Error('Each alphabet row must be 52 characters long');
        }

        this.alphabet.clear();
        for (let i = 0; i < 26; i++) {
            const brailleChar = row1.substr(i * 2, 2) +
                              row2.substr(i * 2, 2) +
                              row3.substr(i * 2, 2);
            const letter = String.fromCharCode(65 + i); // A-Z
            this.alphabet.set(brailleChar, letter);
        }

        // Add space character mapping
        const SPACE_CHAR = "  " +    // Two spaces in first row
                          "  " +    // Two spaces in second row
                          "  ";     // Two spaces in third row
        this.alphabet.set(SPACE_CHAR, "");
    }

    /**
     * Decodes this Braille character to its corresponding letter
     * @returns The decoded letter or '?' if pattern is not recognized
     * @throws Error if alphabet is not initialized
     */
    public decode(): string {
        if (BrailleChar.alphabet.size === 0) {
            throw new Error('Alphabet not initialized');
        }
        return BrailleChar.alphabet.get(this.value) || '?';
    }

    /**
     * Decodes a sentence written in Braille (three rows of patterns)
     * @param row1 - First row of the Braille sentence
     * @param row2 - Second row of the Braille sentence
     * @param row3 - Third row of the Braille sentence
     * @returns Decoded sentence as regular text
     * @throws Error if rows have unequal length or odd length
     */
    public static decodeSentence(row1: string, row2: string, row3: string): string {
        // Validate all rows have same length and are even
        if (row1.length !== row2.length || row2.length !== row3.length) {
            throw new Error('All rows must have equal length');
        }
        if (row1.length % 2 !== 0) {
            throw new Error('Row length must be even');
        }

        let result = '';
        for (let i = 0; i < row1.length; i += 2) {
            const brailleChar = new BrailleChar(
                row1.substr(i, 2) +
                row2.substr(i, 2) +
                row3.substr(i, 2)
            );
            result += brailleChar.decode();
        }
        return result;
    }

    /**
     * Returns the Braille pattern of this character
     * @returns The 6-character Braille pattern
     */
    public toString(): string {
        return this.value;
    }
}