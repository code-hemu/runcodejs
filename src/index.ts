import { Editor } from './editor.js'
import { Preview } from './preview.js'
import { Tabs } from './tabs.js'
import { Toolbar } from './toolbar.js'
import { injectStyles, addThemeToStylesheet } from "./style.js";
import { addTheme } from "./theme.js";
import { qs, createElement } from './utils.js'

interface DefaultTabConfig {
  editor?: string
  preview?: boolean
  zoom?: number
}

interface RunCodeOptions {
  element?: string | HTMLElement
  theme?: string
  autoRun?: boolean
  clickToLoad?: boolean
  extractCode?: boolean
  editable?: boolean
  network?: boolean
  dialogs?: boolean
  defaultTab?: string | DefaultTabConfig
  code?: { html?: string; css?: string; js?: string }
}

export default class RunCode {
  options: RunCodeOptions
  container: HTMLElement | null
  root: HTMLElement
  editor: Editor | null
  preview: Preview | null
  tabs: Tabs | null
  toolbar: Toolbar | null

  static instances = new WeakMap<HTMLElement, RunCode>()

  static defineTheme(name: string, colors: Record<string, string>, base?: string) {
    addTheme(name, colors, base)
    addThemeToStylesheet(name)
  }

  constructor(options: RunCodeOptions = {}) {
    this.options = {
      element: '.rc-container',
      theme: 'dark',
      autoRun: false,
      clickToLoad: false,
      extractCode: false,
      editable: true,
      network: false,
      dialogs: true,
      defaultTab: { editor: 'html', preview: true , zoom: 1},
      ...options
    }

    this.container = null
    this.editor = null
    this.preview = null
    this.tabs = null
    this.toolbar = null
    this.init()
  }

  init(): this {
    const selector = this.options.element
    this.container = typeof selector === 'string'
      ? qs(selector)
      : selector as HTMLElement

    if (this.container && RunCode.instances.has(this.container)) {
      console.warn(
        `[RunCode] Element "${selector}" already has a RunCode instance. Call destroy() first to recreate.`
      )
      return this
    }

    if (!this.container) {
      if (typeof selector !== "string") return this;

      this.container = createElement("div");

      if (selector.startsWith("#")) {
        this.container.id = selector.slice(1);
      } else if (selector.startsWith(".")) {
        this.container.className = selector.slice(1);
      }

      document.body.appendChild(this.container);
    } else {
      this.container.replaceChildren();
    }

    this.container.classList.add('rc-container');

    RunCode.instances.set(this.container, this)

    this.root = createElement("div", {
      className: "rc-editor"
    });

    this.container.appendChild(this.root);

    this._build()

    this._switchToTab(this.options.defaultTab!)

    if (this.options.code) {
      this.editor!.setCode(this.options.code)
      if (this.options.clickToLoad) {
        const { html = '', css = '' } = this.options.code
        this.preview!.renderStatic(html, css)
      } else {
        this._execute()
      }
    }

    const cfg = typeof this.options.defaultTab === 'object' ? this.options.defaultTab : null
    if (cfg?.zoom && cfg.zoom !== 1) {
      this.toolbar!.setZoom(cfg.zoom)
    }

    return this
  }

  _build() {
    injectStyles()
    addThemeToStylesheet(this.options.theme!)
    this.container!.classList.add('rc-theme-' + this.options.theme!)

    this.editor = new Editor(this.root, this.options.editable!, () => {
      if (this.options.autoRun) this._execute()
    })

    this.preview = new Preview(this.root, this.options.network!, this.options.dialogs!)

    this.tabs = new Tabs(this.root, this.editor, this.preview, (tab) => {
      if (tab === 'result') this._execute()
    })

    this.toolbar = new Toolbar(this.root, {
      clickToLoad: this.options.clickToLoad!,
      extractCode: this.options.extractCode!,
      onRun: () => this._execute(),
      onRerun: () => this._execute(),
      onZoom: (level) => this.preview!.setZoom(level),
      onScrape: () => {
        this.editor!.extractFromPrism(this.root)
        this._execute()
      }
    })

    const editorContainer = createElement('div', { className: 'rc-workspace' })
    editorContainer.appendChild(this.editor!.panel)
    editorContainer.appendChild(this.preview!.panel)

    if (this.toolbar!.wrapper){
      this.preview!.panel.appendChild(this.toolbar!.wrapper)
    }

    this.root.appendChild(this.tabs!.bar)
    this.root.appendChild(editorContainer)
    this.root.appendChild(this.toolbar!.footer)
  }

  _execute() {
    const code = this.editor!.getCode()
    this.preview!.execCode(code)
  }

  runCode() {
    this._execute()
  }

  _switchToTab(tab: string | DefaultTabConfig) {
    if (typeof tab === 'string') {
      this.root.querySelectorAll(".rc-tab").forEach(el => {
        el.classList.toggle("rc-active", (el as HTMLElement).dataset.tab === tab)
      })
      this.root.querySelectorAll(".rc-panel").forEach(el => {
        el.classList.toggle("rc-active", (el as HTMLElement).dataset.lang === tab)
      })
      this.root.querySelector(".rc-editors")
        ?.classList.toggle("rc-active", tab !== "result")
      this.root.querySelector(".rc-preview")
        ?.classList.toggle("rc-active", tab === "result")
      this.root.querySelector(".rc-preview")
        ?.classList.remove("rc-hidden")
      return
    }

    const editorTab = tab.editor || 'html'
    const showPreview = tab.preview !== false

    this.root.querySelectorAll(".rc-tab").forEach(el => {
      el.classList.toggle("rc-active", (el as HTMLElement).dataset.tab === editorTab)
    })
      this.root.querySelectorAll(".rc-panel").forEach(el => {
        el.classList.toggle("rc-active", (el as HTMLElement).dataset.lang === editorTab)
      })
    this.root.querySelector(".rc-editors")
      ?.classList.add("rc-active")
    this.root.querySelector(".rc-preview")
      ?.classList.toggle("rc-hidden", !showPreview)
    this.root.querySelector(".rc-editors")
      ?.classList.toggle("rc-full", !showPreview)
  }

  destroy() {
    if (this.container && RunCode.instances.has(this.container)) {
      RunCode.instances.delete(this.container)
    }
    if (this.root && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root)
    }
    this.container = null
    this.editor = null
    this.preview = null
    this.tabs = null
    this.toolbar = null
  }

  setTheme(theme: string) {
    const prev = this.options.theme
    this.options.theme = theme
    if (this.container) {
      this.container.classList.replace('rc-theme-' + prev, 'rc-theme-' + theme)
    }
  }
}
