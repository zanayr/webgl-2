import {init, load, link} from '../lib/gl.js';
import * as utility from '../lib/utility.js';
import * as m3 from '../lib/m3.js';

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
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color');
    const matrixUniformLocation = gl.getUniformLocation(program, 'u_matrix');
    const color = [Math.random(), Math.random(), Math.random(), 1];
    let matrix;

    // Set State
    const verticesBuffer = gl.createBuffer();
    const vao = gl.createVertexArray();

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(vertexAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    geometry(gl);

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

    gl.uniform4f(colorUniformLocation, ...color);

    matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
    matrix = m3.translate(matrix, 200, 200);
    matrix = m3.rotate(matrix, 90 * Math.PI / 180);
    matrix = m3.scale(matrix, 2, 2);

    gl.uniformMatrix3fv(matrixUniformLocation, false, matrix);
    
    gl.drawArrays(gl.TRIANGLES, 0, 18);
}

//  Load Program
const gl = init('canvas');
load(gl, './shaders')
    .then(program => run(program));