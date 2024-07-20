import { html } from "lit-html";

import {functions1D} from "coilcam/dist/main";
const {sinusoidal: ccSinusoidal} = functions1D; //avoid naming conflict

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
    displayName: "CC-sinusoidal",
    width: 130,
    height: 50,
  },
};

function sinusoidal(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitude.value !== null && inports.period.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccSinusoidal(inports.amplitude.value, inports.period.value, inports.offset.value, inports.nbPoints.value,
                inports.values0.value, inports.mode.value);
        }
    }
    return {inportsUpdated};
}


export default { config, tool: sinusoidal };
