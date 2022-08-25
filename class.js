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

}

