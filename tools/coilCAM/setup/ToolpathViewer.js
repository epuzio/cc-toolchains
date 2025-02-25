// Builds upon code for path drawing
//TODO: debug displaying path in renderer
import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

const config = {
    inports: {
        path: { 
            type: "array",
            value: [],
        },
        referencePath: { 
            type: "array",
            value: [],
        },
        bedDimensions: { //potterbot bed dimensions, should default to baby_pb
            type: "array",
            value: [280, 265, 305],
        },
    },
    outports: {
        path: { 
          type: "any",
          value: [],
        },
      },
    ui: {
      displayName: "Toolpath Viewer",
      icon: "eye",
      width: 500,
      height: 500,
    },
};



function setOutputPath(outports, outputPath) {
    if (outputPath && outports.path) {
        outports.path.value = outputPath;
    } else {
        console.error("outports.paths is not defined.");
    }
}

  
function toolpathViewer(inports, outports, state, global) {
    let iframe;
    let pdiRef = createRef();

    function inportsUpdated(){
        if(inports.bedDimensions.value !== null){
            iframe.contentWindow.state.bedDimensions = inports.bedDimensions.value;
        } 
        if(inports.path.value !== null){
            iframe.contentWindow.state.path = inports.path.value;
        } else{
            iframe.contentWindow.state.path = [];
        }
        if(inports.referencePath.value !== null){
            iframe.contentWindow.state.referencePath = inports.referencePath.value;
        } else{
            iframe.contentWindow.state.referencePath = [];
        }
        setOutputPath(outports, iframe.contentWindow.state?.outputPath);
    }

    function postInit() {
        iframe = document.createElement("iframe");
        iframe.src = "./tools/coilCAM/setup/toolpathViewer/index.html";

        pdiRef.value.appendChild(iframe);
    }
    function render() {
        return html`<style>
            #pdi {
                display: block;
                border: none;
                height: 100%;
                width: 100%;
            }

            iframe {
                display: block;
                border: none;
                height: 100%;
                width: 100%;
            }
            </style>
            <div id="pdi" ${ref(pdiRef)}></div>`;
        }
    return {render, postInit, inportsUpdated};
}
  
  
export default { config, tool: toolpathViewer };