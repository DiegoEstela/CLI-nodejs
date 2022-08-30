import fs from 'fs';
import copydir from 'copy-dir';

export class MicroFront {
  constructor(name, pathName) {
    this.name = name;
    this.port;
    this.pathName = pathName;
  }

  createPort(){
    const rootPath = './packages/root/src/index.ejs';
    fs.readFile(rootPath, 'utf-8', (err, data) => {
      if (!err) {
        const stringIndexRoot = data.replace(/(\r\n|\n|\r)/gm,'')
        this.port = parseInt(stringIndexRoot.split('localhost:')[6].split('/')[0]) + 1
      } else {
        console.log(err);
      }
    });
    
    
  }

  moveTemplate() {
    copydir.sync('./template', `./packages/${this.name}`, {
      utimes: true,
      mode: true,
      cover: true,
    });
    console.log('Copy Template ✓');
  }

  async renameFiles() {
    await fs.rename(
      `./packages/${this.name}/src/uma-template.tsx`,
      `./packages/${this.name}/src/uma-${this.name}.tsx`,
      (err) => {
        if (err) throw err;
        console.log('Rename Template ✓');
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
    await fs.readFile(jsonPath, 'utf-8', (err, data) => {
      if (!err) {
        let newJson = data.replace(/PORT/g, this.port);
        newJson = newJson.replace(/NAME/g, this.name);
        this.writeFiles(jsonPath, newJson);
        console.log('write Packages.json ✓');
      } else {
        console.log(err);
      }
    });
  }

  async changeWebpack() {
    const webpackPath = `./packages/${this.name}/webpack.config.js`;
    await fs.readFile(webpackPath, 'utf-8', (err, data) => {
      if (!err) {
        let newWebPack = data.replace(/NAME/g, this.name);
        this.writeFiles(webpackPath, newWebPack);
        console.log('write Webpack ✓');
      } else {
        console.log(err);
      }
    });
  }

  async changeTsConfig() {
    const tsConfigPath = `./packages/${this.name}/tsconfig.json`;
    await fs.readFile(tsConfigPath, 'utf-8', (err, data) => {
      if (!err) {
        let newTsConfig = data.replace(/NAME/g, this.name);
        this.writeFiles(tsConfigPath, newTsConfig);
        console.log('write TsConfig ✓');
      } else {
        console.log(err);
      }
    });
  }

  async changeImportMap() {
    const importMapPath = './importmap.json';
    await fs.readFile(importMapPath, 'utf-8', (err, data) => {
      if (!err) {
        const importMapParse = JSON.parse(data);
        const importData = importMapParse.imports;
        importData[
          `@uma/${this.name}`
        ] = `https://microfront-portal-${this.name}-#PROJECT_HASH#-uc.a.run.app/uma-${this.name}.js`;
        this.writeFiles(
          importMapPath,
          JSON.stringify({ imports: importData }, null, 4)
        );
        console.log('write importData ✓');
      } else {
        console.log(err);
      }
    });
  }

  async addMfInRootConfig() {
    const rootConfigPath = './packages/root/src/uma-root-config.ts';
    await fs.readFile(rootConfigPath, 'utf-8', (err, data) => {
      if (!err) {
        const newRoot = `registerApplication(\n  '@uma/${this.name}',\n  // @ts-ignore\n  () => System.import('@uma/${this.name}'),\n  (location) => location.pathname === '/${this.pathName}'\n);\n\nstart()
        `;
        let newRooTConfig = data.replace(/start\(\)/g, newRoot);
        this.writeFiles(rootConfigPath, newRooTConfig);
        console.log('add MicroFront in RootConfig ✓');
      } else {
        console.log(err);
      }
    });
  }


  async addMfInRootLayaout() {
    const rootLayaoutPath = './packages/root/src/microfrontend-layout.html';
    await fs.readFile(rootLayaoutPath, 'utf-8', (err, data) => {
      if (!err) {
        const MfLayout = 
        `<li>
          <a href="./${this.pathName}">${this.name}</a>
        </li>
        <!-- nuevoMicroFront -->`
        let newMfLayout = data.replace(/<!-- nuevoMicroFront -->/g, MfLayout);
        this.writeFiles(rootLayaoutPath, newMfLayout);
        console.log('add MicroFront in Layaout ✓');
      } else {
        console.log(err);
      }
    });
  }

  async addMfInRoot() {
    const rootPath = './packages/root/src/index.ejs';
    await fs.readFile(rootPath, 'utf-8', (err, data) => {
      if (!err) {
        let rootNewMf = `"@uma/root-config": "//localhost:9000/uma-root-config.js",
        "@uma/${this.name}": "//localhost:${this.port}/uma-${this.name}.js"`
        let newRoot = data.replace(/"@uma\/root-config": "\/\/localhost:9000\/uma-root-config.js"/g, rootNewMf);
        this.writeFiles(rootPath, newRoot);
        console.log('add MicroFront in Root ✓'); 
      } else {
        console.log(err);
      }
    });
  }

  
}
