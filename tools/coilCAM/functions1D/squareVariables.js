//default variable inports for sinusoidal function

import { html } from "lit-html";
import { parameter } from "../toolchainParameter.js";

const config = {
  inports: {},
  outports: {
    amplitude: {
      type: "number",
      value: null,
    },
    period: {
      type: "number",
      value: null,
    },
    offset: {
      type: "number",
      value: null,
    },
    bumps: {
        type: "number",
        value: null
    }
  },
  state: {
        amplitude: 0.0,
        period: 0.0,
        offset: 0.0,
        bumps: 0.0
  },
  ui: {
    displayName: "Square Variables",
    width: 200,
    height: 80,
  },
};

function squareVariables(inports, outports, state) {
  function render() {
    return html`
        ${parameter("Amplitude", state.amplitude, (value) => { 
          state.amplitude = value; 
          outports.amplitude.value = value; 
        })}
        ${parameter("Period", state.period, (value) => { 
            state.period = value; 
            outports.period.value = value; 
        })}
        ${parameter("Offset", state.offset, (value) => { 
            state.offset = value;
            outports.offset.value = value;
        })}
        ${parameter("Bumps", state.bumps, (value) => { 
            state.bumps = value;
            outports.bumps.value = value;
        })}
    `;
  }
  return { render };
}

export default { config, tool: squareVariables };
