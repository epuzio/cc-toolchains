// Builds upon code for path drawing
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
    let pdiRef = createRef();
    function postInit() {
        let iframe = document.createElement("iframe");
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
    return {render, postInit};
}
  
  
export default { config, tool: toolpathViewer };