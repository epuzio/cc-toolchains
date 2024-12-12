//default variable inports for sinusoidal function

import { html } from "lit-html";
import { parameter } from "../toolchainParameter.js";

const config = {
  inports: {},
  outports: {
    stepWidth: {
      type: "number",
      value: 2,
    },
    stepHeight: {
      type: "number",
      value: 3,
    },
    offset: {
      type: "number",
      value: 0,
    },
  },
  state: {
    stepWidth: 1,
    stepHeight: 1,
    offset: 0
  },
  ui: {
    displayName: "Staircase Variables",
    width: 200,
    height: 80,
  },
};

function staircaseVariables(inports, outports, state) {
  function render() {
    return html`
        ${parameter("Step Width", state.stepWidth, (value) => { 
          state.stepWidth = value;
          outports.stepWidth.value = value; 
        })}
        ${parameter("Step Height", state.stepHeight, (value) => { 
          state.stepHeight = value;
          outports.stepHeight.value = value; 
        })}
        ${parameter("Offset", state.offset, (value) => { 
          state.offset = value;
          outports.offset.value = value; 
        })}
    `;
  }
  return { render };
}

export default { config, tool: staircaseVariables };
