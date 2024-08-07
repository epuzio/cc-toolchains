import {setup} from "coilcam/dist/main";
// note: Toolpath Unit Generator will throw an error if none of the values for position[x, y, z] are changed 
// This can be resolved by setting a position coordinate to a new number and then back to the desired number
// This is likely an error with the Point tool, not the TUG.

//TOFIX: some sort of error with parameterLength, defaults to "[]"?

const config = {
  inports: {
    position: {
        type: "array",
        value: null,
    },
    radius: {
        type: "number",
        value: null,
    },
    layerHeight: {
        type: "number",
        value: null,
    },
    nbLayers: {
        type: "number",
        value: null,
    },
    nbPointsInLayer: {
        type: "number",
        value: null,
    },
    radiusSP: {
        type: "any",
        value: null,
    },
    scaleSP: {
        type: "any",
        value: null,
    },
    scalingSP: {
        type: "any",
        value: null,
    },
    translateSP: {
        type: "any",
        value: null,
    },
    rotateSP: {
        type: "any",
        value: null,
    },
    thicknessSP: {
        type: "any",
        value: null,
    },
    layerThicknessSP: {
        type: "any",
        value: null,
    },
  },
  outports: {
    path: { 
      type: "any",
      value: null,
    },
  },
  ui: {
    displayName: "CC-ToolpathUnitGenerator",
    width: 130,
    height: 100,
  },
};


function setSingleParameter(input, parameter_name, nbLayers, nbPointsInLayer){
    console.log("input", input, " for parameter_name", parameter_name, "nbLayers ", nbLayers, " nbPointsInLayer", nbPointsInLayer);
    let parameterLength = nbLayers;
    let is2DParam = (parameter_name == "radiusShapingParameter" || parameter_name == "thicknessShapingParameter");
    if(is2DParam){
        parameterLength *= nbPointsInLayer;
    }

    console.log("Param length", parameterLength);

    if(input === null || input == []){ //left blank / no parameter given
        console.log("C1");
        return new Array(parameterLength).fill(0);
    } else if(!Array.isArray(input)){ //single number
        console.log("C2");
        return new Array(parameterLength).fill(input);
    } else if(input.length == parameterLength){ //full array
        console.log("C3");
        return input;
    } else if(is2DParam){
        console.log("2D PARAM:", new Array(nbPointsInLayer*nbLayers).fill(input).flat());
        if(input.length == nbPointsInLayer){ //pad values for 1D values that require 2D input
            
            return new Array(nbPointsInLayer*nbLayers).fill(input).flat();
        }
        var error_str = "Length of values for parameter " + parameter_name + " is currently " + 
                input.length + ", must be 0, 1, equal to nbPointsInLayer: " + nbPointsInLayer + 
                " or nbPointsInLayer*nbLayers: " + (nbPointsInLayer*nbLayers);
        throw new Error(error_str);


    }
    var error_str = "Length of values for parameter " + parameter_name + " is currently " + 
            input.length + ", must be 0, 1 or equal to nbLayers: " + nbLayers;
    throw new Error(error_str);
}

function setParameter(input, parameter_name, nbLayers, nbPointsInLayer){
    if(parameter_name == "translateShapingParameter"){
        let tsp = [[], []];
        if(input == null || input == []){
            return new Array(2).fill(new Array(nbLayers).fill(0));
        }
        tsp[0] = setSingleParameter(input[0], parameter_name, nbLayers, nbPointsInLayer);
        tsp[1] = setSingleParameter(input[1], parameter_name, nbLayers, nbPointsInLayer);
        return tsp;
    }
    return setSingleParameter(input, parameter_name, nbLayers, nbPointsInLayer);
}

function tug(position, initialRadius, layerHeight, nbLayers, nbPointsInLayer,
                              radiusShapingParameter=[], scaleShapingParameter=[], scalingRadiusShapingParameter=[],
                              translateShapingParameter=[], rotateShapingParameter=[], thicknessShapingParameter=[], layerThicknessShapingParameter=[]){
    let path = [];
    let radsp = setParameter(radiusShapingParameter, "radiusShapingParameter", nbLayers, nbPointsInLayer);
    let ssp = setParameter(scaleShapingParameter, "scaleShapingParameter", nbLayers, nbPointsInLayer);
    let rsp = setParameter(rotateShapingParameter, "rotateShapingParameter", nbLayers, nbPointsInLayer);
    let tsp = setParameter(translateShapingParameter, "translateShapingParameter", nbLayers, nbPointsInLayer);
    let srsp = setParameter(scalingRadiusShapingParameter, "scalingRadiusShapingParameter", nbLayers, nbPointsInLayer);
    let thsp = setParameter(thicknessShapingParameter, "thicknessShapingParameter", nbLayers, nbPointsInLayer);
    let lthsp = setParameter(layerThicknessShapingParameter, "layerThicknessShapingParameter", nbLayers, nbPointsInLayer);


    for(let j = 0; j < nbLayers; j++){
        for(let i = 0; i < nbPointsInLayer; i++){
            let angle = 2 * i * Math.PI / nbPointsInLayer;
            const newPoint = {
                x: (position[0] + (initialRadius + srsp[j] * radsp[(nbLayers*j)+i] + ssp[j]) * Math.cos(angle + (rsp[j] * Math.PI/180)) + tsp[0][j]),
                y: (position[1] + (initialRadius + srsp[j] * radsp[(nbLayers*j)+i] + ssp[j]) * Math.sin(angle + (rsp[j] * Math.PI/180)) + tsp[1][j]),
                z: (position[2] + layerHeight * j),
                thickness: (thsp[(nbLayers*j)+i]+lthsp[j])
            }
            path.push(newPoint);
        }
    }
    return path;
}






function toolpathUnitGenerator(inports, outports){
    function inportsUpdated() {
        if(inports.position.value !== null && inports.radius.value !== null && inports.layerHeight.value !== null && inports.nbLayers.value !== null && inports.nbPointsInLayer.value !== null){
            outports.path.value = tug(inports.position.value, inports.radius.value, inports.layerHeight.value, inports.nbLayers.value, inports.nbPointsInLayer.value,
                inports.radiusSP.value, inports.scaleSP.value, inports.scalingSP.value,
                inports.translateSP.value, inports.rotateSP.value, inports.thicknessSP.value, inports.layerThicknessSP.value);
        }  
    }
    return { inportsUpdated };
}


export default { config, tool: toolpathUnitGenerator };