#version 300 es

in vec2 a_position;

uniform vec2 u_resolution;

void main() {
    // Convert the position from pixels to [0.0, 1.0]
    vec2 clip = (a_position / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clip * vec2(1, -1), 0, 1);
}