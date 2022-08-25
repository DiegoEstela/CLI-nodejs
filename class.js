import fs from 'fs' 
import copydir from 'copy-dir'

export class MicroFront {

  constructor(name, port) {
    this.name = name
    this.port = port

  }

  async moveTemplate() {
    try {
        copydir('./template', `./packages/${this.name}`, {
            utimes: true, 
            mode: true,   
            cover: true    
          }, function(err){
            if(err) throw err;
            console.log('create complete!');
        })
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async renameFiles(){
    await fs.rename( `./packages/${this.name}/src/uma-template.tsx`, `./packages/${this.name}/src/uma-${this.name}.tsx` ,(err) => {
        if (err) throw err;
        console.log('Rename complete!');
      });
  }

  async whitePackage(file){
    try {
    await  fs.writeFile(`./packages/${this.name}/package.json`, `${file}`, err => {
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      throw new Error(`Error reescribir:`)
    }
  }

  async AddNameAndPort() {
    const jsonPath = `./packages/${this.name}/package.json`;  
    await fs.readFile(jsonPath, "utf-8", (err, data) => {
      if (!err) {
        let newJson = data.replace(/PORT/g, this.port);
        newJson = newJson.replace(/NAME/g, this.name);
        this.whitePackage(newJson)
      } else {
        console.log(err);
      }
    }
  )

  const webpackPath = `./packages/webpack.config.js`;
  await fs.readFile(webpackPath, (err, data) => {
    if (!err) {
      console.log(data)
    } else {
      console.log(err);
    }
  }
)
}
}

