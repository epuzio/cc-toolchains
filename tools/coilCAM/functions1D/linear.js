import { html } from "lit-html";

import {functions1D} from "coilcam/dist/main";
const {linear: ccLinear} = functions1D; //avoid naming conflict


const config = {
  inports: {
    amplitude: {
        type: "number",
        value: null,
    },
    offset: {
        type: "any", 
        value: null,
    },
    nbPoints: {
        type: "number",
        value: null,
    },
    values0: {
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
    displayName: "CC-linear",
    width: 130,
    height: 50,
  },
};

function linear(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitude.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccLinear(inports.amplitude.value, inports.offset.value, inports.nbPoints.value, inports.values0.value,inports.mode.value)
        }
    }
    return {inportsUpdated};
}

export default { config, tool: linear };
