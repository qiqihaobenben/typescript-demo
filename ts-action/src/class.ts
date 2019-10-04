// 类属性都是实例属性，不是原型属性，而类方法都是原型方法
// 实例的属性必须具有初始值，或者在构造函数中初始化，除了类型为any。
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
console.log(Dog.prototype)
let dog = new Dog('jinmao')
console.log(dog)
// dog.pri() // 私有属性不能在实例中调用
// dog.pro() // 受保护的属性，不能在实例中调用
console.log(Dog.food)

//类的继承，研究一下为什么派生类的构造函数必须包含“super”调用，并且访问派生类的构造函数中的this之前，必须调用“super"
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
console.log(husky)
console.log(husky.info()) // 如果调用的类的方法中有对类的私有属性和受保护属性的访问，这是不报错的。
console.log(Husky.food) // 子类可以调用父类的静态属性

// 类的成员修饰符

// public 默认

// private 私有属性
// 私有属性只能在声明的类中访问，在子类或者生成的实例中都不能访问,但是private属性可以在实例的方法中被访问到，因为也相当于在类中访问，但是子类的的实例方法肯定是访问不到的，
// 可以把类的constructor定义为私有类型，那么这个类既不能被实例化也不能被继承

// protected 受保护属性
// 受保护属性只能在声明的类及其子类中访问,但是protect属性可以在实例的方法中被访问到，因为也相当于在类中访问
// 可以把类的constructor定义为受保护类型,那么这个类不能被实例化,但是可以被继承，相当于基类

// readonly 只读属性
// 只读属性必须具有初始值，或者在构造函数中初始化,初始化后就不能更改了，并且已经设置过初始值的只读属性，也是可以在构造函数中被重新初始化的。但是在其子类的构造函数中不能被重新初始化

// static 静态属性
// 只能通过类的名称调用，不能在实例和构造函数或者子类中的构造函数和实例中访问，但是静态属性是可以继承的，用子类的类名可以访问


// 构造函数的参数也可以添加修饰符
// 这样可以将参数直接定义为类的属性


// 抽象类
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

let animal: Animal[] = [cat]


// this类型
class WorkFlow {
  step1() {
    return this
  }
  step2() {
    return this
  }
}
new WorkFlow().step1().step2()

class Myflow extends WorkFlow {
  next() {
    return this
  }
}

new Myflow().next().step1().next().step2()
