/**
 * 函数
 */

//  函数声明
function sum(x: number, y: number):number {
  return x + y;
}

sum(1,2)

// sum(1,2,3) // 输入多余的（或者少于要求的）参数，是不被允许的

// 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y:number): number {
  return x = y;
}

// 用接口定义函数形状
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = function (source: string, subString: string): boolean {
  return source.search(subString) !== - 1;
}


// 可选参数，可选参数必须接在必选参数后面。换句话说，可选参数后面不允许再出现必选参数了
function buildName(firstName: string, lastName?: string): string {
  return lastName ? firstName + lastName : firstName;
}
let tomcat = buildName('Tom','Cat');
let tom = buildName('Tom');
// 下面的会报错
// function buildName(firstName?: string, lastName: string): string {
//   return lastName ? firstName + lastName : firstName;
// }
// let tomcat = buildName('Tom', 'Cat');
// let tom = buildName(undefined,'Tom');

//参数默认值，此时的可选参数就不受 “可选参数必须接在必选参数后面” 的限制
function buildName1 (firstName: string = 'Tom', lastName: string): string {
  return firstName + lastName;
}
let tomcat1 = buildName('Tom', 'Cat');
let tom1 = buildName(undefined,'Tom');