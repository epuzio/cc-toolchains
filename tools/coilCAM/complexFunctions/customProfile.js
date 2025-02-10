import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

const config = {
    inports: {
        nbLayers: { 
            type: "number",
            value: null,
        },
        layerHeight: { 
            type: "number",
            value: null,
        },
        values0:{
            type: "array",
            value: null,
        }
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
        values0: [],
        prevOffsets: []
    },
    ui: {
      displayName: "CC-CustomProfile",
      width: 500,
      height: 500,
    },
};

function setOutputValues(outports, outputValues, state) {
    if (outputValues && outports.values) {
        if(state.values0){
            state.prevOffsets = outputValues.map((offset, idx) => (offset - state.values0[idx]));
        } else {
            state.prevOffsets = outputValues;
        }
        outports.values.value = outputValues;
    } else {
        console.error("outports.values is not defined.");
    }
}

function layerViewer(inports, outports, state, global) {
    let iframe;
    let pdiRef = createRef();

    function inportsUpdated(){
        if(inports.nbLayers.value && inports.layerHeight.value){
            state.nbLayers = inports.nbLayers.value;
            state.layerHeight = inports.layerHeight.value;
            state.values0 = inports.values0.value;
        }
        iframe.contentWindow.state.nbLayers = state.nbLayers;
        iframe.contentWindow.state.layerHeight = state.layerHeight;
        iframe.contentWindow.state.values0 = inports.values0.value;
        iframe.contentWindow.state.prevOffsets = state.prevOffsets; 
        setOutputValues(outports, iframe.contentWindow.state?.values, state);
    }

    // Event listener to update outports when values update in 3js visualizer
    window.addEventListener('message', (event) => {
        if (event.data.type === 'profileStateValuesUpdated') {
            setOutputValues(outports, event.data.values, state);
        }
    });

    function postInit() {
        iframe = document.createElement("iframe");
        iframe.src = "./tools/coilCAM/complexFunctions/profileViewer/profileViewer.html";
        
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