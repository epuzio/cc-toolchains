import { html } from "lit-html";

import {functions2D} from "coilcam/dist/main";
const {sinusoidal2D: ccSinusoidal2D} = functions2D; //avoid naming conflict

const config = {
  inports: {
    amplitudeX: {
        type: "number",
        value: null,
    },
    periodX: {
        type: "number",
        value: null,
    },
    offsetX: {
        type: "any", //check
        value: null,
    },
    amplitudeY: {
        type: "number",
        value: null,
    },
    periodY: {
        type: "number",
        value: null,
    },
    offsetY: {
        type: "any", //check
        value: null,
    },
    nbPoints: {
        type: "number",
        value: null,
    },
    valuesX: {
        type: "any",
        value: null,
    },
    valuesY: {
        type: "any",
        value: null,
    },
    mode: {
        type: "number",
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
    displayName: "CC-sinusoidal2D",
    width: 130,
    height: 50,
  },
};

function sinusoidal2D(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitudeX.value !== null && inports.amplitudeY.value !== null && inports.periodY.value !== null && inports.periodX.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccSinusoidal2D(inports.amplitudeX.value, inports.periodX.value, inports.amplitudeY.value, inports.periodY.value, inports.offsetX.value, inports.offsetY.value,
                inports.nbPoints.value, inports.valuesX.value, inports.valuesY.value, inports.mode.value);
        }
    }
    return {inportsUpdated};
}

export default { config, tool: sinusoidal2D };
