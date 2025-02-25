import { html } from "lit-html";

import {functions1D} from "coilcam/dist/main";
const {staircase: ccStaircase} = functions1D; //avoid naming conflict


const config = {
  inports: {
    stepWidth: {
        type: "number",
        value: null,
    },
    stepHeight: {
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
    displayName: "Staircase",
    icon: "wave-square",
    width: 130,
    height: 50,
  },
};

function staircase(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.stepWidth.value !== null && inports.stepHeight.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccStaircase(inports.stepWidth.value, inports.stepHeight.value, inports.offset.value, 
                inports.nbPoints.value, inports.values0.value, inports.mode.value);
        }
    }
    return {inportsUpdated};
}

export default { config, tool: staircase };
