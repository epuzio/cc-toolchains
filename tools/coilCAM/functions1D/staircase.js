import { html } from "lit-html";

const config = {
  inports: {
    stepWidth: {
        type: "number",
        value: null,
    },
    stepHeight: {
        type: "number",
        value: null,
    },
    offset: {
        type: "any", //check
        value: null,
    },
    nbPoints: {
        type: "number",
        value: null,
    },
    values0: {
        type: "any",
        value: null,
    },
    mode: {
        type: "number",
        value: null,
    },
  },
  outports: {
    values: { //?
      type: "any",
      value: null,
    },
  },
  ui: {
    displayName: "CC-staircase",
    width: 130,
    height: 50,
  },
};
function setParams(value, nbPoints){
    if (value == null){
        return new Array(nbPoints).fill(0);
    } else if(!Array.isArray(value)){
        return new Array(nbPoints).fill(value);
    } else if(value.length == nbPoints){
        return value;   
    }
    return null;
}
function linear(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.stepWidth.value !== null && inports.stepHeight.value !== null && inports.nbPoints.value !== null) {
            inports.offset.value = setParams(inports.offset.value, inports.nbPoints.value, inports.mode.value);
            inports.values0.value = setParams(inports.values0.value, inports.nbPoints.value, inports.mode.value);

           if(inports.values0.value == null || inports.offset.value == null){
                outports.values.value = null;
                return;
            }

            let index = 0;
            let out = [];
            for (let i = 0; i < inports.nbPoints.value; i++){
                if (inports.mode.value == "multiplicative"){

                    if (i % inports.stepWidth.value == 0 && i != 0){
                        index += inports.stepHeight.value;
                    }
                    if(inports.values0.value.every(v => v === 0)){
                        out.push((index + inports.offset.value[i]));
                    } else{
                        out.push((index + inports.offset.value[i]) * inports.values0.value[i]);
                    }
                } else if (inports.mode.value == "additive" || inports.mode.value == null){
                    if (i % inports.stepWidth.value == 0 && i != 0){
                        index += inports.stepHeight.value;
                    }
                    if(inports.values0.value.every(v => v === 0)){
                        out.push((index + inports.offset.value[i]));
                    } else{
                        out.push((index + inports.offset.value[i]) * inports.values0.value[i]);
                    }
                }
            }
            console.log("stair out:", out);
            outports.values.value = out;
        } else {
            outports.values.value = null;
        }
    }
    return {inportsUpdated};
}

export default { config, tool: linear };
