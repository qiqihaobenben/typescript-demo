/**
 * 联合类型
 */

 let oneNumber: string | number;
 oneNumber = 'seven';
 oneNumber = 7;

 /**
  * 对象类型——接口
  */
 interface Person {
   name: string;
   age: number;
 }
 let tom: Person = {
   name: 'Tom',
   age: 26
 };

// 以下多一些或者少一些属性是不允许的，会报错
// let tom: Person = {
//   name: 'Tom'
// };

// let tom: Person = {
//   name: 'Tom',
//   age: 26,
//   say: 'English'
// };

// 可选属性
interface PersonOne {
  name: string;
  age?: number;
}

let tom1: PersonOne = {
  name: 'Tom1'
};

// 任意属性
interface PersonTwo {
  name: string;
  age?: number;
  [propName: string]: string | number;
};

let tom2: PersonTwo = {
  name: 'tom2',
  age: 26,
  say: 'English',
  gender: 'male'
};

// 只读属性
interface PersonThree {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any
}
let tom3: PersonThree = {
  id: 123,
  name: 'Tom3',
  gender: 'male'
};
// tom3.id = 234; // 只读属性，赋值会报错
tom3.gender = 'female';



