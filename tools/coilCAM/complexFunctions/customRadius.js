// Builds upon Path Drawing component, just adds a circle/alters nbPoints/radius
import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";
import { initial } from "lodash";

var initialPaths = {};
// function updateLayer(radius, nbPointsInLayer, pos=[0, 0, 0]){


var config = {
  inports: {
    radius:{
      type: "number",
      value: null,
    },
    nbPointsInLayer: {
      type: "number",
      value: null,
    },
    position: {
      type: "array",
      value: null,
    },
  },
  outports: {
    paths: {
      type: "array",
      value: null
    },
  },
  state: { 
    paths: initialPaths
  },
  ui: {
    displayName: "CC-CustomRadius",
    width: 500,
    height: 400,
    resize: "both",
  },
};

function setBKGCircle(radius){
  return {
    uniqueName1: [
      [
        "circle",
        [12, 12],
        [radius],
      ],
    ],
    uniqueName2: [
      [
        "circle",
        [4, 4],
        [7],
      ],
    ],
  }
}

function pathDrawing(inports, outports, state) {
  let pdiRef = createRef();

  let updateBounds;

  function setPaths(paths) {
    state.paths = paths;
    outports.paths.value = paths;
  }

  //TODO: connect to outports
  function inportsUpdated() {
    // updateBounds(inports.bounds.value); //uncommenting causes bugs here, not in pathDrawing.js
    // inports.radius.value = 5;
    // inports.nbPoints.value = 10;
    if(inports.radius.value !== null && inports.nbPoints.value !== null){
      initialPaths = setBKGCircle(inports.radius.value);
      state.paths = initialPaths;
      outports.paths.value = initialPaths;
      // setPoints(inports.nbPoints.value);
      if(window.setPaths){
        console.log("window set paths:", window.setPaths);
        window.setPaths(initialPaths);
      }
      console.log(initialPaths);
      console.log("outport path:", outports.paths.value, " <-");
      console.log("state path:", state.paths, " <-");
    }
  }

  

  function postInit() {
    let iframe = document.createElement("iframe");
    iframe.src = "./tools/path/pdi/index.html";

    // outports.paths.value = state.paths;

    iframe.onload = () => {
      console.log("loaded");
      let pWindow = iframe.contentWindow;
      pWindow.state.paths = state.paths;
      pWindow.setPaths = setPaths;
      updateBounds = (bounds) => pWindow.setBounds(bounds);
    };

    pdiRef.value.appendChild(iframe);
  }

  function render() {
    return html`<style>
        #pdi {
          display: block;
          border: none;
          height: 100%;
          width: 100%;
        }

        iframe {
          display: block;
          border: none;
          height: 100%;
          width: 100%;
        }
      </style>
      <div id="pdi" ${ref(pdiRef)}></div>`;
  }

  return { render, postInit, inportsUpdated };
}

export default { config, tool: pathDrawing };