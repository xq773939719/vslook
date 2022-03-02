const vscode = window.acquireVsCodeApi();

export const setTheme = () => {
  const props = document.documentElement.style.cssText.split(';');
  window.$theme = props.reduce((style, property) => {
    let [name, value] = property.split(':');
    name = name.trim().replace('--vscode-', '').replace('-', '.');
    return { ...style, [name]: value };
  }, {});
};

export const postMessage = msg => vscode.postMessage(msg);
