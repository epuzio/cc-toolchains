//default variable inports for sinusoidal function
//note: will appear as "default" option when sinusoidal tool is added

import { html } from "lit-html";
import { parameter } from "../../toolchainParameter.js";

const config = {
  inports: {},
  outports: {
    amplitude: {
      type: "number",
      value: 5.0,
    },
    period: {
      type: "number",
      value: 10,
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
    amplitude: 5.0,
    period: 10.0,
    offset: 0.0,
    mode: "additive",
  },
  ui: {
    displayName: "Sinusoidal Variables",
    width: 200,
    height: 80,
  },
};

function sinusoidalVariables(inports, outports, state) {
  function render() {
    return html`
      ${parameter("Amplitude", state.amplitude, (value) => { 
          state.amplitude = value; 
          outports.amplitude.value = value; 
      }, false)}
      ${parameter("Period", state.period, (value) => { 
          state.period = value; 
          outports.period.value = value; 
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

export default { config, tool: sinusoidalVariables };