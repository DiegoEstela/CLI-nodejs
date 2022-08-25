import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import clear from 'clear'
import {MicroFront} from './class.js'


clear();

console.log(
    chalk.yellow(
      figlet.textSync('New Micro Front', { horizontalLayout: 'full' })
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
  createMicroFront.AddNameAndPort()
 }, 1000) 

 

})