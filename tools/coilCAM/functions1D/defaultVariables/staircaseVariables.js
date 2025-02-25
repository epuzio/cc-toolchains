//default variable inports for staircase function

import { html } from "lit-html";
import { parameter } from "../../toolchainParameter.js";

const config = {
  inports: {},
  outports: {
    stepWidth: {
      type: "number",
      value: 2.0,
    },
    stepHeight: {
      type: "number",
      value: 3.0,
    },
    offset: {
      type: "number",
      value: 0.0,
    },
    mode: {
      type: "string",
      value: "additive",
    },
  },
  state: {
    stepWidth: 2.0,
    stepHeight: 3.0,
    offset: 0.0,
    mode: "additive",
  },
  ui: {
    displayName: "Staircase Variables",
    width: 200,
    height: 80,
  },
};

function linearVariables(inports, outports, state) {
  function render() {
    return html`
      ${parameter("Step Width", state.stepWidth, (value) => { 
          state.stepWidth = value; 
          outports.stepWidth.value = value; 
      }, false)}
      ${parameter("Step Height", state.stepHeight, (value) => { 
        state.stepHeight = value; 
        outports.stepHeight.value = value; 
      }, true)}
      ${parameter("Offset", state.offset, (value) => { 
          state.offset = value;
          outports.offset.value = value; 
      }, false)}
      ${parameter("Mode", state.mode, (value) => { 
        state.mode = value;
        outports.mode.value = value ? "additive" : "multiplicative"; 
      }, true)}
    `;
  }
  return { render };
}

export default { config, tool: linearVariables };