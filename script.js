import fs from "fs";
import copydir from "copy-dir";

export async function renameFiles(microFrontName) {
  await fs.rename(
    `./packages/${microFrontName}/src/uma-template.tsx`,
    `./packages/${microFrontName}/src/uma-${microFrontName}.tsx`,
    (err) => {
      if (err) throw err;
      console.log("Rename complete!");
    }
  );
}

export async function createMicroFront(microFrontName) {
  copydir(
    "./template",
    `./packages/${microFrontName}`,
    {
      utimes: true,
      mode: true,
      cover: true,
    },
    function (err) {
      if (err) throw err;
      console.log("create complete!");
    }
  );
}

export async function AddNameAndPort(microFrontName, microFrontPort) {
  const path = `./packages/${microFrontName}/package.json`;
  await fs.readFile(path, "utf-8", (err, data) => {
    if (!err) {
      let datas = data.replace(/PORT/g, microFrontPort);
      datas = datas.replace(/NAME/g, microFrontName);
      fs.writeFile(path, (datas, null, 2));
    } else {
      console.log(err);
    }
  });
}
