/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let array2 = [];

    for (let i = 0; i < array.length; i++) {
        array2[i] = fn(array[i], i, array);
    }

    return array2;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let i = 0;
    let previous = initial;

    if (initial === undefined) {
        i = 1;
        previous = array[0];
    }

    for (i; i < array.length; i++) {
        previous = fn(previous, array[i], i, array);
    }

    return previous;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let properties = [];

    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            properties.push(property.toString().toUpperCase());
        }
    }

    return properties;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let newarray = [];

    if (from <= -array.length) {
        from = 0;
    } else if (from < 0) {
        from = array.length - 1 + from;
    } else if (from >= array.length) {
        return [];
    }

    if (to >= array.length) {
        to = array.length;
    } else if (to < 0) {
        to = array.length + to;
    }

    for (let i = from; i < to; i++) {
        newarray.push(array[i]);
    }

    return newarray;
}
/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    var pr = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });

    return pr;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
