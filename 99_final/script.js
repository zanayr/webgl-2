import {init, load} from '../lib/gl.js';
import * as utility from '../lib/utility.js';
import * as m4 from '../lib/m4.js';

function clear(gl, program, vao) {
  utility.resize(gl, true);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);

  gl.useProgram(program);
  gl.bindVertexArray(vao);
}
function run(program) {
    // Set Constants
    const vertexAttributeLocation = gl.getAttribLocation(program, 'a_vertex');
    const colorAttributeLocation = gl.getAttribLocation(program, 'a_color');

    const matrixUniformLocation = gl.getUniformLocation(program, 'u_matrix');
    let matrix;

    // Set State
    const verticesBuffer = gl.createBuffer();
    const colorsBuffer = gl.createBuffer();
    const vao = gl.createVertexArray();

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(vertexAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    geometry(gl);

    gl.vertexAttribPointer(
        vertexAttributeLocation,
        3,          // count of vertext components per iteration (x, y)
        gl.FLOAT,   // type of each component
        false,      // don't normalize the data
        0,          // step the distance of vertex in the next iteration (count * size of type)
        0,          // offset of this vertex in the buffer
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    color(gl);

    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.vertexAttribPointer(
        colorAttributeLocation,
        3,          // count of vertext components per iteration (x, y)
        gl.UNSIGNED_BYTE,   // type of each component
        true,       // don't normalize the data
        0,          // step the distance of vertex in the next iteration (count * size of type)
        0,          // offset of this vertex in the buffer
    );

    utility.resize(gl, true);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    // matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
    matrix = m4.perspective(
      60 * Math.PI / 180, // field of view
      gl.canvas.clientWidth / gl.canvas.clientHeight, // aspect ratio
      1, // near
      2000 // far
  );
    matrix = m4.translate(matrix, 0, 50, -360);
    matrix = m4.xRotate(matrix, 190 * Math.PI / 180);
    matrix = m4.yRotate(matrix, 40 * Math.PI / 180);
    matrix = m4.zRotate(matrix, 30 * Math.PI / 180);
    // matrix = m4.scale(matrix, 0.75, 0.75, 0.75);

    gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);
    
    gl.drawArrays(gl.TRIANGLES, 0, 16 * 6);
}

//  Load Program
const gl = init('canvas');
load(gl, './shaders')
    .then(program => run(program));