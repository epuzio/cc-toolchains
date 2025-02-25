import { html } from "lit-html";

import {functions1D} from "coilcam/dist/main";
const {exponential: ccExponential} = functions1D; //avoid naming conflict

const config = {
  inports: {
    base: {
        type: "number",
        value: null,
    },
    amplitudeExponent: {
        type: "number",
        value: null,
    },
    amplitude: {
        type: "number", 
        value: null,
    },
    offset: {
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
    values0: {
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
    displayName: "Exponential",
    icon: "wave-square",
    width: 130,
    height: 50,
  },
};

function exponential(inports, outports){
    function inportsUpdated() {
        if(inports.base.value !== null && inports.amplitudeExponent.value !== null && inports.amplitude.value !== null && inports.nbPoints.value !== null){
            outports.values.value = ccExponential(inports.base.value, inports.amplitudeExponent.value, inports.amplitude.value, inports.offset.value, inports.nbPoints.value,
              inports.values0.value, inports.mode.value);
        }  
    }
    return { inportsUpdated };
}

export default { config, tool: exponential};
