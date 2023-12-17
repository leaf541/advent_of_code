import { promises as fsPromises } from "fs";
import { join } from "path";

export const readFileAsync = async (path: string) => {
  try {
    const content = await fsPromises.readFile(join(__dirname, path), "utf8");
    return content.split(/\r?\n/).filter(x => x);

  } catch (e) {
    console.error(e);
    return null;
  }
};
