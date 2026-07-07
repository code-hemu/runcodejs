import { qs, createElement } from './utils.js'
import { themes } from './theme.js'

interface StyleRule {
  type: 'rule';
  selector: string;
  declarations: Record<string, string>;
}

interface StyleContainer {
  type: 'container';
  query: string;
  rules: StyleRule[];
}

type StyleNode = StyleRule | StyleContainer;

const stylesheet: StyleNode[] = [
  {
    type: 'rule',
    selector: '.rc-container',
    declarations: {
      width: '100%',
      containerType: 'inline-size',
      containerName: 'rc-container',
      lineHeight: 'normal !important'
    }
  },
  {
    type: 'rule',
    selector: '.rc-editor',
    declarations: {
      display: 'flex',
      flexDirection: 'column',
      width: 'auto',
      aspectRatio: 'auto',
      height: '90vh',
      margin: '10px 0',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'sans-serif',
      background: 'var(--rc-bg)',
      color: 'var(--rc-text)',
      border: '1px solid var(--rc-border)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-load-overlay',
    declarations: {
      position: 'absolute',
      inset: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0,0,0,.35)',
      zIndex: '10'
    }
  },
  {
    type: 'rule',
    selector: '.rc-run-btn',
    declarations: {
      fontSize: '16px',
      padding: '10px 20px',
      fontWeight: 'bold',
      borderRadius: '10px',
      cursor: 'pointer',
      background: 'var(--rc-primary)',
      color: 'var(--rc-button-text)',
      boxShadow: 'inset 0px 3px var(--rc-border)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-run-btn:hover',
    declarations: {
      background: 'var(--rc-button-hover)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-tabs',
    declarations: {
      display: 'flex',
      background: 'var(--rc-toolbar)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-tab',
    declarations: {
      flex: '1',
      padding: '12px',
      textAlign: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      fontSize: '20px',
      color: 'var(--rc-text-light)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-tab.rc-active, .rc-zoom.rc-active',
    declarations: {
      background: 'var(--rc-primary)',
      color: 'var(--rc-text-active)',
      boxShadow: 'inset 0px 3px var(--rc-border)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-workspace',
    declarations: {
      flex: '1',
      display: 'flex',
      overflow: 'hidden'
    }
  },
  {
    type: 'rule',
    selector: '.rc-editors',
    declarations: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--rc-surface)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-editors:not(.rc-active)',
    declarations: {
      display: 'none'
    }
  },
  {
    type: 'rule',
    selector: '.rc-panel',
    declarations: {
      display: 'none',
      flex: '1',
      overflow: 'hidden',
      minHeight: '0'
    }
  },
  {
    type: 'rule',
    selector: '.rc-panel.rc-active',
    declarations: {
      display: 'block'
    }
  },
  {
    type: 'rule',
    selector: '.rc-textarea::-webkit-scrollbar',
    declarations: {
      width: '8px'
    }
  },
  {
    type: 'rule',
    selector: '.rc-textarea',
    declarations: {
      width: '100%',
      height: '100%',
      padding: '15px',
      paddingLeft: '52px',
      resize: 'none',
      border: 'none',
      outline: 'none',
      boxSizing: 'border-box',
      overflowY: 'auto',
      overflowX: 'auto',
      whiteSpace: 'pre',
      wordBreak: 'normal',
      overflowWrap: 'normal',
      font: '14px monospace',
      background: 'var(--rc-surface)',
      color: 'var(--rc-text)',
      scrollbarWidth: 'thin',
      scrollbarColor: 'var(--rc-border) var(--rc-surface)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-textarea::placeholder',
    declarations: {
      color: 'var(--rc-text)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-textarea[readonly]',
    declarations: {
      cursor: 'default',
      opacity: '.8'
    }
  },
  {
    type: 'rule',
    selector: '.rc-textarea::-webkit-scrollbar-track',
    declarations: {
      background: 'var(--rc-surface)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-textarea::-webkit-scrollbar-thumb',
    declarations: {
      background: 'var(--rc-border)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-textarea::-webkit-scrollbar-thumb:hover',
    declarations: {
      background: 'var(--rc-text-light)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-editor-wrapper',
    declarations: {
      position: 'relative',
      height: '100%',
      overflow: 'hidden'
    }
  },
  {
    type: 'rule',
    selector: '.rc-lines',
    declarations: {
      position: 'absolute',
      inset: '0 auto 0 0',
      width: '45px',
      padding: '15px 8px',
      textAlign: 'right',
      userSelect: 'none',
      overflow: 'hidden',
      font: '14px monospace',
      color: 'var(--rc-text-light)',
      background: 'var(--rc-surface)',
      boxSizing: 'border-box',
      marginBottom: '10px',
      borderRight: '1px solid rgb(0 0 0 / 13%)',
      whiteSpace: 'pre'
    }
  },
  {
    type: 'rule',
    selector: '.rc-preview',
    declarations: {
      flex: '1',
      background: 'var(--rc-bg)',
      transition: 'transform 0.3s'
    }
  },
  {
    type: 'rule',
    selector: '.rc-editors.rc-full',
    declarations: {
      width: '100%'
    }
  },
  {
    type: 'rule',
    selector: '.rc-frame',
    declarations: {
      width: '100%',
      height: '100%',
      minWidth: 'unset !important',
      maxWidth: 'none !important',
      border: 'none',
      overflow: 'auto',
      transformOrigin: '0 0',
      WebkitOverflowScrolling: 'touch',
      WebkitTransformOrigin: '0 0'
    }
  },
  {
    type: 'rule',
    selector: '.rc-footer',
    declarations: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      background: 'var(--rc-footer)',
      borderBottom: '5px solid var(--rc-primary)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-actions',
    declarations: {
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      gap: '12px'
    }
  },
  {
    type: 'rule',
    selector: '.rc-btn',
    declarations: {
      background: 'var(--rc-button)',
      color: 'var(--rc-button-text)',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 10px',
      fontSize: '14px',
      cursor: 'pointer'
    }
  },
  {
    type: 'rule',
    selector: '.rc-brand-link',
    declarations: {
      textDecoration: 'none !important',
      color: 'var(--rc-button-text)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-brand-label',
    declarations: {
      display: 'block',
      color: 'var(--rc-button-text)',
      fontSize: '12px'
    }
  },
  {
    type: 'rule',
    selector: '.rc-brand-name',
    declarations: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'var(--rc-button-text)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-tab:hover, .rc-btn:hover',
    declarations: {
      background: 'var(--rc-footer-button-hover)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-preview.zoom-1 .rc-frame',
    declarations: {
      width: '100% !important',
      height: '100% !important'
    }
  },
  {
    type: 'rule',
    selector: '.rc-preview.zoom-5 .rc-frame',
    declarations: {
      width: '200% !important',
      height: '200% !important',
      transform: 'scale(0.5)',
      WebkitTransform: 'scale(0.5)'
    }
  },
  {
    type: 'rule',
    selector: '.rc-preview.zoom-25 .rc-frame',
    declarations: {
      width: '400% !important',
      height: '400% !important',
      transform: 'scale(0.25)',
      WebkitTransform: 'scale(0.25)'
    }
  },
  {
    type: 'container',
    query: 'rc-container (max-width:900px)',
    rules: [{
      type: 'rule',
      selector: '.rc-editor',
      declarations: {
        aspectRatio: '5/3.3',
        height: 'auto'
      }
    }]
  },
  {
    type: 'container',
    query: 'rc-container (max-width:600px)',
    rules: [{
        type: 'rule',
        selector: '.rc-workspace',
        declarations: {
          flexDirection: 'column'
        }
      },
      {
        type: 'rule',
        selector: '.rc-editors, .rc-preview',
        declarations: {
          width: '100%',
          height: '100%'
        }
      },
      {
        type: 'rule',
        selector: '.rc-editors.rc-active, .rc-preview.rc-active',
        declarations: {
          display: 'flex'
        }
      },
      {
        type: 'rule',
        selector: '.rc-preview:not(.rc-active)',
        declarations: {
          height: '0px'
        }
      },
      {
        type: 'rule',
        selector: '.rc-editor',
        declarations: {
          aspectRatio: '5/5.5',
          height: 'auto'
        }
      },
      {
        type: 'rule',
        selector: '.rc-footer',
        declarations: {
          gap: '10px'
        }
      },
      {
        type: 'rule',
        selector: '.rc-frame',
        declarations: {
          width: '100%',
          height: '100%'
        }
      }
    ]
  }
];

function camelToKebab(str: string) {
  return str
    .replace(/^Webkit/, '-webkit')
    .replace(/^Moz/, '-moz')
    .replace(/^Ms/, '-ms')
    .replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

function renderDeclarations(declarations: Record<string, string>) {
  return Object.entries(declarations)
    .map(([property, value]) => {
      return `${camelToKebab(property)}:${value};`;
    })
    .join('');
}

function renderRule(rule: StyleRule) {
  return `${rule.selector}{${renderDeclarations(rule.declarations)}}`;
}

function renderContainer(container: StyleContainer) {
  const rules = container.rules
    .map(renderRule)
    .join('');

  return `@container ${container.query}{${rules}}`;
}

export function renderStyles(stylesheet: StyleNode[]) {
  return stylesheet
    .map((node: StyleNode) => {
      switch (node.type) {
        case 'rule':
          return renderRule(node);
        case 'container':
          return renderContainer(node);
      }
    })
    .join('');
}

function renderTheme(name: string) {
  return renderStyles([{
    type: 'rule',
    selector: `.rc-theme-${name}`,
    declarations: themes[name] ?? themes.dark
  }]);
}

export function injectStyles() {
  if (qs('#rc-styles')) return;

  const css = renderStyles(stylesheet);

  const style = createElement('style', {id:'rc-styles'}, css);
  document.head.appendChild(style);
}

export function addThemeToStylesheet(name: string) {
  const style = qs('#rc-styles') as HTMLStyleElement | null;
  if (!style) { injectStyles(); return; }
  if (style.textContent?.includes(`.rc-theme-${name}`)) return;
  style.textContent += renderTheme(name);
}

