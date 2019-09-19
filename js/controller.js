window.Controoler = {
    async friends(MyFriends, ListFriends) {
        const friends = await Model.getFriends({fields: 'photo_100'});
        const list = JSON.parse(localStorage.getItem('list')) || [];
        const bestfriends = [];
        for (let i = 0; i < friends.items.length; i++) {
            let friend = friends.items[i];
            //Проверка, был ли сохранен элмент с данным friend.id
            if (list.indexOf(friend.id) !== -1) {
                //Добавление сохраненных эдементов в отдельный массив
                bestfriends.push(friend);
                friends.items.splice(friends.items.indexOf(friend), 1);
                i--;
            }
        }
        //Рендер каждого списка друзей
        ListFriends.innerHTML += View.render('friends1', {list: bestfriends});
        MyFriends.innerHTML += View.render('friends', {list: friends.items});

        //Добавление обработчиков для drag and drop
        View.druganddrop([MyFriends, ListFriends]);
    }
};