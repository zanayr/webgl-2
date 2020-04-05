import {init, load} from '../lib/gl.js';
import * as utility from '../lib/utility.js';
import * as m4 from '../lib/m4.js';

function clear(gl) {
  utility.resize(gl, true);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
function draw(gl, program, location, angle) {
  const radius = 200;
  let projection = m4.perspective(60 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 1, 2000);
  let camera = m4.translate(m4.yRotation(angle * Math.PI / 180), 9, 50, radius * 1.5);
  let position = [camera[12], camera[13], camera[14]];
  let up = [0, 1, 0];
  let view;
  
  camera = m4.lookAt(position, [radius, 0, 0], up);
  view = m4.inverse(camera);
  let viewProjection = m4.multiply(projection, view);
  
  gl.useProgram(program);
    // gl.bindVertexArray(vao);
    for (let i = 0; i < 5; ++i) {
        let angle = i * Math.PI * 2 / 5;
        let x = Math.cos(angle) * radius;
        let z = Math.sin(angle) * radius;

        let matrix = m4.translate(viewProjection, x, 0, z);
        gl.uniformMatrix4fv(location, false, matrix);

        gl.drawArrays(gl.TRIANGLES, 0, 16 * 6);
    }
}
function geometry(gl) {
    const vertices = [
      // left column front
      0,   0,  0,
      0, 150,  0,
      30,   0,  0,
      0, 150,  0,
      30, 150,  0,
      30,   0,  0,

      // top rung front
      30,   0,  0,
      30,  30,  0,
      100,   0,  0,
      30,  30,  0,
      100,  30,  0,
      100,   0,  0,

      // middle rung front
      30,  60,  0,
      30,  90,  0,
      67,  60,  0,
      30,  90,  0,
      67,  90,  0,
      67,  60,  0,

      // left column back
        0,   0,  30,
       30,   0,  30,
        0, 150,  30,
        0, 150,  30,
       30,   0,  30,
       30, 150,  30,

      // top rung back
       30,   0,  30,
      100,   0,  30,
       30,  30,  30,
       30,  30,  30,
      100,   0,  30,
      100,  30,  30,

      // middle rung back
       30,  60,  30,
       67,  60,  30,
       30,  90,  30,
       30,  90,  30,
       67,  60,  30,
       67,  90,  30,

      // top
        0,   0,   0,
      100,   0,   0,
      100,   0,  30,
        0,   0,   0,
      100,   0,  30,
        0,   0,  30,

      // top rung right
      100,   0,   0,
      100,  30,   0,
      100,  30,  30,
      100,   0,   0,
      100,  30,  30,
      100,   0,  30,

      // under top rung
      30,   30,   0,
      30,   30,  30,
      100,  30,  30,
      30,   30,   0,
      100,  30,  30,
      100,  30,   0,

      // between top rung and middle
      30,   30,   0,
      30,   60,  30,
      30,   30,  30,
      30,   30,   0,
      30,   60,   0,
      30,   60,  30,

      // top of middle rung
      30,   60,   0,
      67,   60,  30,
      30,   60,  30,
      30,   60,   0,
      67,   60,   0,
      67,   60,  30,

      // right of middle rung
      67,   60,   0,
      67,   90,  30,
      67,   60,  30,
      67,   60,   0,
      67,   90,   0,
      67,   90,  30,

      // bottom of middle rung.
      30,   90,   0,
      30,   90,  30,
      67,   90,  30,
      30,   90,   0,
      67,   90,  30,
      67,   90,   0,

      // right of bottom
      30,   90,   0,
      30,  150,  30,
      30,   90,  30,
      30,   90,   0,
      30,  150,   0,
      30,  150,  30,

      // bottom
      0,   150,   0,
      0,   150,  30,
      30,  150,  30,
      0,   150,   0,
      30,  150,  30,
      30,  150,   0,

      // left side
      0,   0,   0,
      0,   0,  30,
      0, 150,  30,
      0,   0,   0,
      0, 150,  30,
      0, 150,   0,
    ];
    // Center the F around the origin and Flip it around. We do this because
    // we're in 3D now with and +Y is up where as before when we started with 2D
    // we had +Y as down.

    // We could do by changing all the values above but I'm lazy.
    // We could also do it with a matrix at draw time but you should
    // never do stuff at draw time if you can do it at init time.
    let matrix = m4.xRotation(Math.PI);
    matrix = m4.translate(matrix, -50, -75, -15);

    for (let i = 0; i < vertices.length; i += 3) {
      let vector = m4.transformVector(matrix, [vertices[i + 0], vertices[i + 1], vertices[i + 2], 1]);
      vertices[i + 0] = vector[0];
      vertices[i + 1] = vector[1];
      vertices[i + 2] = vector[2];
    }
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
}

function color(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array([
          // left column front
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
  
            // top rung front
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
  
            // middle rung front
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
          200,  70, 120,
  
            // left column back
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
  
            // top rung back
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
  
            // middle rung back
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
          80, 70, 200,
  
            // top
          70, 200, 210,
          70, 200, 210,
          70, 200, 210,
          70, 200, 210,
          70, 200, 210,
          70, 200, 210,
  
            // top rung right
          200, 200, 70,
          200, 200, 70,
          200, 200, 70,
          200, 200, 70,
          200, 200, 70,
          200, 200, 70,
  
            // under top rung
          210, 100, 70,
          210, 100, 70,
          210, 100, 70,
          210, 100, 70,
          210, 100, 70,
          210, 100, 70,
  
            // between top rung and middle
          210, 160, 70,
          210, 160, 70,
          210, 160, 70,
          210, 160, 70,
          210, 160, 70,
          210, 160, 70,
  
            // top of middle rung
          70, 180, 210,
          70, 180, 210,
          70, 180, 210,
          70, 180, 210,
          70, 180, 210,
          70, 180, 210,
  
            // right of middle rung
          100, 70, 210,
          100, 70, 210,
          100, 70, 210,
          100, 70, 210,
          100, 70, 210,
          100, 70, 210,
  
            // bottom of middle rung.
          76, 210, 100,
          76, 210, 100,
          76, 210, 100,
          76, 210, 100,
          76, 210, 100,
          76, 210, 100,
  
            // right of bottom
          140, 210, 80,
          140, 210, 80,
          140, 210, 80,
          140, 210, 80,
          140, 210, 80,
          140, 210, 80,
  
            // bottom
          90, 130, 110,
          90, 130, 110,
          90, 130, 110,
          90, 130, 110,
          90, 130, 110,
          90, 130, 110,
  
            // left side
          160, 160, 220,
          160, 160, 220,
          160, 160, 220,
          160, 160, 220,
          160, 160, 220,
          160, 160, 220,
      ]),
        gl.STATIC_DRAW
    );
}

function run(program) {
    // Set Constants
    const vertexAttributeLocation = gl.getAttribLocation(program, 'a_vertex');
    const colorAttributeLocation = gl.getAttribLocation(program, 'a_color');

    const matrixUniformLocation = gl.getUniformLocation(program, 'u_matrix');

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
    clear(gl);

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
    function render(timestamp) {
      draw(gl, program, matrixUniformLocation, Math.sin(timestamp / 1000)  * 360);
      window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);
    
}

//  Load Program
const gl = init('canvas');
load(gl, './shaders')
    .then(program => run(program));