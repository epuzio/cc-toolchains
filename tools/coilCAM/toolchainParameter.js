import { html } from "lit-html";

const increments = {
    min: -9999999.0,
    max: 9999999.0,
    step: 1.0 //tofix: error where step increases to nearest whole number
}

const darkblue = "#20344c";
const black = '#1b181c';
const offsetBlue = "#274161";
const offsetBlack = '#2f2b30';
const white = "#faead6";

export const parameter = (variableName, defaultValue, updatePorts, offColor = false) =>{
    const labelBackground = offColor ? offsetBlack : black;
    const inputBackground = offColor ? offsetBlue : darkblue;
    
    if(variableName === "Mode"){
        return html`
        <div style="
            --additiveHighlight: ${!defaultValue ? `inset 0 0 0 2px ${white}` : "none"};
            --multiplicativeHighlight: ${defaultValue ? `inset 0 0 0 2px ${white}` : "none"};
            --additiveBkg: ${defaultValue ? black : offsetBlack}; 
            --multiplicativeBkg: ${!defaultValue ? black : offsetBlack};
            --inputbkg: ${inputBackground};"
        >
        ${toggleCSS()}
            <div id= "variable-block" >
                ${variableName}:
                <div id="info">
                    <span>
                        <div class="container" style="width: 79px; justify-content: center;">
                            <label id="multiplicative-button-label" for="multiplicative-button">
                                +
                            </label>
                            <input
                                id="multiplicative-button"
                                ?checked=${false}
                                type="checkbox"
                                hidden
                                @input=${() => (updatePorts(true))}
                            />

                            <label id="additive-button-label" for="additive-button">
                                ×
                            </label>
                            <input
                                id="additive-button"
                                ?checked=${true}
                                type="checkbox"
                                hidden
                                @input=${() => (updatePorts(false))}
                            />
                        </div>
                    </span>
                </div>
            </div>
        </div>
        `;
    }

    if(variableName === "Position"){
        defaultValue = {x: defaultValue[0], y: defaultValue[1], z: defaultValue[2]};
        return html`
        <div style="--bkg: ${labelBackground}; --inputbkg: ${inputBackground};">
        ${styles()}
            <div id= "variable-block">
                ${variableName}:
                <div style="width: 98px;">
                    <div id="position-variable-text" width="20px">
                        X:
                        <div>
                            <span>
                                <input
                                style="background-color: var(--bkg)"
                                type="number"
                                .value=${defaultValue.x}
                                .step=${increments.step}
                                .min=${increments.min}
                                .max=${increments.max}
                                @change=${(e) => (updatePorts([Number(e.target.value), defaultValue.y, defaultValue.z]))} />
                            </span>
                        </div>
                    </div>
                   <div id="position-variable-text" width="20px">
                        Y:
                        <div>
                            <span>
                                <input
                                style="background-color: var(--bkg)"
                                type="number"
                                .value=${defaultValue.y}
                                .step=${increments.step}
                                .min=${increments.min}
                                .max=${increments.max}
                                @change=${(e) => (updatePorts([defaultValue.x, Number(e.target.value), defaultValue.z]))} />
                            </span>
                        </div>
                    </div>
                    <div id="position-variable-text" width="20px">
                        Z:
                        <div>
                            <span>
                                <input
                                style="background-color: var(--bkg)"
                                type="number"
                                .value=${defaultValue.z}
                                .step=${increments.step}
                                .min=${increments.min}
                                .max=${increments.max}
                                @change=${(e) => (updatePorts([defaultValue.x, defaultValue.y, Number(e.target.value)]))} />
                            </span>
                        </div>
                    </div>
            </div>
        </div>
        `;
    }

    return html`
    <div style="--bkg: ${labelBackground}; --inputbkg: ${inputBackground};">
    ${styles()}
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
    `;
}

const toggleCSS = () =>{
    return html`
        <style>
         #variable-block {
            background-color:var(--inputbkg);
            color: var(--text-light);
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        #multiplicative-button-label {
          background-color: var(--multiplicativeBkg);
          box-shadow: var(--multiplicativeHighlight);
          width: 30px;
          height: 20px;
          padding: 5px;
          font-size: 20px;
        }
        #additive-button-label {
          background-color: var(--additiveBkg);
          box-shadow: var(--additiveHighlight);
          width: 30px;
          height: 20px;
          padding: 5px;
          font-size: 20px;
        }
        </style>
    `;
} 

const styles = () => {
    return html`
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
                  background-color: var(--bkg);
                border: none;
                font-family: "Roboto", sans-serif;
                color: ${white};
            }
            input::-webkit-inner-spin-button:before {
                content: "^";
                font-size: 14px;
                color: #ffffff;
                display: block;
                text-align: center;
            }

            input::-webkit-inner-spin-button:after {
                content: "▼";
                font-size: 14px;
                color: #ffffff;
                display: block;
                text-align: center;
                margin-top: -2px;
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
            justify-content: right;
            // padding: 0.2rem 0.5rem;
            }
            #position-variable-text {
                background-color: var(--purple);
                color: var(--black);
                font-weight: 900;
                border-radius: 0.3rem;
                font-size: 15px;
                padding: 2px;
                display: flex;
                align-items: right;
                gap: 5px;
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
                background-color:var(--inputbkg);
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
            #multiplicative-button-label {
                width: 100px;
                height: 50px;
                border-radius: 1rem;
                outline: none;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center; 
                color: white;
                font-size: 60px;
                transition: 0.2s;
            }
            #additive-button-label {
                width: 100px;
                height: 50px;
                border-radius: 1rem;
                outline: none;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center; 
                color: white;
                font-size: 60px;
                transition: 0.2s;
            }
            .container {
                display: flex;
                justify-content: space-between; /* Space between the buttons */
                align-items: center;
                width: 100%; 
                text-align: center;
            }

            </style>`;
}


