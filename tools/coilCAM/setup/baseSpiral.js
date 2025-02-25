import { html } from "lit-html";

import {setup} from "coilcam/dist/main";
const {baseSpiral: ccBaseSpiral} = setup; //avoid naming conflict


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
    zOffset: {
      type: "number",
      value: 0,
    },
    rotation: {
      type: "number",
      value: 0,
    },
  },
  outports: {
    path: { 
      type: "array",
      value: [],
    },
  },
  ui: {
    displayName: "Base Spiral",
    icon: "wave-square",
    width: 130,
    height: 50,
  },
  state: {
    position: [0, 0, 0], //default
    radius: null,
    nbPointsInLayer: null,
    nozzleDiameter: null,
    zOffset: 0,
    rotation: 0
  },
};

function baseSpiral(inports, outports, state) {
  function inportsUpdated() {
      if (inports.nbPointsInLayer.value !== null && inports.nbPointsInLayer.value !== null && inports.nozzleDiameter.value !== null && inports.radius.value !== null) { 
          outports.path.value = ccBaseSpiral(inports.position.value, inports.nbPointsInLayer.value, inports.nozzleDiameter.value, inports.radius.value, inports.zOffset.value, inports.rotation.value);
        }
  }
  return {inportsUpdated};
}


export default { config, tool: baseSpiral };
