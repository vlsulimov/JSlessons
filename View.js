window.View = {
    render(id, model) {
        const element = document.getElementById(id);
        const source = element.innerHTML;
        const renderFn = Handlebars.compile(source);
        return renderFn(model);
    }
};