/**
 * 泛型
 */
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    ;
    return result;
}
;
createArray(3, 'x');
createArray(3, 2);
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
loggingIdentity('aaa');
