//copied from coilcam-js
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {DragControls} from 'three/addons/controls/DragControls.js';

var global_state = { // TO FIX: adding optional svg using file I/O
    svgPath: "",
    nbLayers: 0,
    layerHeight: 0.0,
    values0: [], // passed in
    prevOffsets: [], // passed in, stores previous user offsets
    values: [], // returned
};
window.state = global_state;
let prevNbLayers = 0;
let prevLayerHeight = 0;
let prevValues0 = [];

// Build Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( {color : 0xe3e1de}); //colors from styles.css for pathDrawing
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.up.set(0, 0, 1); // to ensure z is up and down instead of default (y)
camera.position.set(0, 40, 0); //adjust z with radius
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
const zoomControls = new OrbitControls(camera, renderer.domElement);
zoomControls.enableRotate = false;
const yOffset = 0;

var circleGroup = new THREE.Group();
circleGroup.name = "circleGroup";
var lines;
const circleMaterial = new THREE.MeshToonMaterial( { color: 0xb7afa6 } ); 
const circleHighlightMaterial = new THREE.MeshToonMaterial( { color: 0x85807b } ); 
var position;
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xc2bfba });
const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.z = 3
scene.add(directionalLight);
let vec3Points = [];

//Add crosshair at position[x, y]
const crossMaterial = new THREE.LineBasicMaterial({color: 0xc2bfba});
const crossHorizontalGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5, 0, 0), new THREE.Vector3(0, 0, 0)]);
const crossHorizontal = new THREE.Line(crossHorizontalGeometry, crossMaterial);
scene.add(crossHorizontal);

function calculateOffsets(){ // offset along the xy plane
    window.state.values = vec3Points.map(point => (point.x - position[2]));
    // Post message to update parent outports
    window.parent.postMessage({ type: 'profileStateValuesUpdated', values: window.state.values}, window.location.origin);
}

function addLines(){
    //draw lines from vec3
    if(lines){
        lines.geometry.dispose();
        lines.material.dispose();
        scene.remove(lines);
    }
    vec3Points = [];
    circleGroup.children.forEach((c) => {
        vec3Points.push(c.position);
    })

    let lineGroup = new THREE.BufferGeometry().setFromPoints(vec3Points);
    lines = new THREE.Line(lineGroup, lineMaterial);
    lines.name = "lines";
    scene.add(circleGroup);
    scene.add(lines);
}

function initializePath(layerHeight, nbLayers, viewerOffsets, pos=[0, 0, 0], values0){ //code repurposed from ToolpathUnitGenerator
    //add vertical cross
    const crossVerticalGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, layerHeight*nbLayers)]);
    const crossVertical = new THREE.Line(crossVerticalGeometry, crossMaterial);
    scene.add(crossVertical);

    // Pad viewer offsets to fit nbLayers
    if(viewerOffsets?.length < nbLayers){ 
        viewerOffsets = viewerOffsets.concat(new Array(nbLayers - viewerOffsets?.length).fill(0));
    } else{
        viewerOffsets = viewerOffsets.slice(0, nbLayers);
    }

    //set camera proportional to radius
    let circleGeometry = new THREE.CircleGeometry(layerHeight/3, 32 ); 

    //Make three-js group for adding draggable circle points
    position = pos;

    for(let i = 0; i < nbLayers; i++){
        let point = { //point, toolpath notation
            x: 0,
            y: 0,
            z: layerHeight*i,
            t: 0
        }
        if(viewerOffsets){
            point.x += viewerOffsets[i];
        }
        if(values0?.length == nbLayers){
            point.x += values0[i];
        }
        
        //add draggable circle per point
        const circle = new THREE.Mesh(circleGeometry, circleMaterial ); 
        circle.position.set(point.x, point.y + yOffset, point.z);
        circle.rotation.x = -Math.PI/2; // face the camera
        circleGroup.add(circle);
    }
    vec3Points = [];
    circleGroup.children.forEach((c) => {
        vec3Points.push(c.position);
    })
    calculateOffsets();

    addLines();
}

// input values change
function refreshPath(){
    circleGroup.remove(...circleGroup.children);
    if(global_state.nbLayers.length != 0 && global_state.layerHeight.length != 0){
        initializePath(global_state.layerHeight, global_state.nbLayers, global_state.prevOffsets, position, global_state.values0);
        prevLayerHeight = global_state.layerHeight;
        prevNbLayers = global_state.nbLayers;
        prevValues0 = global_state.values0;
    }
}

function animate() {
	renderer.render( scene, camera );
    zoomControls.update();
    if(global_state.layerHeight && global_state.nbLayers){
        if(global_state.layerHeight != prevLayerHeight || global_state.nbLayers != prevNbLayers || global_state.values0 != prevValues0){ //execute only on path update, delete and rebuild toolpath
            refreshPath();
        }
    }
}

window.addEventListener("resize", function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//dragging points
let pointZ;
const controls = new DragControls(circleGroup.children, camera, renderer.domElement);

controls.addEventListener('hoveron', function ( event ) {
	event.object.material = circleHighlightMaterial;
})

controls.addEventListener('hoveroff', function ( event ) {
	event.object.material = circleMaterial;
})


controls.addEventListener( 'dragstart', function ( event ) {
    pointZ = event.object.position.z;
} );

controls.addEventListener('drag', function(event){
    event.object.position.z = pointZ;
    addLines();
});

controls.addEventListener( 'dragend', function ( event ) {
    event.object.position.z = pointZ;
	event.object.material = circleMaterial;
    calculateOffsets();
    window.parent.postMessage({message:"run-codemirror"}, '*'); // update TPV when dragend finished
});