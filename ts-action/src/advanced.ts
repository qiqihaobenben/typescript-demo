export { }


/**
 * 交叉类型
 */
interface DogInterface {
  run(): void
}

interface CatInterface {
  jump(): void
}

// 交叉类型 用 & 符号。虽然叫交叉类型，但是是取的所有类型的并集。
let pet: DogInterface & CatInterface = {
  run() { },
  jump() { }
}

/**
 * 联合类型：声明的类型并不确定，可以为多个类型中的一个
 */
let a: number | string = 1;
let b: 'a' | 'b' | 'c' = 'a' // 字符串字面量联合类型
let c: 1 | 2 | 3 = 1 // 数字字面量联合类型

class Dog implements DogInterface {
  run() { }
  eat() { }
}

class Cat implements CatInterface {
  jump() { }
  eat() { }
}
enum Master { Boy, Girl }
function getPet(master: Master) {
  let pet = master === Master.Boy ? new Dog() : new Cat()
  pet.eat() // pet为Dog和Cat的联合类型，只能取两者共有的属性，所以说联合类型在此时只能访问所有类型的交集
  // pet.run() // 不能访问，会报错
  return pet
}

// 可区分的联合类型 联合类型+字面量类型
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  r: number;
}
type Shape = Square | Rectangle | Circle
// 利用两种类型的共有属性，来创建不同的代码保护区块
// 如果只有Square和Rectangle这两种联合类型，没有问题，但是一旦扩展增加Circle类型，不会正常运行，而且也不报错，这个时候我们是希望代码有报错提醒的。
// 如果想要得到正确的报错提醒，第一种方法是设置明确的返回值,第二种方法是利用never类型
function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
      break;
    case "rectangle":
      return s.width * s.height;
      break;
    case "circle":
      return Math.PI * s.r ** 2;
      break;
    default:
      return ((e: never) => { throw new Error(e) })(s) // 这个函数就是用来检查s是否是never类型，如果s是never类型，说明前面的分支全部覆盖了，如果s不是never类型，说明前面的分支有遗漏，就得需要补一下。
  }
}

console.log(area({ kind: 'circle', r: 1 }))

