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
        value: 0,
    },
    mode: {
      type: "any",
      value: "",
    },
    nbPoints: {
        type: "number",
        value: null,
    },
    values0: {
        type: "any",
        value: 0,
    },
  },
  outports: {
    values: { //?
      type: "any",
      value: null,
    },
  },
  ui: {
    displayName: "Sinusoidal",
    icon: "wave-square",
    width: 130,
    height: 50,
  },
};

function sinusoidal(inports, outports) {
    function inportsUpdated() {
        if (inports.amplitude.value !== null && inports.period.value !== null && inports.nbPoints.value !== null) {
            outports.values.value = ccSinusoidal(inports.amplitude.value, inports.period.value, inports.offset.value, inports.nbPoints.value,
              inports.values0.value, inports.mode.value);
        }
        // console.log(ccSinusoidal(inports.amplitude.value, inports.period.value, inports.offset.value, inports.nbPoints.value, inports.values0.value, inports.mode.value));
    }
    return { inportsUpdated };
}


export default { config, tool: sinusoidal };
