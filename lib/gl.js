import {get} from './utility.js';
/**
 * Should create and compile a shader
 * @param {!WebGLRenderingContext} gl The WebGL Context
 * @param {string} source The GLSL source code for the shader
 * @param {number} type The type of shader, VERTEX_SHADER or FRAGMENT_SHADER
 * @return {!WebGLShader} The shader
 */
export function compile(gl, type, source) {
    // Create the shader object
    const shader = gl.createShader(type);
    // Set the shader source code
    gl.shaderSource(shader, source);
    // Compile the shader
    gl.compileShader(shader);
    // Check if it compiled correctly
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw `Could not compile shader correctly: ${gl.getShaderInfoLog(shader)}`;
    // Return shader
    return shader;
}
/**
 * Should return a new WebGL 2.0 Context
 * @param {string} id Is the HTML5 Canvas DOM object's id
 * @returns {!WebGLRenderingContext} The WebGL 2.0 context
 */
export function init(id) {
    // Get the HTML5 Canvas DOM object and return the WebGL 2.0 context
    const context = document.getElementById(id).getContext('webgl2');
    // Check if a valid context was returned
    if (!context) throw `Your browser does not support WebGL 2.0, exiting...`;
    // Return the context
    return context;
}
/**
 * Should create a program by linking two shaders together
 * @param {!WebGLRenderingContext} gl The WebGL context
 * @param {!WebGLShader} vertext A vertext shader
 * @param {!WebGLShader} fragment A fragment shader
 * @return {!WebGLProgram} A WebGL program
 */
export function link(gl, vertex, fragment) {
    // Create a program
    const program = gl.createProgram();
    // Attach the shaders
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    // Link the program
    gl.linkProgram(program);
    // Check if the program linked correctly
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw `Program failed to link correctly: ${gl.getProgramInfoLog(program)}`;
    // Return program
    return program;
}
export async function load(gl, path) {
    const vertex = await get(`${path}/vertex.glsl`);
    const fragment = await get(`${path}/fragment.glsl`);
    return link(gl, compile(gl, gl.VERTEX_SHADER, vertex), compile(gl, gl.FRAGMENT_SHADER, fragment));
}