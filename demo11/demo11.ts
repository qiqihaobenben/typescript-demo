/**
 * 类
 */

class Animal {
  public name;
  protected color;
  private age = 26;
  public constructor (name,color) {
    this.color = color;
    this.name = name;
  }
}

let a = new Animal('Tom','red');
console.log(a.name)
// console.log(a.age) // 私有属性，会报错

class Cat extends Animal {
  constructor(name,color) {
    super(name,color);
    // console.log(this.age) // 子类不能访问
    console.log(this.color)
  }
}
let tom = new Cat('miaomiao','red')

// 抽象类
abstract class AnimalOther {
  public name;
  constructor(name:string) {
    this.name = name;
  }
  public abstract sayHi():string;
}


class Dog extends AnimalOther {
  public sayHi () {
    console.log('wangwang')
    return 'wangwang';
  }
} 
let dog = new Dog('dahuang')