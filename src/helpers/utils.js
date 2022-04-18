import fs from "fs";


  export const print = (objeto) => {
    const msg = util.inspect(objeto, false, 12, true);
  };

  export const readFile = async (file) => {
    const read = await fs.promises.readFile(`./${file}`, `utf-8`);
    return read;
  };

  export const writeFile = async (file, items) => {
    await fs.promises.writeFile(
      `./${file}`,
      JSON.stringify(items, null, 2) + `\n`
    );
  };