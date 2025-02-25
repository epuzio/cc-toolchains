import { html } from "lit-html";
import { parameter } from "../../toolchainParameter.js";

const config = {
  inports: {},
  outports: {
    position: {
      type: "array",
      value: [0, 0, 0],
    },
    radius: {
      type: "number",
      value: 50,
    },
    layerHeight: {
      type: "number",
      value: 2.5,
    },
    nbLayers: {
      type: "number",
      value: 40,
    },
    nbPointsInLayer: {
      type: "number",
      value: 5,
    },
  },
  state: { 
    // valueX: 0, valueY: 0.0, valueZ: 0.0, 
    position: [0, 0, 0],
    radius: 50,
    layerHeight: 2.5,
    nbLayers: 40,
    nbPointsInLayer: 5,
  },
  ui: {
    displayName: "Toolpath Variables",
    width: 210,
    height: 150,
  },
};


function toolpathVariables(inports, outports, state) {
  function render() {
    return html`
      ${parameter("Position", state.position, (value) => { 
          state.position = value; 
          outports.position.value = value; 
      }, false)}
      ${parameter("Radius", state.radius, (value) => { 
          state.radius = value; 
          outports.radius.value = value; 
      }, true)}
      ${parameter("Layer Height", state.layerHeight, (value) => { 
          state.layerHeight = value; 
          outports.layerHeight.value = value; 
      }, false)}
      ${parameter("Layers", state.nbLayers, (value) => { 
          state.nbLayers = value;
          outports.nbLayers.value = value; 
      }, true)}
      ${parameter("Layer Points", state.nbPointsInLayer, (value) => { 
          state.nbPointsInLayer = value;
          outports.nbPointsInLayer.value = value; 
      }, false)}
    `;
  }
  return {render};  
}

export default { config, tool: toolpathVariables };