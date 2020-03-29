import {init, load} from '../lib/gl.js';
import * as utility from '../lib/utility.js';

function run(program) {
    // Set Constants
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

    // Set State
    const positionBuffer = gl.createBuffer();
    const vertices = [
        0,   0,
        0,   0.5,
        0.7, 0
    ];
    const vao = gl.createVertexArray();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(
        positionAttributeLocation,
        2,          // count of vertext components per iteration (x, y)
        gl.FLOAT,   // type of each component
        false,      // don't normalize the data
        0,          // step the distance of vertex in the next iteration (count * size of type)
        0,          // offset of this vertex in the buffer
    );

    utility.resize(gl, true);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

//  Load Program
const gl = init('canvas');
load(gl, './shaders')
    .then(program => run(program));