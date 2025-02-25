import { html } from "lit-html";
import { css } from './arrayOperatorCSS.js';

const config = {
    inports: {
        path1: {
            type: "array",
            value: [],
        },
        path2: {
            type: "array",
            value: [],
        }
    },
    state: {
        path1: [],
        path2: []
    },
    outports: {
        pathOut: {
            type: "array",
            value: [],
        },
    },
    ui: {
        displayName: "Join Paths",
        icon: "wave-square",
    }
};

const increments = {
    min: -9999999.0,
    max: 9999999.0,
    step: 1.0 
};
  
function joinArr(inports, outports, state) {
    function inportsUpdated() {
      if (inports.path1.value !== null && inports.path2.value !== null) {
        outports.pathOut.value = inports.path1.value.concat(inports.path2.value);
        state.path1 = inports.path1.value;
        state.path2 = inports.path2.value;
      } else {
        outports.pathOut.value = [];
        state.path1 = [];
        state.path2 = [];
      }
    }
  
    return { inportsUpdated };
}

export default { config, tool: joinArr };