# TypeScript 基础精粹

## 名词解释

### 类型注解
作用：相当于强类型语言中的类型声明

语法：(变量/函数):type

```
let str: string = "abc"
```

### 联合类型

```
let count: number | string = 10
```

### 枚举

一组有名字的常量集合，可以类比手机里的通讯录。、

### 泛型

不预先确定的数据类型，具体的类型在使用的时候才能确定。泛型变量可以类比函数参数，是代表类型的参数。



## 类型注意事项

### 数组类型

有两种类型注解方式，特别注意第二种使用TS内置的Array泛型接口。

```
let arr1: number[] = [1,2,3]
// 下面就是使用TS内置的Array泛型接口来实现的
let arr2: Array<number | string> = [1,2,3,"abc"]
```

### 元组类型
元组是一种特殊的数组，限定了数组元素的个数和类型

```
let tuple: [number, string] = [0, "1"];
```

**需要注意元祖的越界问题，虽然可以越界添加元素，但是仍然是不能越界访问，强烈不建议这么使用**
```
tuple.push(2)  // 不报错
console.log(tuple) // [0, "1", 2] 也能都打印出来
console.log(tuple[2]) // 但是想取出元组中的越界元素，就会报错元组长度是2，在index为2时没有元素
```

### 函数类型

函数类型可以先定义再使用，具体实现时就可以 不用注明参数和返回值类型了,而且参数名称也不用必须跟定义时相同。

```
let compute: (x: number, y: number) => number;
compute = (a, b) => a + b;
```

### 对象类型

对象如果要赋值或者修改属性值，那么就不能用简单的对象类型，需要定义完整的对象类型

```
let obj: object = { x: 1, y: 2 };
obj.x = 3; // 会报错，只是简单的定义了是object类型，但是里面到底有什么属性没有标明

// 需要改成如下的对象类型定义
let obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3;
```

### symbol类型

symbol类型可以直接声明为symbol类型，也可以直接赋值，跟ES6一样，两个分别声明的symbol是不相等的。

```
let s1: symbol = Symbol();
let s2 = Symbol();
console.log(s1 === s2)  // false
```

### undefined、null类型

变量可以被声明为undefined和null，但是一旦被声明，就不能再赋值其他类型。

```
let un: undefined = undefined;
let nu: null = null;
un = 1 // 会报错
nu = 1 // 会报错
```

undefined和null是任何类型的子类型，那就可以赋值给其他类型。但是需要设置配置项"strictNullChecks": false

```
// 设置"strictNullChecks": false
let num: number = 123;
num = undefined;
num = null;

// 但是更建议将num设置为联合类型
let num: number | undefined | null = 123;
num = undefined;
num = null;
```

### 枚举类型

枚举分为数字枚举和字符串枚举，此外还有异构枚举（不推荐）

#### 数字枚举
枚举既能通过名字取值，又能通过索引取值，我们具体看一下是怎么取到的。
```
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest
}
// Role.Reporter = 2 // 枚举成员是只读的，不能修改重新赋值
console.log(Role)
//打印出来：{1: "Reporter", 2: "Developer", 3: "Maintainer", 4: "Owner", 5: "Guest", Reporter: 1, Developer: 2, Maintainer: 3, Owner: 4, Guest: 5}
//我们看到打印出来是一个对象，对象中有索引值作为key的，有名字作为key的，所以枚举既能通过名字取值，又能通过索引取值

// 看一下TS编译器是怎么用反向映射实现枚举的。
"use strict";
var Role;
(function (Role) {
    Role[Role["Reporter"] = 1] = "Reporter";
    Role[Role["Developer"] = 2] = "Developer";
    Role[Role["Maintainer"] = 3] = "Maintainer";
    Role[Role["Owner"] = 4] = "Owner";
    Role[Role["Guest"] = 5] = "Guest";
})(Role || (Role = {}));
```

#### 字符串枚举
字符串枚举只能通过名字取值，不能通过索引取值。

```
enum Message {
  Success = '成功',
  Fail = '失败'
}
console.log(Message)
// 打印出来：{Success: "成功", Fail: "失败"}
// 我们看到只有名字作为key，说明字符串枚举不能反向映射
```

#### 常量枚举
用 const 声明的枚举就是常量枚举，会在编译阶段被移除。如下代码编译后Month是不产生代码的，只能在编译前使用，当我们不需要一个对象，但是需要一个对象的值的时候，就可以使用常量枚举，这样可以减少编译后的代码。
```
const enum Month {
  Jan,
  Feb,
  Mar
}
let month = [Month.Jan, Month.Feb, Month.Mar];
```

#### 异构枚举
数字和字符串枚举混用，**不推荐**
```
enum Answer {
  N,
  Y = 'Yes',
  // C, // 在字符串枚举成员后面的枚举成员必须赋一个初始值
  //  X = Math.random() // 含字符串成员的枚举中不允许使用计算值
}
```

#### 枚举成员注意点

* 枚举成员是只读的，不能修改重新赋值
* 枚举成员的分为const member和computer member
 - 常量成员（const member），包括没有初始值的情况、对已有枚举成员的引用、常量表达式，会在编译的时候计算出结果，以常量的形式出现在运行时环境
 - 计算成员（computer member），需要被计算的枚举成员，不会在编译阶段进行计算，会被保留到程序的执行阶段
* 在computed member后面的枚举成员，一定要赋一个初始值，否则报错
* 含字符串成员的枚举中不允许使用计算值（computer member），并且在字符串枚举成员后面的枚举成员必须赋一个初始值，否则会报错（见上面的异构类型）
* 数字枚举中，如果有两个成员有同样索引，那么后面索引会覆盖前面的（见下面的枚举number）
 ```
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
  console.log(Char)

  // 枚举number
  enum number { a = 1, b = 5, c = 4, d }
  console.log(number) //打印出{1: "a", 4: "c", 5: "d", a: 1, b: 5, c: 4, d: 5}
  // b赋初始值为5，c赋初始值为4，按照索引递增，d的索引就是5，索引相同时，后面的值覆盖前面的，所以5对应的value就是d
 ```

 #### 枚举和枚举成员作为单独的类型
 有以下三种情况，（1）枚举成员都没有初始值、（2）枚举成员都是数字枚举、（3）枚举成员都是字符串枚举

 * 变量定义为数字枚举类型，赋值**任意number类型**的值都是可以的（可以超出枚举定义的数字范围），对枚举没有影响，但是不能赋值字符串等。
 * 不同的枚举类型是不能比较的，不过同一个枚举类型是可以比较的，但是同一个枚举类型的不同枚举成员是不能比较的
 * 变量定义为枚举类型，甚至就算定义为枚举类型的某个具体成员的类型，赋值也是对枚举没有影响的。（如下，E和F的结果还是不变的）
 * 字符串枚举类型的赋值，只能用枚举成员，不能随意赋值。（如果下F）

 ```
  enum E { a, b } // 枚举成员都没有初始值
  enum F F { a = 1, b = 5, c = 4, d } // 枚举成员都是数字枚举
  enum G { a = 'apple', b = 'banana' } // 枚举成员都是字符串枚举

  // 变量定义为数字枚举类型，赋值任意number类型的值都是可以的，对枚举没有影响，但是不能赋值字符串等。
  let e: E = 3
  let f: F = 3
  // e === f // 不同的枚举类型是不能比较的，会报错
  console.log(E,F,e,f) // 打印：{0: "a", 1: "b", a: 0, b: 1}， {1: "a", 4: "c", 5: "d", a: 1, b: 5, c: 4, d: 5}， 3， 3
  // 可见变量定义为E，F赋值，对E,F枚举本身没有影响

  let e1: E = 3
  let e2: E = 3
  console.log(e1 === e2) // 同一个枚举类型是可以比较的，结果为true

  let e3: E.a = 3
  let e4: E.b = 3
  // e3 === e4 // 同一个枚举类型的不同枚举成员是不能比较的,会报错
  console.log(E,E.a,E.b,e3,e4) // 打印：{0: "a", 1: "b", a: 0, b: 1} 0 1 3 3 ，可见变量定义为E.a，E.b赋值，对E以及E.a,E.b枚举本身没有影响

  //字符串枚举类型的赋值，只能用枚举成员，不能随意赋值。
  let g1: G = 'abc' // 会报错
  let g2: G = G.a // g2能赋值G.a或者G.b
  let g3: G.a = G.a // g2 只能赋值G.a
 ```

 ### 接口类型

 接口约束对象、函数、类的结构

 #### 对象类型接口

 ##### 对象冗余字段
 对象类型接口直接验证有冗余字段的**对象字面量**时会报错，这种冗余字段有时是不可避免的存在的。

 ```
  interface List {
    id: number;
    name: string;
  }
  interface Result {
    data: List[];
  }

  function render(result: Result) {
    result.data.forEach((value) => {
      console.log(value.id,value.name)
    })
  }

  render({
    data: [
      {id: 1, name: 'A',sex: 'male'},
      {id: 2,name: 'B'}
    ]
  });
  // 这就是对象类型接口直接验证有冗余字段的“对象字面量”，上面render中会有报错，说对象文字可以只指定已知属性，并且"sex"不在类型"List"中
 ```
 > 解决方法一：在外面声明变量result,然后把result传入render函数，避免传入对象字面量。

 ```
 // 把字面量先赋值给一个变量这样就能绕过检测
  let result = {
    data: [
      {id: 1, name: 'A',sex: 'male'},
      {id: 2,name: 'B'}
    ]
  }
  render(result);
 ```

 > 解决方法二： 用类型断言（两种 as 和尖括号），但是如果对象字面中都没有符合的，还是会报错，可以用as unknown as xxx

 ```
  render({
    data: [{ id: 1, name: "A", sex: "male" }, { id: 2, name: "B" }]
  } as Result);

  // 但是如果传入的对象字面量中没有一项是符合的，那用类型断言还是会报错
  render({
    data: [{ id: 1, name: "A", sex: "male" }]
  } as Result); // 还是会报错属性"data"的类型不兼容

  // 现在就需要这么写，用as unknown as xxx
  render({
    data: [{ id: 1, name: "A", sex: "male" }]
  } as unknown as Result);

 ```

 > 解决方法三：用字符串索引签名

 ```
  interface List {
    id: number;
    name: string;
    [x:string]: any;
  }
  // 这样对象字面量就可以包含任意多个字符串属性了。
 ```

 ##### 接口属性可定义为只读属性和可选属性

 ```
  interface List {
    readonly id: number; // 只读属性
    name: string;
    age?: number; // 可选属性
  }
 ```

 ##### 不确定一个接口中有多少属性时，可以使用可索引类型。分为数字索引签名和字符串索引签名，如果接口定义了某一种索引签名的值的类型，之后再定义的属性的值必须是签名值的类型的子类型。可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。

 ```
  interface Names {
    [x: string]: number | string;
    // y: boolean; // 会报错 boolean不会赋值给字符串索引类型，因为字符串索引签名的类型是 number | string，所以之后再定义的属性必须是签名值类型的子类型
    [z: number]: number; // 字符串索引签名后也能定义数字索引签名，数字索引的返回值必须是字符串索引返回值类型的子类型
  }
 ```

#### 函数类型接口

```
interface Add {
  (x: number, y: number): number;
}
// 跟变量声明是等价的：let Add: (a: number, b: number) => number
let add4: Add = (a,b) => a + b
```

#### 混合接口

混合接口，需要注意看一下，接口中的属性没有顺序之分，混合接口不需要第一个属性是匿名函数。
```
interface Lib {
  version: string;
  ():void;
  doSomething():void;
}
// 需要用到类型断言
let lib: Lib = (() => {}) as Lib;
lib.version = '1.0'
lib.doSomething = () => {}
```

#### 接口继承

```
// 以下是接口继承的例子
interface Human {
  name: string;
  eat(): void;
}
interface Man extends Human {
  run(): void
}
interface Child {
  cry():void
}

interface Boy extends Man, Child {}
let boy: Boy = {
  name: '',
  run(){},
  eat(){},
  cry(){}
}
```

### 函数类型相关

#### 定义TS函数的四种方式，第一种方式可以直接调用，但是后三种就需要先实现定义的函数再调用

```
// 第一种，直接声明
function add1 (x:number, y:number):number {
  return x + y
}
// 应用时形参和实参一一对应
add1(1, 2)

// 第二种 变量声明
let add2: (x:number, y:number) => number
// 应用如下
add2  = (a, b) => a + b
add2(2, 2)

// 第三种 类型别名
type Add3 = (x: number, y: number) => number
// 应用如下
let add3: Add3 = (a, b) => a + b
add3(3, 2)


// 第四种 接口实现
interface Add4 {
  (x: number, y: number): number;
}
// 跟变量声明是等价的：let Add4: (a: number, b: number) => number
let add4: Add4 = (a,b) => a + b
add4(4, 2)
```

#### 可选参数: 可选参数必须位于必选参数之后，即可选参数后面不能再有必选参数
```
// y后面不能再有必选参数，所以d会报错
// function add5(x:number, y?:number, d:number) {

// 正确如下
function add5(x:number, y?:number) {
  return y? y + x: x
}
add5(1)
```

#### 参数默认值：带默认值的参数不需要放在必选参数后面，但如果带默认值的参数出现在必选参数前面，必须明确的传入undefined值来获得默认值。在所有必选参数后面的带默认值的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。

```
function add6 (x: number, y = 0, z:number,q = 1) {
  return x +y + z +q
}
add6(1,undefined,2)
```

#### 函数重载: 要求定义一系列的函数声明，在类型最宽泛的版本中实现重载 TS编译器的函数重载会去查询一个重载的列表，并且从最开始的一个进行匹配，如果匹配成功，就直接执行。所以我们要把大概率匹配的定义写在前面。

函数重载的声明只用于类型检查阶段，在编译后会被删除。

```
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
add8(1,2,3) // 6
add8('1','2','3') // '123'
```

### 类

#### 类属性和方法注意点
* 类属性都是实例属性，不是原型属性，而类方法都是原型方法
* 实例的属性必须具有初始值，或者在构造函数中初始化，除了类型为any。

#### 类的继承:派生类的构造函数必须包含“super”调用，并且访问派生类的构造函数中的this之前，必须调用“super"

#### 类修饰符
1、public: 所有人可见（默认）。

2、 private: 私有属性

私有属性只能在声明的类中访问，在子类或者生成的实例中都不能访问,但是private属性可以在实例的方法中被访问到，因为也相当于在类中访问，但是子类的的实例方法肯定是访问不到的。

可以把类的constructor定义为私有类型，那么这个类既不能被实例化也不能被继承


3、 protected 受保护属性

受保护属性只能在声明的类及其子类中访问,但是protect属性可以在实例的方法中被访问到，因为也相当于在类中访问

可以把类的constructor定义为受保护类型,那么这个类不能被实例化,但是可以被继承，相当于基类

4、 readonly 只读属性

只读属性必须具有初始值，或者在构造函数中初始化,初始化后就不能更改了，并且已经设置过初始值的只读属性，也是可以在构造函数中被重新初始化的。但是在其子类的构造函数中不能被重新初始化。

5、 static 静态属性

只能通过类的名称调用，不能在实例和构造函数或者子类中的构造函数和实例中访问，但是静态属性是可以继承的，用子类的类名可以访问

**注意：构造函数的参数也可以添加修饰符,这样可以将参数直接定义为类的属性**

```
class Dog {
  constructor(name: string) {
    this.name = name
    this.legs = 4 // 已经有默认值的只读属性是可以被重新初始化的
  }
  public name: string
  run() { }
  private pri() { }
  protected pro() { }
  readonly legs: number = 3
  static food: string = 'bones'
}
let dog = new Dog('jinmao')
// dog.pri() // 私有属性不能在实例中调用
// dog.pro() // 受保护的属性，不能在实例中调用
console.log(Dog.food) // 'bones'


class Husky extends Dog {
  constructor(name: string, public color: string) {
    super(name)
    this.color = color
    // this.legs = 5 // 子类的构造函数中是不能对父类的只读属性重新初始化的
    // this.pri() // 子类不能调用父类的私有属性
    this.pro() // 子类可以调用父类的受保护属性
  }
  protected age: number = 3
  private nickname: string = '二哈'
  info(): string {
    return this.age + this.nickname
  }
  // color: string // 参数用了修饰符，可以直接定义为属性，这里就不需要了
}

let husky = new Husky('husky', 'black')
husky.info() // 如果调用的类的方法中有对类的私有属性和受保护属性的访问，这是不报错的。
console.log(Husky.food) // 'bones' 子类可以调用父类的静态属性

```

#### 抽象类

只能被继承，不能被实例化的类。

在抽象类中可以添加共有的方法，也可以添加抽象方法，然后由子类具体实现

```
abstract class Animal {
  eat() {
    console.log('eat')
  }
  abstract sleep(): void // 抽象方法，在子类中实现
}
// let animal = new Animal() // 会报错，抽象类无法创建实例


class Cat extends Animal {
  constructor(public name: string) {
    super()
  }
  run() { }
  sleep() {
    console.log('sleep')
  }
}

let cat = new Cat('jiafei')
cat.eat()
```

#### 接口类

* 类实现接口时，必须实现接口的全部属性，不过类可以定义自己的属性
* 接口不能约束类的构造函数，只能约束公有成员

```
interface Human {
  // new (name:string):void // 接口不能约束类的构造函数
  name: string;
  eat(): void;
}

class Asian implements Human {
  constructor (name: string) {
    this.name = name
  }
  name: string
  // private name: string  // 实现接口时用了私有属性会报错
  eat() {}
  sleep(){}
}

```

#### 接口继承类

相当于把类的成员抽象出来，只有类的成员结构，但是没有具体实现

**接口抽离类成员时不仅抽离了公有属性，还抽离了私有属性和受保护属性,所以非继承的子类都会报错**

被抽象的类的子类，也可以实现类抽象出来的接口，而且不用实现这个子类的父类已有的属性

```
class Auto {
  state = 1
  // protected state2 = 0 // 下面的C会报错，因为C并不是Auto的子类，C只是实现了Auto抽象出来的接口
}
interface AutoInterface extends Auto {

}
class C implements AutoInterface {
  state = 1
}

// 被抽象的类的子类，也可以实现类抽象出来的接口，而且不用实现父类的已有的属性
class Bus extends Auto implements AutoInterface {
  // 不用设置state，Bus的父类已经有了。

}

```

### 泛型

#### 泛型函数
**注意：用泛型定义函数类型时的位置不用，决定是否需要指定参数类型，见下面例子。**

泛型函数例子
```
function log<T>(value: T): T {
  console.log(value)
  return value
}

log<string[]>(['a', 'b'])
log([1, 2]) // 可以不用指定类型，TS会自动推断

还可以用类型别名定义泛型函数
下面的定义不用指定参数类型
type Log = <T>(value:T) => T // 不用指定参数类型，会自己推断
let myLog: Log = log
下面的定义必须指定参数类型
type Log<T> = (value:T) => T // 如果这样用泛型定义函数类型，必须指定一个参数类型
let myLog: Log<string> = log
```

#### 泛型接口

```
function log<T>(value: T): T {
  console.log(value)
  return value
}

// 以下仅约束泛型接口中的一个泛型函数，实现不用指定泛型的参数类型
interface Log {
  <T>(value: T): T;
}
let myLog: Log = log

// 以下约束整个泛型接口，实现需要指定泛型的参数类型，或者用带默认类型的泛型
interface Log1<T> {
  (value: T): T;
}
let myLog1: Log1<string> = log

interface Log2<T = string> {
  (value: T): T
}
let myLog2: Log2 = log
```
**注意：泛型接口的泛型定义为全局时，实现必须指定一个参数类型,或者用带默认类型的泛型**

#### 泛型类

```
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
log3.run(1)

//不指定类型，就可以传入任何类型
let log4 = new Log3()
log4.run('abc')
```
**注意：泛型不能应用于类的静态成员。并且实例化时，不指定类型，就可以传入任何类型**

#### 泛型约束
约束泛型传入的类型

```
interface Length {
  length: number
}
function log5<T extends Length>(value: T) {
  // 想要打印出定义为泛型T的value的length属性，则T必须要有length属性，所以需要泛型约束，T继承length接口后，就肯定具有了length属性
  console.log(value,value.length)
  return value
}
log5([1])
log5('abc')
log5({length: 1})
```

#### 泛型总结
* 函数和类可以轻松地支持多种类型，增强程序的扩展性
* 不必写多条函数重载，冗长的联合类型声明，增强代码可读性
* 灵活控制类型之间的约束






## 类型检查机制
**类型检查机制： TypeScript编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。其作用是辅助开发，提高开发效率**

### 类型推断
**类型推断: 指的是不需要指定变量的类型（函数的返回值类型），TypeScript可以根据某些规则自动地为其推断出一个类型**

#### 基础类型推断
```
let a = 1 // 推断为 number
let b = [1] // 推断为 number[]
let c = (x = 1) => x + 1 // 推断为 (x?: number) => number
```

#### 最佳通用类型推断
当需要从多个类型中推断出一个类型的时候，TypeScript会尽可能的推断出一个兼容当前所有类型的通用类型
```
let d = [1, null]
// 推断为一个最兼容的类型，所以推断为(number | null)[]
// 当关闭"strictNullChecks"配置项时，null是number的子类型，所以推断为number[]
```

#### 上下文类型推断
以上的推断都是从右向左，即根据表达式推断，上下文类型推断是从左向右，通常会发生在事件处理中。


### 类型断言
在确定自己比TS更准确的知道类型时，可以使用类型断言来绕过TS的检查，改造旧代码很有效，但是防止滥用。
```
interface Bar {
  bar: number
}
let foo = {} as Bar
foo.bar = 1
// 但是推荐变量声明时就要指定类型
let foo1: Bar = {
  bar: 1
}
```

### 类型兼容

**当一个类型Y可以被赋值给另一个类型X时，我们就可以说类型X兼容类型Y**

`X兼容Y：X（目标类型） = Y（源类型）`

```
let s: string = 'a'
s = null // 把编译配置中的strictNullChecks设置成false，字符类型是兼容null类型的（因为null是字符的子类型）
```

#### 接口兼容

**成员少的兼容成员多的**

```
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
```

#### 函数兼容性

```
type Handler = (a: number, b: number) => void
function test(handler: Handler) {
  return handler
}
```

##### 1、参数个数

###### 固定参数
**目标函数的参数个数一定要多于源函数的参数个数**

Handler目标函数，传入test的 **参数** 就是源函数

```
let handler1 = (a: number) => { }
hof(handler1) // 传入的函数能接收一个参数，且参数是number，是兼容的
let handler2 = (a: number, b: number, c: number) => { }
// hof(handler2) // 传入的函数能接收三个参数，且参数是number，是不兼容的
```

###### 可选参数和剩余参数

```
let a1 = (p1: number, p2: number) => { }
let b1 = (p1?: number, p2?: number) => { }
let c1 = (...args: number[]) => { }
```

> (1) 固定参数时可以兼容可选参数和剩余参数的

```
a1 = b1 // 兼容
a1 = c1 // 兼容
```

> (2) 可选参数是不兼容固定参数和剩余参数的,但是可以通过设置"strictFunctionTypes": false来消除报错，实现兼容

```
b1 = a1 //不兼容
b1 = c1 // 不兼容
```

> (3) 剩余参数可以兼容固定参数和可选参数

```
c1 = a1 // 兼容
c1 = b1 // 兼容
```

##### 2、参数类型

###### 基础类型

```
// 接上面的test函数
let handler3 = (a: string) => { }
test(handler3) // 类型不兼容
```

###### 接口类型

接口成员多的兼容成员少的，也**可以理解把接口展开，参数多的兼容参数少的**。对于不兼容的，也可以通过设置"strictFunctionTypes": false来消除报错，实现兼容

```
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

p3d = p2d // 兼容
p2d = p3d // 不兼容
```

##### 3、返回值类型
目标函数的返回值类型必须与源函数的返回值类型相同，或者是其子类型

```
let f = () => ({ name: 'Alice' })
let g = () => ({ name: 'A', location: 'beijing' })
f = g // 兼容
g = f // 不兼容
```

##### 4、函数重载
函数重载列表（目标函数）
```
function overload(a: number, b: number): number;
function overload(a: string, b: string): string;
```
函数的具体实现（源函数）
```
function overload(a: any, b: any): any { }
```
目标函数的参数要多于源函数的参数才能兼容
```
function overload(a:any,b:any,c:any):any {} // 具体实现时的参数多于重载列表中匹配到的第一个定义的函数的参数，也就是源函数的参数多于目标函数的参数，不兼容
```
返回值类型不兼容
```
function overload(a:any,b:any) {} // 去掉了返回值的any，不兼容
```

#### 枚举类型兼容性

```
enum Fruit { Apple, Banana }
enum Color { Red, Yello }
```

##### 枚举类型和数字类型是完全兼容的

```
let fruit: Fruit.Apple = 4
let no: number = Fruit.Apple
```

##### 枚举类型之间是完全不兼容的

```
let color: Color.Red = Fruit.Apple // 不兼容
```











### VSCode工具配置

