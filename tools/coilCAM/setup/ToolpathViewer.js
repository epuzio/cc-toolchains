// Builds upon code for path drawing
//TODO: updating properly, but no changes in renderer?
import { emacsStyleKeymap } from "@codemirror/commands";
import { html, render, svg, nothing } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

const config = {
    inports: {
        path: { 
            type: "array",
            value: null,
        },
        bedDimensions: { //potterbot bed dimensions, should default to baby_pb
            type: "array",
            value: null,
        }
    },
    outports: {},
    ui: {
      displayName: "CC-ToolpathViewer",
      width: 500,
      height: 500,
    },
};
  
function toolpathViewer(inports, outports, state, global) {
    let iframe;
    let pdiRef = createRef();

    function inportsUpdated(){
        if(inports.bedDimensions.value !== null && iframe){
            iframe.contentWindow.state.bedDimensions = inports.bedDimensions.value;
            console.log(iframe.contentWindow.state.bedDimensions);
        } else{
            iframe.contentWindow.state.bedDimensions = [];
        }
    }
    function postInit() {
        iframe = document.createElement("iframe");
        iframe.src = "./tools/coilCAM/setup/toolpathViewer/index.html";
    
        iframe.onload = () => {
          let pWindow = iframe.contentWindow;
          pWindow.state.paths = state.paths;
          pWindow.setPaths = setPaths;
        };
    
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