function setParameter(input, parameter_name, nbLayers=[], nbPointsInLayer=[]){
    let parameterLength = nbPointsInLayer;
    let is2DParam = (parameter_name == "radiusShapingParameter" || parameter_name == "thicknessShapingParameter");
    if(is2DParam){
        parameterLength *= nbLayers;
    }

    if(input == []){ //left blank / no parameter given
        return new Array(parameterLength).fill(0);
    } else if(!Array.isArray(input)){ //single number
        return new Array(parameterLength).fill(input);
    } else if(input.length == parameterLength){ 
        return input;
    } else if(is2DParam){
        if(input.length == nbPointsInLayer){ //pad values
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

export function tug(position, initialRadius, layerHeight, nbLayers, nbPointsInLayer,
                              radiusShapingParameter=[], scaleShapingParameter=[], scalingRadiusShapingParameter=[],
                              translateShapingParameter=[], rotateShapingParameter=[], thicknessShapingParameter=[], layerThicknessShapingParameter=[]){
    let path = [];
    let radsp = setParameter(radiusShapingParameter, "radiusShapingParameter", nbLayers, nbPointsInLayer);
    let ssp = setParameter(scaleShapingParameter, "scaleShapingParameter", nbLayers);
    let rsp = setParameter(rotateShapingParameter, "rotateShapingParameter", nbLayers);
    let tsp = setParameter(translateShapingParameter, "translateShapingParameter", nbLayers);
    let srsp = setParameter(scalingRadiusShapingParameter, "scalingRadiusShapingParameter", nbLayers);
    let thsp = setParameter(thicknessShapingParameter, "thicknessShapingParameter", nbLayers, nbPointsInLayer);
    let lthsp = setParameter(layerThicknessShapingParameter, "layerThicknessShapingParameter", nbLayers, nbPointsInLayer);
    for(let j = 0; j < nbLayers; j++){
        for(let i = 0; i < nbPointsInLayer; i++){
            let angle = 2 * i * Math.PI / nbPointsInLayer;
            path.push(position[0] + (initialRadius + srsp[j] * radsp[(nbLayers*j)+i] + ssp[j]) * Math.cos(angle + (rsp[j] * Math.PI/180)) + tsp[0][j]);
            path.push(position[1] + (initialRadius + srsp[j] * radsp[(nbLayers*j)+i] + ssp[j]) * Math.sin(angle + (rsp[j] * Math.PI/180)) + tsp[1][j]);
            path.push(position[2] + layerHeight * j);
            path.push(thsp[i]+lthsp[j]); 
        }
    }
    return path;
}

window.tug = tug;


