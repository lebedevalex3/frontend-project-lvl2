import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import diff from '../index.js';

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

const getFixturePath = (file) => path.join(dir, '..', '__fixtures__', file);

const variants = [
  {
    resultPath: 'stylish_result.txt',
    type: 'json',
    format: 'stylish',
  },
  {
    resultPath: 'stylish_result.txt',
    type: 'yaml',
    format: 'stylish',
  },
  {
    resultPath: 'plain_result.txt',
    type: 'json',
    format: 'plain',
  },
  {
    resultPath: 'json_result.txt',
    type: 'json',
    format: 'json',
  },
  {
    resultPath: 'stylish_result.txt',
    type: 'json',
    format: null,
  },
];

test.each(variants)(
  'gendiff works correct for $type with $format',
  ({
    resultPath, format, type,
  }) => {
    const file1 = getFixturePath(`file1.${type}`);
    const file2 = getFixturePath(`file2.${type}`);
    const expected = fs.readFileSync(getFixturePath(resultPath), 'utf8');
    const result = format ? diff(file1, file2, format) : diff(file1, file2);
    expect(result).toEqual(expected);
  },
);
