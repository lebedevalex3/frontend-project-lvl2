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

const renderObject = (value) => {
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
          )}\n${intendWithSymbol}+ ${entry.key}: ${stringify(
            entry.object2,
            depth
          )}`;
        case 'object':
          return `${intend}${entry.key}: ${iter(entry.children, depth + 1)}`;
        default:
          throw new Error(`Error: ${entry.type}`);
      }
    });
    return ['{', ...lines, `${bracket}}`].join('\n');
  };
  return iter(value);
};

export default renderObject;
