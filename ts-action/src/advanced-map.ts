export { }

/**
 * 映射类型 可以从一个旧的类型，生成一个新的类型
 */
// 把一个类型的所有属性变成只读
interface Obj {
  a: string;
  b: number;
  c: boolean
}


// 以下三种类型称为同态，只会作用于Obj的属性，不会引入新的属性
type ReadonlyObj = Readonly<Obj>

type PartialObj = Partial<Obj>

type PickObj = Pick<Obj, 'a' | 'b'>


// 非同态 会创建新的属性
type RecordObj = Record<'x' | 'y', Obj>
