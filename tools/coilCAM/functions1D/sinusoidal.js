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
        type: "number", //check
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
        type: "string",
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

function sinusoidal(inports, outports) {
    function inportsUpdated() {
        if (inports.amplitude.value !== null && inports.period.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccSinusoidal(inports.amplitude.value, inports.period.value, inports.offset.value, inports.nbPoints.value,
              0, inports.mode.value);
        }
        console.log(ccSinusoidal(inports.amplitude.value, inports.period.value, inports.offset.value, 40, 0, ""));
    }
    return { inportsUpdated };
}


export default { config, tool: sinusoidal };
