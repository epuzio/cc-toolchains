import { html } from "lit-html";

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
        type: "gcode",
        value: null,
        },
    },
    ui: {
        displayName: "CC-GCodeGenerator",
        width: 130,
        height: 100,
    },
};

function generateGCode(inports, outports) {
    function inportsUpdated() {
        if(inports.path.value !== null && inports.layerHeight.value !== null && inports.nozzleDiameter.value !== null && inports.printSpeed.value !== null){
            // outports.path.value = 
        }  
    }
    return { inportsUpdated };
}

  