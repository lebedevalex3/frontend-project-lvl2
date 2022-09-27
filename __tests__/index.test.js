import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import diff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

const getFixturePath = (file) => path.join(dir, '..', '__fixtures__', file);

test('compare file with string', () => {
  expect(diff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(
    // eslint-disable-next-line comma-dangle
    fs.readFileSync(getFixturePath('result.txt'), 'utf8')
  );
});
