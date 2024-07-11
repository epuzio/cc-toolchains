import { html } from "lit-html";

const config = {
  inports: {
    amplitudeX1: {
        type: "number",
        value: null,
    },
    periodX1: {
        type: "number",
        value: null,
    },
    amplitudeX2: {
        type: "number",
        value: null,
    },
    periodX2: {
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
    values: { 
      type: "any",
      value: null,
    },
  },
  ui: {
    displayName: "CC-sinusoidal2D",
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
function sinusoidal2D(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitudeX1.value !== null && inports.amplitudeX2.value !== null && inports.periodX2.value !== null && inports.periodX1.value !== null && inports.nbPoints.value !== null) {
            inports.offset.value = setParams(inports.offset.value, inports.nbPoints.value, inports.mode.value);
            inports.values0x.value = setParams(inports.values0x.value, inports.nbPoints.value, inports.mode.value);
            inports.values0y.value = setParams(inports.values0y.value, inports.nbPoints.value, inports.mode.value);

           if(inports.values0x.value == null || inports.values0y.value == null || inports.offset.value == null){
                outports.values.value = null;
                return;
            }

            let pointsX = [];
            let pointsY = [];
            for (let i = 0; i < inports.nbPoints.value; i++){
                if (inports.mode.value == "multiplicative"){
                    if(inports.values0.value.every(v => v === 0)){ //if all values0 are 0, do not include values0
                        pointsX.push(inports.amplitudeX1.value * Math.cos(2 * Math.PI * i / inports.periodX1.value + inports.offset.value[i]));
                        pointsY.push(inports.amplitudeX2.value * Math.sin(2 * Math.PI * i / inports.periodX2.value + inports.offset.value[i]));    
                    }
                    else{
                        pointsX.push(inports.amplitudeX1.value * Math.cos(2 * Math.PI * i / inports.periodX1.value + inports.offset.value[i]) * inports.values0x.value[i]);
                        pointsY.push(inports.amplitudeX2.value * Math.sin(2 * Math.PI * i / inports.periodX2.value + inports.offset.value[i]) * inports.values0y.value[i]);
                    }
                } else if (inports.mode.value == "additive" || inports.mode.value == null){
                    pointsX.push(inports.amplitudeX1.value * Math.cos(2 * Math.PI * i / inports.periodX1.value + inports.offset.value[i]) + inports.values0x.value[i]);
                    pointsY.push(inports.amplitudeX2.value * Math.sin(2 * Math.PI * i / inports.periodX2.value + inports.offset.value[i]) + inports.values0y.value[i]);
                }
            }
            console.log("sin2d", new Array(pointsX, pointsY));
            outports.values.value = new Array(pointsX, pointsY);
        } else {
            outports.values.value = null;
        }
    }
    return {inportsUpdated};
}

export default { config, tool: sinusoidal2D };
