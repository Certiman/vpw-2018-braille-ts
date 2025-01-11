export class BraillePhrase {
    constructor(
        private row1: string,
        private row2: string,
        private row3: string
    ) {
        this.validateRows();
    }

    private validateRows(): void {
        if (this.row1.length !== this.row2.length || this.row2.length !== this.row3.length) {
            throw new Error('All rows must have equal length');
        }
        if (this.row1.length % 2 !== 0) {
            throw new Error('Row length must be even');
        }
    }

    public get length(): number {
        return this.row1.length;
    }

    public extractCharAt(index: number): string {
        return this.row1.substr(index, 2) +
               this.row2.substr(index, 2) +
               this.row3.substr(index, 2);
    }
}