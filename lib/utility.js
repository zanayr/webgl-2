/**
 * Resize the DOM Canvas
 * @param {!WebGLRenderingContext} gl The WebGL rendering context
 * @param {boolean} bool The flag to toggle device pixels
 * @returns {undefined} Returns undefined
 */
export function resize(gl, bool=false) {
    // Get the ratio of device pixels to one CSS pixel
    const ratio = bool ? (window.devicePixelRatio || 1) : 1;
    // Get the canvas' client dimensions and then compute the size required to match
    // the device pixels
    const width = Math.floor(gl.canvas.clientWidth * ratio);
    const height = Math.floor(gl.canvas.clientHeight * ratio);
    // Check if the canvas is not the same size
    if (gl.canvas.width != width || gl.canvas.height != height) {
        // Set the canvas to be the same size
        gl.canvas.width = width;
        gl.canvas.height = height;
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}
export function get(path) {
    return fetch(path)
        .then(response => {
            return response.text();
        });
}