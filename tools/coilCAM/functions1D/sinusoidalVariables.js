//default variable inports for sinusoidal function

import { html } from "lit-html";
import { parameter } from "../toolchainParameter.js";

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
    }
  },
  state: {
    amplitude: 0.0,
    period: 0.0,
    offset: 0.0,
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
      })}
      ${parameter("Period", state.period, (value) => { 
          state.period = value; 
          outports.period.value = value; 
      })}
      ${parameter("Offset", state.offset, (value) => { 
          state.offset = value;
          outports.offset.value = value; })}
    `;
  }
  return { render };
}

export default { config, tool: sinusoidalVariables };
