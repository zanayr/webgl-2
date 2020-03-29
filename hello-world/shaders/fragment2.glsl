#version 300 es

// Fragment shaders don't have a default percision so we are required to select one,
// mediump is a good default, meaning "medium percision"
precision mediump float;

// We need to declar an output for the fragment shader
out vec4 outColor;

// The main function is the entry point for the shader
void main() {
    // Just set the output to a constant color
    outColor = vec4(1, 0, 0.5, 1);
}