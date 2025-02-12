//default variable inports for exponential function

import { html } from "lit-html";
import { parameter } from "../../toolchainParameter.js";

const config = {
  inports: {},
  outports: {
    base: {
      type: "number",
      value: 2.0,
    },
    ampExp: {
      type: "number",
      value: 2,
    },
    amplitude: {
        type: "number",
        value: 10,
    },
    offset: {
      type: "number",
      value: 1,
    },
    mode: {
      type: "string",
      value: "additive",
    },
  },
  state: {
    base: 2.0,
    ampExp: 2.0,
    amplitude: 2.0,
    offset: 1.0,
    mode: "additive",
  },
  ui: {
    displayName: "Exponential Variables",
    width: 200,
    height: 80,
  },
};

function exponentialVariables(inports, outports, state) {
  function render() {
    return html`
        ${parameter("Base", state.base, (value) => { 
            state.base = value; 
            outports.base.value = value; 
        }, false)}
        ${parameter("AmpExp", state.ampExp, (value) => { 
            state.ampExp = value; 
            outports.ampExp.value = value; 
        }, true)}
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

export default { config, tool: exponentialVariables };