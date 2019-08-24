// 数字枚举
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest
}
// console.log(Role.Guest)
// console.log(Role)

// 字符串枚举
enum Message {
  Success = '成功',
  Fail = '失败'
}
// console.log(Message.Success)
// console.log(Message)

// 异构枚举，不推荐使用
 enum Answer {
   N,
   Y = 'Yes',
  //  X = Math.random() // 含字符串成员的枚举中不允许使用计算值
 }
//  console.log(Answer[0])
//  console.log(Answer)

// 枚举成员
enum Char {
  // const member 常量枚举，会在编译阶段计算结果，以常量的形式出现在运行时环境
  a,
  b = Char.a,
  c = 1 + 3,

  // computed member 需要被计算的枚举成员，不会在编译阶段进行计算，会被保留到执行阶段
  d = Math.random(),
  e = '123'.length,
  // 在computed member后面的枚举成员，一定要赋一个初始值，否则报错
  f = 1
}
// console.log(Char)

// 常量枚举
// 编译后Month是没有值的，只能在编译前使用
const enum Month {
  Jan,
  Feb,
  Mar
}
let month = [Month.Jan, Month.Feb, Month.Mar];


// 枚举类型
enum E {a,b}
enum F {a = 1,b = 5, c = 4,d} // 中间的5索引会被忽略，直接4：c,5：d
enum G {a = 'apple',b = 'banana'}

// 变量定义为数字枚举类型，赋值任意number类型的值都是可以的，对枚举没有影响，但是不能赋值字符串等。
let e: E = 3
let f: F = 10
// console.log(E,F,e,f)
// e === f // 不同的枚举类型是不能比较的

let e1: E = 3
let e2: E = 3
// 同一个枚举类型是可以比较的
// console.log(e1 === e2)

// 就算定义为枚举类型的某个具体成员的类型，赋值也是对枚举没有影响的。E的结果还是不变的。
let e3: E.a = 3
let e4: E.b = 3
// 同一个枚举类型的不同枚举成员是不能比较的
// console.log(e3 === e4)

// let g1: G = 'abc' // 会报错
// 定义为字符串枚举类型的赋值，只能用枚举成员，不能随意赋值。
let g2: G = G.a 
let g3: G.a = G.a