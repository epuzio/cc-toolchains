// Add a color behind common elements

import { html } from "lit-html";

const config = {
  inports: {},
  outports: {},
  state: { currentColor: null },
  ui: {
    displayName: "Group",
    width: 75,
    height: 75,
    resize: "both",
  },
};

function group(inports, outports, state) {
  function colorInput(e) {
    state.currentColor = e.target.value;
    outports.color.value = e.target.value;
  }

  function init() {
    state.currentColor =
      state.currentColor ??
      `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    outports.color.value = state.currentColor;
  }

  const render = () => {
    return html`<style>
        .color-container {
            position: absolute;
            z-index: 0;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0px;
        }
      </style>
      <div id="color-container">
            hehe
      </div>`
  };

  return { init, render };
}

export default { config, tool: group };
