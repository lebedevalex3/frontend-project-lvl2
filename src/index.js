import fs from 'fs';
// import _ from 'lodash';
import path, { extname } from 'path';
import parser from './parsers.js';
import buildTree from './buildTree.js';
import stringify from './stringify.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);

const render = (value) => {
  const iter = (currentValue, depth = 1) => {
    const bracket = ' '.repeat((depth - 1) * 4);
    const lines = currentValue.map((entry) => {
      const intend = ' '.repeat(depth * 4);
      const intendWithSymbol = ' '.repeat(depth * 4 - 2);

      switch (entry.type) {
        case 'added':
          return `${intendWithSymbol}+ ${entry.key}: ${stringify(
            entry.object2,
            depth
          )}`;
        case 'deleted':
          return `${intendWithSymbol}- ${entry.key}: ${stringify(
            entry.object1,
            depth
          )}`;
        case 'unchanged':
          return `${intend}${entry.key}: ${stringify(entry.object2, depth)}`;
        case 'changed':
          return `${intendWithSymbol}- ${entry.key}: ${stringify(
            entry.object1,
            depth
          )} \n${intendWithSymbol}+ ${entry.key}: ${stringify(
            entry.object2,
            depth
          )}`;
        case 'object':
          return `${intend}${entry.key}: ${iter(entry.children, depth + 1)}`;
        default:
          break;
      }
    });
    return ['{', ...lines, `${bracket}}`].join('\n');
  };
  return iter(value);
};

const diff = (filePath1, filePath2) => {
  const path1 = getAbsolutePath(filePath1);
  const format1 = extname(path1);
  const path2 = getAbsolutePath(filePath2);
  const format2 = extname(path2);
  const obj1 = parser(fs.readFileSync(path1, 'utf8'), format1);
  const obj2 = parser(fs.readFileSync(path2, 'utf8'), format2);
  const tree = buildTree(obj1, obj2);
  return render(tree);
};

export default diff;
