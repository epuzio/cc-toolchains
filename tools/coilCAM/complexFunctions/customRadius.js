import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

const config = {
    inports: {
        radius: { 
            type: "number",
            value: null,
        },
        nbPointsInLayer: { 
            type: "number",
            value: null,
        },
    },
    outports: {
        values: { 
          type: "any",
          value: [],
        },
      },
    state: { 
        radius: null,
        nbPointsInLayer: null,
        offsets: []
    },
    ui: {
      displayName: "CC-CustomRadius",
      width: 500,
      height: 500,
    },
};

function setOutputValues(outports, outputValues, state) {
    if (outputValues && outports.values) {
        state.offsets = outputValues;
        outports.values.value = outputValues;
    } else {
        console.error("outports.values is not defined.");
    }
}

function layerViewer(inports, outports, state, global) {
    let iframe;
    let pdiRef = createRef();

    function inportsUpdated(){
        if(inports.radius.value && inports.nbPointsInLayer.value){
            state.nbPointsInLayer = inports.nbPointsInLayer.value;
            state.radius = inports.radius.value;
        }
        iframe.contentWindow.state.nbPointsInLayer = state.nbPointsInLayer;
        iframe.contentWindow.state.radius = state.radius;

        // TO FIX: offsets should update from saved state.
        // There is currently no function to convert from polar to cartesian offsets in layerViewer
        iframe.contentWindow.state.values = state.offsets;
        setOutputValues(outports, iframe.contentWindow.state?.values, state);
    }

    // Event listener to update outports when values update in 3js visualizer
    window.addEventListener('message', (event) => {
        if (event.data.type === 'radiusStateValuesUpdated') {
            setOutputValues(outports, event.data.values, state);
        }
    });

    function postInit() {
        iframe = document.createElement("iframe");
        iframe.src = "./tools/coilCAM/complexFunctions/layerViewer/layerViewer.html";
        
        pdiRef.value.appendChild(iframe);
        iframe.onload = () => { // update visualizer from saved state onload
            inportsUpdated();
        };
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
    return {render, postInit, inportsUpdated};
}
  
  
export default { config, tool: layerViewer};