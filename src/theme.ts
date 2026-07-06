export interface ThemeDefinition {
  "--rc-bg": string;
  "--rc-surface": string;
  "--rc-toolbar": string;
  "--rc-footer": string;
  "--rc-text": string;
  "--rc-text-light": string;
  "--rc-text-active": string;
  "--rc-primary": string;
  "--rc-border": string;
  "--rc-button": string;
  "--rc-button-text": string;
  "--rc-button-hover": string;
  "--rc-footer-button-hover": string;
}

export const themes: Record<string, Record<string, string>> = {
  light: {
    "--rc-bg": "#ffffff",
    "--rc-surface": "#f8f9fa",
    "--rc-toolbar": "#e9ecef",
    "--rc-footer": "#dee2e6",
    "--rc-text": "#212529",
    "--rc-text-light": "#495057",
    "--rc-text-active": "#ffffff",
    "--rc-primary": "#cccccc",
    "--rc-border": "#aeaeae",
    "--rc-button": "#eeeeee",
    "--rc-button-text": "#8b8b8e",
    "--rc-button-hover": "#ced4da",
    "--rc-footer-button-hover": "#ced4da"
  },
  dark: {
    "--rc-bg": "#ffffff",
    "--rc-surface": "#515151",
    "--rc-toolbar": "#333333",
    "--rc-footer": "#3d3d3e",
    "--rc-text": "#ddca7e",
    "--rc-text-light": "#dddddd",
    "--rc-text-active": "#ffffff",
    "--rc-primary": "#888888",
    "--rc-border": "#dddddd",
    "--rc-button": "#333333",
    "--rc-button-text": "#ffffff",
    "--rc-button-hover": "#bababa",
    "--rc-footer-button-hover": "#565656"
  },
  dracula: {
    "--rc-bg": "#393939",
    "--rc-surface": "#44475a",
    "--rc-toolbar": "#21222c",
    "--rc-footer": "#21222c",
    "--rc-text": "#f8f8f2",
    "--rc-text-light": "#bd93f9",
    "--rc-text-active": "#ffffff",
    "--rc-primary": "#bd93f9",
    "--rc-border": "#6272a4",
    "--rc-button": "#44475a",
    "--rc-button-text": "#f8f8f2",
    "--rc-button-hover": "#6272a4",
    "--rc-footer-button-hover": "#50536b"
  },
  monokai: {
    "--rc-bg": "#272822",
    "--rc-surface": "#3e3d32",
    "--rc-toolbar": "#575b4c",
    "--rc-footer": "#1f201c",
    "--rc-text": "#f8f8f2",
    "--rc-text-light": "#a6e22e",
    "--rc-text-active": "#ffffff",
    "--rc-primary": "#E91E63",
    "--rc-border": "#fd971f",
    "--rc-button": "#49483e",
    "--rc-button-text": "#f8f8f2",
    "--rc-button-hover": "#5f5d52",
    "--rc-footer-button-hover": "#fd971f"
  },
  nord: {
    "--rc-bg": "#2e3440",
    "--rc-surface": "#3b4252",
    "--rc-toolbar": "#46557b",
    "--rc-footer": "#4b556d",
    "--rc-text": "#eceff4",
    "--rc-text-light": "#d8dee9",
    "--rc-text-active": "#ffffff",
    "--rc-primary": "#88c0d0",
    "--rc-border": "#8496ba",
    "--rc-button": "#434c5e",
    "--rc-button-text": "#eceff4",
    "--rc-button-hover": "#4c566a",
    "--rc-footer-button-hover": "#5e81ac"
  }
};

export function addTheme(
  name: string,
  colors: Partial<ThemeDefinition>,
  base: string = 'dark'
) {
  themes[name] = { ...themes[base], ...colors };
}