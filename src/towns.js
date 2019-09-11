/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let towns;
let text = '';

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);

        xhr.send();

        xhr.onload = function () {
            towns = JSON.parse(xhr.response);
            if (Array.isArray(towns)) {
                towns.sort((a, b) => {
                    if (a.name < b.name) {

                        return -1;

                    } else if (a.name > b.name) {

                        return 1;
                    }

                    return 0;

                });
                resolve(towns);
            }
        };

        xhr.onerror = function () {
            reject();
        };
    })
}

loadTowns().then(
    () => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    },
    () => {
        loadingBlock.textContent = 'Не удалось загрузить города';
        let tryagain = document.createElement('button');

        tryagain.textContent = 'Повторить';
        document.body.appendChild(tryagain);
        tryagain.addEventListener('click', function cl() {
            loadingBlock.textContent = 'Загрузка...';
            loadTowns().then(
                () => {
                    loadingBlock.style.display = 'none';
                    tryagain.style.display = 'none';
                    tryagain.removeEventListener('click', cl);
                    filterBlock.style.display = 'block';
                },
                () => {
                    loadingBlock.textContent = 'Не удалось загрузить города';
                }
            );
        })
    }
);

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return !!(full.toLowerCase().indexOf(chunk.toLowerCase()) + 1);
}

filterInput.addEventListener('keyup', function (e) {
    if (e.key === 'Backspace') {
        text = text.slice(0, -1);
    } else {
        text += e.key;
    }
    filterResult.innerHTML = '';
    towns.forEach(element => {
        if (isMatching(element.name, text)) {
            filterResult.innerHTML += element.name + ' ';
        }
    });
});

export {
    loadTowns,
    isMatching
};
