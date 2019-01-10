/**
 * 类型推断
 */

//  let oneNumber = 'seven'; // 不声明类型
//  oneNumber = 7; // 会报错

// 等价于
// let oneNumber: string = 'seven';
// oneNumber = 7; // 会报错

// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
let oneNumber;
oneNumber = 'seven';
oneNumber = 7;