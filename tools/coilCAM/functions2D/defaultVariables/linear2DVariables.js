//default variable inports for linear2D function

import { html } from "lit-html";
import { parameter } from "../../toolchainParameter.js";

const config = {
  inports: {},
  outports: {
    amplitude_X: {
      type: "number",
      value: 5.0,
    },
    offset_X: {
        type: "number",
        value: 5.0,
    },
    amplitude_Y: {
        type: "number",
        value: 3.0,
    },
    offset_Y: {
        type: "number",
        value: 3.0,
    },
    mode: {
      type: "string",
      value: "additive",
    },
  },
  state: {
    amplitude_X: 5.0,
    offset_X: 5.0,
    amplitude_Y: 3.0,
    offset_Y: 3.0,
    mode: "additive",
  },
  ui: {
    displayName: "Linear 2D Variables",
    width: 200,
    height: 80,
  },
};

function linear2DVariables(inports, outports, state) {
  function render() {
    return html`
      ${parameter("Amplitude X", state.amplitude_X, (value) => { 
          state.amplitude_X = value; 
          outports.amplitude_X.value = value; 
      }, false)}
      ${parameter("Offset X", state.offset_X, (value) => { 
          state.offset_X = value; 
          outports.offset_X.value = value; 
      }, true)}
      ${parameter("Amplitude Y", state.amplitude_Y, (value) => { 
          state.amplitude_Y = value;
          outports.amplitude_Y.value = value; 
      }, false)}
      ${parameter("Offset Y", state.offset_Y, (value) => { 
        state.offset_Y = value; 
        outports.offset_Y.value = value; 
      }, true)}
      ${parameter("Mode", state.mode, (value) => { 
        state.mode = value;
        outports.mode.value = value ? "additive" : "multiplicative"; 
      }, false)}
    `;
  }
  return { render };
}

export default { config, tool: linear2DVariables };