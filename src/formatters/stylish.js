import _ from 'lodash';

const indent = (depth, isSymbol = false, spacesCount = 4) => (isSymbol
  ? ' '.repeat(depth * spacesCount - 2)
  : ' '.repeat(depth * spacesCount));

const stringify = (value, level = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }

    const currentIndent = indent(depth + 1);
    const bracketIndent = indent(depth);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`,
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(value, level);
};

const renderObject = (value) => {
  const iter = (currentValue, depth = 1) => {
    const bracket = indent(depth - 1);
    const lines = currentValue.map((entry) => {
      const intend = indent(depth);
      const intendWithSymbol = indent(depth, true);

      switch (entry.type) {
        case 'added':
          return `${intendWithSymbol}+ ${entry.key}: ${stringify(
            entry.value2,
            depth,
          )}`;
        case 'deleted':
          return `${intendWithSymbol}- ${entry.key}: ${stringify(
            entry.value1,
            depth,
          )}`;
        case 'unchanged':
          return `${intend}${entry.key}: ${stringify(entry.value2, depth)}`;
        case 'changed':
          return `${intendWithSymbol}- ${entry.key}: ${stringify(
            entry.value1,
            depth,
          )}\n${intendWithSymbol}+ ${entry.key}: ${stringify(
            entry.value2,
            depth,
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
