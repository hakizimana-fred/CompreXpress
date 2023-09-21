import { existsSync, readFileSync } from "fs";

class ReadFile {
  uploadFile(filePath: string): any {
    if (this.isValidPath(filePath)) {
      const data = readFileSync(filePath, "utf-8");
      this.charFrequency(data);
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

    for (const char in frequency) {
      console.log(`${char}: ${frequency[char]}`);
    }
  }
}

const main = () => {
  const file = new ReadFile();
  file.uploadFile("/home/ngeni_fred/Desktop/file.txt");
};

void main();
