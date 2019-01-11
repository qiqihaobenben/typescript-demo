/**
 * 泛型
 */

 function createArray<T> (length: number, value: T):T[] {
   let result: Array<T> = [];
   for(let i = 0; i < length; i++) {
     result[i] = value;
   };
   return result;
  };

 createArray<string>(3,'x')
 createArray(3,2)

//  约束泛型
interface lengthwise {
  length: number;
}
function loggingIdentity<T extends lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg;
}
loggingIdentity('aaa')