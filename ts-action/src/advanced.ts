export { }

interface DogInterface {
  run(): void
}

interface CatInterface {
  jump(): void
}

// 交叉类型 用 & 符号。虽然叫交叉类型，但是是取的所有类型的并集。
let pet: DogInterface & CatInterface = {
  run() { },
  jump() { }
}
