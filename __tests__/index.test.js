import diff from '../src/index.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

test('compare file with string', () => {
  expect(diff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(
    fs.readFileSync(getFixturePath('result.txt'), 'utf8')
  );
});
