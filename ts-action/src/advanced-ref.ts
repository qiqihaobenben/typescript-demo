export { }

let obj = {
  a: 1,
  b: 2,
  c: 3
}

function getValues(obj: any, keys: string[]) {
  return keys.map(key => obj[key])
}

console.log(getValues(obj, ['a', 'b']))
console.log(getValues(obj, ['e', 'f'])) // 会显示[undefined, undefined]，但是TS编译器并没有报错，解决如下。


// 索引类型
// 索引类型的查询操作符 keyof T，表示类型T的所有公共属性的字面量的联合类型
interface Obj {
  a: number;
  b: string;
}
let key: keyof Obj


// 索引访问操作符 T[K]
let value: Obj['a']

// 泛型约束 T extends U 泛型变量可以继承某个类型获得某些属性
function getValuest<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}
console.log(getValuest(obj, ['a', 'b']))
// console.log(getValuest(obj, ['e', 'f'])) // 这样就会报错了
