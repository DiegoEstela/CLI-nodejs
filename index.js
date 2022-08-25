import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import clear from 'clear'
import {createMicroFront, renameFiles, AddNameAndPort}  from './script.js'
import {MicroFront} from './class.js'


clear();

console.log(
    chalk.yellow(
      figlet.textSync('Uma Mf', { horizontalLayout: 'full' })
    )
  );

  
inquirer.prompt([{
    name: 'microFrontName',
    message: 'Nombre del Microfront',
    default: "mf-name"

},{
    name: 'port',
    message: 'numero del puerto en local',
    default: "port"
}
]).then(async (file) => {
  const createMicroFront = new MicroFront(file.microFrontName, file.port)

  await createMicroFront.moveTemplate()
 setTimeout(()=>{
  createMicroFront.renameFiles()
 }, 1000) 

 

})