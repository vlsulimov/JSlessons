window.Controoler = {
  async friends(){
      const my_friends = document.getElementById('my_friends');
      const friends = await Model.getFriends({fields: 'photo_100'});
      my_friends.innerHTML = View.render('friends', {list: friends.items});
  }
};