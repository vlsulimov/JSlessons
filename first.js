window.dragdrop = {
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
                    zone.appendChild(current.element);
                    current = null;
                }
            })
        })
    }
};