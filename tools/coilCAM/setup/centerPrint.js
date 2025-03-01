import { html } from "lit-html";

import {setup} from "coilcam/dist/main";
const {centerPrint: ccCenterPrint} = setup; //avoid naming conflict


const config = {
  inports: {
    path: {
        type: "array",
        value: null,
    },
    position: {
        type: "array",
        value: null,
    },
    bedDimensions: {
        type: "array",
        value: null,
    },
    layerHeight: {
        type: "number",
        value: null,
    }
  },
  outports: {
    path: { 
      type: "array",
      value: null,
    },
  },
  ui: {
    displayName: "Center Print",
    icon: "wave-square",
    width: 130,
    height: 50,
  },
};

function centerPrint(inports, outports) {
    function inportsUpdated() {
        if (inports.path.value !== null && inports.position.value !== null && inports.bedDimensions.value && inports.layerHeight.value) {
            outports.path.value = ccCenterPrint(inports.path.value, inports.position.value, inports.bedDimensions.value, inports.layerHeight.value);
        }
    }
    return {inportsUpdated};
}


export default { config, tool: centerPrint };
