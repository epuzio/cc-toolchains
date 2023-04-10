import { html } from "lit-html";

const config = {
  inports: {},
  outports: {
    color: {
      type: "string",
      value: null,
    },
  },
  state: { currentColor: null },
  ui: {
    displayName: "Color",
    width: 75,
    height: 75,
    resize: "both",
    icon: "palette",
  },
};

function color(inports, outports, state) {
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
        input[type="color"] {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
        ::-webkit-color-swatch-wrapper {
          padding: 0;
        }

        ::-webkit-color-swatch {
          border: 0;
        }

        ::-moz-color-swatch,
        ::-moz-focus-inner {
          border: 0;
        }

        ::-moz-focus-inner {
          padding: 0;
        }
      </style>
      <input type="color" value=${state.currentColor} @input=${colorInput} />`;
  };

  return { init, render };
}

export default { config, tool: color };
