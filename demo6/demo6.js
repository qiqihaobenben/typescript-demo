/**
 * 联合类型
 */
var oneNumber;
oneNumber = 'seven';
oneNumber = 7;
var tom = {
    name: 'Tom',
    age: 26
};
var tom1 = {
    name: 'Tom1'
};
;
var tom2 = {
    name: 'tom2',
    age: 26,
    say: 'English',
    gender: 'male'
};
var tom3 = {
    id: 123,
    name: 'Tom3',
    gender: 'male'
};
// tom3.id = 234; // 只读属性，赋值会报错
tom3.gender = 'female';
