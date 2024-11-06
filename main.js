//cube

/*import * as THREE from 'three';*/
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//const geometry = new THREE.BoxGeometry(1, 1, 1);
//const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

//camera.position.z = 5;

//function animate() {

//	cube.rotation.x += 0.01;
//	cube.rotation.y += 0.01;

//	renderer.render(scene, camera);
//}

//renderer.setAnimationLoop(animate);









//essaie modèle 3d

//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//let mesh;

//const loader = new STLLoader();
//loader.load('model_stl/corner.stl', function (geometry) {
//    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//    mesh = new THREE.Mesh(geometry, material);
//    mesh.scale.set(1, 1, 1);
//    scene.add(mesh);
//});

//const light = new THREE.AmbientLight(0xffffff);
//scene.add(light);

//camera.position.set(0, 0, 20);
//camera.lookAt(0, 0, 0);

//function animate() {
//    if (mesh) {
//        mesh.rotation.x += 0.001;
//    }
//    renderer.render(scene, camera);
//}

//renderer.setAnimationLoop(animate);












// essaie lumière

//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//let mesh;

//const loader = new STLLoader();
//loader.load('model_stl/corner.stl', function (geometry) {
//    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 });
//    mesh = new THREE.Mesh(geometry, material);
//    mesh.scale.set(1, 1, 1);
//    scene.add(mesh);
//});

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//directionalLight.position.set(10, 10, 10);
//scene.add(directionalLight);

//const specularLight = new THREE.DirectionalLight(0xffffff, 1);
//specularLight.position.set(-10, -10, -10);
//scene.add(specularLight);

//camera.position.set(0, 0, 20);
//camera.lookAt(0, 0, 0);

//function animate() {
//    if (mesh) {
//        mesh.rotation.x += 0.001;
//        mesh.rotation.y += 0.001;
//    }
//    renderer.render(scene, camera);
//}

//renderer.setAnimationLoop(animate);














//essaie mouvement

//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//let mesh;

//const loader = new STLLoader();
//loader.load('model_stl/corner.stl', function (geometry) {
//    const material = new THREE.MeshPhongMaterial({
//        color: 0x00ff00,
//        shininess: 100,
//        specular: 0xffffff,
//    });

//    mesh = new THREE.Mesh(geometry, material);
//    mesh.scale.set(1, 1, 1);
//    scene.add(mesh);
//});

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//directionalLight.position.set(10, 10, 10);
//scene.add(directionalLight);

//const specularLight = new THREE.DirectionalLight(0xffffff, 1);
//specularLight.position.set(-10, -10, -10);
//scene.add(specularLight);
//camera.position.set(0, 0, 20);
//camera.lookAt(0, 0, 0);

//const controls = new OrbitControls(camera, renderer.domElement);

//function animate() {
//    controls.update();
//    renderer.render(scene, camera);
//}

//renderer.setAnimationLoop(animate);













//essaie ascii

//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: true });
//effect.setSize(window.innerWidth, window.innerHeight);
//effect.domElement.style.color = 'white';
//effect.domElement.style.backgroundColor = 'black';
//document.body.appendChild(effect.domElement);

//document.body.removeChild(renderer.domElement);

//let mesh;

//const loader = new STLLoader();
//loader.load('model_stl/corner.stl', function (geometry) {
//    const material = new THREE.MeshPhongMaterial({
//        color: 0x00ff00,
//        shininess: 100,
//        specular: 0xffffff,
//    });

//    mesh = new THREE.Mesh(geometry, material);
//    mesh.scale.set(1, 1, 1);
//    scene.add(mesh);
//});

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
//directionalLight.position.set(10, 10, 10);
//scene.add(directionalLight);

//const specularLight = new THREE.DirectionalLight(0xffffff, 20);
//specularLight.position.set(-10, -10, -10);
//scene.add(specularLight);
//camera.position.set(0, 0, 20);
//camera.lookAt(0, 0, 0);

//const controls = new OrbitControls(camera, effect.domElement);

//function animate() {
//    controls.update();
//    effect.render(scene, camera);
//}

//renderer.setAnimationLoop(animate);










//essaie cube

//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//const loader = new STLLoader();

//loader.load('model_stl/corner.stl', function (geometry) {
//    const material = new THREE.MeshPhongMaterial({
//        color: 0x00ff00,
//        shininess: 100,
//        specular: 0xffffff,
//    });

//    const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
//    const size = box.getSize(new THREE.Vector3());
//    const center = box.getCenter(new THREE.Vector3());

//    const cornerSize = 0.5;

//    const positions = [
//        [2, 2, 2],
//        [-2, 2, 2],
//        [2, -2, 2],
//        [-2, -2, 2],
//        [2, 2, -2],
//        [-2, 2, -2],
//        [2, -2, -2],
//        [-2, -2, -2],
//    ].map(pos => pos.map(coord => coord * (cornerSize * Math.max(size.x, size.y, size.z))));

//    positions.forEach(position => {
//        const mesh = new THREE.Mesh(geometry.clone(), material);
//        mesh.scale.set(cornerSize, cornerSize, cornerSize);
//        mesh.position.set(position[0], position[1], position[2]);
//        scene.add(mesh);
//    });
//});

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//directionalLight.position.set(10, 10, 10);
//scene.add(directionalLight);

//const specularLight = new THREE.DirectionalLight(0xffffff, 1);
//specularLight.position.set(-10, -10, -10);
//scene.add(specularLight);
//camera.position.set(0, 0, 20);
//camera.lookAt(0, 0, 0);

//const controls = new OrbitControls(camera, renderer.domElement);

//function animate() {
//    controls.update();
//    renderer.render(scene, camera);
//}

//renderer.setAnimationLoop(animate);










// essaie cube angle

//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//const loader = new STLLoader();

//loader.load('model_stl/corner.stl', function (geometry) {
//    const material = new THREE.MeshPhongMaterial({
//        color: 0x00ff00,
//        shininess: 100,
//        specular: 0xffffff,
//    });

//    const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
//    const size = box.getSize(new THREE.Vector3());
//    const center = box.getCenter(new THREE.Vector3());

//    const cornerSize = 0.5;

//    const positions = [
//        [2, 2, 2],
//        [-2, 2, 2],
//        [2, -2, 2],
//        [-2, -2, 2],
//        [2, 2, -2],
//        [-2, 2, -2],
//        [2, -2, -2],
//        [-2, -2, -2],
//    ].map(pos => pos.map(coord => coord * (cornerSize * Math.max(size.x, size.y, size.z))));

//    positions.forEach(position => {
//        const mesh = new THREE.Mesh(geometry.clone(), material);
//        mesh.scale.set(cornerSize, cornerSize, cornerSize);
//        mesh.position.set(position[0], position[1], position[2]);

//        if (position[1] > 0) {
//            mesh.rotateX(Math.PI / 2);
//        }
//        if (position[0] < 0 && position[2] < 0) {
//            mesh.rotateY(Math.PI);
//        }
//        if (position[0] > 0 && position[2] < 0) {
//            mesh.rotateY(Math.PI/2);

//        }
//        if (position[0] > 0 && position[2] > 0 && position[1] > 0) {
//            mesh.rotateY(Math.PI / 2);
//            mesh.rotateX(-Math.PI / 2);

//        }
//        if (position[0] < 0 && position[2] > 0 && position[1] > 0) {
//            mesh.rotateY(Math.PI / 2);
//            mesh.rotateX(Math.PI);
//        }
//        if (position[0] < 0 && position[2] > 0 && position[1] < 0) {
//            mesh.rotateY(-Math.PI / 2);
//        }

//        scene.add(mesh);
//    });
//});

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//directionalLight.position.set(10, 10, 10);
//scene.add(directionalLight);

//const specularLight = new THREE.DirectionalLight(0xffffff, 1);
//specularLight.position.set(-10, -10, -10);
//scene.add(specularLight);
//camera.position.set(20, 40, 40);
//camera.lookAt(0, 0, 0);

//const controls = new OrbitControls(camera, renderer.domElement);

//function animate() {
//    controls.update();
//    renderer.render(scene, camera);
//}

//renderer.setAnimationLoop(animate);












//essaie baton


//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//function resizeToFit(target, referenceSize, scale = new THREE.Vector3(1, 1, 1)) {
//    const box = new THREE.Box3().setFromObject(target);
//    const size = box.getSize(new THREE.Vector3());
//    scale.multiply(referenceSize.clone().divide(size));
//    target.scale.set(scale.x, scale.y, scale.z);
//}

//const loader = new STLLoader();
//loader.load('model_stl/corner.stl', function (geometry) {
//    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100, specular: 0xffffff });

//    const cornerSize = new THREE.Vector3(1, 1, 1);
//    const positions = [];

//    for (let x = -1; x <= 1; x += 2) {
//        for (let y = -1; y <= 1; y += 2) {
//            for (let z = -1; z <= 1; z += 2) {
//                positions.push([x, y, z]);
//            }
//        }
//    }

//    positions.forEach(position => {
//        const mesh = new THREE.Mesh(geometry.clone(), material);
//        resizeToFit(mesh, cornerSize);
//        mesh.position.set(position[0] * 2, position[1] * 2, position[2] * 2);

//        if (position[1] > 0) {
//            mesh.rotateX(Math.PI / 2);
//        }
//        if (position[0] < 0 && position[2] < 0) {
//            mesh.rotateY(Math.PI);
//        }
//        if (position[0] > 0 && position[2] < 0) {
//            mesh.rotateY(Math.PI/2);

//        }
//        if (position[0] > 0 && position[2] > 0 && position[1] > 0) {
//            mesh.rotateY(Math.PI / 2);
//            mesh.rotateX(-Math.PI / 2);

//        }
//        if (position[0] < 0 && position[2] > 0 && position[1] > 0) {
//            mesh.rotateY(Math.PI / 2);
//            mesh.rotateX(Math.PI);
//        }
//        if (position[0] < 0 && position[2] > 0 && position[1] < 0) {
//            mesh.rotateY(-Math.PI / 2);
//        }
//        scene.add(mesh);
//    });
//});

//loader.load('model_stl/edge.stl', function (geometry) {
//    const material = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100, specular: 0xffffff });

//    const edgeSize = new THREE.Vector3(1, 1, 4);
//    const edgePositions = [
//        // Edge axe X
//        { position: [0, 2, 2], rotation: [0, -Math.PI / 2, Math.PI / 2] },
//        { position: [0, -2, 2], rotation: [0, -Math.PI / 2, 0] },
//        { position: [0, 2, -2], rotation: [0, Math.PI / 2, Math.PI / 2] },
//        { position: [0, -2, -2], rotation: [0, Math.PI / 2, 0] },

//        // Edge axe Y
//        { position: [2, 0, 2], rotation: [Math.PI / 2, 0, Math.PI / 2] },
//        { position: [-2, 0, 2], rotation: [-Math.PI / 2, 0, -Math.PI / 2] },
//        { position: [2, 0, -2], rotation: [-Math.PI / 2, 0, Math.PI / 2] },
//        { position: [-2, 0, -2], rotation: [Math.PI / 2, 0, -Math.PI / 2] },

//        // Edge axe Z
//        { position: [2, 2, 0], rotation: [0, 0, Math.PI / 2] },
//        { position: [-2, 2, 0], rotation: [0, Math.PI, Math.PI / 2] },
//        { position: [2, -2, 0], rotation: [0, Math.PI, -Math.PI / 2] },
//        { position: [-2, -2, 0], rotation: [0, 0, -Math.PI / 2] },
//    ];

//    edgePositions.forEach(data => {
//        const mesh = new THREE.Mesh(geometry.clone(), material);
//        resizeToFit(mesh, edgeSize);
//        mesh.position.set(data.position[0], data.position[1], data.position[2]);
//        mesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
//        scene.add(mesh);
//    });
//});

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//directionalLight.position.set(10, 10, 10);
//scene.add(directionalLight);

//const specularLight = new THREE.DirectionalLight(0xffffff, 1);
//specularLight.position.set(-10, -10, -10);
//scene.add(specularLight);

//camera.position.set(5, 5, 10);
//camera.lookAt(0, 0, 0);

//const controls = new OrbitControls(camera, renderer.domElement);

//function animate() {
//    controls.update();
//    renderer.render(scene, camera);
//}

//renderer.setAnimationLoop(animate);










//essaie resize

//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);


//// Redimensionne le modèle uniformément selon la longueur désirée sur l'axe X
//function resizeToFitX(target, desiredLengthX) {
//    const box = new THREE.Box3().setFromObject(target);
//    const size = box.getSize(new THREE.Vector3());

//    // Calculer le facteur d'échelle basé sur la longueur désirée en X
//    const scaleFactor = desiredLengthX / size.x;

//    // Appliquer l'échelle uniformément
//    target.scale.set(scaleFactor, scaleFactor, scaleFactor);
//}

//// Redimensionne le modèle uniformément selon la longueur désirée sur l'axe Y
//function resizeToFitY(target, desiredLengthY) {
//    const box = new THREE.Box3().setFromObject(target);
//    const size = box.getSize(new THREE.Vector3());

//    // Calculer le facteur d'échelle basé sur la longueur désirée en Y
//    const scaleFactor = desiredLengthY / size.y;

//    // Appliquer l'échelle uniformément
//    target.scale.set(scaleFactor, scaleFactor, scaleFactor);
//}

//// Redimensionne le modèle uniformément selon la longueur désirée sur l'axe Z
//function resizeToFitZ(target, desiredLengthZ) {
//    const box = new THREE.Box3().setFromObject(target);
//    const size = box.getSize(new THREE.Vector3());

//    // Calculer le facteur d'échelle basé sur la longueur désirée en Z
//    const scaleFactor = desiredLengthZ / size.z;

//    // Appliquer l'échelle uniformément
//    target.scale.set(scaleFactor, scaleFactor, scaleFactor);
//}

//const loader = new STLLoader();
//loader.load('model_stl/corner.stl', function (geometry) {
//    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100, specular: 0xffffff });

//    const cornerSize = 1;
//    const positions = [];

//    for (let x = -1; x <= 1; x += 2) {
//        for (let y = -1; y <= 1; y += 2) {
//            for (let z = -1; z <= 1; z += 2) {
//                positions.push([x, y, z]);
//            }
//        }
//    }

//    positions.forEach(position => {
//        const mesh = new THREE.Mesh(geometry.clone(), material);
//        resizeToFitX(mesh, cornerSize);  // Utilise le redimensionnement uniforme en X
//        mesh.position.set(position[0] * 2, position[1] * 2, position[2] * 2);

//        // Gestion des rotations
//        if (position[1] > 0) {
//            mesh.rotateX(Math.PI / 2);
//        }
//        if (position[0] < 0 && position[2] < 0) {
//            mesh.rotateY(Math.PI);
//        }
//        if (position[0] > 0 && position[2] < 0) {
//            mesh.rotateY(Math.PI / 2);
//        }
//        if (position[0] > 0 && position[2] > 0 && position[1] > 0) {
//            mesh.rotateY(Math.PI / 2);
//            mesh.rotateX(-Math.PI / 2);
//        }
//        if (position[0] < 0 && position[2] > 0 && position[1] > 0) {
//            mesh.rotateY(Math.PI / 2);
//            mesh.rotateX(Math.PI);
//        }
//        if (position[0] < 0 && position[2] > 0 && position[1] < 0) {
//            mesh.rotateY(-Math.PI / 2);
//        }
//        scene.add(mesh);
//    });
//});

//loader.load('model_stl/edge.stl', function (geometry) {
//    const material = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100, specular: 0xffffff });

//    const edgeHeight = 1;  // Longueur désirée pour les arêtes
//    const edgePositions = [
//        // Positions et rotations pour chaque arrête
//        { position: [0, 3, 3], rotation: [0, -Math.PI / 2, Math.PI / 2] },
//        { position: [0, -3, 3], rotation: [0, -Math.PI / 2, 0] },
//        { position: [0, 3, -3], rotation: [0, Math.PI / 2, Math.PI / 2] },
//        { position: [0, -3, -3], rotation: [0, Math.PI / 2, 0] },

//        // Axe Y
//        { position: [3, 0, 3], rotation: [Math.PI / 2, 0, Math.PI / 2] },
//        { position: [-3, 0, 3], rotation: [-Math.PI / 2, 0, -Math.PI / 2] },
//        { position: [3, 0, -3], rotation: [-Math.PI / 2, 0, Math.PI / 2] },
//        { position: [-3, 0, -3], rotation: [Math.PI / 2, 0, -Math.PI / 2] },

//        // Axe Z
//        { position: [3, 3, 0], rotation: [0, 0, Math.PI / 2] },
//        { position: [-3, 3, 0], rotation: [0, Math.PI, Math.PI / 2] },
//        { position: [3, -3, 0], rotation: [0, Math.PI, -Math.PI / 2] },
//        { position: [-3, -3, 0], rotation: [0, 0, -Math.PI / 2] },
//    ];

//    edgePositions.forEach(data => {
//        const mesh = new THREE.Mesh(geometry.clone(), material);
//        resizeToFitX(mesh, edgeHeight);  // Utilise le redimensionnement uniforme en Z
//        mesh.position.set(data.position[0], data.position[1], data.position[2]);
//        mesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
//        scene.add(mesh);
//    });
//});

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//directionalLight.position.set(10, 10, 10);
//scene.add(directionalLight);

//const specularLight = new THREE.DirectionalLight(0xffffff, 1);
//specularLight.position.set(-10, -10, -10);
//scene.add(specularLight);

//camera.position.set(5, 5, 10);
//camera.lookAt(0, 0, 0);

//const controls = new OrbitControls(camera, renderer.domElement);

//function animate() {
//    controls.update();
//    renderer.render(scene, camera);
//}

//renderer.setAnimationLoop(animate);












//essaie cube complet + ascii

//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: true });
//effect.setSize(window.innerWidth, window.innerHeight);
//effect.domElement.style.color = 'white';
//effect.domElement.style.backgroundColor = 'black';

//const edgeHeight = 1;
//let edgeLength = 0;

//function resizeToFitX(target, desiredLengthX) {
//    const box = new THREE.Box3().setFromObject(target);
//    const size = box.getSize(new THREE.Vector3());
//    const scaleFactor = desiredLengthX / size.x;
//    target.scale.set(scaleFactor, scaleFactor, scaleFactor);
//}

//const loader = new STLLoader();
//loader.load('model_stl/edge.stl', function (geometry) {
//    const material = new THREE.MeshStandardMaterial({
//        color: 0x0000ff,
//        metalness: 0.8,
//        roughness: 0.3,
//        emissive: 0x000000,
//        envMapIntensity: 1,
//    });

//    const mesh = new THREE.Mesh(geometry.clone(), material);
//    resizeToFitX(mesh, edgeHeight);

//    const box = new THREE.Box3().setFromObject(mesh);
//    edgeLength = box.getSize(new THREE.Vector3()).z;

//    const edgePositions = [
//        // Axe X
//        { position: [0, edgeLength / 2, edgeLength / 2], rotation: [0, -Math.PI / 2, Math.PI / 2] },
//        { position: [0, -edgeLength / 2, edgeLength / 2], rotation: [0, -Math.PI / 2, 0] },
//        { position: [0, edgeLength / 2, -edgeLength / 2], rotation: [0, Math.PI / 2, Math.PI / 2] },
//        { position: [0, -edgeLength / 2, -edgeLength / 2], rotation: [0, Math.PI / 2, 0] },

//        // Axe Y
//        { position: [edgeLength / 2, 0, edgeLength / 2], rotation: [Math.PI / 2, 0, Math.PI / 2] },
//        { position: [-edgeLength / 2, 0, edgeLength / 2], rotation: [-Math.PI / 2, 0, -Math.PI / 2] },
//        { position: [edgeLength / 2, 0, -edgeLength / 2], rotation: [-Math.PI / 2, 0, Math.PI / 2] },
//        { position: [-edgeLength / 2, 0, -edgeLength / 2], rotation: [Math.PI / 2, 0, -Math.PI / 2] },

//        // Axe Z
//        { position: [edgeLength / 2, edgeLength / 2, 0], rotation: [0, 0, Math.PI / 2] },
//        { position: [-edgeLength / 2, edgeLength / 2, 0], rotation: [0, Math.PI, Math.PI / 2] },
//        { position: [edgeLength / 2, -edgeLength / 2, 0], rotation: [0, Math.PI, -Math.PI / 2] },
//        { position: [-edgeLength / 2, -edgeLength / 2, 0], rotation: [0, 0, -Math.PI / 2] },
//    ];

//    edgePositions.forEach(data => {
//        const edgeMesh = new THREE.Mesh(geometry.clone(), material);
//        resizeToFitX(edgeMesh, edgeHeight);
//        edgeMesh.position.set(data.position[0], data.position[1], data.position[2]);
//        edgeMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
//        scene.add(edgeMesh);
//    });

//    loadCorners(edgeLength);
//    loadPlate(edgeLength,edgeHeight);
//});

//function loadCorners(edgeLength) {
//    loader.load('model_stl/corner.stl', function (geometry) {
//        const material = new THREE.MeshStandardMaterial({
//            color: 0x00ff00,
//            metalness: 0.8,
//            roughness: 0.3,
//            emissive: 0x000000,
//        });
//        const cornerSize = 1;

//        const positions = [
//            [-edgeLength / 2, edgeLength / 2, edgeLength / 2],
//            [edgeLength / 2, edgeLength / 2, edgeLength / 2],
//            [-edgeLength / 2, -edgeLength / 2, edgeLength / 2],
//            [edgeLength / 2, -edgeLength / 2, edgeLength / 2],
//            [-edgeLength / 2, edgeLength / 2, -edgeLength / 2],
//            [edgeLength / 2, edgeLength / 2, -edgeLength / 2],
//            [-edgeLength / 2, -edgeLength / 2, -edgeLength / 2],
//            [edgeLength / 2, -edgeLength / 2, -edgeLength / 2],
//        ];

//        positions.forEach(position => {
//            const mesh = new THREE.Mesh(geometry.clone(), material);
//            resizeToFitX(mesh, cornerSize);
//            mesh.position.set(position[0], position[1], position[2]);

//            if (position[1] > 0) {
//                mesh.rotateX(Math.PI / 2);
//            }
//            if (position[0] < 0 && position[2] < 0) {
//                mesh.rotateY(Math.PI);
//            }
//            if (position[0] > 0 && position[2] < 0) {
//                mesh.rotateY(Math.PI / 2);
//            }
//            if (position[0] > 0 && position[2] > 0 && position[1] > 0) {
//                mesh.rotateY(Math.PI / 2);
//                mesh.rotateX(-Math.PI / 2);
//            }
//            if (position[0] < 0 && position[2] > 0 && position[1] > 0) {
//                mesh.rotateY(Math.PI / 2);
//                mesh.rotateX(Math.PI);
//            }
//            if (position[0] < 0 && position[2] > 0 && position[1] < 0) {
//                mesh.rotateY(-Math.PI / 2);
//            }
//            scene.add(mesh);
//        });
//    });
//}

//function loadPlate(edgeLength,edgeHeight) {
//    loader.load('model_stl/plate.stl', function (geometry) {
//        const material = new THREE.MeshStandardMaterial({
//            color: 0xff0000,
//            metalness: 0.8,
//            roughness: 0.3,
//            emissive: 0x000000,
//        });

//        const platePositions = [
//            // Faces avant et arrière
//            { position: [-edgeLength / 2 -edgeHeight/8, -edgeLength / 2 -edgeHeight/8, edgeLength / 2 + edgeHeight/2], rotation: [0, 0, 0] },
//            { position: [edgeLength / 2 + edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2], rotation: [0, Math.PI, 0] },

//            // Faces haut et bas
//            { position: [-edgeLength / 2 - edgeHeight / 8, + edgeLength / 2 + edgeHeight / 2, edgeLength / 2 + edgeHeight / 8], rotation: [-Math.PI/2, 0, 0] },
//            { position: [edgeLength / 2 + edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8], rotation: [Math.PI/2, Math.PI, 0] },

//            // Faces gauche et droite
//            { position: [-edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 8], rotation: [0, Math.PI / 2, 0] },
//            { position: [edgeLength / 2 + edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8], rotation: [0, -Math.PI / 2, 0] },
//        ];

//        platePositions.forEach(data => {
//            const plateMesh = new THREE.Mesh(geometry.clone(), material);

//            resizeToFitX(plateMesh, edgeLength + edgeHeight/4);

//            plateMesh.position.set(data.position[0], data.position[1], data.position[2]);
//            plateMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);

//            scene.add(plateMesh);
//        });
//    });
//}


//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
//directionalLight.position.set(5, 10, 20);
//scene.add(directionalLight);

//const specularLight = new THREE.DirectionalLight(0x00ff00, 20);
//specularLight.position.set(-directionalLight.position);
//scene.add(specularLight);

//let rotateLight = false;
//const radius = 10;
//let angle = 0;

//camera.position.set(5, 5, 10);
//camera.lookAt(0, 0, 0);

//let asciiEnabled = false;
//let controls = new OrbitControls(camera, renderer.domElement);
//controls.mouseButtons.RIGHT = null;

//window.addEventListener('keydown', (event) => {
//    if (event.key === 'e' || event.key === 'E') {
//        asciiEnabled = !asciiEnabled;
//        if (document.body.contains(renderer.domElement)) {
//            document.body.removeChild(renderer.domElement);
//            document.body.appendChild(effect.domElement);
//            controls.dispose();
//            controls = new OrbitControls(camera, effect.domElement);
//            controls.enableDamping = true;
//            controls.screenSpacePanning = false;
//            controls.mouseButtons.RIGHT = null;
//        }
//        else if (document.body.contains(effect.domElement)) {
//            document.body.removeChild(effect.domElement);
//            document.body.appendChild(renderer.domElement);
//            controls.dispose();
//            controls = new OrbitControls(camera, renderer.domElement);
//            controls.enableDamping = true;
//            controls.screenSpacePanning = false;
//            controls.mouseButtons.RIGHT = null;
//        }
//    }
//});

//controls.enableDamping = true;
//controls.screenSpacePanning = false;

//let lightDirection = new THREE.Vector3(1, 1, 1);

//window.addEventListener('keydown', (event) => {
//    const step = 0.5;
//    switch (event.key) {
//        case 'ArrowUp':
//            directionalLight.position.y += step;
//            break;
//        case 'ArrowDown':
//            directionalLight.position.y -= step;
//            break;
//        case 'ArrowLeft':
//            directionalLight.position.x -= step;
//            break;
//        case 'ArrowRight':
//            directionalLight.position.x += step;
//            break;
//        case 'z':
//            directionalLight.position.z -= step;
//            break;
//        case 's':
//            directionalLight.position.z += step;
//            break;
//        case 'l':
//            rotateLight = !rotateLight;
//    }
//});

//function animate() {
//    if (rotateLight) {
//        angle += 0.01;

//        const x = radius * Math.cos(angle);
//        const z = radius * Math.sin(angle);
//        directionalLight.position.set(x, 5, z);
//        directionalLight.lookAt(0, 0, 0);
//    }
//    controls.update();
//    if (asciiEnabled) {
//        effect.render(scene, camera);
//    }
//    else {
//        renderer.render(scene, camera);
//    }
//}

//window.addEventListener('resize', () => {
//    camera.aspect = window.innerWidth / window.innerHeight;
//    camera.updateProjectionMatrix();
//    renderer.setSize(window.innerWidth, window.innerHeight);
//    effect.setSize(window.innerWidth, window.innerHeight);
//});

//renderer.setAnimationLoop(animate);








//essaie orthographique

//import * as THREE from 'three';
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

//const aspectRatio = window.innerWidth / window.innerHeight;
//const scene = new THREE.Scene();
//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//// Caméra perspective
//const perspectiveCamera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
//perspectiveCamera.position.set(5, 5, 10);
//perspectiveCamera.lookAt(0, 0, 0);

//// Caméra orthographique
//const orthoSize = 10;
//const orthoCamera = new THREE.OrthographicCamera(
//    -orthoSize * aspectRatio,
//    orthoSize * aspectRatio,
//    orthoSize,
//    -orthoSize,
//    0.1,
//    1000
//);
//orthoCamera.position.set(5, 5, 10);
//orthoCamera.lookAt(0, 0, 0);

//let currentCamera = perspectiveCamera;

//const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: true });
//effect.setSize(window.innerWidth, window.innerHeight);
//effect.domElement.style.color = 'white';
//effect.domElement.style.backgroundColor = 'black';
//renderer.setClearColor(0xB3B3B3);

//const edgeHeight = 1;
//let edgeLength = 0;
//function resizeToFitX(target, desiredLengthX) {
//    const box = new THREE.Box3().setFromObject(target);
//    const size = box.getSize(new THREE.Vector3());
//    const scaleFactor = desiredLengthX / size.x;
//    target.scale.set(scaleFactor, scaleFactor, scaleFactor);
//}

//let isExploded = false;
//let explodeDistance = 2;
//let explosionSpeed = 0.05;
//let targetPositions = new Map();

//function explodeModel() {
//    const center = new THREE.Vector3(0, 0, 0);
//    scene.traverse((object) => {
//        if (object.isMesh && object.position) {
//            if (!object.initialPosition) {
//                object.initialPosition = object.position.clone();
//            }
//            console.log("Nom de l'objet :", object.name);
//            console.log("Position de l'objet :", object.position);
//            let direction;

//            if (!isExploded) {
//                if (object.name === "plate_front" || object.name === "plate_back") {
//                    direction = new THREE.Vector3(0, 0, Math.sign(object.position.z));
//                } else if (object.name === "plate_left" || object.name === "plate_right") {
//                    direction = new THREE.Vector3(Math.sign(object.position.x), 0, 0);
//                } else if (object.name === "plate_top" || object.name === "plate_bot") {
//                    direction = new THREE.Vector3(0, Math.sign(object.position.y), 0);
//                } else {
//                    direction = object.position.clone().sub(center).normalize();
//                }

//                const targetPosition = object.initialPosition.clone().add(direction.multiplyScalar(explodeDistance));
//                targetPositions.set(object, targetPosition);
//            } else {
//                targetPositions.set(object, object.initialPosition);
//            }
//        }
//    });
//    isExploded = !isExploded;
//}

//function updatePositions() {
//    targetPositions.forEach((target, object) => {
//        object.position.lerp(target, explosionSpeed);
//    });
//}

//const loader = new STLLoader();
//loader.load('model_stl/edge.stl', function (geometry) {
//    const material = new THREE.MeshStandardMaterial({
//        color: 0x0000ff,
//        metalness: 0.8,
//        roughness: 0.3,
//        emissive: 0x000000,
//        envMapIntensity: 1,
//    });

//    const mesh = new THREE.Mesh(geometry.clone(), material);
//    resizeToFitX(mesh, edgeHeight);

//    const box = new THREE.Box3().setFromObject(mesh);
//    edgeLength = box.getSize(new THREE.Vector3()).z;

//    const edgePositions = [
//        // Axe X
//        { name: "edge_X1", position: [0, edgeLength / 2, edgeLength / 2], rotation: [0, -Math.PI / 2, Math.PI / 2] },
//        { name: "edge_X2", position: [0, -edgeLength / 2, edgeLength / 2], rotation: [0, -Math.PI / 2, 0] },
//        { name: "edge_X3", position: [0, edgeLength / 2, -edgeLength / 2], rotation: [0, Math.PI / 2, Math.PI / 2] },
//        { name: "edge_X4", position: [0, -edgeLength / 2, -edgeLength / 2], rotation: [0, Math.PI / 2, 0] },

//        // Axe Y
//        { name: "edge_Y1", position: [edgeLength / 2, 0, edgeLength / 2], rotation: [Math.PI / 2, 0, Math.PI / 2] },
//        { name: "edge_Y2", position: [-edgeLength / 2, 0, edgeLength / 2], rotation: [-Math.PI / 2, 0, -Math.PI / 2] },
//        { name: "edge_Y3", position: [edgeLength / 2, 0, -edgeLength / 2], rotation: [-Math.PI / 2, 0, Math.PI / 2] },
//        { name: "edge_Y4", position: [-edgeLength / 2, 0, -edgeLength / 2], rotation: [Math.PI / 2, 0, -Math.PI / 2] },

//        // Axe Z
//        { name: "edge_Z1", position: [edgeLength / 2, edgeLength / 2, 0], rotation: [0, 0, Math.PI / 2] },
//        { name: "edge_Z2", position: [-edgeLength / 2, edgeLength / 2, 0], rotation: [0, Math.PI, Math.PI / 2] },
//        { name: "edge_Z3", position: [edgeLength / 2, -edgeLength / 2, 0], rotation: [0, Math.PI, -Math.PI / 2] },
//        { name: "edge_Z4", position: [-edgeLength / 2, -edgeLength / 2, 0], rotation: [0, 0, -Math.PI / 2] },
//    ];

//    edgePositions.forEach(data => {
//        const edgeMesh = new THREE.Mesh(geometry.clone(), material);
//        edgeMesh.name = data.name;
//        resizeToFitX(edgeMesh, edgeHeight);
//        edgeMesh.position.set(data.position[0], data.position[1], data.position[2]);
//        edgeMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
//        scene.add(edgeMesh);
//    });

//    loadCorners(edgeLength);
//    loadPlate(edgeLength, edgeHeight);
//});

//function loadCorners(edgeLength) {
//    loader.load('model_stl/corner.stl', function (geometry) {
//        const material = new THREE.MeshStandardMaterial({
//            color: 0x00ff00,
//            metalness: 0.8,
//            roughness: 0.3,
//            emissive: 0x000000,
//        });
//        const cornerSize = 1;

//        const positions = [
//            { name: "corner_1", position: [-edgeLength / 2, edgeLength / 2, edgeLength / 2]},
//            { name: "corner_2", position: [edgeLength / 2, edgeLength / 2, edgeLength / 2]},
//            { name: "corner_3", position: [-edgeLength / 2, -edgeLength / 2, edgeLength / 2]},
//            { name: "corner_4", position: [edgeLength / 2, -edgeLength / 2, edgeLength / 2]},
//            { name: "corner_5", position: [-edgeLength / 2, edgeLength / 2, -edgeLength / 2]},
//            { name: "corner_6", position: [edgeLength / 2, edgeLength / 2, -edgeLength / 2]},
//            { name: "corner_7", position: [-edgeLength / 2, -edgeLength / 2, -edgeLength / 2]},
//            { name: "corner_8", position: [edgeLength / 2, -edgeLength / 2, -edgeLength / 2]},
//        ];

//        positions.forEach(data => {
//            const mesh = new THREE.Mesh(geometry.clone(), material);
//            mesh.name = data.name;
//            resizeToFitX(mesh, cornerSize);
//            mesh.position.set(data.position[0], data.position[1], data.position[2]);

//            if (data.position[1] > 0) {
//                mesh.rotateX(Math.PI / 2);
//            }
//            if (data.position[0] < 0 && data.position[2] < 0) {
//                mesh.rotateY(Math.PI);
//            }
//            if (data.position[0] > 0 && data.position[2] < 0) {
//                mesh.rotateY(Math.PI / 2);
//            }
//            if (data.position[0] > 0 && data.position[2] > 0 && data.position[1] > 0) {
//                mesh.rotateY(Math.PI / 2);
//                mesh.rotateX(-Math.PI / 2);
//            }
//            if (data.position[0] < 0 && data.position[2] > 0 && data.position[1] > 0) {
//                mesh.rotateY(Math.PI / 2);
//                mesh.rotateX(Math.PI);
//            }
//            if (data.position[0] < 0 && data.position[2] > 0 && data.position[1] < 0) {
//                mesh.rotateY(-Math.PI / 2);
//            }
//            scene.add(mesh);
//        });
//    });
//}

//function loadPlate(edgeLength, edgeHeight) {
//    loader.load('model_stl/plate.stl', function (geometry) {
//        const material = new THREE.MeshStandardMaterial({
//            color: 0xff0000,
//            metalness: 0.8,
//            roughness: 0.3,
//            emissive: 0x000000,
//        });

//        const platePositions = [
//            // Faces avant et arrière
//            { name: "plate_front", position: [-edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 2], rotation: [0, 0, 0] },
//            { name: "plate_back", position: [edgeLength / 2 + edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2], rotation: [0, Math.PI, 0] },

//            // Faces haut et bas
//            { name: "plate_top", position: [-edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 2, edgeLength / 2 + edgeHeight / 8], rotation: [-Math.PI / 2, 0, 0] },
//            { name: "plate_bot", position: [edgeLength / 2 + edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8], rotation: [Math.PI / 2, Math.PI, 0] },

//            // Faces gauche et droite
//            { name: "plate_left", position: [-edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 8], rotation: [0, Math.PI / 2, 0] },
//            { name: "plate_right", position: [edgeLength / 2 + edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8], rotation: [0, -Math.PI / 2, 0] },

//        ];

//        platePositions.forEach(data => {
//            const plateMesh = new THREE.Mesh(geometry.clone(), material);
//            plateMesh.name = data.name;
//            resizeToFitX(plateMesh, edgeLength + edgeHeight / 4);
//            plateMesh.position.set(data.position[0], data.position[1], data.position[2]);
//            plateMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
//            scene.add(plateMesh);
//        });
//        createKeysForPlates();
//    });
//}

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
//directionalLight.position.set(5, 10, 20);
//scene.add(directionalLight);

//const specularLight = new THREE.DirectionalLight(0xffffff, 10);
//specularLight.position.set(-directionalLight.position.x, -directionalLight.position.y, -directionalLight.position.z);
//scene.add(specularLight);

//let rotateLight = false;
//const radius = 10;
//let angle = 0;

//currentCamera.position.set(5, 5, 10);
//currentCamera.lookAt(0, 0, 0);

//let asciiEnabled = false;
//let controls = new OrbitControls(currentCamera, renderer.domElement);
//controls.mouseButtons.RIGHT = null;
//controls.enableZoom = false;
//controls.enableDamping = true;
//controls.screenSpacePanning = false;
//controls.enablePan = false;

//window.addEventListener('keydown', (event) => {
//    const step = 0.5;
//    switch (event.key) {
//        case 'o':
//        case 'O':
//            currentCamera = currentCamera === perspectiveCamera ? orthoCamera : perspectiveCamera;
//            controls.dispose();
//            controls = new OrbitControls(currentCamera, renderer.domElement);
//            controls.enableDamping = true;
//            controls.screenSpacePanning = false;
//            controls.mouseButtons.RIGHT = null;
//            controls.enableZoom = false;
//            controls.enablePan = false;
//            break;
//        case 'e':
//        case 'E':
//            asciiEnabled = !asciiEnabled;
//            if (document.body.contains(renderer.domElement)) {
//                document.body.removeChild(renderer.domElement);
//                document.body.appendChild(effect.domElement);
//                controls.dispose();
//                controls = new OrbitControls(currentCamera, effect.domElement);
//                controls.enableDamping = true;
//                controls.screenSpacePanning = false;
//                controls.mouseButtons.RIGHT = null;
//                controls.enableZoom = false;
//                controls.enablePan = false;
//            }
//            else if (document.body.contains(effect.domElement)) {
//                document.body.removeChild(effect.domElement);
//                document.body.appendChild(renderer.domElement);
//                controls.dispose();
//                controls = new OrbitControls(currentCamera, renderer.domElement);
//                controls.enableDamping = true;
//                controls.screenSpacePanning = false;
//                controls.mouseButtons.RIGHT = null;
//                controls.enableZoom = false;
//                controls.enablePan = false;
//            }
//            break;
//        case 'a':
//        case 'A':
//            explodeModel(2);
//            break;
//        case 'ArrowUp':
//            directionalLight.position.y += step;
//            break;
//        case 'ArrowDown':
//            directionalLight.position.y -= step;
//            break;
//        case 'ArrowLeft':
//            directionalLight.position.x -= step;
//            break;
//        case 'ArrowRight':
//            directionalLight.position.x += step;
//            break;
//        case 'z':
//            directionalLight.position.z -= step;
//            break;
//        case 's':
//            directionalLight.position.z += step;
//            break;
//        case 'l':
//            rotateLight = !rotateLight;
//            break;
//    }
//});

//function animate() {
//    if (currentCamera === perspectiveCamera) {
//        orthoCamera.position.copy(perspectiveCamera.position);
//        orthoCamera.rotation.copy(perspectiveCamera.rotation);
//    }
//    updatePositions();
//    if (rotateLight) {
//        angle += 0.01;

//        const x = radius * Math.cos(angle);
//        const z = radius * Math.sin(angle);
//        directionalLight.position.set(x, 5, z);
//        directionalLight.lookAt(0, 0, 0);
//    }
//    controls.update();
//    if (asciiEnabled) {
//        effect.render(scene, currentCamera);
//    }
//    else {
//        renderer.render(scene, currentCamera);
//    }
//}

//window.addEventListener('resize', () => {
//    const aspect = window.innerWidth / window.innerHeight;
//    perspectiveCamera.aspect = aspect;
//    perspectiveCamera.updateProjectionMatrix();

//    orthoCamera.left = -orthoSize * aspect;
//    orthoCamera.right = orthoSize * aspect;
//    orthoCamera.top = orthoSize;
//    orthoCamera.bottom = -orthoSize;
//    orthoCamera.updateProjectionMatrix();

//    renderer.setSize(window.innerWidth, window.innerHeight);
//    effect.setSize(window.innerWidth, window.innerHeight);
//});

//renderer.setAnimationLoop(animate);



// test touche


import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

const aspectRatio = window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Caméra perspective
const perspectiveCamera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
perspectiveCamera.position.set(5, 5, 10);
perspectiveCamera.lookAt(0, 0, 0);

// Caméra orthographique
const orthoSize = 10;
const orthoCamera = new THREE.OrthographicCamera(
    -orthoSize * aspectRatio,
    orthoSize * aspectRatio,
    orthoSize,
    -orthoSize,
    0.1,
    1000
);
orthoCamera.position.set(5, 5, 10);
orthoCamera.lookAt(0, 0, 0);

let currentCamera = perspectiveCamera;

const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: true });
effect.setSize(window.innerWidth, window.innerHeight);
effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';
renderer.setClearColor(0xB3B3B3);

const edgeHeight = 1;
let edgeLength = 0;
function resizeToFitX(target, desiredLengthX) {
    const box = new THREE.Box3().setFromObject(target);
    const size = box.getSize(new THREE.Vector3());
    const scaleFactor = desiredLengthX / size.x;
    target.scale.set(scaleFactor, scaleFactor, scaleFactor);
}

let isExploded = false;
let explodeDistance = 2;
let explosionSpeed = 0.05;
let targetPositions = new Map();

function explodeModel() {
    const center = new THREE.Vector3(0, 0, 0);
    scene.traverse((object) => {
        if (object.isMesh && object.position) {
            if (!object.initialPosition) {
                object.initialPosition = object.position.clone();
            }
            console.log("Nom de l'objet :", object.name);
            console.log("Position de l'objet :", object.position);
            let direction;

            if (!isExploded) {
                if (object.name === "plate_front" || object.name === "plate_back") {
                    direction = new THREE.Vector3(0, 0, Math.sign(object.position.z));
                } else if (object.name === "plate_left" || object.name === "plate_right") {
                    direction = new THREE.Vector3(Math.sign(object.position.x), 0, 0);
                } else if (object.name === "plate_top" || object.name === "plate_bot") {
                    direction = new THREE.Vector3(0, Math.sign(object.position.y), 0);
                } else {
                    direction = object.position.clone().sub(center).normalize();
                }

                const targetPosition = object.initialPosition.clone().add(direction.multiplyScalar(explodeDistance));
                targetPositions.set(object, targetPosition);
            } else {
                targetPositions.set(object, object.initialPosition);
            }
        }
    });
    isExploded = !isExploded;
}


const keyMapping = {
    '1': 'a', '2': 'z', '3': 'e', '4': 'r',
    '5': 't', '6': 'y', '7': 'u', '8': 'i',
    '9': 'o', '10': 'p', '11': 'q', '12': 's',
    '13': 'd', '14': 'f', '15': 'g', '16': 'h'
};
const keys = [];
const touchLights = [];

function createKeysForPlates() {
    const keyMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff,
        transparent: true,
        opacity: 0.75
    });

    const lightIntensity = 2;

    scene.traverse((object) => {
        if (object.name.startsWith("plate_") && object.name!=("plate_bot")) {
            const plateWidth = edgeLength;
            const spacing = plateWidth / 4;

            let keyIndex = 1;
            const plateName = object.name.split('_')[1];

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    const keyGeometry = new THREE.BoxGeometry(spacing / 2, spacing / 2, spacing);
                    const key = new THREE.Mesh(keyGeometry, keyMaterial);

                    if (plateName === "front" || plateName === "back") {
                        key.position.set(
                            i * spacing - (plateWidth / 2 - spacing / 2),
                            j * spacing - (plateWidth / 2 - spacing / 2),
                            object.position.z
                        );
                    } else if (plateName === "top") {
                        key.position.set(
                            i * spacing - (plateWidth / 2 - spacing / 2),
                            object.position.y,
                            j * spacing - (plateWidth / 2 - spacing / 2)
                        );
                        key.rotation.set(Math.PI / 2, 0, 0);
                    } else if (plateName === "left" || plateName === "right") {
                        key.position.set(
                            object.position.x,
                            i * spacing - (plateWidth / 2 - spacing / 2),
                            j * spacing - (plateWidth / 2 - spacing / 2)
                        );
                        key.rotation.set(0, Math.PI / 2, 0);
                    }

                    key.name = `${plateName}_key_${keyIndex}`;
                    keys.push(key);
                    scene.add(key);

                    const light = new THREE.PointLight(0x00ff00, lightIntensity, 5);
                    light.position.set(key.position.x, key.position.y, key.position.z - 0.3);
                    touchLights.push(light);
                    scene.add(light);

                    keyIndex++;
                }
            }
        }
    });
}

function updatePositions() {
    targetPositions.forEach((target, object) => {
        object.position.lerp(target, explosionSpeed);
    });
}

const loader = new STLLoader();
loader.load('model_stl/edge.stl', function (geometry) {
    const material = new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        metalness: 0.8,
        roughness: 0.3,
        emissive: 0x000000,
        envMapIntensity: 1,
    });

    const mesh = new THREE.Mesh(geometry.clone(), material);
    resizeToFitX(mesh, edgeHeight);

    const box = new THREE.Box3().setFromObject(mesh);
    edgeLength = box.getSize(new THREE.Vector3()).z;

    const edgePositions = [
        // Axe X
        { name: "edge_X1", position: [0, edgeLength / 2, edgeLength / 2], rotation: [0, -Math.PI / 2, Math.PI / 2] },
        { name: "edge_X2", position: [0, -edgeLength / 2, edgeLength / 2], rotation: [0, -Math.PI / 2, 0] },
        { name: "edge_X3", position: [0, edgeLength / 2, -edgeLength / 2], rotation: [0, Math.PI / 2, Math.PI / 2] },
        { name: "edge_X4", position: [0, -edgeLength / 2, -edgeLength / 2], rotation: [0, Math.PI / 2, 0] },

        // Axe Y
        { name: "edge_Y1", position: [edgeLength / 2, 0, edgeLength / 2], rotation: [Math.PI / 2, 0, Math.PI / 2] },
        { name: "edge_Y2", position: [-edgeLength / 2, 0, edgeLength / 2], rotation: [-Math.PI / 2, 0, -Math.PI / 2] },
        { name: "edge_Y3", position: [edgeLength / 2, 0, -edgeLength / 2], rotation: [-Math.PI / 2, 0, Math.PI / 2] },
        { name: "edge_Y4", position: [-edgeLength / 2, 0, -edgeLength / 2], rotation: [Math.PI / 2, 0, -Math.PI / 2] },

        // Axe Z
        { name: "edge_Z1", position: [edgeLength / 2, edgeLength / 2, 0], rotation: [0, 0, Math.PI / 2] },
        { name: "edge_Z2", position: [-edgeLength / 2, edgeLength / 2, 0], rotation: [0, Math.PI, Math.PI / 2] },
        { name: "edge_Z3", position: [edgeLength / 2, -edgeLength / 2, 0], rotation: [0, Math.PI, -Math.PI / 2] },
        { name: "edge_Z4", position: [-edgeLength / 2, -edgeLength / 2, 0], rotation: [0, 0, -Math.PI / 2] },
    ];

    edgePositions.forEach(data => {
        const edgeMesh = new THREE.Mesh(geometry.clone(), material);
        edgeMesh.name = data.name;
        resizeToFitX(edgeMesh, edgeHeight);
        edgeMesh.position.set(data.position[0], data.position[1], data.position[2]);
        edgeMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
        scene.add(edgeMesh);
    });

    loadCorners(edgeLength);
    loadPlate(edgeLength, edgeHeight);
});

function loadCorners(edgeLength) {
    loader.load('model_stl/corner.stl', function (geometry) {
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            metalness: 0.8,
            roughness: 0.3,
            emissive: 0x000000,
        });
        const cornerSize = 1;

        const positions = [
            { name: "corner_1", position: [-edgeLength / 2, edgeLength / 2, edgeLength / 2]},
            { name: "corner_2", position: [edgeLength / 2, edgeLength / 2, edgeLength / 2]},
            { name: "corner_3", position: [-edgeLength / 2, -edgeLength / 2, edgeLength / 2]},
            { name: "corner_4", position: [edgeLength / 2, -edgeLength / 2, edgeLength / 2]},
            { name: "corner_5", position: [-edgeLength / 2, edgeLength / 2, -edgeLength / 2]},
            { name: "corner_6", position: [edgeLength / 2, edgeLength / 2, -edgeLength / 2]},
            { name: "corner_7", position: [-edgeLength / 2, -edgeLength / 2, -edgeLength / 2]},
            { name: "corner_8", position: [edgeLength / 2, -edgeLength / 2, -edgeLength / 2]},
        ];

        positions.forEach(data => {
            const mesh = new THREE.Mesh(geometry.clone(), material);
            mesh.name = data.name;
            resizeToFitX(mesh, cornerSize);
            mesh.position.set(data.position[0], data.position[1], data.position[2]);

            if (data.position[1] > 0) {
                mesh.rotateX(Math.PI / 2);
            }
            if (data.position[0] < 0 && data.position[2] < 0) {
                mesh.rotateY(Math.PI);
            }
            if (data.position[0] > 0 && data.position[2] < 0) {
                mesh.rotateY(Math.PI / 2);
            }
            if (data.position[0] > 0 && data.position[2] > 0 && data.position[1] > 0) {
                mesh.rotateY(Math.PI / 2);
                mesh.rotateX(-Math.PI / 2);
            }
            if (data.position[0] < 0 && data.position[2] > 0 && data.position[1] > 0) {
                mesh.rotateY(Math.PI / 2);
                mesh.rotateX(Math.PI);
            }
            if (data.position[0] < 0 && data.position[2] > 0 && data.position[1] < 0) {
                mesh.rotateY(-Math.PI / 2);
            }
            scene.add(mesh);
        });
    });
}

function loadPlate(edgeLength, edgeHeight) {
    loader.load('model_stl/plate.stl', function (geometry) {
        const material = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            metalness: 0.8,
            roughness: 0.3,
            emissive: 0x000000,
        });

        const platePositions = [
            // Faces avant et arrière
            { name: "plate_front", position: [-edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 2], rotation: [0, 0, 0] },
            { name: "plate_back", position: [edgeLength / 2 + edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2], rotation: [0, Math.PI, 0] },

            // Faces haut et bas
            { name: "plate_top", position: [-edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 2, edgeLength / 2 + edgeHeight / 8], rotation: [-Math.PI / 2, 0, 0] },
            { name: "plate_bot", position: [edgeLength / 2 + edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8], rotation: [Math.PI / 2, Math.PI, 0] },

            // Faces gauche et droite
            { name: "plate_left", position: [-edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 8], rotation: [0, Math.PI / 2, 0] },
            { name: "plate_right", position: [edgeLength / 2 + edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8], rotation: [0, -Math.PI / 2, 0] },

        ];

        platePositions.forEach(data => {
            const plateMesh = new THREE.Mesh(geometry.clone(), material);
            plateMesh.name = data.name;
            resizeToFitX(plateMesh, edgeLength + edgeHeight / 4);
            plateMesh.position.set(data.position[0], data.position[1], data.position[2]);
            plateMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
            scene.add(plateMesh);
        });
        createKeysForPlates();
    });
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(5, 10, 20);
scene.add(directionalLight);

const specularLight = new THREE.DirectionalLight(0xffffff, 10);
specularLight.position.set(-directionalLight.position.x, -directionalLight.position.y, -directionalLight.position.z);
scene.add(specularLight);

let rotateLight = false;
const radius = 10;
let angle = 0;

currentCamera.position.set(5, 5, 10);
currentCamera.lookAt(0, 0, 0);

let asciiEnabled = false;
let controls = new OrbitControls(currentCamera, renderer.domElement);
controls.mouseButtons.RIGHT = null;
controls.enableZoom = false;
controls.enableDamping = true;
controls.screenSpacePanning = false;
controls.enablePan = false;


let tapping = false;
window.addEventListener('keydown', (event) => {
    const step = 0.5;
    if (tapping === false) {
        switch (event.key) {
            case 'o':
            case 'O':
                currentCamera = currentCamera === perspectiveCamera ? orthoCamera : perspectiveCamera;
                controls.dispose();
                controls = new OrbitControls(currentCamera, renderer.domElement);
                controls.enableDamping = true;
                controls.screenSpacePanning = false;
                controls.mouseButtons.RIGHT = null;
                controls.enableZoom = false;
                controls.enablePan = false;
                break;
            case 'e':
            case 'E':
                asciiEnabled = !asciiEnabled;
                if (document.body.contains(renderer.domElement)) {
                    document.body.removeChild(renderer.domElement);
                    document.body.appendChild(effect.domElement);
                    controls.dispose();
                    controls = new OrbitControls(currentCamera, effect.domElement);
                    controls.enableDamping = true;
                    controls.screenSpacePanning = false;
                    controls.mouseButtons.RIGHT = null;
                    controls.enableZoom = false;
                    controls.enablePan = false;
                }
                else if (document.body.contains(effect.domElement)) {
                    document.body.removeChild(effect.domElement);
                    document.body.appendChild(renderer.domElement);
                    controls.dispose();
                    controls = new OrbitControls(currentCamera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.screenSpacePanning = false;
                    controls.mouseButtons.RIGHT = null;
                    controls.enableZoom = false;
                    controls.enablePan = false;
                }
                break;
            case 'a':
            case 'A':
                explodeModel(2);
                break;
            case 'ArrowUp':
                directionalLight.position.y += step;
                break;
            case 'ArrowDown':
                directionalLight.position.y -= step;
                break;
            case 'ArrowLeft':
                directionalLight.position.x -= step;
                break;
            case 'ArrowRight':
                directionalLight.position.x += step;
                break;
            case 'z':
                directionalLight.position.z -= step;
                break;
            case 's':
                directionalLight.position.z += step;
                break;
            case 'l':
                rotateLight = !rotateLight;
                break;
        }
    }
    if (event.key == '²') {
        console.log("Tapping");
        tapping = !tapping;
    }
});

const pressedKeys = new Map();
const keysInMotion = new Set();

window.addEventListener('keydown', (event) => {
    if (tapping === true) {
        const pressedKey = event.key.toLowerCase();

        if (keysInMotion.has(pressedKey)) return;

        for (let [index, keyObject] of keys.entries()) {
            if (keyMapping[index + 1] === pressedKey) {
                console.log('Touche pressée :', pressedKey);

                if (!pressedKeys.has(pressedKey)) {
                    pressedKeys.set(pressedKey, keyObject.position.clone());
                }

                let moveDirection = new THREE.Vector3(0, 0, 0);

                if (keyObject.name.startsWith("front")) {
                    moveDirection = new THREE.Vector3(0, 0, -0.1);
                } else if (keyObject.name.startsWith("back")) {
                    moveDirection = new THREE.Vector3(0, 0, 0.1);
                } else if (keyObject.name.startsWith("top")) {
                    moveDirection = new THREE.Vector3(0, -0.1, 0);
                } else if (keyObject.name.startsWith("left") || keyObject.name.startsWith("right")) {
                    moveDirection = new THREE.Vector3(keyObject.name.startsWith("left") ? 0.1 : -0.1, 0, 0);
                }

                keyObject.position.add(moveDirection);

                keysInMotion.add(pressedKey);
            }
        }
    }
});

window.addEventListener('keyup', (event) => {
    if (tapping === true) {
        const releasedKey = event.key.toLowerCase();

        if (pressedKeys.has(releasedKey)) {
            for (let [index, keyObject] of keys.entries()) {
                if (keyMapping[index + 1] === releasedKey) {
                    const originalPosition = pressedKeys.get(releasedKey);

                    keyObject.position.lerp(originalPosition, 1);

                    keysInMotion.delete(releasedKey);
                    pressedKeys.delete(releasedKey);
                    console.log('Touche relâchée, position réinitialisée :', releasedKey);
                    break;
                }
            }
        }
    }
});




function animate() {
    if (currentCamera === perspectiveCamera) {
        orthoCamera.position.copy(perspectiveCamera.position);
        orthoCamera.rotation.copy(perspectiveCamera.rotation);
    }
    updatePositions();
    if (rotateLight) {
        angle += 0.01;

        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        directionalLight.position.set(x, 5, z);
        directionalLight.lookAt(0, 0, 0);
    }
    controls.update();
    if (asciiEnabled) {
        effect.render(scene, currentCamera);
    }
    else {
        renderer.render(scene, currentCamera);
    }
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousedown', (event) => {
    if (tapping === true) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, currentCamera);

        const intersects = raycaster.intersectObjects(keys);
        if (intersects.length > 0) {
            const key = intersects[0].object;
            console.log('Touche pressée :', key.name);

            if (!pressedKeys.has(key)) {
                pressedKeys.set(key, key.position.clone());
            }

            if (keysInMotion.has(key)) return;

            let moveDirection = new THREE.Vector3(0, 0, 0);

            if (key.name.startsWith("front")) {
                moveDirection = new THREE.Vector3(0, 0, -0.1);
            } else if (key.name.startsWith("back")) {
                moveDirection = new THREE.Vector3(0, 0, 0.1);
            } else if (key.name.startsWith("top")) {
                moveDirection = new THREE.Vector3(0, -0.1, 0);
            } else if (key.name.startsWith("left") || key.name.startsWith("right")) {
                moveDirection = new THREE.Vector3(key.name.startsWith("left") ? 0.1 : -0.1, 0, 0);
            }

            key.position.add(moveDirection);

            keysInMotion.add(key);
        }
    }
});

window.addEventListener('mouseup', (event) => {
    if (tapping === true) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, currentCamera);

        const intersects = raycaster.intersectObjects(keys);
        if (intersects.length > 0) {
            const key = intersects[0].object;
            console.log('Touche relâchée :', key.name);

            if (pressedKeys.has(key)) {
                const originalPosition = pressedKeys.get(key);

                setTimeout(() => {
                    key.position.lerp(originalPosition, 1);

                    keysInMotion.delete(key);
                    pressedKeys.delete(key);
                    console.log('Touche relâchée, position réinitialisée :', key.name);
                });
            }
        }
    }
});




window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;
    perspectiveCamera.aspect = aspect;
    perspectiveCamera.updateProjectionMatrix();

    orthoCamera.left = -orthoSize * aspect;
    orthoCamera.right = orthoSize * aspect;
    orthoCamera.top = orthoSize;
    orthoCamera.bottom = -orthoSize;
    orthoCamera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(animate);
