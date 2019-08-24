// 原始类型
let bool: boolean = true;
let num: number | undefined | null = 123;
let str: string = "abc";
// str = 123  会报错

// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<number | string> = [1, 2, 3, "abc"];

// 元组
let tuple: [number, string] = [0, "1"];
// 元组越界
// tuple.push(2)  // 不报错
// console.log(tuple) // [0, "1", 2]
// console.log(tuple[2]) // 但是想取出元组中的越界元素，就会报元组长度是2，在index为2时没有元素

// 函数
let add = (x: number, y: number): number => x + y;
let compute: (x: number, y: number) => number;
compute = (a, b) => a + b;

// 对象
let obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3;

// symbol
let s1: symbol = Symbol();
let s2 = Symbol();
// console.log(s1 === s2)

// undefined null
let un: undefined = undefined;
let nu: null = null;
// 所有类型的子类型，但是需要开启设置
num = undefined;
num = null;

// void
let noReturn = (): void => {};

// any
let x: any;
x = 1;
x = true;
x = "abc";

// never
function error(message: string): never {
  throw new Error(message);
}
