interface Say {
  sayHi():string;
}

class car implements Say {
  sayHi() {
    console.log('hi')
    return 'hi'
  }
}


// 实现多个接口
interface Alarm {
  alert();
}
interface Light {
  lightOn();
  lightOff();
}

class Car implements Alarm,Light {
  alert() {
    console.log('Car alert')
  }
  lightOn() {
    console.log('Car light on')
  }
  lightOff() {
    console.log('Car light off')
  }
}

// 混合类型

interface Counter {
  (start: number): string;
  interval: number;
  reset():void;
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number) {};
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}