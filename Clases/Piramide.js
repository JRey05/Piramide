class Piramide {
  constructor(alto, lado) {
    this.alto=alto;
    this.lado=lado/2;
    //this.indices = 0;
  }

  createVBO(data) {
    this.vbo = gl.createBuffer(gl.ARRAY_BUFFER);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  	gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  createEBO(data) {
    this.ebo = gl.createBuffer(gl.ELEMENT_ARRAY_BUFFER);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  createVAO(indices, positions, posLocation, _gl) {
  	this.vao = _gl.createVertexArrayOES();
    this.ebo = this.createEBO(indices);
    this.vboPosition = this.createVBO(positions);

    _gl.bindVertexArrayOES(this.vao);
  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vboPosition);
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 3, gl.FLOAT, false, 0, 0);

  	_gl.bindVertexArrayOES(null);
  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  	gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  model(posLocation, _gl) {
    this.vertices = [
      -this.lado,0,-this.lado, // Base
      this.lado,0,-this.lado, // Base
      this.lado,0,this.lado, // Base
      0,this.alto,0, // Punta
      -this.lado,0,this.lado // Base
    ];
    this.indices = [
      0,1,3, // Cara frontal
      1,2,3, // Cara derecha
      2,4,3, // Cara trasera
      0,4,3, // Cara izquierda
      4,0,1, // Cara inferior
      4,1,2 // Cara inferior
    ];
    this.indexCount = this.indices.length;
    this.createVAO(this.indices, this.vertices, posLocation, _gl);
  }

  draw(gl, _gl) {
    _gl.bindVertexArrayOES(this.vao);
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
  }

}
