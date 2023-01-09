import './style.css'

import * as THREE from 'three'
import { GridHelper } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


// creating a new scene with three.js
const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
})

// renderer for rendering objs
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight);
camera.position.setZ(30);

renderer.render(scene , camera);

// objects
// const geometry =  new THREE.TorusGeometry(10 , 3 , 16 , 100)
// const material = new THREE.MeshStandardMaterial({
//   color: 0xFF6347});
// const torus = new THREE.Mesh(geometry , material);

// scene.add(torus)

// Add Lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10 , 20 , 5)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight ,ambientLight)

const lighHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200,50);
scene.add(lighHelper)


// Adding Orbit Controls
const controls = new OrbitControls(camera ,renderer.domElement)

// Adding star to the bg
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25 , 24 ,24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry , material);

  // Randomly placing stars in the view 
  const [x ,y ,z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

// Amount of stars to add
Array(100).fill().forEach(addStar);


// Adding Bg Image
const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;


// Function for not restarting frames
function animate() {
  requestAnimationFrame(animate);

  // doing things to torus
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene , camera);
}

animate()