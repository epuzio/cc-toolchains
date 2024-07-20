import { html } from "lit-html";

import {functions2D} from "coilcam/dist/main";
const {linear2D: ccLinear2D} = functions2D; //avoid naming conflict

const config = {
  inports: {
    amplitudeX1: {
        type: "number",
        value: null,
    },
    offsetX1: {
        type: "any", //check
        value: null,
    },
    amplitudeX2: {
        type: "number",
        value: null,
    },
    offsetX2: {
        type: "any", //check
        value: null,
    },
    nbPoints: {
        type: "number",
        value: null,
    },
    values0x: {
        type: "any",
        value: null,
    },
    values0y: {
        type: "any",
        value: null,
    },
    mode: {
        type: "number",
        value: null,
    },
  },
  outports: {
    values: { //?
      type: "any",
      value: null,
    },
  },
  ui: {
    displayName: "CC-linear2D",
    width: 130,
    height: 50,
  },
};

function linear2D(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitudeX1.value !== null && inports.amplitudeX2.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccLinear2D(inports.amplitudeX1.value, inports.offsetX1.value, inports.amplitudeX2.value, inports.offsetX2.value,
                inports.nbPoints.value, inports.values0x.value, inports.values0y.value, inports.mode.value);
        }
    }
    return {inportsUpdated};
}

export default { config, tool: linear2D};
