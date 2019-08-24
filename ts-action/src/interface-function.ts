// 第一种，直接声明
function add1 (x:number, y:number):number {
  return x + y
}
// 形参和实参一一对应
// add1(1,2)

// 第二种 变量声明
let add2: (x:number, y:number) => number

// 第三种 类型别名
type Add3 = (x: number, y: number) => number

let add3: Add3 = (a,b) => a+b


// 第四种 接口实现
let add4: (a: number, b: number) => number
interface Add {
  (x: number, y: number): number;
}


// 混合接口，需要着重看一下，接口中的属性没有顺序之分，混合接口不需要第一个属性是匿名函数。
interface Lib {
  ():void;
  version: string;
  doSomething():void;
}
let lib: Lib = (() => {}) as Lib;
lib.version = '1.0'
lib.doSomething = () => {}


// 可选参数 可选参数必须位于必选参数之后
function add5(x:number, y?:number) {
  return y? y + x: x
}

add5(1)

// 参数默认值,带默认值的参数不需要放在必选参数后面，但如果带默认值的参数出现在必选参数前面，必须明确的传入undefined值来获得默认值。不过在所有必选参数后面的带默认值的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。
function add6 (x: number, y = 0, z:number,q = 1) {
  return x +y + z +q
}
console.log(add6(1,undefined,2)) // 4

// 剩余参数
function add7(x: number, ...rest:number[]) {
  return x + rest.reduce((pre,cur) => pre + cur)
}

console.log(add7(1,2,3,4,5))

// 函数重载 要求定义一系列的函数声明，在类型最宽泛的版本中实现重载 TS编译器的函数重载会去查询一个重载的列表，并且从最开始的一个进行匹配，如果匹配成功，就直接执行。所以我们要把大概率匹配的定义写在前面。
function add8(...rest: number[]):number
function add8(...rest: string[]):string
function add8(...rest: any[]):any {
  let first = rest[0]
  if(typeof first === 'string') {
    return rest.join('')
  }
  if(typeof first === 'number') {
    return rest.reduce((pre,cur) => pre + cur)
  }
}
console.log(add8(1,2,3))
console.log(add8('1','2','3'))