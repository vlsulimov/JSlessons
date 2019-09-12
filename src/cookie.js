/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let text = '';

document.cookie.split('; ').forEach(element =>{
    const [name, value] = element.split('=');

    if (name && value) {
        addcookie(name, value);
    }
});

function addcookie(name, value) {
    let tr = document.createElement('tr');
    let thname = document.createElement('td');
    let thvalue = document.createElement('td');
    let thdelete = document.createElement('td');
    let btndelete = document.createElement('button');

    thname.textContent = name;
    thvalue.textContent = value;
    btndelete.textContent = 'delete';
    thdelete.appendChild(btndelete);
    tr.appendChild(thname);
    tr.appendChild(thvalue);
    tr.appendChild(thdelete);
    listTable.appendChild(tr);
}

addButton.addEventListener('click', () => {
    let name = addNameInput.value;
    let value = addValueInput.value;

    if (name && value) {
        document.cookie = `${name}=${value}`;
        listTable.innerHTML = '';
        document.cookie.split('; ').forEach(element =>{
            const [name, value] = element.split('=');

            if (isMatching(name, value, text)) {
                addcookie(name, value);
            }
        });
    }
    // здесь можно обработать нажатие на кнопку "добавить cookie"
});

listTable.addEventListener('click', e => {
    let target = e.target;

    if (target.tagName === 'BUTTON') {
        let td = target.parentNode.parentNode;

        document.cookie = `${td.childNodes[0].innerText}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
        td.remove();
    }
});

function isMatching(full1, full2, chunk) {
    return !!(full1.indexOf(chunk) + 1) || (full2.indexOf(chunk) + 1);
}

filterNameInput.addEventListener('keyup', function () {
    listTable.innerHTML = '';
    text = filterNameInput.value;
    document.cookie.split('; ').forEach(element =>{
        const [name, value] = element.split('=');

        if (isMatching(name, value, text)) {
            addcookie(name, value);
        }
    });
});
