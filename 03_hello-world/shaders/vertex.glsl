#version 300 es

in vec2 a_vertex;

uniform vec2 u_resolution;

void main() {
    vec2 clip = (a_vertex / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clip * vec2(1, -1), 0, 1);
}