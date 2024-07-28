import * as THREE from './three.module.min.js';
import { ImagePixel } from './ImagePixel.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let mouseX = 0, mouseY = 0;
let zoom = 1;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

document.addEventListener('wheel', (event) => {
    zoom += event.deltaY * -0.001;
    zoom = Math.min(Math.max(0.5, zoom), 2); // ズーム範囲を制限
});

ImagePixel('common/img/embrem_cerezo.gif', 900, 700, 10).then(({ position, color, alpha }) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(color, 3));
    geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alpha, 1));

    const material = new THREE.PointsMaterial({ size: 1, vertexColors: true, transparent: true });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 500;

    function animate() {
        requestAnimationFrame(animate);

        // マウスの動きに応じてカメラの位置を更新
        camera.position.x += (mouseX * 100 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 100 - camera.position.y) * 0.05;
        camera.position.z = 500 / zoom; // ズームに応じてカメラのZ位置を更新
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
});