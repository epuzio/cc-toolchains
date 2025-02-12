//default variable inports for linear function

import { html } from "lit-html";
import { parameter } from "../../toolchainParameter.js";

const config = {
  inports: {},
  outports: {
    amplitude: {
      type: "number",
      value: 2.0,
    },
    offset: {
      type: "number",
      value: 0,
    },
    mode: {
      type: "string",
      value: "additive",
    },
  },
  state: {
    amplitude: 2.0,
    offset: 0.0,
    mode: "additive",
  },
  ui: {
    displayName: "Linear Variables",
    width: 200,
    height: 80,
  },
};

function linearVariables(inports, outports, state) {
  function render() {
    return html`
      ${parameter("Amplitude", state.amplitude, (value) => { 
          state.amplitude = value; 
          outports.amplitude.value = value; 
      }, false)}
      ${parameter("Offset", state.offset, (value) => { 
          state.offset = value;
          outports.offset.value = value; 
      }, true)}
      ${parameter("Mode", state.mode, (value) => { 
        state.mode = value;
        outports.mode.value = value ? "additive" : "multiplicative"; 
      }, false)}
    `;
  }
  return { render };
}

export default { config, tool: linearVariables };