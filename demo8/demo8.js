/**
 * 函数
 */
//  函数声明
function sum(x, y) {
    return x + y;
}
sum(1, 2);
// sum(1,2,3) // 输入多余的（或者少于要求的）参数，是不被允许的
// 函数表达式
var mySum = function (x, y) {
    return x = y;
};
var mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// 可选参数，可选参数必须接在必选参数后面。换句话说，可选参数后面不允许再出现必选参数了
function buildName(firstName, lastName) {
    return lastName ? firstName + lastName : firstName;
}
var tomcat = buildName('Tom', 'Cat');
var tom = buildName('Tom');
// 下面的会报错
// function buildName(firstName?: string, lastName: string): string {
//   return lastName ? firstName + lastName : firstName;
// }
// let tomcat = buildName('Tom', 'Cat');
// let tom = buildName(undefined,'Tom');
//参数默认值，此时的可选参数就不受 “可选参数必须接在必选参数后面” 的限制
function buildName1(firstName, lastName) {
    if (firstName === void 0) { firstName = 'Tom'; }
    return firstName + lastName;
}
var tomcat1 = buildName('Tom', 'Cat');
var tom1 = buildName(undefined, 'Tom');
