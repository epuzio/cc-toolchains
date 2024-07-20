import {complexFunctions} from "coilcam/dist/main";
const {difference: ccDifference} = complexFunctions; //avoid naming conflict

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
    displayName: "CC-difference",
    width: 130,
    height: 50,
  },
};

function difference(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.path0.value !== null && inports.path1.value !== null) {
            outports.values.value = ccDifference(inports.path0.value, inports.path1.value);
        }
    }
    return {inportsUpdated};
}

export default { config, tool: difference};
