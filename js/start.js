const MyFriends = document.querySelector('#my_friends');
const ListFriends = document.querySelector('#list_friends');
const cont = document.querySelector('.content');
const footer = document.querySelector('.footer');

//авторизация в вк
Model.login(7135923, 2 | 8192)
    .then();
//Добавление друзей на страницу
Controoler.friends(MyFriends, ListFriends);

//Обработчик нажатий на кнопку перемещания друзей между списками
cont.addEventListener('click', e => {
    let target = e.target;
    if (target.classList[0] === 'btndelete') {
        let lastparent = target.parentNode;
        let destination;

        //Заменяем картинку "плюс" на картинку "крест"
        target.src = changeimg(target.src);

        //Проверяем в какую часть необходимо переместить элемент
        [MyFriends, ListFriends].forEach(element => {
            if (lastparent.parentNode !== element) {
                destination = element;
            }
        });
        lastparent.parentNode.removeChild(lastparent);
        if (destination) {
            destination.appendChild(lastparent);
        }
    }
});

//Обработчик для инпутов
cont.addEventListener('keyup', e => {
    let target = e.target;

    if (target.tagName === 'INPUT') {
        //Находим ближайший элемент с классом friends
        let node = findfriendsnode(target);

        //Прохожимся по всем div элементам блока с друзьями и оставляем только друзей удовлетворяющих условиям
        actualfriends(node, target.value).then();
    }
});

//Обработчик нажатий для кнопки "Сохранить"
footer.addEventListener('click', e => {

    if (e.target.tagName === 'BUTTON') {
        let tosave = [];
        //Добавляем все friendid из правого списка в массив
        ListFriends.childNodes.forEach(child => {
            if (child.tagName === 'DIV') {
                tosave.push(Number(child.getAttribute('friendid')));
            }
        });
        //Сохраняем массив со всеми friendid в localStorage
        localStorage.setItem('list', JSON.stringify(tosave));
    }
    alert("Сохранено!");
});

//Функция для проверки актуальности списка с друзьями с учетом условий в input
function actualfriends(listnode, part) {
    return new Promise((resolve) => {
        //Просматриваем каждого друга в блоке с друзьями
        listnode.childNodes.forEach(friend => {
            if (friend.tagName === 'DIV') {
                //Для каждого div с просматриваем его дочерние элементы, чтобы получить ФИ
                friend.childNodes.forEach(node => {
                    if (node.tagName === 'DIV') {
                        //Проверяем включена ли текущая в input строка в ФИ
                        if (isMatching(part, node.innerHTML)) {
                            //Если включена то ставим видимый блок
                            friend.style.display = 'FLEX';
                        } else {
                            //Если не включена, то убираем данный блок
                            friend.style.display = 'NONE';
                        }
                    }

                });
            }
        });
        resolve();
    });
}

//Функция для замены картинок "плюс"-"крест"
function changeimg(image) {
    let result = '';
    ['krestik.png', 'plus.png'].forEach(img => {
        if (img !== image.split('/').pop()) {
            result = img;
        }
    });
    return 'img/' + result;
}

//Принимает input и находит ближайший элемент с классом friends
function findfriendsnode(node) {
    let result;
    while (node.classList[0] !== 'list') {
        node = node.parentNode;
    }
    node.childNodes.forEach(element => {
        if (element.tagName === 'DIV') {
            if (element.classList[0] === 'friends') {
                result = element;
            }
        }
    });
    return result;
}

//Функция проверяет является ли part частью full
function isMatching(part, full) {
    return !!(full.toLowerCase().indexOf(part.toLowerCase()) !== -1);
}
