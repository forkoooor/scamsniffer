import {RPC} from '../core/message/client';

const EVENT_NAME = 'ScamSniffer/config';

export const updateFirewallConfig = (config: any) => {
  document.dispatchEvent(
    new CustomEvent(EVENT_NAME, {
      detail: config,
    })
  );
};

async function sendConfig() {
  const [config, isDisabled] = await Promise.all([
    RPC.getConfig(),
    RPC.isFeatureDisabled('firewall'),
  ]);
  updateFirewallConfig({
    isDisabled,
    simulation: config,
  });
}

function injectScript() {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', 'false');
    /* @ts-ignore */
    scriptTag.setAttribute('src', chrome.runtime.getURL('assets/js/bundle.js'));
    container.insertBefore(scriptTag, container.children[0]);
    container.removeChild(scriptTag);
    scriptTag.onload = () => {
      sendConfig();
    };
  } catch (error) {
    console.error('ScamSniffer: Firewall injection failed.', error);
  }
}

injectScript();

export {};
