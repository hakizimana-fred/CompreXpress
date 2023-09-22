import { existsSync, readFileSync } from "fs";

class FileCompressor {
  huffmanTree = null;
  charMapping: any = {};

  uploadFile(filePath: string): any {
    if (this.isValidPath(filePath)) {
      const data = readFileSync(filePath, "utf-8");
      const frequencies = this.charFrequency(data);
      this.huffmanTree = this.binaryHuffmanTree(frequencies);
      this.charMapping = this.prefixCodeTable(this.huffmanTree);

      const header = {
        huffmanTree: this.huffmanTree,
        charMapping: this.charMapping,
        delimiter: "|||",
      };

      const compressedData = this.compressedData(data);
      console.log(compressedData);
    } else {
      console.log("Invalid file path");
    }
  }

  isValidPath(filePath: string) {
    return existsSync(filePath);
  }

  charFrequency(data: string) {
    const frequency: Record<string, number> = {};

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

  binaryHuffmanTree(frequentChars: Record<string, number>): any {
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
        frequency: left!.frequency + right!.frequency,
      } as any;

      nodes.push(internalNode);
    }

    return nodes[0];
  }
  prefixCodeTable(huffmanTree: any): Record<string, string> {
    const codeTable: Record<string, string> = {};

    function traverse(node: any, currentCode: string) {
      if (node.left === undefined && node.right === undefined) {
        codeTable[node.character] = currentCode;
      } else {
        traverse(node.left, currentCode + "0");
        traverse(node.right, currentCode + "1");
      }
    }

    traverse(huffmanTree, "");

    return codeTable;
  }
  compressedData(data: string) {
    let encodedText: string = "";

    for (const char of data) {
      if (char in this.charMapping) {
        encodedText += this.charMapping[char];
      }
    }

    return encodedText;
  }
}

const main = () => {
  const file = new FileCompressor();
  file.uploadFile("/home/ngeni_fred/Desktop/file.txt");
};

void main();
