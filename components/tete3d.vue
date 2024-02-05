<template>
    <div class="canvas_container" ref="canvasContainer">
        <canvas ref="canvas"></canvas>
    </div>
</template>
  
<style>
.canvas_container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
  
canvas {
    display: block;
}
</style>
  
<script setup>
import {
    ref,
    onMounted,
    onBeforeUnmount,
    watchEffect,
} from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import * as THREE from "three";

const canvasContainer = ref(null);
const canvas = ref(null);
let controls, scene, camera, renderer, animationId = null;

const initScene = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const width = canvasContainer.value.clientWidth;
    const height = width;
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
    renderer.setSize(width, height);
    renderer.setClearColor(0x222222, 1);
    controls = new OrbitControls(camera, renderer.domElement);

    renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000);

    var loader = new ColladaLoader();
    loader.load("/models/astronaute.dae", onLoaded, onProgress, onError);

    // Ajoutez une lumière ambiante pour éclairer toute la scène
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Ajoutez une lumière directionnelle pour simuler la lumière du soleil
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0, 1, 1); // positionnez la lumière vers le haut et en avant
    scene.add(directionalLight);

    animate();
};

const animate = () => {
    // Faites tourner la caméra autour de son point cible
    controls.autoRotate = true;
    controls.update();

    // Appel récursif pour continuer l'animation
    requestAnimationFrame(animate);

    // Rendu de la scène
    renderer.render(scene, camera);
};
  
function onLoaded(collada) {
    let objects = collada.scene;

    // Centrez le modèle en déplaçant son positionnement
    const boundingBox = new THREE.Box3().setFromObject(objects);
    const center = boundingBox.getCenter(new THREE.Vector3());
    objects.position.sub(center);

    scene.add(objects);

    controls.target.set(0, 0, 0);
    camera.position.set(0, 0, 10);
    controls.update();
}

  
var onProgress = function (data) {
    if (data.lengthComputable) {
      var percentComplete = (data.loaded / data.total) * 100;
      console.log(Math.round(percentComplete, 2) + "% téléchargé");
    }
};
  
var onError = function (data) {
    console.error(data);
};
  
onMounted(() => {
    initScene();
    animate();
});
  
onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
});
  
// Redimensionnez la scène lorsque la taille de la fenêtre change
watchEffect(() => {
    if (renderer && camera) {
        const width = canvasContainer.value.clientWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
});
</script>  