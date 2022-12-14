import renderObject from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return renderObject(tree.children);
    case 'plain':
      return renderPlain(tree);
    case 'json':
      return renderJson(tree);
    default:
      throw new Error(`Wrong format ${format}`);
  }
};
