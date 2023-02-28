# toolchains

- core
  - [x] add/remove tools
  - [x] pan/zoom workspace
  - [x] drag tools
  - [ ] connect/disconnect ports
    - [x] draw pipes between ports
    - [ ] send data from outports to inports
    - [ ] pipes update when tools moved
    - [ ] remove pipes between ports
  - [ ] save/load toolchain state
  - [ ] basic port type checking
- tool lifecycle
  - [x] init
  - [ ] resize
  - [ ] save state
  - [ ] load state
  - [ ] update port
- tool ui
  - [x] set initial width and height from tool config
  - [x] render template tool ui
  - [x] ports
  - [x] header
  - [x] state pane
  - [x] pin tool ui panels open
  - [ ] edit displayname
- workspace ui
  - [x] tool library
  - [x] background dots
  - [x] click button to add a tool
  - [x] tool layering
  - [ ] toolchain console
  - [ ] collapse all toolui
  - [ ] box select tools for moving
  - [ ] nice pipe routing
  - [ ] tool alignment/layout
  - [ ] mobile pan zoom
  - [ ] toolchain shape pane
- global callbacks
  - [x] log
  - [ ] alert
  - [ ] set global/get global? watch?
- questions
  - how to handle tool style scoping?
  - should i stick with lit-html templating?
  - Should the active tool be highlighted?
  - unsure about current pipe data structure

## tool implementation

**Current approach:** when a tool is imported, we import the default export from
the tool's file. This should be a function which returns the tool's
configuration, state, and lifecycle methods. It can optionally accept a
`toolchain` parameter, which is an object containing methods the tool can use to
interact with the global toolchain interface, e.g. by logging to the console.

- tool methods
  - `render` - returns a template that is rendered in a toolpane
  - `init` - run when the tool is added to the toolchain. _saved state will be
    passed in if present?_
  - `save` - run when a toolchain's state is saved. should return an object
    representing the saved state of the tool.
  - `resize` - run when the tool's ui is resized in the toolchain interface
  - `connect` - run when a pipe is connected to a port
  - `disconnect` - run when a pipe is disconnected from a port
  - `inportsUpdated` - run when inports receive new data
  - `remove` - when tool is removed from toolchain
- tool config
  - `ui`
  - `state`
  - `inports`
  - `outports`

### Example tool definition

```js
export default function tool(globalCallbacks) {
  const ui = {
    displayName: "Example",
    width: "200px",
    height: "200px",
  };

  const state = {
    colors: [],
    currentColor: "#ffff00",
    num: 500000,
    floatieBoi: 25.8,
    obj: { currentColor: "#ffff00", num: 500000, floatieBoi: 25.8 },
  };

  const inports = {
    text: {
      type: "string",
      value: "asdf",
    },
    num: {
      type: "number",
      value: 57,
    },
    bool: {
      type: "boolean",
      value: false,
    },
  };

  const outports = {
    text: {
      type: "string",
      value: "asdf",
    },
    num: {
      type: "number",
      value: 57,
    },
    bool: {
      type: "boolean",
      value: false,
    },
  };

  const init = () => {
    // things here run when added to toolchain. can initialize state variables
    shuffle();
  };

  const resize = () => {
    // this runs when the tool ui is resized
  };

  const shuffle = (e) => {
    globalCallbacks.log("shufflin!!!");
    state.colors = new Array(30).fill(0).map(() => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });
  };

  const render = () => {
    return html`<style>
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
          grid-auto-rows: auto;
          flex: 1;
        }
        .grid-container > div {
          width: 100%;
        }
        .grid-container > div:hover {
          background-color: var(--pink);
        }
        button {
          width: 100%;
        }</style
      ><button @click=${shuffle}>Shuffle!</button>
      <div class="grid-container">
        ${state.colors.map(
          (color) => html`<div style="background-color: ${color};"></div>`
        )}
      </div> `;
  };

  return { ui, inports, outports, state, init, resize, render };
}
```
