import {init, load} from '../lib/gl.js';
import * as utility from '../lib/utility.js';
import * as m4 from '../lib/m4.js';

let then = 0;
let xAngle = 0;
let yAngle = 0;

function clear(gl) {
  utility.resize(gl, true);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
function draw(gl, program, location, now) {
  now *= 0.1;
  let dt = now - then;
  then = now;

  xAngle += 1.2 * dt;
  yAngle += 0.7 * dt;

  let projection = m4.perspective(60 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 1, 2000);
  let camera;
  let view;
  //                 pos          target     up
  camera = m4.lookAt([0, 0, 200], [0, 0, 0], [0, 1, 0]);
  view = m4.inverse(camera);
  let viewProjection = m4.multiply(projection, view);
  
  gl.useProgram(program);

  let matrix = m4.xRotate(viewProjection, xAngle * Math.PI / 180);
  matrix = m4.yRotate(matrix, yAngle * Math.PI / 180);

  gl.uniformMatrix4fv(location, false, matrix);

  gl.drawArrays(gl.TRIANGLES, 0, 16 * 6);
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

// Texture Coordinates
function setTexture(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
       // left column front
       0, 0,
       0, 1,
       1, 0,
       0, 1,
       1, 1,
       1, 0,

       // top rung front
       0, 0,
       0, 1,
       1, 0,
       0, 1,
       1, 1,
       1, 0,

       // middle rung front
       0, 0,
       0, 1,
       1, 0,
       0, 1,
       1, 1,
       1, 0,

       // left column back
       0, 0,
       1, 0,
       0, 1,
       0, 1,
       1, 0,
       1, 1,

       // top rung back
       0, 0,
       1, 0,
       0, 1,
       0, 1,
       1, 0,
       1, 1,

       // middle rung back
       0, 0,
       1, 0,
       0, 1,
       0, 1,
       1, 0,
       1, 1,

       // top
       0, 0,
       1, 0,
       1, 1,
       0, 0,
       1, 1,
       0, 1,

       // top rung right
       0, 0,
       1, 0,
       1, 1,
       0, 0,
       1, 1,
       0, 1,

       // under top rung
       0, 0,
       0, 1,
       1, 1,
       0, 0,
       1, 1,
       1, 0,

       // between top rung and middle
       0, 0,
       1, 1,
       0, 1,
       0, 0,
       1, 0,
       1, 1,

       // top of middle rung
       0, 0,
       1, 1,
       0, 1,
       0, 0,
       1, 0,
       1, 1,

       // right of middle rung
       0, 0,
       1, 1,
       0, 1,
       0, 0,
       1, 0,
       1, 1,

       // bottom of middle rung.
       0, 0,
       0, 1,
       1, 1,
       0, 0,
       1, 1,
       1, 0,

       // right of bottom
       0, 0,
       1, 1,
       0, 1,
       0, 0,
       1, 0,
       1, 1,

       // bottom
       0, 0,
       0, 1,
       1, 1,
       0, 0,
       1, 1,
       1, 0,

       // left side
       0, 0,
       0, 1,
       1, 1,
       0, 0,
       1, 1,
       1, 0,
    ]),
    gl.STATIC_DRAW
  );
}

function run(program) {
    // Set Constants
    const vertexAttributeLocation = gl.getAttribLocation(program, 'a_vertex');
    const textureAttributeLocation = gl.getAttribLocation(program, 'a_texture');

    const matrixUniformLocation = gl.getUniformLocation(program, 'u_matrix');
    let matrix;

    // Set State
    const verticesBuffer = gl.createBuffer();
    const textureBuffer = gl.createBuffer();
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

    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    setTexture(gl);

    gl.enableVertexAttribArray(textureAttributeLocation);
    gl.vertexAttribPointer(
        textureAttributeLocation,
        2,          // count of vertext components per iteration (x, y)
        gl.FLOAT,   // type of each component
        true,       // don't normalize the data
        0,          // step the distance of vertex in the next iteration (count * size of type)
        0,          // offset of this vertex in the buffer
    );

    let texture = gl.createTexture();

    //  use texture unit 0
    gl.activeTexture(gl.TEXTURE0 + 0);
      // bind to the TEXTURE_2D bind point of texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Fill the texture with a 1x1 blue pixel
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

    let image = new Image();
    image.src = '../images/f-texture.png';
    image.addEventListener('load', () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
    });
    
    

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    function render(timestamp) {
      clear(gl);
      draw(gl, program, matrixUniformLocation, timestamp);
      window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);

}

//  Load Program
const gl = init('canvas');
load(gl, './shaders')
    .then(program => run(program));