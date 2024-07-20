import {complexFunctions} from "coilcam/dist/main";
const {waveform: ccWaveform} = complexFunctions; //avoid naming conflict

const config = {
  inports: {
    file: {
        type: "any",
        value: null,
    },
    offset: {
        type: "number",
        value: null,
    },
    nbPoints: {
        type: "number",
        value: null,
    },

    heightRange: {
        type: "array",
        value: null,
    }
  },
  ui: {
    displayName: "CC-union",
    width: 130,
    height: 50,
  },
};

function waveform(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.file.value !== null) {
            outports.values.value = ccWaveform(inports.path0.value, inports.nbPoints.value, inports.offset.value, inports.heightRange.value);
        }
    }
    return {inportsUpdated};
}

export default { config, tool: waveform};
