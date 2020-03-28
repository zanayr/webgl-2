/**
 * Creates and compiles a shader
 * @param {!WebGLRenderingContext} gl The WebGL Context
 * @param {string} source The GLSL source code for the shader
 * @param {number} type The type of shader, VERTEX_SHADER or FRAGMENT_SHADER
 * @return {!WebGLShader} The shader
 */
export function compile(gl, source, type) {
    // Create the shader object
    const shader = gl.createShader(type);
    // Set the shader source code
    gl.shaderSource(shader, source);
    // Compile the shader
    gl.compileShader(shader);
    // Check if it compiled correctly
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw `Could not compile shader correctly: ${gl.getShaderParameter(shader)}`;
    // Return shader
    return shader;
}

/**
 * Creates a program by linking two shaders
 * @param {!WebGLRenderingContext} gl The WebGL context
 * @param {!WebGLShader} vertext A vertext shader
 * @param {!WebGLShader} fragment A fragment shader
 * @return {!WebGLProgram} A WebGL program
 */
export function link(gl, vertext, fragment) {
    // Create a program
    const program = gl.createProgram();
    //  Attach the shaders
    gl.attachShader(program, vertext);
    gl.attachShader(program, fragment);
    //  Link the program
    gl.linkProgram(program);
    // Check if the program linked correctly
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw `Program failed to link correctly: ${gl.getProgramInfoLog(program)}`;
    //  Return program
    return program;
}