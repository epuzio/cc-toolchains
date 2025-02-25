import {setup} from "coilcam/dist/main";
const {toolpathUnitGenerator: ccToolpathUnitGenerator} = setup; //naming conflict

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
        value: [],
    },
    scaleSP: {
        type: "any",
        value: [],
    },
    scalingSP: {
        type: "any",
        value: [],
    },
    translateSP: {
        type: "any",
        value: [],
    },
    rotateSP: {
        type: "any",
        value: [],
    },
    thicknessSP: {
        type: "any",
        value: [],
    },
  },
  outports: {
    path: { 
      type: "array",
      value: null,
    },
  },
  ui: {
    displayName: "Toolpath Unit Generator",
    icon: "wave-square",
    width: 130,
    height: 100,
  },
};


function toolpathUnitGenerator(inports, outports){
    function inportsUpdated() {
        if(inports.position.value !== null && inports.radius.value !== null && inports.layerHeight.value !== null && inports.nbLayers.value !== null && inports.nbPointsInLayer.value !== null){
            outports.path.value = ccToolpathUnitGenerator(inports.position.value, inports.radius.value, inports.layerHeight.value, inports.nbLayers.value, inports.nbPointsInLayer.value,
                inports.radiusSP.value, inports.scaleSP.value, inports.scalingSP.value,
                inports.translateSP.value, inports.rotateSP.value, inports.thicknessSP.value);
        }  
    }
    return { inportsUpdated };
}


export default { config, tool: toolpathUnitGenerator };