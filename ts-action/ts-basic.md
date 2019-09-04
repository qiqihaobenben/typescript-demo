# TypeScript 基础精粹

### 名词解释

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

### 类型注意点

#### 数组类型

有两种类型注解方式，特别注意第二种使用TS内置的Array泛型接口。

```
let arr1: number[] = [1,2,3]
// 下面就是使用TS内置的Array泛型接口来实现的
let arr2: Array<number | string> = [1,2,3,"abc"]
```

#### 元组类型



### VSCode工具配置

