import inquirer from 'inquirer'
import chalk from 'chalk'
import figlet from 'figlet'
import clear from 'clear'
import {MicroFront} from './template.js'


clear();

console.log(
    chalk.yellow(
      figlet.textSync('New Micro Front')
    )
  );

  
inquirer.prompt([{
    name: 'microFrontName',
    message: 'Nombre del Microfront',
    default: 'mf-name'

},{
  name: 'pathName',
  message: 'en que ruta queres que se encuentre',
  default: 'pathName'
}
]).then(async (file) => {
  const {microFrontName,  pathName} = file
  const createMicroFront = new MicroFront(microFrontName, pathName)
  createMicroFront.createPort()
  createMicroFront.moveTemplate()
  createMicroFront.renameFiles()
  createMicroFront.changeJson()
  createMicroFront.changeWebpack()
  createMicroFront.changeTsConfig()
  createMicroFront.changeImportMap() 
  createMicroFront.addMfInRootConfig() 
  createMicroFront.addMfInRootLayaout() 
  createMicroFront.addMfInRoot()
})