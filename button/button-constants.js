import { COMPONENT_NAME_PREFIX } from '../constants';
const elementName = `${COMPONENT_NAME_PREFIX}button`;
const classes = {
    BUTTON: 'tyl-button',
    LABEL: 'tyl-button__label',
    ICON: 'tyl-button__icon',
    BUTTON_RAISED: 'tyl-button--raised',
    BUTTON_UNELEVATED: 'tyl-button--unelevated',
    BUTTON_OUTLINED: 'tyl-button--outlined',
    BUTTON_DENSE: 'tyl-button--dense'
};
const selectors = {
    BUTTON: 'button',
    LABEL: 'span',
    ICON: 'i, tcw-icon'
};
const attributes = {
    TYPE: 'type'
};
export const BUTTON_CONSTANTS = {
    elementName,
    classes,
    selectors,
    attributes
};
