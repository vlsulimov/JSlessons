function returnFirstArgument(s) {
    return s;
}
function sumWithDefaults(a, b = 100) {
    return a+b;
}
function returnFnResult(fn) {
    let res = fn();

    return res;
}
function returnCounter(number = 0) {

    return function f() {
        number++;

        return number;
    };
}
function returnArgumentsArray(...rest) {
    return rest;
}
function bindFunction(fn, ...rest) {
    return fn.bind(null, ...rest)
}
export {
    returnFirstArgument,
    sumWithDefaults,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
