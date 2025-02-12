import { html } from "lit-html";

const config = {
  inports: {},
  outports: {
    position: {
      type: "array",
      value: null,
    },
    radius: {
        type: "number",
        value: null,
    },
    layerHeight: {
        type: "number",
        value: null,
    },
    nbLayers: {
        type: "number",
        value: null,
    },
    nbPointsInLayer: {
        type: "number",
        value: null,
    },
  },
  state: { 
    valueX: 0, valueY: 0.0, valueZ: 0.0, 
    radius: 50,
    layerHeight: 2.5,
    nbLayers: 60,
    nbPointsInLayer: 5,
  },
  ui: {
    displayName: "Toolpath Variables",
    width: 210,
    height: 150,
  },
};

function toolpathVariables(inports, outports, state) {
    const increment = {
        min: -9999999.0,
        max: 9999999.0,
        step: 1.0 //tofix: error where step increases to nearest whole number
    }

  function render() {
    return html`<style>
        #container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        * {
          box-sizing: border-box;
        }
        input[type="number"] {
          width: 100%;
        }
        #slider::-moz-range-thumb {
          height: 1rem;
          width: .5rem;
          background: var(--blue);
          border-radius: 50%;
          border: none;
        }
        #slider::-moz-range-track {
          background: var(--pipe);
          height: 5px;
          border-radius: 3px;
        }
        #slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 1rem;
          width: 1rem;
          background: var(--blue);
          border-radius: 50%;
          cursor: pointer;
          margin-top: -5px;
        }
        #slider::-webkit-slider-runnable-track {
          background: var(--port);
          height: 5px;
          border-radius: 3px;
        }
        #slider {
          appearance: none;
          width: 50%;
          padding: 0.5rem 0.25rem;
          line-height: 0;
          display: block;
          margin: 0;
        }
        #slider:focus {
          outline: none;
        }
        .label {
          font-size: 0.75rem;
          font-weight: bolder;
          background-color: var(--black);
          color: var(--tool-background);
          cursor: default;
          padding: 0 0.5rem;
          display: flex;
          align-items: center;
          justify-content: end;
        }
        #sliderbox {
            width: 100%;
            display: flex;
            gap: .4em;
            align-items: left;
            background-color: var(--port);
        }
        #info {
          background-color: var(--black);
          color: var(--text-light);
          display: flex;
          align-items: left;
          justify-content: space-between;
          padding: 0.2rem 0.5rem;
        }
        #position-variable-text {
            background-color: var(--purple);
            color: var(--black);
            font-weight: 900;
            border-radius: 0.3rem;
            font-size: 1rem;
            padding: 03px;
        }
        #variable-block-padding {
          background-color: #1b181c;
          color: var(--text-light);
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.5rem;
        }
        #variable-block {
          background-color: #20344c;
          color: var(--text-light);
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        #control-panel {
          display: none;
          grid-template-columns: auto auto;
          position: absolute;
          left: 0;
        }
        #config-toggle:checked + #control-panel {
          display: grid;
          position: absolute;
          top: 40px; left: 100px;
        }
        h2 {
            font-size: 1em;
            margin: 0px 0px;
            align-items: center;
            padding: .2em;
        }
      </style>
      
        <div id="variable-block-padding">
            <div id= "variable-block">
                Position:
                <div style="width: 98px;">
                    <div id="info">
                        <div id="position-variable-text">
                        X:  
                        </div>
                    <span style="width: 65%;">
                        <input
                        type="number"
                        .value=${state.valueX}
                        .step=${increment.step}
                        .min=${increment.min}
                        .max=${increment.max}
                        @change=${(e) => (
                            state.valueX = Number(e.target.value),
                            outports.position.value = [state.valueX, state.valueY, state.valueZ]
                            )} />
                    </span>
                    </div>
                    <div id="info">
                        <div id="position-variable-text">
                        Y: 
                        </div>
                    <span style="width: 65%;">
                        <input
                        type="number"
                        .value=${state.valueY}
                        .step=${increment.step + increment.step}
                        .min=${increment.min}
                        .max=${increment.max}
                        @change=${(e) => (
                            state.valueY = Number(e.target.value),
                            outports.position.value = [state.valueX, state.valueY, state.valueZ]
                            )} />
                    </span>
                    </div>
                    <div id="info">
                        <div id="position-variable-text">
                        Z: 
                        </div>
                    <span style="width: 65%;">
                        <input
                        type="number"
                        .value=${state.valueZ}
                        .step=${increment.step}
                        .min=${increment.min}
                        .max=${increment.max}
                        @change=${(e) => (
                            state.valueZ = Number(e.target.value),
                            outports.position.value = [state.valueX, state.valueY, state.valueZ]
                            )} />
                    </span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <div id="variable-block-padding">
        <div id= "variable-block">
            Radius:
            <div id="info">
            <span>
                <input
                type="number"
                .value=${state.radius}
                .step=${increment.step}
                .min=${increment.min}
                .max=${increment.max}
                @change=${(e) => (
                  state.radius = Number(e.target.value),
                  outports.radius.value = Number(e.target.value))} />
            </span>
            </div>
        </div>
        </div>
      </div>

      <div id="variable-block-padding">
        <div id= "variable-block">
        Layer Height:
            <div id="info">
            <span>
                <input
                type="number"
                .value=${state.layerHeight}
                .step=${increment.step}
                .min=${increment.min}
                .max=${increment.max}
                @change=${(e) => (
                  state.layerHeight = Number(e.target.value),
                  outports.layerHeight.value = Number(e.target.value))} />
            </span>
            </div>
        </div>
        </div>
      </div>

      <div id="variable-block-padding">
        <div id= "variable-block">
              Layers:
            <div id="info">
            <span>
                <input
                type="number"
                .value=${state.nbLayers}
                .step=${increment.step}
                .min=${increment.min}
                .max=${increment.max}
                @change=${(e) => (
                  state.nbLayers = Number(e.target.value),
                  outports.nbLayers.value = Number(e.target.value))} />
            </span>
            </div>
        </div>
        </div>
      </div>
      
      <div id="variable-block-padding">
        <div id="variable-block" style="padding: 0;">
            Layer Points:
            <div id="info">
            <span>
                <input
                type="number"
                .value=${state.nbPointsInLayer}
                .step=${increment.step}
                .min=${increment.min}
                .max=${increment.max}
                @change=${(e) => (
                  state.nbPointsInLayer = Number(e.target.value),
                  outports.nbPointsInLayer.value = Number(e.target.value))} />
            </span>
            </div>
        </div>
        </div>
      </div>
      `;
      
  }

  return { render };
}

export default { config, tool: toolpathVariables };
