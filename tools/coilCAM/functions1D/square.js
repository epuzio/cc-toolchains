import { html } from "lit-html";

import {functions1D} from "coilcam/dist/main";
const {square: ccSquare} = functions1D; //avoid naming conflict


const config = {
  inports: {
    amplitude: {
        type: "number",
        value: null,
    },
    period: {
        type: "number",
        value: null,
    },
    offset: {
        type: "any", //check
        value: null,
    },
    bumps: {
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
    displayName: "CC-square",
    width: 130,
    height: 50,
  },
};

function square(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitude.value !== null && inports.period.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccSquare(inports.amplitude.value, inports.period.value, inports.offset.value, inports.bumps.value, inports.nbPoints.value,
                inports.values0.value, inports.mode.value);
        }
    }
    return {inportsUpdated};
}


export default { config, tool: square };
