import _ from 'lodash';

const getKeys = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  return _.sortBy(_.union(keys1, keys2));
};

const buildTree = (val1, val2) => {
  const unionKeys = getKeys(val1, val2);
  const tree = unionKeys.map((key) => {
    if (!_.has(val1, key)) {
      return { key, object2: val2[key], type: 'added' };
    }

    if (!_.has(val2, key)) {
      return { key, object1: val1[key], type: 'deleted' };
    }
    if (_.isPlainObject(val1[key]) && _.isPlainObject(val2[key])) {
      return {
        key,
        children: buildTree(val1[key], val2[key]),
        type: 'object',
      };
    }
    if (val1[key] !== val2[key]) {
      return {
        key,
        object1: val1[key],
        object2: val2[key],
        type: 'changed',
      };
    }

    return { key, object2: val2[key], type: 'unchanged' };
  });
  return tree;
};

const tree = (obj1, obj2) => ({
  type: 'root',
  children: buildTree(obj1, obj2),
});

export default tree;
