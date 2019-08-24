// 接口约束对象、函数、类的结构
// 接口字段冗余的处理方法三种，在外面声明变量，用类型断言（两种 as 和尖括号）但是如果一条都没有符合的，还是会报错，可以用as unknown as xxx，也可以用索引签名
interface List {
  readonly id: number; // 只读属性
  name: string;
  // [x:string]: number | string;
  age?: number;
}

interface Result {
  data: List[];
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id,value.name)
    if(value.age) {
      console.log(value.age)
    }
  })
}
let result = {
  data: [
    {id: 1, name: 'A',sex: 'male'},
    {id: 2,name: 'B',age: 10}
  ]
}
render(result);

// 数字索引签名和字符串索引签名，如果接口定义了某一种索引签名的值的类型，之后再定义的属性的值必须是签名值的类型的子类型
interface StringArray {
  [index: number]: string;
}
let chars: StringArray = ['1']
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
interface Names {
  [x:string]: any;
  [z:number]: number;
}

