// 数组


let numberList: number[] = [1, 2, 3];
let numberOtherList: Array<number> = [1, 2, 3];
let anyList: any[] = [1, '2', true];

// 用接口标识数组
interface NumberArray {
  [index: number]: number
}
let fibonacci: NumberArray = [1,1,2,3,5];

