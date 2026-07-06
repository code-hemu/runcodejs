import { qs, qsa, createElement } from './utils.js'
import { Editor } from './editor.js'
import { Preview } from './preview.js'

export class Tabs {
  container: HTMLElement
  editor: Editor
  preview: Preview
  onTabChange: (tab: string) => void
  bar: HTMLDivElement

  constructor(container: HTMLElement, editor: Editor, preview: Preview, onTabChange: (tab: string) => void) {
    this.container = container
    this.editor = editor
    this.preview = preview
    this.onTabChange = onTabChange
    this._build()
  }

  _build() {
    this.bar = createElement('div', { className: 'rc-tabs' }) as HTMLDivElement;
    ['html', 'css', 'js', 'result'].forEach((tab, i) => {
      const el = createElement('div', {
        className: `rc-tab${i === 0 ? ' rc-active' : ''}`,
        dataset: { tab },
        onClick: () => this._switch(tab)
      }, tab.toUpperCase())
      this.bar.appendChild(el)
    })
  }

  _switch(tab: string) {
    const tabs = qsa('.rc-tab', this.bar)
    tabs.forEach(t => t.classList.remove('rc-active'))
    const activeTab = qs(`[data-tab="${tab}"]`, this.bar)
    if (activeTab) activeTab.classList.add('rc-active')

    const editorPanel = qs('.rc-editors', this.container)
    const resultPanel = qs('.rc-preview', this.container)

    if (!editorPanel || !resultPanel) return

    editorPanel.classList.toggle('rc-active', tab !== 'result')
    resultPanel.classList.toggle('rc-active', tab === 'result')

    if (tab !== 'result') {
      editorPanel.classList.remove('rc-full')
      this.editor.show(tab)
    }

    this.onTabChange(tab)
  }
}
