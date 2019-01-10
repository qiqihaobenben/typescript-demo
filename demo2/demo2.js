function greeter(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
// let user = {firstName: 'fang', secondName: 'xu'}; // 会报错
var user = { firstName: 'fang', lastName: 'xu' };
console.log(greeter(user));
