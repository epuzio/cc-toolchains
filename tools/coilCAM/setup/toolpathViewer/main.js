// referencing https://threejs.org/docs/index.html?q=camera#manual/en/introduction/Creating-a-scene

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( {color : 0xfaead6}); //colors from styles.css for pathDrawing
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; //from tutorial

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

function createPrinterBedLines(dimensions, baseHeight, material){ //make line building a little less repetitive
    const lines = []; 
    const offsets = [[1, 1], [1, -1], [-1, -1], [-1, 1]]; 
    for(let i = 0; i < 8; i++){
        const points = [];
        if(i < 4){
            points.push(new THREE.Vector3(dimensions[0] * offsets[i][0], dimensions[1] * offsets[i][1], baseHeight + dimensions[2]));
            points.push(new THREE.Vector3(dimensions[0] * offsets[i][0], dimensions[1] * offsets[i][1], baseHeight));
        } else{
            points.push(new THREE.Vector3(dimensions[0] * offsets[i%4][0], dimensions[1] * offsets[i%4][1], baseHeight + dimensions[2]));
            points.push(new THREE.Vector3(dimensions[0] * offsets[(i+1)%4][0], dimensions[1] * offsets[(i+1)%4][1], baseHeight + dimensions[2]));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        lines.push(line);
    }
    return lines;
}

// Create printer bed based on user dimensions - default to baby potterbot
function createPrinterBed(scene, dimensions){
    const baseHeight = .4;
    const baseGeometry = new THREE.BoxGeometry(dimensions[0], dimensions[1], baseHeight);
    const baseMaterial = new THREE.MeshBasicMaterial( { color: 0xde7895 } ); //MeshBasicMaterial = no lighting
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    scene.add(base);
    console.log("catch");

    const bordersMaterial = new THREE.MeshBasicMaterial( { color: 0x2d2114 } ); 
    const bordersGeometry = createPrinterBedLines(dimensions, baseHeight, bordersMaterial);
    console.log("borders geo:");
    console.log(bordersGeometry);
    for(const line of bordersGeometry){
        scene.add(line);
    }
}

createPrinterBed(scene, [1, 2, 1]);

function animate() {
    controls.update();
	renderer.render( scene, camera );
}