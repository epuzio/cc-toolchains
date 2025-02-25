import { html } from "lit-html";
import { css } from './arrayOperatorCSS.js';

const config = {
    inports: {
        arrayIn: {
            type: "array",
            value: [],
        }
    },
    state: {
        value: 1
    },
    outports: {
        arrayOut: {
            type: "array",
            value: [],
        },
    },
    ui: {
        displayName: "Divide",
    }
};

const increments = {
    min: -9999999.0,
    max: 9999999.0,
    step: 1.0 
};
  
function divideArr(inports, outports, state) {
    function valueUpdated(value) {
        state.value = Number(value);
        if(state.value === 0) {
            state.value = 1;
        }
        outports.arrayOut.value = inports.arrayIn.value.map(element => {
            return element / state.value;
        });
    }

    function render() {
        return html`
        <div id="container">
          <div id="position-variable-text">
            ÷
          </div>
          <div id="info">
            ${css()}
            <span>
                <input
                    type="number"
                    .value=${state.value}
                    .step=${increments.step}
                    .min=${increments.min}
                    .max=${increments.max}
                    @input=${(event) => (
                        valueUpdated(event.target.value)
                    )} />
            </span>
          </div>
        </div>
        `; 
    }
return { render };
}

export default { config, tool: divideArr };