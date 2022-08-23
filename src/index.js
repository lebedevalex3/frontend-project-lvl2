import  fs from 'fs';
import _ from "lodash";
import path from 'path';



const diff = (filePath1, filePath2) => {
  const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath)
const obj1 = JSON.parse(fs.readFileSync(getAbsolutePath(filePath1),"utf8"))
const obj2 = JSON.parse(fs.readFileSync(getAbsolutePath(filePath2),"utf8"))

const allKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)])

const res = allKeys.sort().map(elem => {
  if (Object.hasOwn(obj1, elem) &&(Object.hasOwn(obj2, elem))) {
    if (obj1[elem] == obj2[elem]) return [elem,'not changed']
    else return [elem,'changed']
  }
  if (Object.hasOwn(obj1, elem) && !(Object.hasOwn(obj2, elem))) return [elem,'deleted']
  else return [elem,'added']
})

const result = res.reduce((acc, elem) => {
  const [key, status] = elem;
  switch (status){
    case 'deleted': acc = `${acc}\n - ${key}: ${obj1[key]}`
    break;
    case 'changed': acc = `${acc}\n - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`
    break;
    case 'not changed': acc = `${acc}\n   ${key}: ${obj1[key]}`
    break;
    case 'added': acc = `${acc}\n + ${key}: ${obj2[key]}`
  }
  return acc;
  
  
  },'{').concat('\n}')

  return result;
}




export default diff;