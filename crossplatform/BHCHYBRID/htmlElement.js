ui.addHTMLElement = function(parent, element, width, height, options) {
    return new htmlElement(parent, element, width, height, options)
}
const htmlElement = class extends ui.Control {
    constructor(parent, element, width, height, options) {

        super(parent, width, height, options, element);
        this.HTMLElement = element;

        this.element = document.createElement(this.HTMLElement);
        this.element.style.width = _W(this.width);
        this.element.style.height = _H(this.height);
        
        this._div.appendChild(this.element);


        /**
         * The proxy allows us to call js methods so as
         * the ones of ui.Control.
         */
        return new Proxy(this, {
            get(target, prop) {
                if(prop in target) {
                    return target[prop];
                } else {
                    return target.element[prop];
                }
            },
            set(target, prop, value) {
                if(prop in target) {
                    target[prop] = value;
                } else {
                    target.element[prop] = value;
                }
                return true;
            }
        });
    }
}


