// 数组
var numberList = [1, 2, 3];
var numberOtherList = [1, 2, 3];
var anyList = [1, '2', true];
var fibonacci = [1, 1, 2, 3, 5];
// 元组
var tupleList;
tupleList = ['hello', 10];
// tupleList[3] = 'world'; //越界现在会报错
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
