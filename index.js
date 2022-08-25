import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import clear from 'clear'
import fs from 'fs'

clear();

console.log(
    chalk.yellow(
      figlet.textSync('Uma Mf', { horizontalLayout: 'full' })
    )
  );
  
  
inquirer.prompt([{
    name: 'Mf',
    message: 'Nombre del Microfront',
    default: "mf-name"

},{
    name: 'port',
    message: 'numero del puerto en local',
    default: "port"
}
]).then(file => {
  fs.writeFile(`${file.Mf}.js`, `${file.texto}`, (err)=> {if(err){ console.log(err)}}) 
})