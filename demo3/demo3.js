// 基础类型
// 布尔值
var isDone = false;
// let createdByNewBoolean: boolean = new Boolean(1); // 使用构造函数 Boolean 创造的对象不是布尔值
var createdByBoolean = Boolean(1); // 直接调用 Boolean 也会返回一个boolean类型
// 数字
var decLiteral = 666;
var hexLiteral = 0xf;
var binaryLiteral = 1;
var octalLiteral = 7;
var notANumber = NaN;
var infinityNumber = Infinity;
// 字符串
var dogName = "diandian";
dogName = 'huanhuan';
var heName = "Gold";
var age = 30;
var sentence = "Hello, He name is " + heName + ".\nage is " + age + ".";
// 空值
function alertName() {
    alert('lalala~');
}
// Null 和 Undefined
var u = undefined;
var n = null;
var num = undefined; // 不会报错
var num1 = null; // 不会报错
var str = undefined; // 不会报错
var str1 = null; // 不会报错
