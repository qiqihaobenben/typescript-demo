export {}

// 类型检查机制： TypeScript编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。作用是辅助开发，提高开发效率

// 类型推断: 指的是不需要指定变量的类型（函数的返回值类型），TypeScript可以根据某些规则自动地为其推断出一个类型
// 基础类型推断
let a = 1 // 推断为number
let b = [1] // 推断为number[]

let c = (x=1) => x+1

// 最佳通用类型推断
let d = [1,null] // 推断为一个最兼容的类型，null是number的子类型，所以推断为number

// 上下文类型推断
window.onkeydown = function (event) {
  // 从上下文推断出event为KeyboardEvent
  console.log(event.altKey)
}

// 类型断言 在确定自己比TS更准确的知道类型时，可以使用类型断言来绕过TS的检查，改造旧代码很有效，但是防止滥用
interface Bar {
  bar: number
}
let foo = {} as Bar
foo.bar = 1
// 但是推荐变量声明时就要指定类型
let foo1:Bar = {
  bar: 1
}

// 类型兼容
// 当一个类型Y可以被赋值给另一个类型X时，我们就可以说类型X兼容类型Y
// X兼容Y：X（目标类型） = Y（源类型）

// 把编译配置中的strictNullChecks设置成false，字符类型是兼容null类型的（因为null是字符的子类型）
let s: string = 'a'
// s = null

// 接口兼容
interface X {
  a: any;
  b: any;
}
interface Y {
  a: any;
  b: any;
  c: any;
}

let x: X = {a:1,b:2}
let y: Y = {a:1,b:2,c:3}
