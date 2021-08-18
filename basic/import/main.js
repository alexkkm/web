import {aString, aObject, aFunction, aClass} from './lib.js'

console.log(aString)
console.log(aObject)

import  * as myModule from './library'

console.log(myModule.aString)
console.log(myModule.aObject)

myModule.aFunction()
const newObj = new myModule.aClass('Inori', 16)
console.log(newObj)