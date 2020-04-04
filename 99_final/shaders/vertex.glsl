#version 300 es

in vec4 a_vertex;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 v_color;

void main() {
    gl_Position = u_matrix * a_vertex;

    v_color = a_color;
}