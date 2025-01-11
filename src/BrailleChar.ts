export class BrailleChar {
    private static alphabet: Map<string, string> = new Map();
    private value: string;

    constructor(brailleStr: string) {
        if (brailleStr.length !== 6) {
            throw new Error('Braille character must be 6 characters long');
        }
        this.value = brailleStr;
    }

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

    public decode(): string {
        if (BrailleChar.alphabet.size === 0) {
            throw new Error('Alphabet not initialized');
        }
        return BrailleChar.alphabet.get(this.value) || '?';
    }

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

    public toString(): string {
        return this.value;
    }
}