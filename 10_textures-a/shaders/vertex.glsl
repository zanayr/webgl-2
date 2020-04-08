#version 300 es

in vec4 a_vertex;
in vec2 a_texture;

uniform mat4 u_matrix;

out vec2 v_texture;

void main() {
    gl_Position = u_matrix * a_vertex;

    v_texture = a_texture;
}