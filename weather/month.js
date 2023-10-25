import * as THREE from 'three';
        import { OrbitControls } from 'OrbitControls';
        import { GLTFLoader } from 'GLTFLoader';
        import { RectAreaLightHelper } from 'RectAreaLightHelper'
        import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';
        function init() {
            let container = document.querySelector('.rain-container');
            let models = [];
        
            let modelSize = 2;
        
            const scene = new THREE.Scene();
            scene.background = null;
        
            // Camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
            camera.position.set(0, 0.5, 1);
        
            // Renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
        
            // Plane
            let plane;
            {
                plane = new THREE.Mesh(
                    new THREE.PlaneGeometry(3840 , 2160),
                    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
                );
                plane.receiveShadow = true;
                plane.position.set(0, -1, 0);
                plane.rotateX(-Math.PI / 2);
                scene.add(plane);
            }
        
            // Model
            {
                for (let i = 0; i < 200; i++) {
                    const loader = new GLTFLoader();
                    loader.load('./model/scene.gltf', gltfResult => {
                        const model = gltfResult.scene;
        
                        model.position.set(
                            Math.random() * 20 - 10,
                            10,
                            Math.random() * 20 - 10
                        );
        
                        models.push(model);
        
                        scene.add(model);
                    });
                }
            }
        
            // Lights
            const light1 = new THREE.DirectionalLight(0xffffff, 1);
            light1.position.set(-2, 0, 10);
            light1.lookAt(0, -1, 0);
            scene.add(light1);
        
            const light2 = new THREE.DirectionalLight(0xffffff, 1);
            light2.position.set(2, 0, 5);
            light2.lookAt(0, 1, 0);
            scene.add(light2);
        
            // RectAreaLights
            RectAreaLightUniformsLib.init();
            const rectLight1 = new THREE.RectAreaLight(0xffffff, 1, 100, 100);
            rectLight1.position.set(-10, 0, 0);
            rectLight1.rotation.y = Math.PI + Math.PI / 4;
            scene.add(rectLight1);
        
            const rectLight2 = new THREE.RectAreaLight(0xffffff, 1, 100, 100);
            rectLight2.position.set(10, 0, 0);
            rectLight2.rotation.y = Math.PI - Math.PI / 4;
            scene.add(rectLight2);
        
            // OrbitControls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;
            controls.autoRotateSpeed = 2.5;
            controls.enableDamping = true;
        
            // Resize
            window.addEventListener('resize', onWindowResize, false);
        
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
        
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        
            // Animate
            function animate() {
                requestAnimationFrame(animate);
            
                
                models.forEach((model) => {
                    model.position.y -= Math.random() * 0.08 * modelSize;
                    model.scale.set(modelSize, modelSize, modelSize);
            
                    if (model.position.y <= -10) {
                        model.position.set(
                            Math.random() * 20 - 10,
                            10,
                            Math.random() * 20 - 10
                        );
                    }
                });
            
                controls.update();
                renderer.render(scene, camera);
            }
        
            animate();
        }
        
        init();
