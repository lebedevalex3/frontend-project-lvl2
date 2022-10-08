import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import diff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

const getFixturePath = (file) => path.join(dir, '..', '__fixtures__', file);

const variants = [
  {
    path1: 'file1.json',
    path2: 'file2.json',
    resultPath: 'stylish_result.txt',
    type: 'json',
    format: 'stylish',
  },
  {
    path1: 'file1.yml',
    path2: 'file2.yml',
    resultPath: 'stylish_result.txt',
    type: 'yaml',
    format: 'stylish',
  },
  {
    path1: 'file1.json',
    path2: 'file2.json',
    resultPath: 'plain_result.txt',
    type: 'json',
    format: 'plain',
  },
  {
    path1: 'file1.json',
    path2: 'file2.json',
    resultPath: 'json_result.txt',
    type: 'json',
    format: 'json',
  },
];

test.each(variants)(
  'gendiff works correct for $type with $format',
  ({ path1, path2, resultPath, format }) => {
    const file1 = getFixturePath(path1);
    const file2 = getFixturePath(path2);
    const expected = fs.readFileSync(getFixturePath(resultPath), 'utf8');
    const result = diff(file1, file2, format);
    expect(result).toEqual(expected);
  }
);
