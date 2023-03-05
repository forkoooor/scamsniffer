import App from "./App";
import {
  setupPortalShadowRoot,
  ReactRootShadowed,
  createReactRootShadowedPartial,
} from "../../core/ShadowRoot";
import "./i18n";
import { setHandler } from "../../core/bridge/api";

const firewall = {
  listenRequest(cb: any) {
    setHandler(cb)
  }
}

function mountApp() {
  const createReactRootShadowed = createReactRootShadowedPartial({
    preventEventPropagationList: [],
  });
  const shadow = setupPortalShadowRoot({ mode: "closed" });
  let view: ReactRootShadowed | null = null;
  let counter = 1;

  function createAndRender() {
    view = createReactRootShadowed(shadow, { key: `extension-${counter}` });
    view.render(<App firewall={firewall} />);
    counter++;
  }
  createAndRender();
}

setTimeout(() => {
  // mountApp();
}, 3000)
/* @ts-ignore */
// if (document.body) {
//   mountApp();
// } else {
//   document.addEventListener("DOMContentLoaded", () => {
//     mountApp();
//   });
// }
