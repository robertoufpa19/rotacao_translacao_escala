var tx = 0.5
var ty = 0.7

var a = [[1, 0, tx],
[0, 1, ty],
[0, 0, 1]];

b = [[-0.2],
[-0.2],
[1]];

x = [[1, 0, tx],
[0, 1, ty],
[0, 0, 1]];

y = [[0.2],
[0.2],
[1]];

function multiply(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols);
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}

function multiply2(x, y) {
    var aNumRows = x.length, aNumCols = x[0].length,
        bNumRows = y.length, bNumCols = y[0].length,
        m = new Array(aNumRows);
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols);
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += x[r][i] * y[i][c];
            }
        }
    }
    return m;
}

const matriz = multiply(a, b);
const matriz2 = multiply2(x, y);

const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec3 aPosition;
            
    void main(){
    gl_Position = vec4(aPosition, 1.0);
    }
`;

const fragmentShaderSource = `
    precision mediump float;
                
    uniform vec4 uColor;

    void main(){
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


//const positions = [-0.2, -0.2, 0.0, /**/ 0.2, 0.2, 0.0]
//const positions = [-1.0, -1.0, 0.0, /**/ 1.0, 1.0, 0.0]
const positions = [-0.2, -0.2, 0.0, /**/ 0.2, 0.2, 0.0, /**/ matriz[0][0], matriz[1][0], 0.0, /**/ matriz2[0][0], matriz2[1][0], 0.0]


gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

gl.uniform4fv(colorUniformLocation, [0.0, 0.0, 0.0, 1.0]);

gl.drawArrays(gl.LINES, 0, 4);
//gl.drawArrays(gl.TRIANGLES, 0, 6);