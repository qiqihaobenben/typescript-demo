// let user = [1,2,3]; // 会报错
let user = 'fangxu'; // 不会报错

function greeter (person: string) {
  return "Hello " + person;
}

console.log(greeter(user))
