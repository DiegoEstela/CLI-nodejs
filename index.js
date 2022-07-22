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
    name: 'texto',
    message: 'que queres escribir adentro',
    default: "prueba"
}
]).then(file => {
    console.log(file)
  fs.writeFile(`${file.Mf}.js`, `${file.texto}`, (err)=> {if(err){ console.log(err)}}) 
})