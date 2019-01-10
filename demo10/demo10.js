// 元组
var tupleList;
tupleList = ['hello', 10];
tupleList.push('world'); //越界现在会报错
tupleList[5] = 111; // 会报错
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
