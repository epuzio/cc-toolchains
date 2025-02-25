import { html } from "lit-html";

import {setup} from "coilcam/dist/main";
const {spiralize: ccSpiralize} = setup; //avoid naming conflict


const config = {
  inports: {
    pathIn: {
        type: "array",
        value: null,
    },
    layerHeight: {
        type: "number",
        value: null,
    }
  },
  outports: {
    pathOut: { 
      type: "array",
      value: [],
    },
  },
  ui: {
    displayName: "Spiralize",
    icon: "wave-square",
    width: 130,
    height: 50,
  },
  state: {
    pathOut: [],
  },
};

function spiralize(inports, outports, state) {
    function inportsUpdated() {
        if (inports.pathIn.value !== null && inports.layerHeight !== null) { 
            outports.pathOut.value = ccSpiralize(inports.pathIn.value, inports.layerHeight.value);
            state.pathOut = outports.pathOut.value;
        }
    }
    return {inportsUpdated};
}


export default { config, tool: spiralize };
