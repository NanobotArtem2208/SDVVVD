// Импортируем необходимые модули из библиотеки Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Создаем сцену, камеру и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Загружаем модель осеннего листа
const loader = new GLTFLoader();

loader.load('/model/scene.gltf', function(gltf) {
  // Настроим осенний лист
  const leaf = gltf.scene;
  scene.add(leaf);

  // Создаем массив для хранения экземпляров осенних листьев
  const leafInstances = [];

  // Создаем 100 экземпляров осенних листьев
  for (let i = 0; i < 10; i++) {
    // Клонируем модель осеннего листа
    const leafInstance = leaf.clone();

    // Случайно позиционируем каждый лист
    leafInstance.position.x = Math.random() * 10 - 5;
    leafInstance.position.y = Math.random() * 10 - 5;
    leafInstance.position.z = Math.random() * 10 - 5;

    // Случайно задаем вращение каждому листу
    leafInstance.rotation.x = Math.random() * 2 * Math.PI;
    leafInstance.rotation.y = Math.random() * 2 * Math.PI;
    leafInstance.rotation.z = Math.random() * 2 * Math.PI;

    // Добавляем лист в сцену
    scene.add(leafInstance);

    // Добавляем лист в массив
    leafInstances.push(leafInstance);
  }

  // Определяем функцию анимации
  function animate() {
    requestAnimationFrame(animate);

    // Вращаем каждый экземпляр осеннего листа
    leafInstances.forEach(leafInstance => {
      leafInstance.rotation.x += 0.01;
      leafInstance.rotation.y += 0.01;
      leafInstance.rotation.z += 0.01;
    });

    // Рендерим сцену
    renderer.render(scene, camera);
  }

  // Вызываем функцию анимации
  animate();
});

// Обновляем размеры сцены при изменении размера окна
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
