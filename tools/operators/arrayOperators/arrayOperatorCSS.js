import { html } from "lit-html";
export const css = () => {
    return html`
        <style>
        #container {
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        * {
          box-sizing: border-box;
        }
        #info {
          background-color: var(--black);
          color: var(--text-light);
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        #position-variable-text {
            background-color: var(--purple);
            color: var(--black);
            font-weight: 900;
            font-family: "Roboto", sans-serif;
            border-radius: 0.3rem;
            font-size: 15px;
            padding: 2px 5px;
            display: flex;
            align-items: right;
            gap: 5px;
        }
        input[type="number"] {
            width: 100%;
              background-color: var(--bkg);
            border: none;
            font-family: "Roboto", sans-serif;
            color: #ffffff;
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
      </style>
      `;
}
  