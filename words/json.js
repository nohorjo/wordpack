const fs = require('fs');

const inFile = process.argv[2];
const outFile = `${inFile.replace('_', '').replace('txt', '')}json`;

const readLines = file => new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data.split('\n'));
    });
})

Promise.all([
    readLines('_all.txt'),
    readLines(inFile)
]).then(([
    eng,
    lines
]) => {
    const words = [];
    for (let i = 0; i < eng.length; i++) {
        let line = Array.from(new Set(lines[i].split('$'))).join('\n');
        if (line) {
            words.push({
                word: eng[i],
                translation: line
            });
        }
    }
    fs.writeFile(outFile, JSON.stringify(words), err => { if (err) throw err; });
});