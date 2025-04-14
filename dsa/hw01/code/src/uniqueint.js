const fs = require("fs");
const readline = require("readline");

class UniqueInt {
    constructor() {
        this.min = -1023;
        this.max = 1023;
        this.range = this.max - this.min + 1;
        this.seen = new Array(this.range).fill(false);
    }

    readNextItemFromLine(line) {
        const trimmed = line.trim();
        const parts = trimmed.split(/\s+/);

        if (parts.length !== 1) return null;
        const num = parseInt(parts[0], 10);
        if (isNaN(num) || num < this.min || num > this.max || parts[0].includes('.')) {
            return null;
        }
        return num;
    }

    processFile(inputFilePath, outputFilePath) {
        const data = fs.readFileSync(inputFilePath, "utf-8").split("\n");
        for (let line of data) {
            const num = this.readNextItemFromLine(line);
            if (num !== null) {
                this.seen[num - this.min] = true;
            }
        }

        const uniqueSorted = [];
        for (let i = 0; i < this.range; i++) {
            if (this.seen[i]) {
                uniqueSorted.push(i + this.min);
            }
        }

        fs.writeFileSync(outputFilePath, uniqueSorted.join("\n"));

        console.log(`Processed: ${inputFilePath}`);
        console.log(`Output: ${outputFilePath}`);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter input file path: ", (inputFile) => {
    const outputFile = "output.txt"; 
    const uniqueInt = new UniqueInt();
    try {
        uniqueInt.processFile(inputFile, outputFile);
    } catch (error) {
        console.error("Error:", error.message);
    }
    rl.close();
});
