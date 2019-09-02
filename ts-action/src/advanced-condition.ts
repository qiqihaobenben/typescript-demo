export { }

/**
 * 条件类型
 */
// T extends U ? X : Y

type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object"

type T1 = TypeName<string>
type T2 = TypeName<string[]>

// 分布式条件类型
// (A | B) extends U ? X : Y 等价于 (A extends U ? X : Y) | (B extends U ? X : Y)
type T3 = TypeName<string | string[]>

// 可以实现Diff操作
type Diff<T, U> = T extends U ? never : T

type T4 = Diff<"a" | "b" | "c", "a" | "e">
// 拆分一下具体步骤
// Diff<"a","a" | "e"> | Diff<"b","a" | "e"> | Diff<"c", "a" | "e">
// 分布结果如下：never | "b" | "c"
// 最终获得字面量的联合类型 "b" | "c"

// 在Diff的基础上实现过滤掉null和undefined的值。
type NotNull<T> = Diff<T, undefined | null>
type T5 = NotNull<string | number | undefined | null>

// 以上的类型别名在TS的类库中都有内置的类型
// Diff => Exclude<T, U>
// NotNull => NonNullable<T>
//此外，内置的还有很多类型，比如从类型T中抽取出可以赋值给U的类型 Extract<T, U>
type T6 = Extract<"a" | "b" | "c", "a" | "e">

// ReturnType<T>
type T7 = ReturnType<() => string>
