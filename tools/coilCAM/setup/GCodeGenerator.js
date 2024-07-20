import { html } from "lit-html";

import {setup} from "coilcam/dist/main";
const {generateGCode} = setup;

const config = {
    inports: {
        path: {
            type: "array",
            value: null,
        },
        layerHeight: {
            type: "number",
            value: null,
        },
        nozzleDiameter: {
            type: "number",
            value: null,
        },
        printSpeed: {
            type: "number",
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
        displayName: "CC-GCodeGenerator",
        width: 130,
        height: 100,
    },
};

function GCodeGenerator(inports, outports) {
    function inportsUpdated() {
        if(inports.path.value !== null && inports.layerHeight.value !== null && inports.nozzleDiameter.value !== null && inports.printSpeed.value !== null){
            outports.path.value = generateGCode(inports.path.value, inports.nozzleDiameter.value, inports.printSpeed.value);
        }  
    }
    return {inportsUpdated};
}
export default { config, tool: GCodeGenerator};

  