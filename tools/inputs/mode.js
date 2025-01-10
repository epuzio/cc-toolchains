// For use with CoilCAM functions: Mode returns either multiplicative or additive
import { html } from "lit-html";

const config = {
  inports: {},
  outports: {
    mode: {
      type: "string",
      value: null,
    },
  },
  state: { mode: true }, // true if multiplicative, false if additive
  ui: {
    displayName: "mode",
    width: 200,
    height: 50,
  },
};

function functionMode(inports, outports, state) {
    const darkblue = "#1b181c";
    const black = '#20344c';
    const white = "#faead6";
  function render() {
    return html`
        <style>
            label {
                display: block;
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
            #multiplicative-button-label {
                background-color: ${state.mode ? black : darkblue};
                width: 100px;
                height: 50px;
                border-radius: 1rem;
                // padding: 1rem;
                box-shadow: ${state.mode ? `inset 0 0 0 2px ${white}` : "none"};
                outline: none;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center; 
                color: white;
                font-size: 60px;
            }
            #additive-button-label {
                background-color: ${state.mode ? darkblue : black};
                width: 100px;
                height: 50px;
                border-radius: 1rem;
                // padding: 1rem;
                box-shadow: ${!state.mode ? `inset 0 0 0 2px ${white}` : "none"};
                outline: none;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center; 
                color: white;
                font-size: 60px;
            }
            .container {
                display: flex;
                justify-content: space-between; /* Space between the buttons */
                align-items: center;
                width: 100%; /* Adjust as needed */
                text-align: center;
            }
        </style>

        <div class="container">
            <label id="multiplicative-button-label" for="multiplicative-button">
                ×
            </label>
            <input
                id="multiplicative-button"
                @input=${() => {
                    state.mode = true;
                    outports.mode.value = state.mode ? "multiplicative" : "additive";
                }}
                ?checked=${!state.mode}
                type="checkbox"
                hidden
            />

            <label id="additive-button-label" for="additive-button">
                +
            </label>
            <input
                id="additive-button"
                @input=${() => {
                    state.mode = false;
                    outports.mode.value = state.mode ? "multiplicative" : "additive";
                }}
                ?checked=${state.mode}
                type="checkbox"
                hidden
            />
        </div>
        `;

  }

  return { render };
}

export default { config, tool: functionMode };
