import { existsSync } from "fs";

class ReadFile {
  uploadFile(filePath: string): any {
    if (this.isValidPath(filePath)) {
      console.log("file path is valid");
    } else {
      console.log("this is file path is invalid");
    }
  }

  isValidPath(filePath: string) {
    return existsSync(filePath);
  }
}

const main = () => {
  const file = new ReadFile();
  file.uploadFile("");
};

void main();
