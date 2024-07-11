import { html } from "lit-html";

const config = {
  inports: {},
  outports: {
    point: {
      type: "array",
      value: 1,
    },
  },
  state: { 
    valueX: 1, minX: -500, maxX: 500, stepX: 1,
    valueY: 1, minY: -500, maxY: 500, stepY: 1,
    valueZ: 1, minZ: -500, maxZ: 500, stepZ: 1  
  },
  ui: {
    displayName: "Point",
    width: 175,
    height: 45,
  },
};

function point(inports, outports, state) { //copy-pasted from inputSlider, a bit verbose...
  function setVal(newVal, coordinate) {
    if(coordinate == "X"){ state.valueX = Number(newVal); }
    if(coordinate == "Y"){ state.valueY = Number(newVal); }
    if(coordinate == "Z"){ state.valueZ = Number(newVal); }
    outports.point.value = [state.valueX, state.valueY, state.valueZ];
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
          width: 1rem;
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
          width: 100%;
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
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.2rem 0.5rem;
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
      <div id="container">
        <div id="sliderbox">
            <h2>X</h2>
            <input
            id="slider"
            type="range"
            .min=${state.minX}
            .max=${state.maxX}
            .value=${state.valueX}
            .step=${state.stepX}
            @input=${(e) => {
                setVal(e.target.value, "X");
            }} />
        </div>
        <div id="info">
          <span>
            <input
              type="number"
              .value=${state.valueX}
              .step=${state.stepX}
              .min=${state.minX}
              .max=${state.maxX}
              @input=${(e) => setVal(e.target.value, "X")} />
          </span>
          <span>
            <label for="config-toggle">...</label>
            <input id="config-toggle" type="checkbox" hidden />
            <div id="control-panel">
              <span class="label">min</span>
              <input
                type="number"
                .value=${state.minX}
                .step=${state.stepX}
                @input=${(e) => (state.minX = e.target.value)} />
              <span class="label">max</span>
              <input
                type="number"
                .value=${state.maxX}
                .step=${state.stepX}
                @input=${(e) => (state.maxX = e.target.value)} />
              <span class="label">step</span>
              <input
                type="number"
                .value=${state.stepX}
                @input=${(e) => (state.stepX = e.target.value)} />
            </div>
          </span>
        </div>
        <div id="sliderbox">
            <h2>Y</h2>
            <input
            id="slider"
            type="range"
            .min=${state.minY}
            .max=${state.maxY}
            .value=${state.valueY}
            .step=${state.stepY}
            @input=${(e) => {
                setVal(e.target.value, "Y");
            }} />
          </div>
        <div id="info">
          <span>
            <input
              type="number"
              .value=${state.valueY}
              .step=${state.stepY}
              .min=${state.minY}
              .max=${state.maxY}
              @input=${(e) => setVal(e.target.value, "Y")} />
          </span>
          <span>
            <label for="config-toggle">...</label>
            <input id="config-toggle" type="checkbox" hidden />
            <div id="control-panel">
              <span class="label">min</span>
              <input
                type="number"
                .value=${state.minY}
                .step=${state.stepY}
                @input=${(e) => (state.minY = e.target.value)} />
              <span class="label">max</span>
              <input
                type="number"
                .value=${state.maxY}
                .step=${state.stepY}
                @input=${(e) => (state.maxY = e.target.value)} />
              <span class="label">step</span>
              <input
                type="number"
                .value=${state.stepY}
                @input=${(e) => (state.stepY = e.target.value)} />
            </div>
          </span>
        </div>
        <div id="sliderbox">
        <h2>Z</h2>
            <input
            id="slider"
            type="range"
            .min=${state.minZ}
            .max=${state.maxZ}
            .value=${state.valueZ}
            .step=${state.stepZ}
            @input=${(e) => {
                setVal(e.target.value, "Z");
            }} />
          </div>
        <div id="info">
          <span>
            <input
              type="number"
              .value=${state.valueZ}
              .step=${state.stepZ}
              .min=${state.minZ}
              .max=${state.maxZ}
              @input=${(e) => setVal(e.target.value, "Z")} />
          </span>
          <span>
            <label for="config-toggle">...</label>
            <input id="config-toggle" type="checkbox" hidden />
            <div id="control-panel">
              <span class="label">min</span>
              <input
                type="number"
                .value=${state.minZ}
                .step=${state.stepZ}
                @input=${(e) => (state.minZ = e.target.value)} />
              <span class="label">max</span>
              <input
                type="number"
                .value=${state.maxZ}
                .step=${state.stepZ}
                @input=${(e) => (state.maxZ = e.target.value)} />
              <span class="label">step</span>
              <input
                type="number"
                .value=${state.stepZ}
                @input=${(e) => (state.stepZ = e.target.value)} />
            </div>
          </span>
        </div>
      </div>`;
  }

  return { render };
}

export default { config, tool: point };
