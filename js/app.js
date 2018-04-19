var gl = null;
//This extension is to support VAOs in webgl1. (In webgl2, functions are called directly to gl object.)
var _gl = null;
var shaderProgram  = null; //Shader program to use.

var camera;
var piramide;

//Uniform locations.
var u_modelMatrix;
var u_viewMatrix;
var u_projMatrix;
var u_modelColor;

function onLoad() {
  let canvas = document.getElementById('webglCanvas');
	gl = canvas.getContext('webgl');
	_gl = gl.getExtension('OES_vertex_array_object');
  shaderProgram = ShaderProgramHelper.create(vertexShaderSource, fragmentShaderSource);
  piramide = new Piramide(2,2);

  let posLocation = gl.getAttribLocation(shaderProgram, 'vertexPos');
  u_modelMatrix = gl.getUniformLocation(shaderProgram, 'modelMatrix');
  u_viewMatrix = gl.getUniformLocation(shaderProgram, 'viewMatrix');
  u_projMatrix = gl.getUniformLocation(shaderProgram, 'projMatrix');
  u_modelColor = gl.getUniformLocation(shaderProgram, 'modelColor');

  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.18, 0.18, 0.18, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  camera = new SphericalCamera(55, 800/600);//use canvas dimensions

  piramide.model(posLocation, _gl);
  onRender();
}

function onRender() {
  let viewMatrix = camera.getViewMatrix();
  let projMatrix = camera.getProjMatrix();
  let modelMatrix = mat4.create();

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(shaderProgram);

  gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix);
	gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix);
	gl.uniformMatrix4fv(u_projMatrix, false, projMatrix);

  piramide.draw(gl, _gl);
}
