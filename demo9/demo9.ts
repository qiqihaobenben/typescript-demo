/**
 * 类型断言
 */

//  报错，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
//  function getLength(something: string | number): number {
//    if(something.length) {
//      return something.length;
//    }else {
//      return something.toString().length;
//    }
//  }

 function getLength(something: string | number): number {
   if((<string>something).length) {
     return (something as string).length;
   }else {
     return something.toString().length;
   }
 }