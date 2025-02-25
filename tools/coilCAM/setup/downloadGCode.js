import { html } from "lit-html";

const config = {
  inports: {
    contents: {
      type: "string",
      value: null,
    },
  },
  outports: {},
  state: { filename: "GCODE" },
  ui: {
    displayName: "Download GCode",
    width: 150,
    height: 50,
    icon: "download",
  },
};

function downloadGCode(inports, outports, state) {
    function downloadClicked() {
        const blob = new Blob([inports.contents.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${state.filename}.gcode`; 
        link.style.display = 'none';
    
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

  function updateInput(e) {
    state.filename = e.target.value;
  }

  const render = () => {
    return html`<style>
        .container {
          height: 100%;
          display: flex;
          flex-direction: column;
          font-family: inherit;
        }
        .fileBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          background-color: var(--blue);
          font-weight: 600;
          border-top: 1px solid var(--black);
        }
        .fileBtn:hover {
          cursor: pointer;
          background-color: var(--purple);
        }
        .fname {
          display: flex;
          border: none;
          padding: 0.3rem;
        }
      </style>
      <div class="container">
        <input
          class="fname"
          value=${state.filename}
          placeholder="Enter file name"
          @input=${updateInput}
          type="text" />
        <div class="fileBtn" @click=${downloadClicked}>
          <span>Download</span>
        </div>
      </div>`;
  };

  return { render };
}

export default { config, tool: downloadGCode };
