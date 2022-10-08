import fs from 'fs';
import path, { extname } from 'path';
import parser from './parsers.js';
import buildTree from './buildTree.js';
import render from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);

const diff = (filePath1, filePath2, format = 'stylish') => {
  const path1 = getAbsolutePath(filePath1);
  const format1 = extname(path1);
  const path2 = getAbsolutePath(filePath2);
  const format2 = extname(path2);
  const obj1 = parser(fs.readFileSync(path1, 'utf8'), format1);
  const obj2 = parser(fs.readFileSync(path2, 'utf8'), format2);
  const tree = buildTree(obj1, obj2);
  return render(tree, format);
};

export default diff;
