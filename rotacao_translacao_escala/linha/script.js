const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');

const vertexShaderSource = `
  attribute vec3 aPosition;

  void main() {
    gl_Position = vec4(aPosition, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform vec4 uColor;

  void main() {
    gl_FragColor = uColor;
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
const colorUniformLocation = gl.getUniformLocation(program, 'uColor');

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//const positions = [  0.0, 0.0, 0.0,  8.0, 0.0, 0.0,  0.0, 2.0, 0.0,];
const positions = [  1.0, 0.0, -1.0];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

gl.uniform4fv(colorUniformLocation, [0.0, 1.0, 0.0, 1.0]);

gl.drawArrays(gl.LINES, 0, 6);


