# TypeScript 基础精粹

## 名词解释

#### 类型注解
作用：相当于强类型语言中的类型声明

语法：(变量/函数):type

```
let str: string = "abc"
```

#### 联合类型

```
let count: number | string = 10
```

### 枚举

一组有名字的常量集合，可以类比手机里的通讯录。

## 类型注意点

#### 数组类型

有两种类型注解方式，特别注意第二种使用TS内置的Array泛型接口。

```
let arr1: number[] = [1,2,3]
// 下面就是使用TS内置的Array泛型接口来实现的
let arr2: Array<number | string> = [1,2,3,"abc"]
```

#### 元组类型
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

#### 函数类型

函数类型可以先定义再使用，具体实现时就可以 不用注明参数和返回值类型了,而且参数名称也不用必须跟定义时相同。

```
let compute: (x: number, y: number) => number;
compute = (a, b) => a + b;
```

#### 对象类型

对象如果要赋值或者修改属性值，那么就不能用简单的对象类型，需要定义完整的对象类型

```
let obj: object = { x: 1, y: 2 };
obj.x = 3; // 会报错，只是简单的定义了是object类型，但是里面到底有什么属性没有标明

// 需要改成如下的对象类型定义
let obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3;
```

#### symbol类型

symbol类型可以直接声明为symbol类型，也可以直接赋值，跟ES6一样，两个分别声明的symbol是不相等的。

```
let s1: symbol = Symbol();
let s2 = Symbol();
console.log(s1 === s2)  // false
```

#### undefined、null类型

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

#### 枚举类型

枚举分为数字枚举和字符串枚举，此外还有异构枚举（不推荐）

##### 注意点

* 枚举成员是只读的，不能修改重新赋值
*

##### 数字枚举
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

##### 字符串枚举
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

##### 异构枚举
数字和字符串枚举混用，**不推荐**
```
enum Answer {
  N,
  Y = 'Yes',
}
```



### VSCode工具配置

