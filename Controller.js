window.Controoler = {
    async friends() {
        const MyFriends = document.querySelector('#my_friends');
        // const ListFriends = document.querySelector('#list_friends');
        const friends = await Model.getFriends({fields: 'photo_100'});
        // const list = JSON.parse(localStorage.getItem('mylist')) || [];
        // const bestfriends = [];
        // friends.items.forEach(friend => {
        //     console.log(list.indexOf(String(friend.id)));
        //     if (list.indexOf(String(friend.id)) !== -1){
        //         bestfriends.push(friend);
        //     }
        // });
        //
        MyFriends.innerHTML = View.render('friends', {list: friends.items});
        // ListFriends.innerHTML = View.render('friends', {list: bestfriends});
    }
};