/**
 * Should return an 3x3 identity matrix
 */
export function identity() {
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];
}
/**
 * Should return a new 3x3 matrix product
 * @param {number} a The first 3x3 matrix 
 * @param {number} b The second 3x3 matrix
 */
export function multiply(a, b) {
    return [
        b[0] * a[0] + b[1] * a[3] + b[2] * a[6],
        b[0] * a[1] + b[1] * a[4] + b[2] * a[7],
        b[0] * a[2] + b[1] * a[5] + b[2] * a[8],
        b[3] * a[0] + b[4] * a[3] + b[5] * a[6],
        b[3] * a[1] + b[4] * a[4] + b[5] * a[7],
        b[3] * a[2] + b[4] * a[5] + b[5] * a[8],
        b[6] * a[0] + b[7] * a[3] + b[8] * a[6],
        b[6] * a[1] + b[7] * a[4] + b[8] * a[7],
        b[6] * a[2] + b[7] * a[5] + b[8] * a[8],
    ];
}
/**
 * Should return a new 3x3 rotation matrix
 * @param {number} angle The angle of reotation
 */
export function rotation(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return [
        c, -s, 0,
        s, c, 0,
        0, 0, 1
    ];
}
/**
 * Should return a new 3x3 scale matrix
 * @param {number} sx The x scale factor
 * @param {number} sy The y scale factor
 */
export function scaling(sx, sy) {
    return [
        sx, 0, 0,
        0, sy, 0,
        0, 0, 1
    ];
}
/**
 * Should return a new 3x3 translation matrix
 * @param {number} tx The new x position
 * @param {number} ty The new y position
 */
export function translation(tx, ty) {
    return [
        1, 0, 0,
        0, 1, 0,
        tx, ty, 1
    ];
}
/**
 * Should return a 3x3 projection matrix
 * @param {number} w The width of the projection
 * @param {number} h The height of the projection
 * @returns {Array} A new projection matrix
 */
export function projection(w, h) {
    // Note: This matrix flips the Y axis so that 0 is at the top of the canvas
    return [
        2 / w, 0, 0,
        0, -2 / h, 0,
        -1, 1, 1
    ];
}
/**
 * Should return a new rotated position matrix
 * @param {Array} matrix The position matrix
 * @param {number} angle The degree of rotation in radians
 * @returns {Array} A new position matrix
 */
export function rotate(matrix, angle) {
    return multiply(matrix, rotation(angle));
}
/**
 * Should return a new scaled position matrix
 * @param {Array} matrix The position matrix
 * @param {number} h The horizontal scale factor
 * @param {number} v The vertical scale factor
 * @returns {Array} A new position matrix
 */
export function scale(matrix, h, v) {
    return multiply(matrix, scaling(h, v));
}
/**
 * Should return a new translated position matrix
 * @param {Array} matrix The position matrix
 * @param {number} x The new x position
 * @param {number} y The new y position
 * @returns {Array} A new position matrix
 */
export function translate(matrix, x, y) {
    return multiply(matrix, translation(x, y));
}