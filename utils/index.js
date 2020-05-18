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

export function dateFormate(fmt,date) {
  let o = { 
  "M+" : date.getMonth()+1,     //月份 
  "d+" : date.getDate(),     //日 
  "h+" : date.getHours(),     //小时 
  "m+" : date.getMinutes(),     //分 
  "s+" : date.getSeconds(),     //秒 
  "q+" : Math.floor((date.getMonth()+3)/3), //季度 
  "S" : date.getMilliseconds()    //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
  fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
  if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}
