const startTime = performance.now()
import { Parser } from './parse.ts';
import path from 'path';

const baseDir = process.cwd();
const inputUrl = new URL(path.join(baseDir, 'src', 'wedstrijd.in'), import.meta.url);
const outputUrl = new URL(path.join(baseDir, 'src', 'wedstrijd.uit'), import.meta.url);

const sentences = await Parser.parseFile(inputUrl.href);
const solutions = await Parser.parseSolution(outputUrl.href);

for (const [i, sentence] of sentences.entries()) {
    if (sentence != solutions[i]){
        console.error(`Sentence Wrong? ${sentence} <> ${solutions[i]}`);
    }
}
console.log(`Code took ${performance.now() - startTime} msec.`);

