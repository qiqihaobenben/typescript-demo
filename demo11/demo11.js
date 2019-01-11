/**
 * 类
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name, color) {
        this.age = 26;
        this.color = color;
        this.name = name;
    }
    return Animal;
}());
var a = new Animal('Tom', 'red');
console.log(a.name);
// console.log(a.age) // 私有属性，会报错
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name, color) {
        var _this = _super.call(this, name, color) || this;
        // console.log(this.age) // 子类不能访问
        console.log(_this.color);
        return _this;
    }
    return Cat;
}(Animal));
var tom = new Cat('miaomiao', 'red');
// 抽象类
var AnimalOther = /** @class */ (function () {
    function AnimalOther(name) {
        this.name = name;
    }
    return AnimalOther;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.sayHi = function () {
        console.log('wangwang');
        return 'wangwang';
    };
    return Dog;
}(AnimalOther));
var dog = new Dog('dahuang');
