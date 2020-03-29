import {init, load} from '../lib/gl.js';
import * as utility from '../lib/utility.js';

function random(range) {
    return Math.floor(Math.random() * range);
}
function rectangle(gl, x, y, width, height) {
    // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
    // whatever buffer is bound to the `ARRAY_BUFFER` bind point
    // but so far we only have on buffer
    // If we had more than one buffer we'd want to bind that
    // buffer to `ARRAY_BUFFER` first
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x, y,
        x + width, y,
        x, y + height,
        x, y + height,
        x + width, y,
        x + width, y + height
    ]), gl.STATIC_DRAW);
}

function run(program) {
    // Set Constants
    const vertexAttributeLocation = gl.getAttribLocation(program, 'a_vertex');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color');

    // Set State
    const verticesBuffer = gl.createBuffer();
    const vao = gl.createVertexArray();

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(vertexAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.vertexAttribPointer(
        vertexAttributeLocation,
        2,          // count of vertext components per iteration (x, y)
        gl.FLOAT,   // type of each component
        false,      // don't normalize the data
        0,          // step the distance of vertex in the next iteration (count * size of type)
        0,          // offset of this vertex in the buffer
    );

    utility.resize(gl, true);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    for (let i = 0; i < 50; ++i) {
        rectangle(gl, random(300), random(300), random(300), random(300));
        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}

//  Load Program
const gl = init('canvas');
load(gl, './shaders')
    .then(program => run(program));