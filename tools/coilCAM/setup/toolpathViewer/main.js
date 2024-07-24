// referencing https://threejs.org/docs/index.html?q=camera#manual/en/introduction/Creating-a-scene

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//control parameters based on inports, based on pathDrawing.js
var global_state = {
    paths: {
        uniqueName: [],
    },
    bedDimensions: []
};

window.state = global_state;


let defaultDimensions = [28, 26.5, 30.5]; //baby potterbot, 1 3js = 10mm
global_state.bedDimensions = defaultDimensions;
const baseHeight = 1; //base of printer bed

const scene = new THREE.Scene();
scene.background = new THREE.Color( {color : 0xfaead6}); //colors from styles.css for pathDrawing
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.up.set(0,0,1); // to ensure z is up and down instead of default (y)
camera.position.set(2, 20, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function createPrinterBedLines(dimensions, baseHeight, material){ //make line building a little less repetitive
    const lines = []; 
    const offsets = [[1, 1], [1, -1], [-1, -1], [-1, 1]]; 
    for(let i = 0; i < 8; i++){
        const points = [];
        if(i < 4){
            points.push(new THREE.Vector3(dimensions[0]/2 * offsets[i][0], dimensions[1]/2 * offsets[i][1], baseHeight/2 + dimensions[2]));
            points.push(new THREE.Vector3(dimensions[0]/2 * offsets[i][0], dimensions[1]/2 * offsets[i][1], baseHeight/2));
        } else{
            points.push(new THREE.Vector3(dimensions[0]/2 * offsets[i%4][0], dimensions[1]/2 * offsets[i%4][1], baseHeight/2 + dimensions[2]));
            points.push(new THREE.Vector3(dimensions[0]/2 * offsets[(i+1)%4][0], dimensions[1]/2 * offsets[(i+1)%4][1], baseHeight/2 + dimensions[2]));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        lines.push(line);
    }
    return lines;
}

// Create printer bed based on user dimensions - default to baby potterbot
function createPrinterBed(scene, dimensions){
    const printerBed = new THREE.Group(); //group for printer bed
    const printerBedBorders = new THREE.Group(); //group for borders, require different update function
    printerBedBorders.name = "printerBedBorders";
    printerBed.name = "printerBed";

    const baseGeometry = new THREE.BoxGeometry(dimensions[0], dimensions[1], baseHeight);
    const baseMaterial = new THREE.MeshToonMaterial( { color: 0xb7afa6 } ); 
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.name = "printerBedBase";
    printerBed.add(base);
    
    const bordersMaterial = new THREE.MeshToonMaterial( { color: 0xfaead6 } ); //borders of printer bed
    const bordersGeometry = createPrinterBedLines(dimensions, baseHeight, bordersMaterial);
    for(const line of bordersGeometry){
        printerBedBorders.add(line);
    }
    printerBed.add(printerBedBorders);
    scene.add(printerBed);
    printerBed.position.set(-dimensions[0]/2, -dimensions[1]/2, -baseHeight/2);
}

createPrinterBed(scene, global_state.bedDimensions);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.z = 3
scene.add(directionalLight)

function animate() {
    controls.update();
	renderer.render( scene, camera );
    if(global_state.bedDimensions != defaultDimensions && global_state.bedDimensions.length !== 0){ //execute only on update to bedDimensions
        var borders = scene.getObjectByName("printerBedBorders");  //update borders
        borders.scale.set(global_state.bedDimensions[0]/(defaultDimensions[0]*10), 
            global_state.bedDimensions[1]/(defaultDimensions[1]*10), 
            global_state.bedDimensions[2]/(defaultDimensions[2]*10));

        var base = scene.getObjectByName("printerBedBase"); //update base (don't scale z)
        base.scale.set(global_state.bedDimensions[0]/(defaultDimensions[0]*10), 
            global_state.bedDimensions[1]/(defaultDimensions[1]*10), 
            1);

        var printerBed = scene.getObjectByName("printerBed"); //reposition group
        printerBed.position.set(-global_state.bedDimensions[0]/20, -global_state.bedDimensions[1]/20, -baseHeight/2);
        }
    }
    
