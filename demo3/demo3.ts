// 基础类型

// 布尔值
let isDone: boolean = false;
// let createdByNewBoolean: boolean = new Boolean(1); // 使用构造函数 Boolean 创造的对象不是布尔值
let createdByBoolean: boolean = Boolean(1); // 直接调用 Boolean 也会返回一个boolean类型

// 数字
let decLiteral: number = 666;
let hexLiteral: number = 0xf;
let binaryLiteral: number = 0b1;
let octalLiteral: number = 0o7;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

// 字符串
let dogName: string = "diandian";
dogName = 'huanhuan';

let heName: string = `Gold`;
let age: number = 30;
let sentence: string = `Hello, He name is ${heName}.
age is ${age}.`;

// 空值
function alertName(): void {
  alert('lalala~')
}

// Null 和 Undefined
let u: undefined = undefined;
let n: null = null;
let num: number = undefined; // 不会报错
let num1: number = null; // 不会报错
let str: string = undefined; // 不会报错
let str1: string = null; // 不会报错


