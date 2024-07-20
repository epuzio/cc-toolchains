// Builds upon Path Drawing component, just adds a circle/alters nbPoints/radius
import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

const initialPaths = {
  uniqueName: [
    [
      "circle",
      [12, 30],
      [3],
    ],
  ],
  uniqueName: [
    [
      "circle",
      [12, 12],
      [7],
    ],
  ],
}



const config = {
  inports: {
    bounds: {
      type: "domain2D",
      value: null,
    },
    radius:{
      type: "number",
      value: null,
    },
    nbPoints: {
      type: "number",
      value: null,
    },
  },
  outports: {
    paths: {
      type: "array",
      value: initialPaths[0],
    },
  },
  state: { 
    paths: initialPaths,
    refPath: initialPaths[0],  // Adjust if needed
    realPath: initialPaths[1]
  },
  ui: {
    displayName: "Path",
    width: 500,
    height: 400,
    resize: "both",
  },
};

function pathDrawing(inports, outports, state) {
  let pdiRef = createRef();

  let updateBounds;

  function inportsUpdated() {
    if(inports.radius.value !== null && nbPoints !== null){
      updateBounds(inports.bounds.value);
    }
  }

  function setPaths(paths) {
    state.paths = paths;
    outports.paths.value = paths;
  }

  function postInit() {
    let iframe = document.createElement("iframe");
    iframe.src = "./tools/path/pdi/index.html";

    // outports.paths.value = state.paths;

    iframe.onload = () => {
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
