import config from '../app.config';
// _命名转换成驼峰
export function underlineToHump(values) {
  if (!values) { return values; }
  if (values instanceof Array) {
    return values.map(value => underlineToHump(value));
  }
  if (typeof values === 'object') {
    const vals = JSON.parse(JSON.stringify(values));
    const oldNames = Object.keys(vals);
    const newNames = Object.keys(vals).map(name => name.replace(/(_[a-z])/g, match => match.toUpperCase().replace('_', '')));
    oldNames.forEach((newName) => {
      vals[newName] = underlineToHump(vals[newName]);
    });
    newNames.forEach((newName, i) => {
      const name = Object.keys(vals)[i];
      vals[newName] = underlineToHump(vals[name]);
    });
    return vals;
  }
  return values;
}
// 驼峰转_
export function humpToUnderline(values) {
  if (!values) { return values; }
  if (values instanceof Array) {
    return values.map(value => humpToUnderline(value));
  }
  if (typeof values === 'object') {
    const vals = JSON.parse(JSON.stringify(values));
    const oldNames = Object.keys(vals);
    const newNames = Object.keys(vals).map(name => name.replace(/([A-Z])/g, match => `_${match.toLowerCase()}`).replace(/^_/, ''));

    oldNames.forEach((newName) => {
      vals[newName] = humpToUnderline(vals[newName]);
    });
    newNames.forEach((newName, i) => {
      const name = Object.keys(vals)[i];
      vals[newName] = humpToUnderline(vals[name]);
    });
    return vals;
  }
  return values;
}
