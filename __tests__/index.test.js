import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const dir = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (file) => path.join(dir, '..', '__fixtures__', file);
const readFixture = (file) => fs.readFileSync(getFixturePath(file), 'utf8');

const stylishResult = readFixture('stylish_result.txt');
const plainResult = readFixture('plain_result.txt');
const jsonResult = readFixture('json_result.txt');

describe('gendiff', () => {
  test.each(['yaml', 'json'])('gendiff %s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);

    expect(genDiff(filepath1, filepath2)).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
  });
});
