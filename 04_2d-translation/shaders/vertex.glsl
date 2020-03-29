#version 300 es

in vec2 a_vertex;

uniform vec2 u_resolution;
uniform vec2 u_translation;

void main() {
    vec2 vertex = a_vertex + u_translation;
    vec2 clip = (vertex / u_resolution) * 2.0 - 1.0;
    
    gl_Position = vec4(clip * vec2(1, -1), 0, 1);
}