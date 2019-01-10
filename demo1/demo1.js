// let user = [1,2,3]; // 会报错
var user = 'fangxu'; // 不会报错
function greeter(person) {
    return "Hello " + person;
}
console.log(greeter(user));
