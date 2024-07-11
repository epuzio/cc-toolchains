import { html } from "lit-html";

const config = {
  inports: {
    amplitudeX1: {
        type: "number",
        value: null,
    },
    offsetX1: {
        type: "any", //check
        value: null,
    },
    amplitudeX2: {
        type: "number",
        value: null,
    },
    offsetX2: {
        type: "any", //check
        value: null,
    },
    nbPoints: {
        type: "number",
        value: null,
    },
    values0x: {
        type: "any",
        value: null,
    },
    values0y: {
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
    displayName: "CC-linear2D",
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
function linear2D(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitudeX1.value !== null && inports.amplitudeX2.value !== null && inports.nbPoints.value !== null) {
            inports.offsetX1.value = setParams(inports.offsetX1.value, inports.nbPoints.value, inports.mode.value);
            inports.offsetX2.value = setParams(inports.offsetX2.value, inports.nbPoints.value, inports.mode.value);
            inports.values0x.value = setParams(inports.values0x.value, inports.nbPoints.value, inports.mode.value);
            inports.values0y.value = setParams(inports.values0y.value, inports.nbPoints.value, inports.mode.value);

           if(inports.values0x.value == null || inports.values0y.value == null || inports.offsetX1.value == null || inports.offsetX2.value == null){
                outports.values.value = null;
                return;
            }

            let pointsX = [];
            let pointsY = [];
            for (let i = 0; i < inports.nbPoints.value; i++){
                if (inports.mode.value == "multiplicative"){
                    if(inports.values0.value.every(v => v === 0)){ //if all values0 are 0, do not include values0
                        inports.pointsX.value.push((inports.amplitudeX1.value * i + inports.offsetX1.value[i]));
                        inports.pointsY.value.push((inports.amplitudeX2.value * i + inports.offsetX2.value[i]));
                    }
                    else{
                        pointsX.push((inports.amplitudeX1.value * i + inports.offsetX1.value[i]) * inports.values0x.value[i]);
                        pointsY.push((inports.amplitudeX2.value * i + inports.offsetX2.value[i]) * inports.values0y.value[i]);
                    }
                } else if (inports.mode.value == "additive" || inports.mode.value == null){
                    pointsX.push((inports.amplitudeX1.value * i + inports.offsetX1.value[i]) + inports.values0x.value[i]);
                    pointsY.push((inports.amplitudeX2.value * i + inports.offsetX2.value[i]) + inports.values0y.value[i]);
                }
            }
            outports.values.value = new Array(pointsX, pointsY);
        } else {
            outports.values.value = null;
        }
    }
    return {inportsUpdated};
}

export default { config, tool: linear2D};
