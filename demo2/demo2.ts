interface Person {
  firstName: string;
  lastName: string;
}

function greeter (person: Person) {
  return "Hello " + person.firstName + " " + person.lastName;
}

// let user = {firstName: 'fang', secondName: 'xu'}; // 会报错
let user = {firstName: 'fang', lastName: 'xu'};

console.log(greeter(user))
