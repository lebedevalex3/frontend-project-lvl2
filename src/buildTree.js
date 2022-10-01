import _ from 'lodash';

const getKeys = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  return _.sortBy(_.union(keys1, keys2));
};

const buildTree = (obj1, obj2) => {
  const unionKeys = getKeys(obj1, obj2);
  const tree = unionKeys.map((key) => {
    if (!_.has(obj1, key)) return { key, object2: obj2[key], type: 'added' };
    if (!_.has(obj2, key)) return { key, object1: obj1[key], type: 'deleted' };
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key,
        children: buildTree(obj1[key], obj2[key]),
        type: 'object',
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        object1: obj1[key],
        object2: obj2[key],
        type: 'changed',
      };
    }

    return { key, object2: obj2[key], type: 'unchanged' };
  });
  return tree;
};

export default buildTree;
