import path, { extname } from 'path';
import fs from 'fs';
import buildTree from '../src/buildTree.js';
import parser from '../src/parsers.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);

// const diff = (filePath1, filePath2, format = 'stylish') => {
//   const path1 = getAbsolutePath(filePath1);
//   const format1 = extname(path1).slice(1);
//   const path2 = getAbsolutePath(filePath2);
//   const format2 = extname(path2).slice(1);
//   const obj1 = parser(fs.readFileSync(path1, 'utf8'), format1);
//   const obj2 = parser(fs.readFileSync(path2, 'utf8'), format2);

//   const tree = buildTree(obj1, obj2);
//   return render(tree, format);
// };

const path1 = getAbsolutePath('file1.json');
const format1 = extname(path1).slice(1);
const path2 = getAbsolutePath('file2.json');
const format2 = extname(path2).slice(1);
const obj1 = parser(fs.readFileSync(path1, 'utf8'), format1);
const obj2 = parser(fs.readFileSync(path2, 'utf8'), format2);

const tree = buildTree(obj1, obj2);

console.log(tree.children[0]);
