window.Listeners = {
    add() {
        $(".friend").draggable({
            containment: "window",
            scroll: false,
            revert: "invalid",
            helper: "clone",
        });
        $(".friends").droppable({
            drop: function (event, ui) {
                var zone = $(this);
                if (zone.attr("id") !== ui.draggable.parent().attr("id")){
                    var src = (ui.draggable.find(".btndelete").attr("src") === "img/krestik.png") ? "img/plus.png" : "img/krestik.png";
                    ui.draggable.find(".btndelete").attr("src", src);
                }
                zone.append(ui.draggable);
            }
        });
        $("input").keyup(function () {
            var target = $(this);
            var value = target.val();
            target.closest(".list").find(".friend").each(function () {
                var friend = $(this);
                if (friend.find(".fio").html().toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    friend.css("display", "flex");
                } else {
                    friend.css("display", "none")
                }
            })
        });
        $(".btndelete").click(function () {
            var btn = $(this);
            var friend = btn.parent();
            btn.attr("src",
                    (btn.attr("src") === "img/krestik.png") ? "img/plus.png" : "img/krestik.png");
            $(".friends").each(function () {
                var element = $(this);
                if (element.attr("id") !== friend.parent().attr("id")) {
                    element.append(friend);
                    return false;
                }
            })
        });
        $(".btnsave").click(function () {
            var arrsave = [];
            $("#list_friends").find('.friend').each(function () {
                arrsave.push($(this).data("friendid"));
            });
            localStorage.setItem("list", JSON.stringify(arrsave));
            alert("Сохранено!");
        });
    }
};


