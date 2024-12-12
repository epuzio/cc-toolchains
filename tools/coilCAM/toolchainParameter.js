import { html } from "lit-html";

const increments = {
    min: -9999999.0,
    max: 9999999.0,
    step: 1.0 //tofix: error where step increases to nearest whole number
}

export const parameter = (variableName, defaultValue, updatePorts) =>{
    return html`
    ${styles}
    <div id="variable-block-padding">
        <div id= "variable-block">
            ${variableName}:
            <div id="info">
                <span>
                    <input
                        type="number"
                        .value=${defaultValue}
                        .step=${increments.step}
                        .min=${increments.min}
                        .max=${increments.max}
                        @change=${(e) => (updatePorts(Number(e.target.value)))} />
                </span>
            </div>
        </div>
        </div>
    </div>`;
}

const styles = html`
    <style>
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
            </style>`;


