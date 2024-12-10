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
  state: {},
  ui: {
    displayName: "Sinusoidal Variables",
    width: 200,
    height: 150,
  },
};

function sinusoidalVariables(inports, outports, state) {
    const increments = {
        min: -9999999.0,
        max: 9999999.0,
        step: 1.0 //tofix: error where step increases to nearest whole number
    }

  function render() {
    return html`
        ${parameter("Amplitude", outports.amplitude.value, increments, (value) => { outports.amplitude.value = value; })}
        ${parameter("Period", outports.period.value, increments, (value) => { outports.period.value = value; })}
        ${parameter("Offset", outports.offset.value, increments, (value) => { outports.offset.value = value; })}
    `;
  }

  return { render };
}

export default { config, tool: sinusoidalVariables };
