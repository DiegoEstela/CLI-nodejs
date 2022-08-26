import fs from "fs";
import copydir from "copy-dir";

export class MicroFront {
  constructor(name, port) {
    this.name = name;
    this.port = port;
  }

  moveTemplate() {
      copydir.sync("./template",`./packages/${this.name}`,
        {
          utimes: true,
          mode: true,
          cover: true,
        });
        console.log("Copy Template ✓");
  }

  async renameFiles() {
    await fs.rename(
      `./packages/${this.name}/src/uma-template.tsx`,
      `./packages/${this.name}/src/uma-${this.name}.tsx`,
      (err) => {
        if (err) throw err;
        console.log("Rename Template ✓");
      }
    );
  }

  async writeFiles(path, file) {
    try {
      await fs.writeFile(`${path}`, `${file}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      throw new Error(`Error reescribir: ${path}`);
    }
  }

  async changeJson() {
    const jsonPath = `./packages/${this.name}/package.json`;
    await fs.readFile(jsonPath, "utf-8", (err, data) => {
      if (!err) {
        let newJson = data.replace(/PORT/g, this.port);
        newJson = newJson.replace(/NAME/g, this.name);
        this.writeFiles(jsonPath, newJson);
        console.log("write Packages.json ✓");
      } else {
        console.log(err);
      }
    });
  }

  async changeWebpack() {
    const webpackPath = `./packages/${this.name}/webpack.config.js`;
    await fs.readFile(webpackPath, "utf-8", (err, data) => {
      if (!err) {
        let newWebPack = data.replace(/NAME/g, this.name);
        this.writeFiles(webpackPath, newWebPack);
        console.log("write Webpack ✓");
      } else {
        console.log(err);
      }
    });
  }

  async changeTsConfig() {
    const tsConfigPath = `./packages/${this.name}/tsconfig.json`;
    await fs.readFile(tsConfigPath, "utf-8", (err, data) => {
      if (!err) {
        let newTsConfig = data.replace(/NAME/g, this.name);
        this.writeFiles(tsConfigPath, newTsConfig);
        console.log("write TsConfig ✓");
      } else {
        console.log(err);
      }
    });
  }
}
