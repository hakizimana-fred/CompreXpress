import { existsSync, readFileSync } from "fs";

class ReadFile {
  uploadFile(filePath: string): any {
    if (this.isValidPath(filePath)) {
      const data = readFileSync(filePath, "utf-8");
      const frequencies = this.charFrequency(data);
      const huffmanTree = this.binaryHuffmanTree(frequencies);
      console.log("huffman", huffmanTree);
    } else {
      console.log("this is file path is invalid");
    }
  }

  isValidPath(filePath: string) {
    return existsSync(filePath);
  }

  charFrequency(data: string) {
    const frequency: Record<any, any> = {};

    for (const char of data) {
      if (/[a-zA-Z]/.test(char)) {
        const lowerChar = char.toLowerCase();

        if (frequency[lowerChar]) {
          frequency[lowerChar]++;
        } else {
          frequency[lowerChar] = 1;
        }
      }
    }
    return frequency;
  }

  binaryHuffmanTree(frequentChars: Record<any, any>): any {
    //return frequentChars;
    const leafNodes = Object.keys(frequentChars).map((char) => ({
      character: char,
      frequency: frequentChars[char],
    }));
    let nodes = [...leafNodes];

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.frequency - b.frequency);

      const left = nodes.shift();
      const right = nodes.shift();

      const internalNode = {
        left,
        right,
        frequency: left?.frequency + right?.frequency,
      } as any;

      nodes.push(internalNode);
    }

    return nodes[0];
  }
}

const main = () => {
  const file = new ReadFile();
  file.uploadFile("/home/ngeni_fred/Desktop/file.txt");
};

void main();
