import { html } from "lit-html";

import {functions2D} from "coilcam/dist/main";
const {sinusoidal2D: ccSinusoidal2D} = functions2D; //avoid naming conflict

const config = {
  inports: {
    amplitude_X: {
        type: "number",
        value: null,
    },
    period_X: {
        type: "number",
        value: null,
    },
    offset_X: {
        type: "any", //check
        value: null,
    },
    amplitude_Y: {
        type: "number",
        value: null,
    },
    period_Y: {
        type: "number",
        value: null,
    },
    offset_Y: {
        type: "any", //check
        value: null,
    },
    mode: {
        type: "number",
        value: null,
    },
    nbPoints: {
        type: "number",
        value: null,
    },
    values_X: {
        type: "any",
        value: null,
    },
    values_Y: {
        type: "any",
        value: null,
    },
  },
  outports: {
    values: { 
      type: "any",
      value: null,
    },
  },
  ui: {
    displayName: "Sinusoidal2D",
    icon: "wave-square",
    width: 130,
    height: 50,
  },
};

function sinusoidal2D(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitude_X.value !== null && inports.amplitude_Y.value !== null && inports.period_Y.value !== null && inports.period_X.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccSinusoidal2D(inports.amplitude_X.value, inports.period_X.value, inports.amplitude_Y.value, inports.period_Y.value, inports.offset_X.value, inports.offset_Y.value,
                inports.nbPoints.value, inports.values_X.value, inports.values_Y.value, inports.mode.value);
        }
    }
    return {inportsUpdated};
}

export default { config, tool: sinusoidal2D };
