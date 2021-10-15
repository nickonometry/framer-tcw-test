import { __decorate } from "tslib";
import { MDCRipple } from '@material/ripple';
import { CustomElement, ensureChildren, upgradeProperty } from '@tyler-components-web/core';
import { BUTTON_CONSTANTS } from './button-constants';
/**
 * The custom element class behind the `<tcw-button>` element.
 */
let ButtonComponent = class ButtonComponent extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return [BUTTON_CONSTANTS.attributes.TYPE];
    }
    initializedCallback() {
        upgradeProperty(this, 'type');
    }
    connectedCallback() {
        if (this.children.length) {
            this._initialize();
        }
        else {
            ensureChildren(this).then(() => this._initialize());
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case BUTTON_CONSTANTS.attributes.TYPE:
                this.type = newValue;
                break;
        }
    }
    disconnectedCallback() {
        if (this._mdcRipple) {
            this._mdcRipple.destroy();
        }
        if (this._mutationObserver) {
            this._mutationObserver.disconnect();
        }
    }
    /**
     * Sets the type of button decoration.
     * Possbile values are: raised, elevated, outlined, and dense.
     * Can be combined as: outlined-dense.
     */
    set type(value) {
        if (this._type !== value) {
            this._type = value;
            this._applyType(value);
            this.setAttribute(BUTTON_CONSTANTS.attributes.TYPE, this._type);
        }
    }
    get type() {
        return this._type;
    }
    _applyType(type) {
        if (this._buttonElement) {
            this._buttonElement.classList.remove(BUTTON_CONSTANTS.classes.BUTTON_RAISED);
            this._buttonElement.classList.remove(BUTTON_CONSTANTS.classes.BUTTON_UNELEVATED);
            this._buttonElement.classList.remove(BUTTON_CONSTANTS.classes.BUTTON_OUTLINED);
            this._buttonElement.classList.remove(BUTTON_CONSTANTS.classes.BUTTON_DENSE);
            if (type.includes('raised')) {
                this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON_RAISED);
            }
            if (type.includes('unelevated')) {
                this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON_UNELEVATED);
            }
            if (type.includes('outlined')) {
                this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON_OUTLINED);
            }
            if (type.includes('dense')) {
                this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON_DENSE);
            }
        }
    }
    _initialize() {
        this._initializeButton();
        this._initializeMutationObserver();
    }
    _initializeButton() {
        this._buttonElement = this.querySelector(BUTTON_CONSTANTS.selectors.BUTTON);
        if (!this._buttonElement) {
            return;
        }
        if (this.hasAttribute(BUTTON_CONSTANTS.attributes.TYPE)) {
            this._type = this.getAttribute(BUTTON_CONSTANTS.attributes.TYPE);
            this._applyType(this._type);
        }
        this._buttonElement.classList.add(BUTTON_CONSTANTS.classes.BUTTON);
        this._initializeButtonChildren();
        if (this._mdcRipple) {
            this._mdcRipple.destroy();
        }
        this._mdcRipple = new MDCRipple(this._buttonElement);
    }
    _initializeButtonChildren() {
        const labelElement = this.querySelector(BUTTON_CONSTANTS.selectors.LABEL);
        if (labelElement) {
            labelElement.classList.add(BUTTON_CONSTANTS.classes.LABEL);
        }
        const iconElements = Array.from(this.querySelectorAll(BUTTON_CONSTANTS.selectors.ICON));
        iconElements.forEach(iconElement => {
            iconElement.classList.add(BUTTON_CONSTANTS.classes.ICON);
            if (!iconElement.hasAttribute('aria-hidden')) {
                iconElement.setAttribute('aria-hidden', 'true');
            }
        });
    }
    _initializeMutationObserver() {
        if (!this._mutationObserver) {
            const config = { childList: true, subtree: true };
            const callback = mutationList => {
                if (this._buttonWasAdded(mutationList)) {
                    this._initializeButton();
                }
                else if (mutationList.some(mutation => mutation.addedNodes.length)) {
                    this._initializeButtonChildren();
                }
            };
            this._mutationObserver = new MutationObserver(callback);
            this._mutationObserver.observe(this, config);
        }
    }
    _buttonWasAdded(mutationList) {
        return mutationList.some(mutation => {
            return Array.from(mutation.addedNodes)
                .some(node => node.nodeName.toLowerCase() === BUTTON_CONSTANTS.selectors.BUTTON);
        });
    }
};
ButtonComponent = __decorate([
    CustomElement({
        name: BUTTON_CONSTANTS.elementName
    })
], ButtonComponent);
export { ButtonComponent };
