#version 300 es

//  An attribute is an input (in) to a vertex shader
//  It recieves data from a buffer
in vec4 a_position;

// All shaders have a main function point
// This is the entry point for the shader
void main() {
    // gl_Position is a special variable that a vertext shader is
    // responsible for setting
    gl_Position = a_position;
}