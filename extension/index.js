const vscode = require('vscode');
const config = require('./utils/config');
const createWebview = require('./createWebview');
const handleMessage = require('./handleMessage');

function activate(context) {
  const paths = { root: context.extensionPath };
  const getTheme = () => {
    // const tokenColors = config
    //   .get('editor.tokenColorCustomizations.textMateRules', [])
    //   .map(({ scope, settings }) => Object.entries(settings).map(([name, value]) => [`$${scope}_${name}`, value]))
    //   .flat();

    const colorCustomizations = config.get('workbench.colorCustomizations');

    return colorCustomizations;

    // return { ...colorCustomizations, ...Object.fromEntries(tokenColors) };
  };
  const getPalette = () => ({
    type: config.get('vslook.palette.type').toLowerCase(),
    colors: config.get('vslook.palette.colors'),
  });

  console.log(config.get('vslook.palette.type').toLowerCase());

  const disposableOnEdit = vscode.commands.registerCommand(`vslook.edit`, () => {
    const data = { palette: getPalette(), theme: getTheme() };
    createWebview({ root: paths.root, data }, handleMessage);
  });

  context.subscriptions.push(disposableOnEdit);
}

function deactivate() {}

module.exports = { activate, deactivate };
