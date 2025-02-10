//copied from coilcam-js
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {DragControls} from 'three/addons/controls/DragControls.js';

var global_state = {
    svgPath: "",
    radius: 0.0,
    nbPointsInLayer: 0,
    values0: [], // passed in
    userOffsets: [], // passed in, stores the angular/radial offset from point after v0 is applied
    values: [] // returned
};
window.state = global_state;
let prevRadius = 0;
let prevNbPointsInLayer = 0;
let prevValues0 = [];

// Build Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( {color : 0xe3e1de}); //colors from styles.css for pathDrawing
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.up.set(0, 0, 1); // to ensure z is up and down instead of default (y)
camera.position.set(0, 0, 40); //adjust z with radius?
camera.rotation.y = Math.PI;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
const zoomControls = new OrbitControls(camera, renderer.domElement);
zoomControls.enableRotate = false;
const zOffset = -.001

//Add crosshair at position[x, y]
const crossMaterial = new THREE.LineBasicMaterial({color: 0xc2bfba});
const crossHorizontalGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(5, 0, 0), new THREE.Vector3( -5, 0, 0)]);
const crossVerticalGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -5, 0), new THREE.Vector3( 0, 5, 0)]);
const crossHorizontal = new THREE.Line(crossHorizontalGeometry, crossMaterial);
const crossVertical = new THREE.Line(crossVerticalGeometry, crossMaterial);
scene.add(crossHorizontal);
scene.add(crossVertical);

var circleGroup = new THREE.Group();
circleGroup.name = "circleGroup";
const circleMaterial = new THREE.MeshToonMaterial( { color: 0xb7afa6 } ); 
const circleHighlightMaterial = new THREE.MeshToonMaterial( { color: 0x85807b } ); 
var position;
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xc2bfba });
let vec3Points = [];
let defaultVec3Points = []; //save starting vec3
let defaultv0Points = []; //save starting point after v0 offset is applied

function getOffsets(offsetPt, defaultPt){
    const deltaOffset = {x: offsetPt.x - defaultPt.x, y: offsetPt.y - defaultPt.y};
    const angle = Math.atan2(deltaOffset.y, deltaOffset.x);
    const distance = Math.sqrt(deltaOffset.x**2 + deltaOffset.y**2);

    return [distance, angle];
}

function calculateOffsets(){ //radial and angular offset
    let radialOffset = [];
    let angularOffset = [];
    let userOffsets = [[],[]];

    for(let i = 0; i < defaultVec3Points.length; i++){
        //get the difference between the default radial/angular offset and the new radial/angular offset
        let [defaultRadial, defaultAngular] = getOffsets(defaultVec3Points[i], {x: position[0], y: position[1]});
        let [newRadial, newAngular] = getOffsets(vec3Points[i], {x: position[0], y: position[1]});
        radialOffset.push(newRadial - defaultRadial);
        angularOffset.push(newAngular - defaultAngular);

        //get the radial/angular offset from point offset by values0 to user offset point
        let [radial, angular] = getOffsets(vec3Points[i], defaultv0Points[i]);
        userOffsets[0].push(radial);
        userOffsets[1].push(angular);
    }
    window.state.values = [radialOffset, angularOffset];
    window.state.userOffsets = userOffsets;
    window.parent.postMessage({ type: 'radiusStateValuesUpdated', values: { values: window.state.values, userOffsets: window.state.userOffsets } }, window.location.origin);
}

function initializePath(radius, nbPointsInLayer, userOffsets, pos=[0, 0, 0], values0){ //code repurposed from ToolpathUnitGenerator
    //set camera proportional to radius
    let circleGeometry = new THREE.CircleGeometry( radius/10, 32 ); 
    camera.position.set(0, 0, radius*2);

    //Make three-js group for adding draggable circle points
    position = pos;
    position[2] = 0;

    defaultVec3Points = []; //reset defaultVec3Points
    defaultv0Points = []; //reset defaultv0Points

    for(let i = 0; i < nbPointsInLayer; i++){
        let angle = 2 * i * Math.PI / nbPointsInLayer;
        let point = { //point, toolpath notation
            x: (position[0] + (radius) * Math.cos(angle)),
            y: (position[1] + (radius) * Math.sin(angle)),
            z: 0,
            t: 0
        }

        //add standard point to defaultVec3Points
        defaultVec3Points.push(new THREE.Vector3(point.x, point.y, point.z));
        
        if(values0?.length == nbPointsInLayer){
            point.x += (values0[i] * Math.cos(angle));
            point.y += (values0[i] * Math.sin(angle));
        }

        //add point after v0 offset is applied
        defaultv0Points.push(new THREE.Vector3(point.x, point.y, point.z));

        if(userOffsets && userOffsets[0]?.length == nbPointsInLayer && userOffsets[1]?.length == nbPointsInLayer){ 
            point.x += (userOffsets[0][i] * Math.cos(userOffsets[1][i]));
            point.y += (userOffsets[0][i] * Math.sin(userOffsets[1][i]));
        }

        //add draggable circle per point
        const circle = new THREE.Mesh(circleGeometry, circleMaterial ); 
        circle.position.set(point.x, point.y, point.z + zOffset);
        circleGroup.add(circle);
    }

    //draw lines from vec3
    vec3Points = [];
    circleGroup.traverse(function(c){
        if(!(c.position.x == position[0] && c.position.y == position[1] && c.position.z == 0)){
            vec3Points.push(c.position);
        } 
    })
    calculateOffsets();
    vec3Points.push(vec3Points[0]);

    const lineGroup = new THREE.BufferGeometry().setFromPoints(vec3Points);
    const lines = new THREE.Line(lineGroup, lineMaterial);
    lines.name = "lines";
    scene.add(circleGroup);
    scene.add(lines);
}

// input values change
function refreshPath(){
    while (circleGroup.children.length)
    {
        circleGroup.remove(circleGroup.children[0]);
    }
    scene.remove(scene.getObjectByName("lines"));
    if(global_state.nbPointsInLayer.length != 0 && global_state.radius.length != 0){
        initializePath(global_state.radius, global_state.nbPointsInLayer, global_state.userOffsets, position, global_state.values0);
        prevRadius = global_state.radius;
        prevNbPointsInLayer = global_state.nbPointsInLayer;
        prevValues0 = global_state.values0;
    }
}

function animate() {
	renderer.render( scene, camera );
    zoomControls.update();
    if(global_state.radius && global_state.nbPointsInLayer){
        if(global_state.radius != prevRadius || global_state.nbPointsInLayer != prevNbPointsInLayer || global_state.values0 != prevValues0){ //execute only on path update, delete and rebuild toolpath
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
const controls = new DragControls(circleGroup.children, camera, renderer.domElement);
controls.addEventListener( 'dragstart', function ( event ) {
	event.object.material = circleHighlightMaterial;
} );

controls.addEventListener('drag', function(event){
    var lines = scene.getObjectByName("lines");
    scene.remove(lines);
    vec3Points = [];
    circleGroup.traverse(function(c){
        if(!(c.position.x == position[0] && c.position.y == position[1] && c.position.z == 0)){
            vec3Points.push(c.position);
        } 
    })
    vec3Points.push(vec3Points[0]);
    const lineGroup = new THREE.BufferGeometry().setFromPoints(vec3Points);
    let newLines = new THREE.Line(lineGroup, lineMaterial);
    newLines.name = "lines";
    scene.add(circleGroup);
    scene.add(newLines);
});

controls.addEventListener( 'dragend', function ( event ) {
	event.object.material = circleMaterial;
    calculateOffsets();
    window.parent.postMessage({message:"run-codemirror"}, '*'); // update TPV when dragend finished
});


