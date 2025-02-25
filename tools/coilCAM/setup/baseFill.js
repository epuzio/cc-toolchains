import { html } from "lit-html";

import {setup} from "coilcam/dist/main";
const {baseFill: ccBaseFill} = setup; //avoid naming conflict
// import { baseFillTest } from "./baseTest";

const config = {
  inports: {
    position: {
        type: "array",
        value: [0, 0, 0],
    },
    radius: {
        type: "number",
        value: null,
    },
    nbPointsInLayer: {
        type: "number",
        value: null,
    },
    nozzleDiameter: {
        type: "number",
        value: null,
    },
    path: {
      type: "number",
      value: [],
    },
    zOffset: { //optional
      type: "number",
      value: 0,
    },
    rotation: { //optional
      type: "number",
      value: 0
    }
  },
  outports: {
    path: { 
      type: "array",
      value: [],
    },
  },
  ui: {
    displayName: "Base Fill",
    icon: "wave-square",
    width: 130,
    height: 50,
  },
  state: {
    position: [0, 0, 0], //default
    radius: null,
    nbPointsInLayer: null,
    layerHeight: null,
    nozzleDiameter: null,
    zOffset: 0,
    rotation: 0
  },
};

function baseFill(inports, outports, state) {
    function inportsUpdated() {
        if (inports.position.value !== null && inports.nbPointsInLayer.value !== null && inports.nozzleDiameter.value !== null && inports.radius.value !== null && inports.path.value !== null) { 
            outports.path.value = ccBaseFill(inports.position.value, inports.radius.value, inports.nbPointsInLayer.value, inports.nozzleDiameter.value, inports.path.value, inports.zOffset.value, inports.rotation.value);
          }
    }
    return {inportsUpdated};
}

export default { config, tool: baseFill };
