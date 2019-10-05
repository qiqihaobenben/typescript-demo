
// 泛型：不预先确定的数据类型，具体的类型在使用的时候才能确定
function log<T>(value: T): T {
  console.log(value)
  return value
}

// log<string[]>(['a', 'b'])
// log([1, 2])

// 泛型定义函数类型
// 不用指定参数类型，会自己推断
// type Log = <T>(value:T) => T
// let myLog: Log = log
// 如果这样用泛型定义函数类型，必须指定一个参数类型
// type Log<T> = (value:T) => T
// let myLog: Log<string> = log


// 泛型接口
interface Log {
  <T>(value: T): T;
}
interface Log1<T> {
  (value: T): T;
}
let myLog: Log = log
// 泛型接口的泛型定义为全局时，实现必须指定一个参数类型,或者用带默认类型的泛型
let myLog1: Log1<string> = log
// myLog1('a')

interface Log2<T = string> {
  (value: T): T
}

let myLog2: Log2 = log
// myLog2('1')


// 泛型类
class Log3<T> {
  // 静态成员不能引用类类型参数
  // static start(value: T) {
  //   console.log(value)
  // }
  run(value: T) {
    console.log(value)
    return value
  }
}
let log3 = new Log3<number>()
// log3.run(1)
// 不指定类型，就可以传入任何类型
let log4 = new Log3()
// log4.run('abc')


// 泛型约束 约束泛型传入的类型
interface Length {
  length: number
}
function log5<T extends Length>(value: T) {
  console.log(value,value.length)
  return value
}
log5([1])
log5('abc')
log5({length: 1})

// 总结
// 函数和类可以轻松地支持多种类型，增强程序的扩展性
// 不必写多条函数重载，冗长的联合类型声明，增强代码可读性
// 灵活控制类型之间的约束

