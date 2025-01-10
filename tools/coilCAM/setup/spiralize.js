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
    width: 130,
    height: 50,
  },
  state: {
    pathOut: [],
  },
};

function spiralize(inports, outports, state) { //for now, resemble constants
    function inportsUpdated() {
        // console.log("path in: ", inports.pathIn.value, " layerheight: ", inports.layerHeight.value);
        if (inports.pathIn.value !== null && inports.layerHeight !== null) { 
            // console.log("output should be: ", ccSpiralize(inports.pathIn.value, inports.layerHeight.value));
            outports.pathOut.value = ccSpiralize(inports.pathIn.value, inports.layerHeight.value);
            state.pathOut = outports.pathOut.value;
        }
    }
    return {inportsUpdated};
}


export default { config, tool: spiralize };
