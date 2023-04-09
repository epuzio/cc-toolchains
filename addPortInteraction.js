import { createListener, buildPipeID } from "./utils.js";

export function addPortInteraction(workspace, state) {
  const listen = createListener(workspace);

  function getToolDetails(e) {
    let id = parentToolElement(e).dataset.toolid;
    return [id, state.toolchain.tools[id]];
  }

  function parentToolElement(e) {
    return e.target.closest(".tool");
  }

  function addPipe(start, end) {
    if (start.toolID == end.toolID) {
      console.log("Can't connect a tool to itself!");
      return;
    }
    let pipeID = buildPipeID(
      start.toolID,
      start.portID,
      end.toolID,
      end.portID
    );

    state.toolchain.pipes[pipeID] = { start, end };
    state.toolchain.tools[end.toolID].inports[end.portID].value =
      state.toolchain.tools[start.toolID].outports[start.portID].value;
  }

  function handleInport(e) {
    const [toolID, toolInfo] = getToolDetails(e);
    const portID = e.target.dataset.portid;

    if ("loose" in state.toolchain.pipes) {
      let start = state.toolchain.pipes["loose"].start;
      if (!start) {
        delete state.toolchain.pipes["loose"];
        return;
      }
      let end = {
        toolID: toolID,
        portID: portID,
      };

      addPipe(start, end);
      delete state.toolchain.pipes["loose"];
    } else {
      state.toolchain.pipes["loose"] = {
        end: {
          toolID: toolID,
          portID: portID,
        },
      };
    }
  }

  function handleOutport(e) {
    let [toolID, toolInfo] = getToolDetails(e);
    const portID = e.target.dataset.portid;

    if ("loose" in state.toolchain.pipes) {
      let end = state.toolchain.pipes["loose"].end;
      if (!end) {
        delete state.toolchain.pipes["loose"];
        return;
      }
      let start = {
        toolID: toolID,
        portID: portID,
      };

      addPipe(start, end);
      delete state.toolchain.pipes["loose"];
    } else {
      state.toolchain.pipes["loose"] = {
        start: {
          toolID: toolID,
          portID: portID,
        },
      };
    }
  }

  listen("pointerup", ".inports .port", handleInport);
  listen("pointerdown", ".inports .port", handleInport);

  listen("pointerup", ".outports .port", handleOutport);
  listen("pointerdown", ".outports .port", handleOutport);
}
