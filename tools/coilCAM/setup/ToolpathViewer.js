const config = {
    inports: {
        bedSize: { //potterbot bed dimensions
            type: "array",
            value: null,
        },
        toolpath: {
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
    //TODO: add a toolpath viewer to CC library, import from there directly
}
  
  
export default { config, tool: toolpathViewer };