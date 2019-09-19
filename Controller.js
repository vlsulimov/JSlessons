window.Controoler = {
    async friends() {
        const MyFriends = document.querySelector('#my_friends');
        const ListFriends = document.querySelector('#list_friends');
        const friends = await Model.getFriends({fields: 'photo_100'});
        const list = JSON.parse(localStorage.getItem('list')) || [];
        const bestfriends = [];
        for (let i = 0; i < friends.items.length; i++) {
            let friend = friends.items[i];
            if (list.indexOf(friend.id) !== -1) {
                bestfriends.push(friend);
                friends.items.splice(friends.items.indexOf(friend), 1);
                i--;
            }
        }
        MyFriends.innerHTML += View.render('friends', {list: friends.items});
        ListFriends.innerHTML += View.render('friends1', {list: bestfriends});
    }
};