import _ from 'lodash';

const getIndent = (value) => ' '.repeat(value);

const stringify = (value, level = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) return currentValue;

    const currentIndent = getIndent((depth + 1) * 4);
    const bracketIndent = getIndent(depth * 4);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(value, level);
};

export default stringify;
