const img = new Image();
img.src = image;

img.addEventListener('load', () => {
  this.imageList.push(ImagePixel(img, img.width, img.height, 4.0));
});
const geometry = new BufferGeometry();
const position = new BufferAttribute(new Float32Array(this.imageList[0].position), 3);
const color = new BufferAttribute(new Float32Array(this.imageList[0].color), 3);
const alpha = new BufferAttribute(new Float32Array(this.imageList[0].alpha), 1);
geometry.setAttribute('position', position);
geometry.setAttribute('color', color);
geometry.setAttribute('alpha', alpha);

const material = new RawShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true
});
this.mesh = new Points(geometry, material);
this.stage.scene.add(this.mesh);