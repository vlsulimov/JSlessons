window.View = {
    render(id, model) {
        const element = document.getElementById(id);
        const source = element.innerHTML;
        const renderFn = Handlebars.compile(source);
        return renderFn(model);
    },

    //Функция устанавливающая обрабочики drug and drop для каждой зоны со спиком друзей
    druganddrop(zones) {
    let current;

    zones.forEach(zone => {
        zone.addEventListener('dragstart', e => {
            current = {start: zone, element: e.target};
        });

        zone.addEventListener('dragover', e => {
            e.preventDefault();
        });

        zone.addEventListener('drop', e => {
            if (current) {
                e.preventDefault();
                //Проверяем поменялась ли зона, в которой оказался элемент friend после окончания перемещения
                if (zone !== current.start) {
                    //Если поменялась, то изменяем картинку "плюс"-"крест"
                    current.element.childNodes.forEach(element => {
                        if (element.tagName === 'IMG') {
                            if (element.classList[0] === 'btndelete') {
                                element.src = changeimg(element.src);
                            }
                        }
                    });
                }
                //Добавляем элемент в зону, куда он был перемещен
                zone.appendChild(current.element);
                current = null;
            }
        })
    })
}
};