import {init, load, link} from '../lib/gl.js';
import * as utility from '../lib/utility.js';

function geometry(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            0, 0,
            30, 0,
            0, 150,
            0, 150,
            30, 0,
            30, 150,
            30, 0,
            100, 0,
            30, 30,
            30, 30,
            100, 0,
            100, 30,
            30, 60,
            67, 60,
            30, 90,
            30, 90,
            67, 60,
            67, 90
        ]),
        gl.STATIC_DRAW
    );
}

function run(program) {
    // Set Constants
    const vertexAttributeLocation = gl.getAttribLocation(program, 'a_vertex');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color');
    const translationUniformLocation = gl.getUniformLocation(program, 'u_translation');
    const translation = [0, 0];
    const color = [Math.random(), Math.random(), Math.random(), 1];

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

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    
    geometry(gl);
    gl.uniform4f(colorUniformLocation, ...color);
    gl.uniform2fv(translationUniformLocation, translation);
    gl.drawArrays(gl.TRIANGLES, 0, 18);
}

//  Load Program
const gl = init('canvas');
load(gl, './shaders')
    .then(program => run(program));