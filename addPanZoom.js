import { createListener } from "./utils.js";

export function addPanZoom(el, state) {
  const listen = createListener(el);

  let mousedown = false;

  let scale = 1;
  let pointX = 0;
  let pointY = 0;
  let start = { x: 0, y: 0 };

  function setTransform(el) {
    el.style.transformOrigin = `${0}px ${0}px`;
    el.style.transform =
      "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
  }

  function updateTransformGroups() {
    const transformGroups = document.querySelectorAll(".transform-group");
    for (const group of transformGroups) {
      setTransform(group);
    }
  }

  function toWorkspaceCoords({ x, y }) {
    let newX = (x - pointX) / scale;
    let newY = (y - pointY) / scale;

    return { x: newX, y: newY };
  }

  listen("pointerdown", "", (e) => {
    if (e.shiftKey) {
      return;
    }

    mousedown = true;

    start = { x: e.offsetX - pointX, y: e.offsetY - pointY };

    if (e.detail === 2) {
    }
  });

  listen("pointermove", "", (e) => {
    if (!mousedown) return;
    if (state.transforming) return;

    pointX = e.offsetX - start.x;
    pointY = e.offsetY - start.y;

    updateTransformGroups();
  });

  listen("pointerup", "", (evt) => {
    mousedown = false;
  });

  listen("wheel", "", (e) => {
    let xs = (e.offsetX - pointX) / scale;
    let ys = (e.offsetY - pointY) / scale;

    if (Math.sign(e.deltaY) < 0) scale *= 1.03;
    else scale /= 1.03;

    pointX = e.offsetX - xs * scale;
    pointY = e.offsetY - ys * scale;

    Object.keys(state.toolchain.tools).forEach((toolID) => {
      let toolTo = state.toolchain.tools[toolID];
      if ("onZoom" in toolTo.lifecycle) toolTo.lifecycle.onZoom(scale);
    });

    updateTransformGroups();
    e.preventDefault();
  });

  function setPanZoom(pz) {
    scale = pz.scale;
    pointX = pz.x;
    pointY = pz.y;
    updateTransformGroups();
  }

  function setScaleXY(limits) {
    const bb = el.getBoundingClientRect();
    const xr = limits.x[1] - limits.x[0];
    const yr = limits.y[1] - limits.y[0];
    const xScalingFactor = bb.width / xr;
    const yScalingFactor = bb.height / yr;

    const scalingFactor = Math.min(xScalingFactor, yScalingFactor) * 0.9;

    scale = scalingFactor;

    const center = {
      x: ((limits.x[0] + limits.x[1]) / 2) * scalingFactor - bb.width / 2,
      y: ((limits.y[0] + limits.y[1]) / 2) * scalingFactor - bb.height / 2,
    };

    pointX = -center.x;
    pointY = -center.y;

    updatePanZoom();
  }

  return {
    scale: () => scale,
    x: () => pointX,
    y: () => pointY,
    setScaleXY,
    toWorkspaceCoords,
    setPanZoom,
  };
}
