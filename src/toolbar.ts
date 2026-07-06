import { qs, qsa, createElement } from './utils.js'

interface ToolbarOptions {
  clickToLoad: boolean
  extractCode: boolean
  onRun: () => void
  onRerun: () => void
  onZoom: (level: number) => void
  onScrape: () => void
}

export class Toolbar {
  container: HTMLElement
  clickToLoad: boolean
  extractCode: boolean
  onRun: () => void
  onRerun: () => void
  onZoom: (level: number) => void
  onScrape: () => void
  wrapper: HTMLDivElement | null
  footer: HTMLDivElement

  constructor(container: HTMLElement, { clickToLoad, extractCode, onRun, onRerun, onZoom, onScrape }: ToolbarOptions) {
    this.container = container
    this.clickToLoad = clickToLoad
    this.extractCode = extractCode
    this.onRun = onRun
    this.onRerun = onRerun
    this.onZoom = onZoom
    this.onScrape = onScrape
    this.wrapper = null
    this._build()
  }

  _build() {
    if(this.clickToLoad){
      const wrapper = createElement('div', { className: 'rc-load-overlay' })
      const runBtn = createElement('button', {
        className: 'rc-run-btn',
        onClick: () => this._handleScrape()
      }, 'Run Code')

      wrapper.appendChild(runBtn)

      this.wrapper = wrapper as HTMLDivElement
    }

    const footer = createElement('div', { className: 'rc-footer' })

    const brand = createElement('div', {
      className: 'rc-brand'
    });

    const brandLink = createElement('a', {
      className: 'rc-brand-link',
      href: '__HOMEPAGE__',
      target: '_blank',
      rel: 'noopener',
      title: 'Edit on RunCode'
    });

    const editOnText = createElement('span', {
      className: 'rc-brand-label'
    }, 'EDIT ON');

    const rcLogo = createElement('span', {
      className: 'rc-brand-name'
    }, 'RUNCODE');

    brandLink.appendChild(editOnText);
    brandLink.appendChild(rcLogo);

    brand.appendChild(brandLink);

    footer.appendChild(brand);

    const actions = createElement('div', { className: 'rc-actions' })
    footer.appendChild(actions);

    const rerunBtn = createElement('button', {
      className: 'rc-btn rc-rerun',
      onClick: () => this.onRerun()
    }, 'Rerun')

    actions.appendChild(rerunBtn);

    [['025', '0.25x'], ['05', '0.5x'], ['1', '1x']].forEach(([scale, label]) => {
      const btn = createElement('button', {
        className: `rc-btn rc-zoom${scale === '1' ? ' rc-active' : ''}`,
        dataset: { scale },
        onClick: () => this._setZoom(scale)
      }, label)
      actions.appendChild(btn)
    })

    this.footer = footer as HTMLDivElement
  }

  _handleScrape() {
    if (this.wrapper && this.wrapper.parentNode) {
      this.wrapper.parentNode.removeChild(this.wrapper);
    }
    this.extractCode ? this.onScrape() : this.onRun();
  }

  setZoom(level: number) {
    const scale = String(level).replace('.', '')
    this._setZoom(scale)
  }

  _setZoom(scale: string) {
    qsa('.rc-zoom', this.container).forEach(b => b.classList.remove('rc-active'))
    const btn = qs(`[data-scale="${scale}"]`, this.container)
    if (btn) btn.classList.add('rc-active')
    this.onZoom(parseFloat(scale))
  }
}
