import { createElement } from './utils.js'

function stripKeyframes(css: string): string {
  let result = ''
  let i = 0
  while (i < css.length) {
    if (css.slice(i, i + 10).toLowerCase() === '@keyframes') {
      while (i < css.length && css[i] !== '{') i++
      if (i >= css.length) break
      let depth = 1
      i++
      while (i < css.length && depth > 0) {
        if (css[i] === '{') depth++
        else if (css[i] === '}') depth--
        i++
      }
      continue
    }
    result += css[i++]
  }
  return result
}

export class Preview {
  container: HTMLElement
  zoomLevel: number
  panel: HTMLDivElement
  iframe: HTMLIFrameElement
  instanceId: number
  static nextId = 0
  network: boolean
  dialogs: boolean

  constructor(container: HTMLElement, network = false, dialogs = false) {
    this.instanceId = Preview.nextId++
    this.container = container
    this.zoomLevel = 1
    this.network = network
    this.dialogs = dialogs
    this._build()
  }

  _build() {
    this.panel = createElement('div', { className: 'rc-preview' }) as HTMLDivElement

    this.iframe = createElement('iframe', {
      class: 'rc-frame',
      sandbox: 'allow-scripts',
      referrerPolicy: 'no-referrer',
      title: 'Live HTML Preview',
      scrolling: 'yes'
    }) as HTMLIFrameElement

    this.panel.appendChild(this.iframe)
  }

  renderStatic(html: string, css: string) {
    const scrubbed = html.replace(/<script[\s\S]*?<\/script>/gi, '')
    const noAnim = stripKeyframes(css)
    this.iframe.srcdoc = `${scrubbed}\n<style>${noAnim}</style>`
  }

  private _buildCSP(): string {
    if (this.network) return ""

    return `
    <meta http-equiv="Content-Security-Policy"
      content="connect-src 'none';">
  `
  }

  execCode({ html, css, js }: { html: string; css: string; js: string }) {
    const csp = this._buildCSP();

    const jsOverride = this.dialogs
      ? js
      : `
        window.alert = () => {};
        window.confirm = () => false;
        window.prompt = () => null;

        ${js}
      `;

    this.iframe.srcdoc = `
    ${csp}
    ${html}
    <style>${css}</style>
    <script>
      ${jsOverride}
    <\/script>
  `;
  }

  setZoom(level: number) {
    this.zoomLevel = level
    Array.from(this.panel.classList).forEach(className => {
      if (className.startsWith('zoom-')) this.panel.classList.remove(className)
    })
    this.panel.classList.add(`zoom-${String(level).replace(/^0\./, '')}`)
  }
}