import { html } from "lit-html";

const config = {
  inports: {
    amplitude: {
        type: "number",
        value: null,
    },
    period: {
        type: "number",
        value: null,
    },
    offset: {
        type: "any", //check
        value: null,
    },
    bumps: {
        type: "number",
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
    values: { 
      type: "any",
      value: null,
    },
  },
  ui: {
    displayName: "CC-square",
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
function square(inports, outports) { //for now, resemble constants
    function inportsUpdated() {
        if (inports.amplitude.value !== null && inports.period.value !== null && inports.nbPoints.value !== null) {
            inports.offset.value = setParams(inports.offset.value, inports.nbPoints.value, inports.mode.value);
            inports.values0.value = setParams(inports.values0.value, inports.nbPoints.value, inports.mode.value);

           if(inports.values0.value == null || inports.offset.value == null){
                outports.values.value = null;
                return;
            }

            if(inports.bumps.value == null){
                inports.bumps.value = 0;
            }

            let out = [];
            for (let i = 0; i < inports.nbPoints.value; i++){
                let bump = (inports.bumps.value <= (i + inports.offset.value[i])%inports.period.value);

                if (inports.mode.value == "multiplicative"){
                    
                    if(inports.values0.value.every(v => v === 0)){ //if all values0 are 0, do not include values0
                        out.push((inports.amplitude.value * bump));
                    }
                    else{
                        out.push((inports.amplitude.value * bump) * inports.values0.value[i]);
                    }
                } else if (inports.mode.value == "additive" || inports.mode.value == null){
                    out.push((inports.amplitude.value * bump) + inports.values0.value[i]);
                }
            }
            console.log("square out:", out);
            outports.values.value = out;
        } else {
            outports.values.value = null;
        }
    }
    return {inportsUpdated};
}


export default { config, tool: square };
