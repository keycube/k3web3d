import config from './config.json' assert { type: 'json' };
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import helvetiker_regular from 'three/examples/fonts/helvetiker_regular.typeface.json';
import FakeGlowMaterial from './FakeGlowMaterial.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const aspectRatio = window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Caméra perspective
// Using modular settings from config for better flexibility
const perspectiveCamera = new THREE.PerspectiveCamera(config.camera.perspective.fov, aspectRatio, config.camera.perspective.near, config.camera.perspective.far);
perspectiveCamera.position.set(config.camera.perspective.position);
perspectiveCamera.lookAt(0, 0, 0);

// Caméra orthographique
const orthoSize = config.camera.orthographic.size;
const orthoCamera = new THREE.OrthographicCamera(
    -orthoSize * aspectRatio,
    orthoSize * aspectRatio,
    orthoSize,
    -orthoSize,
    config.camera.orthographic.near,
    config.camera.orthographic.far
);
orthoCamera.position.set(perspectiveCamera.position);
//orthoCamera.position.set(config.camera.orthographic.position);
orthoCamera.lookAt(0, 0, 0);

let currentCamera = perspectiveCamera;

let lastInteractionTime = Date.now();

let initialDistance = null;

let isIdle = false;

let idleTimeout = 5;
function animateIdleCamera() {
    if (isIdle) {
        if (initialDistance === null) {
            initialDistance = currentCamera.position.length();
        }
        currentCamera.position.x = currentCamera.position.x + Math.cos((Date.now() - lastInteractionTime) * 0.001) * 0.01;
        currentCamera.position.y = currentCamera.position.y + Math.sin((Date.now() - lastInteractionTime) * 0.001) * 0.01;
        currentCamera.position.z = currentCamera.position.z + Math.sin((Date.now() - lastInteractionTime) * 0.001) * 0.01;
        currentCamera.lookAt(0, 0, 0);
    }
}
document.addEventListener('keydown', (event) => {
    console.log(`Key pressed: ${event.key}`);
});
function resetIdleTimer() {
    lastInteractionTime = Date.now();
    if (isIdle) {
        isIdle = false;

        if (initialDistance !== null) {
            const direction = currentCamera.position.clone().normalize();
            currentCamera.position.copy(direction.multiplyScalar(initialDistance));
            currentCamera.lookAt(0, 0, 0);
        }

        initialDistance = null;
    }
}

const effect = new AsciiEffect(renderer, config.asciiEffect.characters, { invert: config.asciiEffect.invert });
effect.setSize(window.innerWidth, window.innerHeight);
effect.domElement.style.color = config.asciiEffect.color;
effect.domElement.style.backgroundColor = config.asciiEffect.backgroundColor;
renderer.setClearColor(0xFFFFFF);

let edgeHeight = 0;
let edgeLength = 0;
let plateLength = 0;
function resizeToFitX(target, desiredLengthX) {
    const box = new THREE.Box3().setFromObject(target);
    const size = box.getSize(new THREE.Vector3());
    const scaleFactor = desiredLengthX / size.x;
    target.scale.set(scaleFactor, scaleFactor, scaleFactor);
}

let isExploded = false;
let explodeDistance = config.explosion.distance;
let explosionSpeed = config.explosion.speed;
let targetPositions = new Map();

function explodeModel() {
    const center = new THREE.Vector3(0, 0, 0);
    scene.traverse((object) => {
        if (object.isMesh && object.position) {
            if (!object.initialPosition) {
                object.initialPosition = object.position.clone();
            }
            let direction;

            if (!isExploded) {
                if (object.name === "plate_front" || object.name === "plate_back" || object.name.startsWith('front') || object.name.startsWith('back')) {
                    direction = new THREE.Vector3(0, 0, Math.sign(object.position.z));
                } else if (object.name === "plate_left" || object.name === "plate_right" || object.name.startsWith('left') || object.name.startsWith('right')) {
                    direction = new THREE.Vector3(Math.sign(object.position.x), 0, 0);
                } else if (object.name === "plate_top" || object.name === "plate_bot" || object.name.startsWith('top') || object.name.startsWith('bot')) {
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
const keyMapping = config.keyMapping;
const keys = [];
const keyToGlow = new Map();
let color = config.globalColor;
let clickColor = config.globalClickColor;
const loader = new STLLoader();
const gltfLoader = new GLTFLoader();

function textForKey(keyIndex, size, position, rotation, name) {
    const fontLoader = new FontLoader();
    const font = fontLoader.parse(helvetiker_regular);
    let text;
    const specialKeys = ["ctrl", "CpLk", "BkS", "Sp", "OS", "Entr", "Left", "Up", "Rght", "Dwn"];
    if (specialKeys.includes(keyMapping[keyIndex][0]) || /^[a-z]$/.test(keyMapping[keyIndex][0])) {
        text = keyMapping[keyIndex][0];
    } else {
        text = keyMapping[keyIndex].join(' ');
    }
    const textGeometry = new TextGeometry(text, {
        font: font,
        size: size, // Taille du texte
        height: 0.01, // Épaisseur du texte
        curveSegments: 22,
        bevelEnabled: true,
        bevelThickness: 0.003,
        bevelSize: 0.002,
        bevelSegments: 10
    });

    // Créer le matériau du texte
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Couleur du texte
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Centrer le texte
    textGeometry.center();

    // Positionner le texte
    textMesh.position.set(position.x, position.y, position.z);
    textMesh.rotation.set(rotation.x, rotation.y, rotation.z);
    textMesh.name = name;
    scene.add(textMesh);
}

let keyIndex = 1;
function createKeysForPlates() {
    scene.traverse((object) => {
        if (object.name.startsWith("plate_") && object.name !== "plate_bot") {
            if (plateLength == 0) plateLength = edgeLength;
            const plateWidth = plateLength - plateLength / 64;
            const spacing = plateWidth / 4;
            const plateName = object.name.split('_')[1];

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    const keyMaterial = new THREE.MeshPhysicalMaterial(config.materials.key);
                    keyMaterial.emissive.set(color);
                    const backlightMaterial = new THREE.MeshPhysicalMaterial(config.materials.backlight);
                    backlightMaterial.color.set(color)
                    backlightMaterial.emissive.set(color);
                    const glowMaterial = new FakeGlowMaterial(config.materials.glow);
                    glowMaterial.uniforms.glowColor.value.set(color);

                    if (plateName === "front") {
                        loader.load(config.models.keycap, (keycapGeometry) => {
                            loader.load(config.models.switch, (switchGeometry) => {
                                const key = new THREE.Mesh(keycapGeometry, keyMaterial);
                                const switchmesh = new THREE.Mesh(switchGeometry, backlightMaterial);

                                resizeToFitX(key, spacing / 1.15)
                                resizeToFitX(switchmesh, spacing / 1.15)

                                key.position.set(
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    j * spacing - (plateWidth / 2 - spacing / 2),
                                    object.position.z + spacing / 3
                                );
                                switchmesh.position.set(
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    j * spacing - (plateWidth / 2 - spacing / 2),
                                    object.position.z + spacing / 900
                                );
                                const text = new THREE.Mesh();
                                text.position.set(key.position.x, key.position.y, key.position.z);
                                text.position.z += spacing / 3 - spacing / 24;
                                text.rotation.set(key.rotation.x, key.rotation.y, key.rotation.z);
                                text.name = `${plateName}_text_${keyIndex}`;
                                textForKey(keyIndex, spacing / 5, text.position, text.rotation, text.name);
                                const glowGeometry = new THREE.SphereGeometry(spacing / 1.4, 32, 32);
                                const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                                glow.position.copy(key.position);
                                scene.add(glow);
                                key.name = `${plateName}_key_${keyIndex}`;
                                switchmesh.name = `${plateName}_switch_${keyIndex}`;
                                glow.name = key.name;
                                keys.push(key);
                                scene.add(key);
                                scene.add(switchmesh);
                                keyToGlow.set(key.name, { glow, switchmesh });
                                keyIndex += 1;;
                            });
                        });
                    } else if (plateName === "back") {
                        loader.load(config.models.keycap, (keycapGeometry) => {
                            loader.load(config.models.switch, (switchGeometry) => {
                                const key = new THREE.Mesh(keycapGeometry, keyMaterial);
                                const switchmesh = new THREE.Mesh(switchGeometry, backlightMaterial);

                                resizeToFitX(key, spacing / 1.15)
                                resizeToFitX(switchmesh, spacing / 1.15)

                                key.position.set(
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    j * spacing - (plateWidth / 2 - spacing / 2),
                                    object.position.z - spacing / 3
                                );
                                key.rotation.set(0, Math.PI, 0);
                                switchmesh.position.set(
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    j * spacing - (plateWidth / 2 - spacing / 2),
                                    object.position.z - spacing / 900
                                );
                                switchmesh.rotation.set(0, Math.PI, 0);
                                const text = new THREE.Mesh();
                                text.position.set(key.position.x, key.position.y, key.position.z);
                                text.position.z -= spacing / 3 - spacing / 24;
                                text.rotation.set(key.rotation.x, key.rotation.y, Math.PI);
                                text.name = `${plateName}_text_${keyIndex}`;
                                textForKey(keyIndex, spacing / 5, text.position, text.rotation, text.name);
                                const glowGeometry = new THREE.SphereGeometry(spacing / 1.4, 32, 32);
                                const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                                glow.position.copy(key.position);
                                scene.add(glow);
                                key.name = `${plateName}_key_${keyIndex}`;
                                switchmesh.name = `${plateName}_switch_${keyIndex}`;
                                glow.name = key.name;
                                keys.push(key);
                                scene.add(key);
                                scene.add(switchmesh);
                                keyToGlow.set(key.name, { glow, switchmesh });
                                keyIndex++;
                            });
                        });
                    } else if (plateName === "top") {
                        loader.load(config.models.keycap, (keycapGeometry) => {
                            loader.load(config.models.switch, (switchGeometry) => {
                                const key = new THREE.Mesh(keycapGeometry, keyMaterial);
                                const switchmesh = new THREE.Mesh(switchGeometry, backlightMaterial);

                                resizeToFitX(key, spacing / 1.15)
                                resizeToFitX(switchmesh, spacing / 1.15)

                                key.position.set(
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    object.position.y + spacing / 3,
                                    j * spacing - (plateWidth / 2 - spacing / 2)
                                );
                                key.rotation.set(-Math.PI / 2, 0, 0);
                                switchmesh.position.set(
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    object.position.y + spacing / 900,
                                    j * spacing - (plateWidth / 2 - spacing / 2)
                                );
                                switchmesh.rotation.set(-Math.PI / 2, 0, 0);
                                const text = new THREE.Mesh();
                                text.position.set(key.position.x, key.position.y, key.position.z);
                                text.position.y += spacing / 3 - spacing / 24;
                                text.rotation.set(key.rotation.x, key.rotation.y, Math.PI / 2);
                                text.name = `${plateName}_text_${keyIndex}`;
                                textForKey(keyIndex, spacing / 5, text.position, text.rotation, text.name);
                                const glowGeometry = new THREE.SphereGeometry(spacing / 1.4, 32, 32);
                                const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                                glow.position.copy(key.position);
                                scene.add(glow);
                                key.name = `${plateName}_key_${keyIndex}`;
                                switchmesh.name = `${plateName}_switch_${keyIndex}`;
                                glow.name = key.name;
                                keys.push(key);
                                scene.add(key);
                                scene.add(switchmesh);
                                keyToGlow.set(key.name, { glow, switchmesh });
                                keyIndex++;
                            });
                        });
                    } else if (plateName === "left") {
                        loader.load(config.models.keycap, (keycapGeometry) => {
                            loader.load(config.models.switch, (switchGeometry) => {
                                const key = new THREE.Mesh(keycapGeometry, keyMaterial);
                                const switchmesh = new THREE.Mesh(switchGeometry, backlightMaterial);

                                resizeToFitX(key, spacing / 1.15)
                                resizeToFitX(switchmesh, spacing / 1.15)

                                key.position.set(
                                    object.position.x - spacing / 3,
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    j * spacing - (plateWidth / 2 - spacing / 2)
                                );
                                key.rotation.set(0, -Math.PI / 2, 0);
                                switchmesh.position.set(
                                    object.position.x - spacing / 900,
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    j * spacing - (plateWidth / 2 - spacing / 2)
                                );
                                switchmesh.rotation.set(0, -Math.PI / 2, 0);
                                const text = new THREE.Mesh();
                                text.position.set(key.position.x, key.position.y, key.position.z);
                                text.position.x -= spacing / 3 - spacing / 24;
                                text.rotation.set(Math.PI, key.rotation.y, key.rotation.z);
                                text.name = `${plateName}_text_${keyIndex}`;
                                textForKey(keyIndex, spacing / 5, text.position, text.rotation, text.name);
                                const glowGeometry = new THREE.SphereGeometry(spacing / 1.4, 32, 32);
                                const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                                glow.position.copy(key.position);
                                scene.add(glow);
                                key.name = `${plateName}_key_${keyIndex}`;
                                switchmesh.name = `${plateName}_switch_${keyIndex}`;
                                glow.name = key.name;
                                keys.push(key);
                                scene.add(key);
                                scene.add(switchmesh);
                                keyToGlow.set(key.name, { glow, switchmesh });
                                keyIndex++;
                            });
                        });
                    } else if (plateName === "right") {
                        loader.load(config.models.keycap, (keycapGeometry) => {
                            loader.load(config.models.switch, (switchGeometry) => {
                                const key = new THREE.Mesh(keycapGeometry, keyMaterial);
                                const switchmesh = new THREE.Mesh(switchGeometry, backlightMaterial);

                                resizeToFitX(key, spacing / 1.15)
                                resizeToFitX(switchmesh, spacing / 1.15)

                                key.position.set(
                                    object.position.x + spacing / 3,
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    j * spacing - (plateWidth / 2 - spacing / 2)
                                );
                                key.rotation.set(0, Math.PI / 2, 0);
                                switchmesh.position.set(
                                    object.position.x + spacing / 900,
                                    i * spacing - (plateWidth / 2 - spacing / 2),
                                    j * spacing - (plateWidth / 2 - spacing / 2)
                                );
                                switchmesh.rotation.set(0, Math.PI / 2, 0);
                                const text = new THREE.Mesh();
                                text.position.set(key.position.x, key.position.y, key.position.z);
                                text.position.x += spacing / 3 - spacing / 24;
                                text.rotation.set(key.rotation.x, key.rotation.y, key.rotation.z);
                                text.name = `${plateName}_text_${keyIndex}`;
                                textForKey(keyIndex, spacing / 5, text.position, text.rotation, text.name);
                                const glowGeometry = new THREE.SphereGeometry(spacing / 1.4, 32, 32);
                                const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                                glow.position.copy(key.position);
                                scene.add(glow);
                                key.name = `${plateName}_key_${keyIndex}`;
                                switchmesh.name = `${plateName}_switch_${keyIndex}`;
                                glow.name = key.name;
                                keys.push(key);
                                scene.add(key);
                                scene.add(switchmesh);
                                keyToGlow.set(key.name, { glow, switchmesh });
                                keyIndex++;
                            });
                        });
                    }
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

const textureLoader = new THREE.TextureLoader();

const woodtext = textureLoader.load('wood/wooddiff.jpg', (tex) => {
    tex.wrapS = tex.wrapT = THREE.MirroredRepeatWrapping;
    tex.repeat.set(4, 4);
    console.log(tex);
});

const woodnormal = textureLoader.load('wood/woodnormal.exr', (normal) => {
    normal.wrapS = normal.wrapT = THREE.MirroredRepeatWrapping;
    normal.repeat.set(4, 4);
    console.log(normal);
});

const woodrought = textureLoader.load('wood/woodrought.exr', (rought) => {
    rought.wrapS = rought.wrapT = THREE.MirroredRepeatWrapping;
    rought.repeat.set(4, 4);
    console.log(rought);
});

const woodaomap = textureLoader.load('wood/woodao.jpg', (ao) => {
    ao.wrapS = ao.wrapT = THREE.MirroredRepeatWrapping;
    ao.repeat.set(4, 4);
    console.log(ao);
});

const woodCaseMaterial = new THREE.MeshStandardMaterial({
    map: woodtext,
    roughnessMap: woodrought,
    aoMap: woodaomap,
    normalMap: woodnormal,
});

const hexdiffuseMap = textureLoader.load('metal/hexdiff.jpg', (tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(10, 10);
    console.log(tex);
});

const hexnormalMap = textureLoader.load('metal/hexnormal.png', (normal) => {
    normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
    normal.repeat.set(10, 10);
    console.log(normal);
});

const hexroughnessMap = textureLoader.load('metal/hexrought.jpg', (rought) => {
    rought.wrapS = rought.wrapT = THREE.RepeatWrapping;
    rought.repeat.set(10, 10);
    console.log(rought);
});

const hexaoMap = textureLoader.load('metal/hexao.jpg', (ao) => {
    ao.wrapS = ao.wrapT = THREE.RepeatWrapping;
    ao.repeat.set(10, 10);
    console.log(ao);
});

const hexmetal = textureLoader.load('metal/hexmetal.jpg', (metal) => {
    metal.wrapS = metal.wrapT = THREE.RepeatWrapping;
    metal.repeat.set(10, 10);
    console.log(metal);
});

const hexCaseMaterial = new THREE.MeshStandardMaterial({
    map: hexdiffuseMap,
    roughnessMap: hexroughnessMap,
    normalMap: hexnormalMap,
    aoMap: hexaoMap,
    metalnessMap: hexmetal,
    metalness: 0.7,
    roughness: 0.8,
});


//Loader STL (pas de texture possible):

//const aluminium = new THREE.MeshStandardMaterial(config.materials.aluminum);
//loader.load(config.models.edge, function (geometry) {
//    const mesh = new THREE.Mesh(geometry.clone(), aluminium);
//    //resizeToFitX(mesh, edgeHeight);

//    const box = new THREE.Box3().setFromObject(mesh);
//    edgeLength = box.getSize(new THREE.Vector3()).z;
//    edgeHeight = box.getSize(new THREE.Vector3()).x;

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
//        const edgeMesh = new THREE.Mesh(geometry.clone(), woodCaseMaterial);
//        edgeMesh.name = data.name;
//        resizeToFitX(edgeMesh, edgeHeight);
//        edgeMesh.position.set(data.position[0], data.position[1], data.position[2]);
//        edgeMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
//        scene.add(edgeMesh);
//    });
//    currentCamera.position.set(edgeLength - edgeHeight, edgeLength - edgeHeight, edgeLength + edgeHeight);
//    loadCorners(edgeLength, edgeHeight);
//    loadPlate(edgeLength, edgeHeight);
//    loadPlateBot(edgeLength, edgeHeight);
//});

//function loadCorners(edgeLength, edgeHeight) {
//    loader.load(config.models.corner, function (geometry) {
//        const cornerSize = edgeHeight;

//        const positions = [
//            { name: "corner_1", position: [-edgeLength / 2, edgeLength / 2, edgeLength / 2] },
//            { name: "corner_2", position: [edgeLength / 2, edgeLength / 2, edgeLength / 2] },
//            { name: "corner_3", position: [-edgeLength / 2, -edgeLength / 2, edgeLength / 2] },
//            { name: "corner_4", position: [edgeLength / 2, -edgeLength / 2, edgeLength / 2] },
//            { name: "corner_5", position: [-edgeLength / 2, edgeLength / 2, -edgeLength / 2] },
//            { name: "corner_6", position: [edgeLength / 2, edgeLength / 2, -edgeLength / 2] },
//            { name: "corner_7", position: [-edgeLength / 2, -edgeLength / 2, -edgeLength / 2] },
//            { name: "corner_8", position: [edgeLength / 2, -edgeLength / 2, -edgeLength / 2] },
//        ];

//        positions.forEach(data => {
//            const mesh = new THREE.Mesh(geometry.clone(), aluminium);
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
//    loader.load(config.models.plate, function (geometry) {
//        const platePositions = [
//            // Faces avant et arrière
//            { name: "plate_front", position: [-edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 2], rotation: [0, 0, 0] },
//            { name: "plate_back", position: [edgeLength / 2 + edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2], rotation: [0, Math.PI, 0] },

//            // Faces haut
//            { name: "plate_top", position: [-edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 2, edgeLength / 2 + edgeHeight / 8], rotation: [-Math.PI / 2, 0, 0] },

//            // Faces gauche et droite
//            { name: "plate_left", position: [-edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 8], rotation: [0, Math.PI / 2, 0] },
//            { name: "plate_right", position: [edgeLength / 2 + edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8], rotation: [0, -Math.PI / 2, 0] },

//        ];

//        platePositions.forEach(data => {
//            const plateMesh = new THREE.Mesh(geometry.clone(), aluminium);
//            plateMesh.name = data.name;
//            resizeToFitX(plateMesh, edgeLength + edgeHeight / 4);
//            plateMesh.position.set(data.position[0], data.position[1], data.position[2]);
//            plateMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
//            scene.add(plateMesh);
//        });
//        createKeysForPlates();
//    });
//}

//function loadPlateBot(edgeLength, edgeHeight) {
//    loader.load(config.models.platebot, function (geometry) {
//        const platePositions = [
//            // Face bas
//            { name: "plate_bot", position: [edgeLength / 2 + edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8], rotation: [Math.PI / 2, Math.PI, 0] },
//        ];

//        platePositions.forEach(data => {
//            const plateMesh = new THREE.Mesh(geometry.clone(), aluminium);
//            plateMesh.name = data.name;
//            resizeToFitX(plateMesh, edgeLength + edgeHeight / 4);
//            plateMesh.position.set(data.position[0], data.position[1], data.position[2]);
//            plateMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
//            scene.add(plateMesh);
//        });
//    });
//}


//Loader GLTF (texture possible):

gltfLoader.load(config.glbModels.edge, function (gltf) {
    const geometry = gltf.scene.children[0].geometry;
    const mesh = new THREE.Mesh(geometry.clone(), woodCaseMaterial);

    const box = new THREE.Box3().setFromObject(mesh);
    edgeLength = box.getSize(new THREE.Vector3()).y;
    edgeHeight = box.getSize(new THREE.Vector3()).z;
    console.log(edgeLength);
    console.log(edgeHeight);

    const edgePositions = [
        // Axe X
        { name: "edge_X1", position: [0, edgeLength / 2, edgeLength / 2], rotation: [0, 0, Math.PI / 2] },
        { name: "edge_X2", position: [0, -edgeLength / 2, edgeLength / 2], rotation: [Math.PI / 2, 0, Math.PI / 2] },
        { name: "edge_X3", position: [0, edgeLength / 2, -edgeLength / 2], rotation: [0, Math.PI, Math.PI / 2] },
        { name: "edge_X4", position: [0, -edgeLength / 2, -edgeLength / 2], rotation: [0, Math.PI, -Math.PI / 2] },

        // Axe Y
        { name: "edge_Y1", position: [edgeLength / 2, 0, edgeLength / 2], rotation: [Math.PI / 2, Math.PI / 2, Math.PI / 2] },
        { name: "edge_Y2", position: [-edgeLength / 2, 0, edgeLength / 2], rotation: [-Math.PI / 2, -Math.PI / 2, -Math.PI / 2] },
        { name: "edge_Y3", position: [edgeLength / 2, 0, -edgeLength / 2], rotation: [-Math.PI / 2, Math.PI / 2, Math.PI / 2] },
        { name: "edge_Y4", position: [-edgeLength / 2, 0, -edgeLength / 2], rotation: [Math.PI / 2, -Math.PI / 2, -Math.PI / 2] },

        // Axe Z
        { name: "edge_Z1", position: [edgeLength / 2, edgeLength / 2, 0], rotation: [0, Math.PI / 2, Math.PI / 2] },
        { name: "edge_Z2", position: [-edgeLength / 2, edgeLength / 2, 0], rotation: [0, -Math.PI / 2, Math.PI / 2] },
        { name: "edge_Z3", position: [edgeLength / 2, -edgeLength / 2, 0], rotation: [0, Math.PI / 2, -Math.PI / 2] },
        { name: "edge_Z4", position: [-edgeLength / 2, -edgeLength / 2, 0], rotation: [0, -Math.PI / 2, -Math.PI / 2] },
    ];

    edgePositions.forEach(data => {
        const edgeMesh = new THREE.Mesh(geometry.clone(), woodCaseMaterial);
        edgeMesh.name = data.name;
        resizeToFitX(edgeMesh, edgeHeight);
        edgeMesh.position.set(data.position[0], data.position[1], data.position[2]);
        edgeMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
        scene.add(edgeMesh);
    });
    currentCamera.position.set(edgeLength - edgeHeight, edgeLength - edgeHeight, edgeLength + edgeHeight);
    directionalLight.position.set(edgeLength + edgeHeight, edgeLength + edgeHeight, edgeLength + edgeHeight);
    specularLight.position.set(-directionalLight.position.x, -directionalLight.position.y, -directionalLight.position.z)
    gltfloadCorners(edgeLength, edgeHeight);
    gltfloadPlate(edgeLength, edgeHeight);
    gltfloadPlateBot(edgeLength, edgeHeight);
});

function gltfloadCorners(edgeLength, edgeHeight) {
    gltfLoader.load(config.glbModels.corner, function (gltf) {
        const geometry = gltf.scene.children[0].geometry;
        const cornerSize = edgeHeight;

        const positions = [
            { name: "corner_1", position: [-edgeLength / 2, edgeLength / 2, edgeLength / 2] },
            { name: "corner_2", position: [edgeLength / 2, edgeLength / 2, edgeLength / 2] },
            { name: "corner_3", position: [-edgeLength / 2, -edgeLength / 2, edgeLength / 2] },
            { name: "corner_4", position: [edgeLength / 2, -edgeLength / 2, edgeLength / 2] },
            { name: "corner_5", position: [-edgeLength / 2, edgeLength / 2, -edgeLength / 2] },
            { name: "corner_6", position: [edgeLength / 2, edgeLength / 2, -edgeLength / 2] },
            { name: "corner_7", position: [-edgeLength / 2, -edgeLength / 2, -edgeLength / 2] },
            { name: "corner_8", position: [edgeLength / 2, -edgeLength / 2, -edgeLength / 2] },
        ];

        positions.forEach(data => {
            const mesh = new THREE.Mesh(geometry.clone(), hexCaseMaterial);
            mesh.name = data.name;
            resizeToFitX(mesh, cornerSize);
            mesh.position.set(data.position[0], data.position[1], data.position[2]);

            if (data.position[1] > 0) {
                //mesh.rotateX(Math.PI / 2);
            }
            if (data.position[0] < 0 && data.position[2] < 0) {
                mesh.rotateY(Math.PI);
            }
            if (data.position[0] > 0 && data.position[2] < 0) {
                mesh.rotateY(Math.PI / 2);
            }
            if (data.position[0] > 0 && data.position[1] < 0) {
                mesh.rotateX(Math.PI / 2);
            }
            if (data.position[0] < 0 && data.position[1] < 0) {
                mesh.rotateX(Math.PI / 2);
            }
            if (data.position[0] < 0 && data.position[2] > 0) {
                mesh.rotateY(-Math.PI / 2);
            }
            scene.add(mesh);
        });
    });
}

function gltfloadPlate(edgeLength, edgeHeight) {
    gltfLoader.load(config.glbModels.plate, function (gltf) {
        const geometry = gltf.scene.children[0].geometry;
        const platePositions = [
            // Faces avant et arrière
            { name: "plate_front", position: [-edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 2], rotation: [Math.PI / 2, 0, 0] },
            { name: "plate_back", position: [edgeLength / 2 + edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2], rotation: [-Math.PI / 2, Math.PI, 0] },

            // Faces haut
            { name: "plate_top", position: [-edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 2, edgeLength / 2 + edgeHeight / 8], rotation: [0, 0, 0] },

            // Faces gauche et droite
            { name: "plate_left", position: [-edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, edgeLength / 2 + edgeHeight / 8], rotation: [0, 0, Math.PI / 2] },
            { name: "plate_right", position: [edgeLength / 2 + edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 8], rotation: [-Math.PI / 2, -Math.PI, -Math.PI / 2] },

        ];

        platePositions.forEach(data => {
            const plateMesh = new THREE.Mesh(geometry.clone(), woodCaseMaterial);
            plateMesh.name = data.name;
            resizeToFitX(plateMesh, edgeLength + edgeHeight / 4);
            plateMesh.position.set(data.position[0], data.position[1], data.position[2]);
            plateMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
            scene.add(plateMesh);
        });
        createKeysForPlates();
    });
}

function gltfloadPlateBot(edgeLength, edgeHeight) {
    gltfLoader.load(config.glbModels.platebot, function (gltf) {
        const geometry = gltf.scene.children[0].geometry;
        const platePositions = [
            // Face bas
            { name: "plate_bot", position: [-edgeLength / 2 - edgeHeight / 8, -edgeLength / 2 - edgeHeight / 2, -edgeLength / 2 - edgeHeight / 8], rotation: [0, -Math.PI / 2, 0] },
        ];

        platePositions.forEach(data => {
            const plateMesh = new THREE.Mesh(geometry.clone(), woodCaseMaterial);
            plateMesh.name = data.name;
            resizeToFitX(plateMesh, edgeLength + edgeHeight / 4);
            plateMesh.position.set(data.position[0], data.position[1], data.position[2]);
            plateMesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
            scene.add(plateMesh);
        });
    });
}

const ambientLight = new THREE.AmbientLight(config.lighting.ambient.color, config.lighting.ambient.intensity);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(config.lighting.directional.color, config.lighting.directional.intensity);
directionalLight.position.set(edgeLength - edgeHeight, edgeLength - edgeHeight, edgeLength + edgeHeight);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
scene.add(directionalLight);

const specularLight = new THREE.DirectionalLight(0xffeedd, 1.5);
specularLight.position.set(-directionalLight.position.x, -directionalLight.position.y, -directionalLight.position.z);
scene.add(specularLight);


const radius = 1000;
let angle = 0;
let rotateLight = false;

currentCamera.position.set(edgeLength - edgeHeight, edgeLength - edgeHeight, edgeLength + edgeHeight);
currentCamera.lookAt(0, 0, 0);

// ASCII effect state controlled by config
let asciiEnabled = false;
let controls = new OrbitControls(currentCamera, renderer.domElement);
controls.mouseButtons.RIGHT = null;
controls.enableZoom = false;
controls.enableDamping = true;
controls.screenSpacePanning = false;
controls.enablePan = false;

function orthoCam() {
    currentCamera = currentCamera === perspectiveCamera ? orthoCamera : perspectiveCamera;
    if (asciiEnabled) {
        controls.dispose();
        controls = new OrbitControls(currentCamera, effect.domElement);
        controls.enableDamping = true;
        controls.screenSpacePanning = false;
        controls.mouseButtons.RIGHT = null;
        controls.enableZoom = false;
        controls.enablePan = false;
    }
    else {
        controls.dispose();
        controls = new OrbitControls(currentCamera, renderer.domElement);
        controls.enableDamping = true;
        controls.screenSpacePanning = false;
        controls.mouseButtons.RIGHT = null;
        controls.enableZoom = false;
        controls.enablePan = false;
    }
}

function asciiEffect() {
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
}

// Tapping state controlled by config settings
let tapping = false;
const pressedKeys = new Map();
const keysInMotion = new Set();
function pressKey(event) {
    if (tapping === true) {
        const pressedKey = event.key.toLowerCase();

        if (keysInMotion.has(pressedKey)) return;

        for (let [index, keyObject] of keys.entries()) {
            const keyMappingList = keyMapping[index + 1];

            if (keyMappingList && keyMappingList.includes(pressedKey)) {
                const { glow, switchmesh } = keyToGlow.get(keyObject.name);
                const textName = keyObject.name.replace('_key_', '_text_');
                const textObject = scene.getObjectByName(textName);
                keyMappingList.forEach((associatedKey) => {
                    for (let [subIndex, subKeyObject] of keys.entries()) {
                        if (keyMapping[subIndex + 1] && keyMapping[subIndex + 1].includes(associatedKey)) {
                            if (!pressedKeys.has(keyObject.name)) {
                                pressedKeys.set(keyObject.name, keyObject.position.clone());
                            }
                            if (!pressedKeys.has(glow.name)) {
                                pressedKeys.set(glow.name, glow.position.clone());
                            }
                            if (!pressedKeys.has(textObject.name)) {
                                pressedKeys.set(textObject.name, textObject.position.clone());
                            }
                        }
                    }
                });

                let moveDirection = new THREE.Vector3(0, 0, 0);
                if (keyObject.name.startsWith("front")) {
                    moveDirection = new THREE.Vector3(0, 0, -1.2);
                } else if (keyObject.name.startsWith("back")) {
                    moveDirection = new THREE.Vector3(0, 0, 1.2);
                } else if (keyObject.name.startsWith("top")) {
                    moveDirection = new THREE.Vector3(0, -1.2, 0);
                } else if (keyObject.name.startsWith("left") || keyObject.name.startsWith("right")) {
                    moveDirection = new THREE.Vector3(keyObject.name.startsWith("left") ? 1.2 : -1.2, 0, 0);
                }

                //const newColor = new THREE.Color(Math.random() * 0xffffff);
                const newColor = clickColor;
                keyObject.material.emissive.set(newColor);
                glow.material.uniforms.glowColor.value.set(newColor);
                switchmesh.material.emissive.set(newColor);

                if (textObject) {
                    textObject.position.add(moveDirection);
                }
                glow.position.add(moveDirection);
                keyObject.position.add(moveDirection);

                keysInMotion.add(pressedKey);
                keyMappingList.forEach((associatedKey) => {
                    keysInMotion.add(associatedKey);
                });
            }
        }
    }
}

function releaseKey(event) {
    if (tapping === true) {
        const releasedKey = event.key.toLowerCase();

        if (keysInMotion.has(releasedKey)) {
            for (let [index, keyObject] of keys.entries()) {
                const keyMappingList = keyMapping[index + 1];

                if (keyMappingList && keyMappingList.includes(releasedKey)) {
                    keyMappingList.forEach((associatedKey) => {
                        for (let [subIndex, subKeyObject] of keys.entries()) {
                            if (keyMapping[subIndex + 1] && keyMapping[subIndex + 1].includes(associatedKey)) {
                                const { glow: subGlow, switchmesh: subSwitchmesh } = keyToGlow.get(subKeyObject.name);
                                const textName = subKeyObject.name.replace('_key_', '_text_');
                                const textObject = scene.getObjectByName(textName);
                                const originalPosition = pressedKeys.get(subKeyObject.name);
                                if (originalPosition) {
                                    subKeyObject.position.copy(originalPosition);
                                }
                                const originalGlowPosition = pressedKeys.get(subGlow.name);
                                if (originalPosition) {
                                    subGlow.position.copy(originalGlowPosition);
                                }
                                const originalTextPosition = pressedKeys.get(textObject.name);
                                if (originalPosition) {
                                    textObject.position.copy(originalTextPosition);
                                }

                                subKeyObject.material.emissive.set(color);
                                subGlow.material.uniforms.glowColor.value.set(color);
                                subSwitchmesh.material.emissive.set(color);
                                keysInMotion.delete(associatedKey);
                                pressedKeys.delete(subKeyObject.name);
                            }
                        }
                    });
                }
            }
        }
    }
}

window.addEventListener('keydown', (event) => {
    const step = 0.5;
    if (tapping === false) {
        switch (event.key) {
            case 'o':
            case 'O':
                orthoCam();
                break;
            case 'e':
            case 'E':
                asciiEffect();
                break;
            case 'a':
            case 'A':
                explodeModel(2);
                break;
            case 'l':
                rotateLight = !rotateLight;
                break;
        }
    }
    if (event.key == '²') {
        tapping = !tapping;
    }
    else {
        pressKey(event);
    }
});

window.addEventListener('keyup', (event) => {
    releaseKey(event);
});

['mousemove', 'mousedown', 'keydown', 'wheel'].forEach((event) => {
    window.addEventListener(event, resetIdleTimer);
});

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
            const { glow, switchmesh } = keyToGlow.get(key.name);
            const textName = key.name.replace('_key_', '_text_');
            const textObject = scene.getObjectByName(textName);

            if (!pressedKeys.has(key)) {
                pressedKeys.set(key, key.position.clone());
            }
            if (!pressedKeys.has(glow.name)) {
                pressedKeys.set(glow.name, glow.position.clone());
            }
            if (!pressedKeys.has(textObject.name)) {
                pressedKeys.set(textObject.name, textObject.position.clone());
            }

            if (keysInMotion.has(key)) return;

            let moveDirection = new THREE.Vector3(0, 0, 0);

            if (key.name.startsWith("front")) {
                moveDirection = new THREE.Vector3(0, 0, -1.2);
            } else if (key.name.startsWith("back")) {
                moveDirection = new THREE.Vector3(0, 0, 1.2);
            } else if (key.name.startsWith("top")) {
                moveDirection = new THREE.Vector3(0, -1.2, 0);
            } else if (key.name.startsWith("left") || key.name.startsWith("right")) {
                moveDirection = new THREE.Vector3(key.name.startsWith("left") ? 1.2 : -1.2, 0, 0);
            }
            //const newColor = new THREE.Color(Math.random() * 0xffffff);
            const newColor = clickColor;
            key.material.emissive.set(newColor);
            glow.material.uniforms.glowColor.value.set(newColor);
            switchmesh.material.emissive.set(newColor);
            if (textObject) {
                textObject.position.add(moveDirection);
            }
            glow.position.add(moveDirection);
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

            if (pressedKeys.has(key)) {
                const originalPosition = pressedKeys.get(key);
                const { glow: subGlow, switchmesh: subSwitchmesh } = keyToGlow.get(key.name);
                const textName = key.name.replace('_key_', '_text_');
                const textObject = scene.getObjectByName(textName);
                const originalGlowPosition = pressedKeys.get(subGlow.name);
                const originalTextPosition = pressedKeys.get(textObject.name);
                setTimeout(() => {
                    key.position.lerp(originalPosition, 1);
                    subGlow.position.lerp(originalGlowPosition, 1);
                    textObject.position.lerp(originalTextPosition, 1);
                    key.material.emissive.set(color);
                    subGlow.material.uniforms.glowColor.value.set(color);
                    subSwitchmesh.material.emissive.set(color);
                    keysInMotion.delete(key);
                    pressedKeys.delete(key);
                });
            }
        }
    }
});
function animate() {
    if (currentCamera === perspectiveCamera) {
        orthoCamera.position.copy(perspectiveCamera.position);
        orthoCamera.rotation.copy(perspectiveCamera.rotation);
    }
    if (Date.now() - lastInteractionTime > idleTimeout * 1000) {
        isIdle = true;
    }
    if (isIdle) {
        animateIdleCamera();
    }
    updatePositions();
    if (rotateLight) {
        angle += 0.005;

        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        directionalLight.position.X = x;
        directionalLight.position.z = z;
        specularLight.position.x = -x;
        specularLight.position.z = -z;
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
