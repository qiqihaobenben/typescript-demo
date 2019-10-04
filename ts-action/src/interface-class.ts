
// 接口不能约束类的构造函数，只能约束公有成员
interface Human {
  // new (name:string):void // 接口不能约束类的构造函数
  name: string;
  eat(): void;
}

// 类实现接口时，必须实现接口的全部属性，不过类可以定义自己的属性
// 接口只能约束类的公有成员
class Asian implements Human {
  constructor (name: string) {
    this.name = name
  }
  name: string
  // private name: string  // 实现接口时用了私有属性会报错
  eat() {}
  sleep(){}
}


// 接口继承
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


// 接口继承类 相当于把类的成员抽象出来，只有类的成员结构，但是没有具体实现
// 接口抽离类成员时不仅抽离了公有属性，还抽离了私有属性和受保护属性,所以非继承的子类都会报错
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
  // a() {
  //   console.log(this.state2)
  // }
}
