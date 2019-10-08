export { }

// 类型检查机制： TypeScript编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。作用是辅助开发，提高开发效率

// 类型推断: 指的是不需要指定变量的类型（函数的返回值类型），TypeScript可以根据某些规则自动地为其推断出一个类型
// 基础类型推断
let a = 1 // 推断为 number
let b = [1] // 推断为 number[]
let c = (x = 1) => x + 1 // 推断为 let c: (x?: number) => number

// 最佳通用类型推断
let d = [1, null] // 推断为一个最兼容的类型，null是number的子类型，所以推断为number[]

// 上下文类型推断
window.onkeydown = (event: KeyboardEvent) => {
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
let foo1: Bar = {
  bar: 1
}

// 类型兼容
// 当一个类型Y可以被赋值给另一个类型X时，我们就可以说类型X兼容类型Y
// X兼容Y：X（目标类型） = Y（源类型）

// 口诀
// 结构之间兼容：成员少的兼容成员多的
// 函数之间兼容：参数多的兼容参数少的

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

let x: X = { a: 1, b: 2 }
let y: Y = { a: 1, b: 2, c: 3 }
// 源类型只要具有目标类型的必要属性，就可以进行赋值。接口之间相互兼容，成员少的兼容成员多的。
x = y
// y = x // 不兼容

// 函数兼容性
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
  return handler
}
// 1)参数个数
// 固定参数 目标函数的参数个数一定要多于目标函数的参数个数
// Handler目标函数，传入hof的参数就是源函数
let handler1 = (a: number) => { }
hof(handler1) // 传入的函数能接收一个参数，且参数是number，是兼容的
let handler2 = (a: number, b: number, c: number) => { }
// hof(handler2) // 传入的函数能接收三个参数，且参数是number，是不兼容的

// 可选参数和剩余参数
let a1 = (p1: number, p2: number) => { }
let b1 = (p1?: number, p2?: number) => { }
let c1 = (...args: number[]) => { }
// 固定参数时可以兼容可选参数和剩余参数的
a1 = b1
a1 = c1

// 可选参数是不兼容固定参数和剩余参数的，但是可以通过设置"strictFunctionTypes": false来消除报错，实现兼容
// b1 = a1 //不兼容
// b1 = c1 // 不兼容

// 剩余参数可以兼容固定参数和可选参数
c1 = a1
c1 = b1


// 2)参数类型
// 基础的类型
let handler3 = (a: string) => { }
// hof(handler3) // 类型不兼容

// 接口类型
interface Point3D {
  x: number;
  y: number;
  z: number;
}
interface Point2D {
  x: number;
  y: number;
}
let p3d = (point: Point3D) => { }
let p2d = (point: Point2D) => { }
// 接口成员多的兼容成员少的，也可以理解把接口展开，参数多的兼容参数少的。对于不兼容的，也可以通过设置"strictFunctionTypes": false来消除报错，实现兼容
// p3d = p2d // 兼容
// p2d = p3d // 不兼容

// 3）返回值类型
// 目标函数的返回值类型必须与源函数的返回值类型相同，或者是其子类型
let f = () => ({ name: 'Alice' })
let g = () => ({ name: 'A', location: 'beijing' })
// f = g // 兼容
// g = f // 不兼容

// 函数重载
// 函数重载列表（目标函数）
function overload(a: number, b: number): number;
function overload(a: string, b: string): string;
// 函数的具体实现（源函数）
function overload(a: any, b: any): any { }
// 目标函数的参数要多于源函数的参数才能兼容
// function overload(a:any,b:any,c:any):any {} // 具体实现时的参数多于重载列表中匹配到的第一个定义的函数的参数，也就是源函数的参数多于目标函数的参数，不兼容
// 返回值类型不兼容
// function overload(a:any,b:any) {} // 去掉了返回值的any，不兼容


// 枚举类型兼容性
enum Fruit { Apple, Banana }
enum Color { Red, Yello }
// 枚举类型和数字类型是完全兼容的
let fruit: Fruit.Apple = 4
let no: number = Fruit.Apple
// 枚举类型之间是完全不兼容的
// let color: Color.Red = Fruit.Apple // 不兼容


// 类的兼容性
// 和接口比较相似，只比较结构，需要注意，在比较两个类是否兼容时，静态成员和构造函数是不参与比较的，如果两个类具有相同的实例成员，那么他们的实例就相互兼容
class A {
  constructor(p: number, q: number) { }
  id: number = 1
  // private name:string = '' // 只在A类中加这个私有属性，aa不兼容bb，但是bb兼容aa，如果A、B两个类中都加了私有属性，那么都不兼容
}
class B {
  static s = 1
  constructor(p: number) { }
  id: number = 2
  // private name:string = '' // 只在B类中加这个私有属性，aa兼容bb，但是bb不兼容aa，如果A、B两个类中都加了私有属性，那么都不兼容
}
let aa = new A(1, 2)
let bb = new B(1)
// 两个实例完全兼容，静态成员和构造函数是不比较的
aa = bb
bb = aa

// A中有私有属性，C继承A后，aa和cc是相互兼容的
class C extends A { }
let cc = new C(1, 2)
aa = cc
cc = aa


// 泛型兼容性

interface Empty<T> {
  // 泛型接口为空时，泛型指定不同的类型，也是兼容的
  // 使用泛型添加一个接口成员时，类型不同就不兼容了
  // value: T

}

// let obj1:Empty<number> = {}
// let obj2:Empty<string> = {}
// obj1 = obj2


// 两个泛型函数如果定义相同，没有指定类型参数的话也是相互兼容的
let log1 = <T>(x: T): T => {
  console.log('x')
  return x
}
let log2 = <U>(y: U): U => {
  console.log('y')
  return y
}
log1 = log2


/**
 * 类型保护
 * 指的是TypeScript能够在特定的区块中保证变量属于某种特定的类型。
 * 可以在此区块中放心地引用此类型的属性，或者调用此类型的方法。
 */
enum Type { Strong, Week }

class Java {
  helloJava() {
    console.log('hello Java')
  }
  java: any
}

class JavaScript {
  helloJavaScript() {
    console.log('hello JavaScript')
  }
  javaScript: any
}

// 类型保护函数的返回值有点不同，用到了 is ，叫做类型谓词
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()
  // 如果想根据lang实例的类型，直接用lang.helloJava是不是存在是会报错的，因为现在lang是Java和JavaScript这两种类型的联合类型
  // 这里就需要用类型断言来告诉TS当前lang实例要是什么类型的
  // if ((lang as Java).helloJava) {
  //   (lang as Java).helloJava()
  // } else {
  //   (lang as JavaScript).helloJavaScript()
  // }

  // 第一种方法，instanceof 可以判断实例是属于哪个类，这样TS就能判断了。
  // if (lang instanceof Java) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  // 第二种 in 可以判断某个属性是不是属于某个对象 如上helloJava和java都能判断出来
  // if ('java' in lang) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  // 第三种 typeof类型保护，可以判断出基本类型
  // if (typeof x === 'string') {
  //   x.length
  // } else {
  //   x.toFixed(2)
  // }

  // 第四种 通过创建一个类型保护函数来判断对象的类型
  if (isJava(lang)) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  return lang
}
getLanguage(Type.Strong, 111)
