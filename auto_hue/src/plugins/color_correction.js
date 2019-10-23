/* Converts rgb values to xy coordinates in the CIE color space 
    Based on code from https://github.com/matt-taggart/hue-color-picker/blob/master/src/components/Main.vue#L88
    and Philips Hue Documentation at https://developers.meethue.com/develop/application-design-guidance/color-conversion-formulas-rgb-to-xy-and-back/
*/
'use strict'

const color_correction = (r, g, b) => {

    const gamma_colors = [
        _gammaCorrection(r / 255),
        _gammaCorrection(g / 255),
        _gammaCorrection(b / 255)
    ]

    const {
        X,
        Y,
        Z
    } = _D65Correction(...gamma_colors);

    const x = (X / (X + Y + Z)).toFixed(4);
    const y = (Y / (X + Y + Z)).toFixed(4);

    return [(isNaN(x)) ? 0 : +x, (isNaN(y)) ? 0 : +y];
}

const _gammaCorrection = (color) => {
    return (color > 0.04045) ?
        Math.pow((color + 0.055) / 1.055, 2.4) : (color / 12.92);
}

const _D65Correction = (r, g, b) => {
    const X = r * 0.664511 + g * 0.154324 + b * 0.162028;
    const Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
    const Z = r * 0.000088 + g * 0.072310 + b * 0.986039;

    return {
        X,
        Y,
        Z
    };
}


export default {
    color_correction
};