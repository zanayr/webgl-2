#version 300 es

in vec2 a_vertex;

uniform vec2 u_matrix;

void main() {
    gl_Position = vec4((u_matrix * vec3(a_vertex, 1)).xy, 0, 1);
}