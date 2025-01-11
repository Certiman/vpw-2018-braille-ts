import { BraillePhrase } from './BraillePhrase';

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
    private character: string;

    /**
     * Creates a new BrailleChar instance
     * @param brailleStr - 6-character string representing a Braille character
     * @throws Error if brailleStr is not exactly 6 characters
     */
    constructor(brailleStr: string) {
        if (brailleStr.length !== 6) {
            throw new Error('Braille character must be 6 characters long');
        }
        this.character = brailleStr;
    }

    /**
     * Initializes the Braille alphabet mapping from a Braille phrase
     * @param phrase - Braille phrase containing the alphabet patterns
     * @throws Error if phrase is not exactly 52 characters
     */
    public static initializeAlphabet(phrase: BraillePhrase): void {
        if (phrase.length !== 52) {
            throw new Error('Alphabet must be 52 characters long');
        }

        this.alphabet.clear();
        for (let i = 0; i < 26; i++) {
            const brailleChar = phrase.extractCharAt(i * 2);
            const letter = String.fromCharCode(65 + i);
            this.alphabet.set(brailleChar, letter);
        }

        // Add a space as well
        const SPACE_CHAR = '      '; // 6 spaces
        this.alphabet.set(SPACE_CHAR, ' ');
    }

    /**
     * Decodes this Braille character to its corresponding letter
     * @returns The decoded letter or '?' if pattern is not recognized
     * @throws Error if alphabet is not initialized
     */
    public decodeChar(): string {
        if (BrailleChar.alphabet.size === 0) {
            throw new Error('Alphabet not initialized');
        }
        return BrailleChar.alphabet.get(this.character) || '?';
    }

    /**
     * Decodes a sentence written in Braille from a Braille phrase
     * @param phrase - Braille phrase containing the sentence patterns
     * @returns Decoded sentence as regular text
     */
    public static decodePhrase(phrase: BraillePhrase): string {
        let result = '';
        for (let i = 0; i < phrase.length; i += 2) {
            const brailleChar = new BrailleChar(phrase.extractCharAt(i));
            result += brailleChar.decodeChar();
        }
        return result;
    }

    /**
     * Returns the Braille pattern of this character
     * @returns The 6-character Braille pattern
     */
    public toString(): string {
        return this.character;
    }
}
