// 元组
let tupleList: [string, number];
tupleList = ['hello', 10];
tupleList.push('world'); //越界现在会报错
tupleList[5] = 111; // 会报错

// 枚举
enum Color { Red, Green, Blue }

let c: Color = Color.Green;