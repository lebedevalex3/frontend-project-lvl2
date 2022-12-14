import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }

  return String(value);
};

const renderPlain = (tree, parents = []) => {
  const keysOfParents = _.compact([...parents, tree.key]);
  const nameOfParents = keysOfParents.join('.');
  switch (tree.type) {
    case 'root': {
      const result = _.compact(
        tree.children.flatMap((elem) => renderPlain(elem, keysOfParents)),
      );
      return result.join('\n');
    }
    case 'object':
      return _.compact(
        tree.children.flatMap((elem) => renderPlain(elem, keysOfParents)),
      );
    case 'deleted':
      return `Property '${nameOfParents}' was removed`;
    case 'added':
      return `Property '${nameOfParents}' was added with value: ${stringify(
        tree.value2,
      )}`;
    case 'changed':
      return `Property '${nameOfParents}' was updated. From ${stringify(
        tree.value1,
      )} to ${stringify(tree.value2)}`;
    case 'unchanged':
      return null;
    default:
      throw new Error(`Error: ${tree.type}`);
  }
};

export default renderPlain;
