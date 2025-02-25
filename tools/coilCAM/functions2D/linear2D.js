import { html } from "lit-html";

import {functions2D} from "coilcam/dist/main";
const {linear2D: ccLinear2D} = functions2D; //avoid naming conflict

const config = {
  inports: {
    amplitude_X: {
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
    values0_X: {
        type: "any",
        value: null,
    },
    values0_Y: {
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
    displayName: "Linear2D",
    icon: "wave-square",
    width: 130,
    height: 50,
  },
};

function linear2D(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitude_X.value !== null && inports.amplitude_Y.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccLinear2D(inports.amplitude_X.value, inports.offset_X.value, inports.amplitude_Y.value, inports.offset_Y.value,
                inports.nbPoints.value, inports.values0_X.value, inports.values0_Y.value, inports.mode.value);
        }
    }
    return {inportsUpdated};
}

export default { config, tool: linear2D};
