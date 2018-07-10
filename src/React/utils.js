function camelToKebab(string) {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function tranformStyleObject(obj) {
  return Object.keys(obj)
    .reduce((result, key) => {
      result = result + ' ' + camelToKebab(key) + ':' + obj[key] + ';';
      return result;
    }, '')
    .trim();
}
export const TEXT_NODE = '#text';
