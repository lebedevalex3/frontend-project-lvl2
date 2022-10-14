import { load } from 'js-yaml';

const parser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return load(data);
    default:
      throw new Error(`Wrong format ${format}`);
  }
};

export default parser;
