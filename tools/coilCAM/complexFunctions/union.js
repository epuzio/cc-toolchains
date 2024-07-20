import {complexFunctions} from "coilcam/dist/main";
const {union: ccUnion} = complexFunctions; //avoid naming conflict
const config = {
  inports: {
    path0: {
        type: "array",
        value: null,
    },
    path1: {
        type: "array",
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
    displayName: "CC-union",
    width: 130,
    height: 50,
  },
};

function union(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.path0.value !== null && inports.path1.value !== null) {
            outports.values.value = ccUnion(inports.path0.value, inports.path1.value);
        }
    }
    return {inportsUpdated};
}

export default { config, tool: union};
