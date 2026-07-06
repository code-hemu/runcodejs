import { qs, qsa, createElement } from './utils.js'

export class Editor {
  container: HTMLElement
  editable: boolean
  onInput: () => void
  textareas: Record<string, HTMLTextAreaElement>
  lines: Record<string, HTMLElement>
  panel: HTMLDivElement
  instanceId: number
  static nextId = 0

  constructor(container: HTMLElement, editable: boolean, onInput: () => void) {
    this.instanceId = Editor.nextId++
    this.container = container
    this.editable = editable
    this.onInput = onInput
    this.textareas = {}
    this.lines = {}
    this._build()
  }

  _build() {
    this.panel = createElement('div', { className: 'rc-editors rc-active' }) as HTMLDivElement;

    ['html', 'css', 'js'].forEach((lang, i) => {
      const editor = createElement('div', { id: `rc-${lang}-${this.instanceId}`, dataset: { lang }, className: `rc-panel ${i === 0 ? ' rc-active' : ''}` })

      const wrapper = createElement('div', { className: 'rc-editor-wrapper' })

      const lines = createElement('div', { className: 'rc-lines' })
      lines.textContent = '1'

      const textarea = createElement('textarea', {
        id: `${lang}-code-${this.instanceId}`,
        className: 'rc-textarea',
        placeholder: `Write your ${lang.toUpperCase()} code...`
      }) as HTMLTextAreaElement
      textarea.readOnly = !this.editable
      textarea.addEventListener('input', () => {
        this.onInput()
        this.updateLines(textarea, lines)
      })
      textarea.addEventListener('scroll', () => {
        lines.scrollTop = textarea.scrollTop
      })

      wrapper.appendChild(lines)
      wrapper.appendChild(textarea)
      editor.appendChild(wrapper)
      this.panel.appendChild(editor)
      this.textareas[lang] = textarea
      this.lines[lang] = lines
    })
  }

  updateLines(textarea: HTMLTextAreaElement, lines: HTMLElement) {
    const count = textarea.value.split('\n').length
    const nums: string[] = []
    for (let i = 1; i <= count; i++) nums.push(String(i))
    lines.textContent = nums.join('\n')
  }

  getCode(): { html: string; css: string; js: string } {
    return {
      html: this.textareas.html.value,
      css: this.textareas.css.value,
      js: this.textareas.js.value,
    }
  }

  setCode(code: { html?: string; css?: string; js?: string }) {
    if (code.html !== undefined) {
      this.textareas.html.value = code.html
      this.updateLines(this.textareas.html, this.lines.html)
    }
    if (code.css !== undefined) {
      this.textareas.css.value = code.css
      this.updateLines(this.textareas.css, this.lines.css)
    }
    if (code.js !== undefined) {
      this.textareas.js.value = code.js
      this.updateLines(this.textareas.js, this.lines.js)
    }
  }

  extractFromPrism(context: HTMLElement) {
    const codeBlocks: Record<string, Element[]> = {
      html: qsa('pre.language-markup code', context),
      css: qsa('pre.language-css code', context),
      js: qsa('pre.language-js code', context),
    }
    for (const lang of ['html', 'css', 'js']) {
      for (const code of codeBlocks[lang]) {
        this.textareas[lang].value += (code.textContent || '') + '\n'
      }
      this.updateLines(this.textareas[lang], this.lines[lang])
    }
  }

  show(lang: string) {
    qsa('.rc-panel', this.container).forEach(el => el.classList.remove('rc-active'))
    const editor = qs(`#rc-${lang}-${this.instanceId}`, this.container)
    if (editor) editor.classList.add('rc-active')
  }
}
